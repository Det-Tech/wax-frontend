<template>
    <section class="full-page-home">
        <HowToPlayModal
          :slide="slide"
          :onSlideStart="onSlideStart"
          :onSlideEnd="onSlideEnd"
          :show="showHowToModal"
          :onHide="() => hideModal('showHowToModal')"
        />
        <HiddenEOSModal
          :show="showHiddenEOSModal"
          :onHide="() => hideModal('showHiddenEOSModal')"
        />
        <BuyModal
          :scatter="scatter"
          :account="account"
          :login="login"
          :pixelDeals="pixelDeals"
          :buyClicksWithDeal="buyClicksWithDeal"
          :sendingFunds="sendingFunds"
          :fundOutcome="fundOutcome"
          :fundError="fundError"
          :fundTxnId="fundTxnId"
          :fundMemo="fundMemo"
          :show="showBuyClicksModal"
          :onHide="() => hideModal('showBuyClicksModal')"
        />
        <!-- Transaction Success - Treasure Found too -->
        <VictoryModal
          :show="showVictoryModal"
          :onHide="() => hideModal('showVictoryModal')"
          :message="memo"
          :transactionURL="`https://bloks.io/transaction/${txnId || ''}`"
        />
        <!-- Transaction Success - No Treasure Found -->
        <LoserModal
          :show="showLoserModal"
          :onHide="() => hideModal('showLoserModal')"
        />
        
        <!-- Account information - Logged in with ... -->
        <section class="container mt-0 mb-0">
            <!-- Scatter button comes here -->
            <section class="contract" style="display: none">

                <section class="logged-in-with mt-3" v-if="scatter && account">
                    <span></span>{{account.name}}
                    <b-button size="sm" class="small" @click="logout">
                        Logout
                    </b-button>
                </section>
            </section>
            <section class="pixel mb-3">
                <!-- Map -->
                <mario />
                <!-- Reset Clicks -->
                <!--<b-link @click="resetPixels">Reset Selection</b-link>-->
            </section>
            <!-- Submit clicks -->
            <section v-if="scatter && account">
                <div class="location-element" style="display: none">
                    <!-- Submit message -->
                    <p>{{ sendingClicks ? 'Submitting Location' : 'Selected Location'}}: {{ pixelSelectedStr }}</p>
                </div>
                <div class="d-flex justify-content-center alerts-div">
                    <!-- Transaction Failed -->
                    <b-alert show dismissible class="alert alert-success mt-3 treasure-alert pr-0" v-if="outcome === null && error.code">
                        <span>Something went wrong...</span>
                        <span>{{ error.message }}</span>
                    </b-alert>
                </div>
            </section>
        </section>
        <BottomNavbar
          :remainingClicks="remainingClicks"
          :showModal="showModal"
        />
        <div class="empty-state-msg" v-if="noPixelSelected">
            Click on a square to start the hunt
        </div>
    </section>
</template>
<script>
    import HowToPlayModal from '../components/Modals/HowToPlayModal';
    import BuyModal from '../components/Modals/BuyModal';
    import HiddenEOSModal from '../components/Modals/HiddenEOSModal';
    import VictoryModal from '../components/Modals/VictoryModal';
    import LoserModal from '../components/Modals/LoserModal';
    import BottomNavbar from '../components/Layout/Navbar';
    // Importing Scatter and eosjs.
    import ScatterJS, {Network} from 'scatterjs-core';
    import ScatterEOS from 'scatterjs-plugin-eosjs';
    // Import Lynx
    import ScatterLynx from 'scatterjs-plugin-lynx';
    import Eos from 'eosjs';
    import api from '@/api.js'
    // Import Canvas Element
    import Mario from '@/components/Mario';
    // Scatter & Lynx Plugins
    ScatterJS.plugins( new ScatterEOS(), new ScatterLynx() );
    // Define the network we will be using for Scatter connect.
    const network = Network.fromJson({
        // Mainnet
        // blockchain:'eos',
        // host:'nodes.get-scatter.com',
        // port:443,
        // protocol:'https',
        // chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
        // Jungle 2
        blockchain: 'eos',
        host: 'jungle2.cryptolions.io',
        port: 443,
        protocol: 'https',
        chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473'
    });
    // Notice that our eosjs reference isn't reactive ( in the data() method like the rest ).
    let eos;
    export default {
        components: {
            Mario,
            HowToPlayModal,
            BuyModal,
            VictoryModal,
            LoserModal,
            HiddenEOSModal,
            BottomNavbar
        },
        data() {
            return {
                sendingFunds: false,
                sendingClicks: false,
                scatter: null,
                resultFunds: null,
                resultClicks: null,
                pixelDeals: [
                    { clickCount: 50, price: 22.5, discount: 10 },
                    { clickCount: 10, price: 4.75, discount: 5 },
                    { clickCount: 1, price: 0.5, discount: 0 }
                ],
                user: [],
                play: [],
                txnId: '',
                outcome: null,
                memo: '',
                error: {
                    code: null,
                    message: null
                },
                fundTxnId: '',
                fundOutcome: null,
                fundMemo: '',
                fundError: {
                    code: null,
                    message: null
                },
                slide: 0,
                sliding: null,
                howToModal: null,
                totalPurchaseAmount: 0,
                showHowToModal: false,
                showBuyClicksModal: false,
                showHiddenEOSModal: false,
                showLoserModal: false,
                showVictoryModal: false
            }
        },
        mounted() {
            // Eosjs setup
            this.setEosInstance();
            // Connecting Scatter first to make sure the user has Scatter installed.
            ScatterJS.scatter.connect('SPACE_MINER').then(connected => {
                if (!connected) {
                    // IF the user doesn't have Scatter, or it's closed.
                    console.error('Could not connect to Scatter.');
                    return;
                }
                // If connected, reference to the Scatter object.
                this.scatter = ScatterJS.scatter;
            });

            if (!this.hasAccount) {
                this.$router.push('/')
                return
            }
            // Show How To play modal on page load
            if (localStorage.isShownHowToModal !== 'true') {
                this.showHowModal();
                localStorage.isShownHowToModal = 'true';
                // Call function to update player data
                this.fetchPlayerData();
            }
        },
        computed: {
            hasAccount() {
                return this.$store.getters.hasAccount
            },
            // Helper setup to get the account we want to interact with.
            account() {
                // No scatter or no Identity/Login
                if(!this.scatter || !this.scatter.identity) return null;

                // Returning EOSIO account
                if (!this.$store.getters.hasAccount) {
                    this.$store.commit('updateAccountStatus', true)
                }
                return this.scatter.identity.accounts[0];
            },
            // Return Remaining attempts from Store
            remainingClicks() {
                return this.$store.getters.remainingClicks;
            },
            // Return Selected Location from Store
            pixelSelected() {
                return this.$store.getters.selectedPixel
            },
            // If no Selected Location return message
            pixelSelectedStr() {
                if (this.pixelSelected.row !== null && this.pixelSelected.column !== null) {
                    return `[ ${this.pixelSelected.row},
                     ${this.pixelSelected.column} ]`;
                } else {
                    return 'Please select!';
                }
            },
            noPixelSelected() {
                return this.pixelSelected.row === null || this.pixelSelected.column === null
            }
        },
        methods: {
            fetchPlayerData() {
                // Do not fetch player data if Scatter account does not exist
                if (!this.account) {
                    return
                }
                // Player Status API Request
                let playerData = JSON.stringify({
                    "json": "true",
                    "scope": "spaceminer11",
                    "code": "spaceminer11",
                    "table": "players",
                    "lower_bound": this.account.name,
                });
                // API URL - To be reused for different calls
                let url = 'https://jungle2.cryptolions.io:443/v1/chain/get_table_rows';
                api.getData(url, playerData).then(response => {
                    console.log(response);
                    const checkedAccount = response.data.rows.filter(r => r.account=== this.account.name)[0]
                    if (!checkedAccount) {
                        console.log('Logged in account not found in table')
                        this.$store.commit('setPlayerClicks', 0)
                        return
                    }
                    this.$store.commit('setPlayerClicks', checkedAccount.clicks)
                });
                // Canvas Status API Request
                let boardData = JSON.stringify({
                    "json": "true",
                    "scope": "spaceminer11",
                    "code": "spaceminer11",
                    "table": "map",
                });
                // Get Canvas data through API
                api.getData(url, boardData).then(response => {
                    // Update map in store
                    this.$store.commit('updateMap', response.data.rows[0].map)
                })
            },
            login() {
                // Connect Scatter to specific account (user account) and network (CHAIN_ID)
                this.scatter.getIdentity({accounts:[network]});
            },
            logout() {
                // Scatter forget identity API
                this.scatter.forgetIdentity();
                this.$router.push('/');
            },
            // Transfer Funds to buy clicks
            async transferFunds() {
                if (this.sendingFunds) return;
                this.resetFundRes();
                this.sendingFunds = true;
                // We need to pass in options, to make sure eosjs knows which authority/permission to use.
                const options = {
                    authorization: [`${this.account.name}@${this.account.authority}`]
                };
                // Method to display result on page
                // Set  sendingD=Funds prop to false
                const completedFunds = fundRes => {
                    this.handleFundRes(fundRes);
                    this.resultFunds = fundRes;
                    this.sendingFunds = false;
                }
                // Transaction data, send EOS to contract account
                try {
                    const resultFunds = await eos.transaction({
                        actions: [{
                            account: 'eosio.token',
                            name: 'transfer',
                            authorization: [{
                                actor: this.account.name,
                                permission: this.account.authority,
                            }],
                            data: {
                                from: this.account.name,
                                to: 'spaceminer11',
                                quantity: `${this.totalPurchaseAmount} EOS`,
                                memo: this.account.name,
                            },
                        }]
                    }, {
                        blocksBehind: 3,
                        expireSeconds: 30,
                    });
                    completedFunds(resultFunds);
                    // Call function to update player data (Remaining attempts)
                    this.fetchPlayerData();
                } catch (e) {
                    completedFunds(e);
                    this.fundError.message = e.json.error.details[0].message;
                }
            },
            // Transfer clicks to contract
            async transferClicks() {
                if (this.remainingClicks < 1) {
                    this.showModal("showBuyClicksModal");
                    this.$store.commit('resetPixels');
                    return;
                }
                if (this.sendingClicks) return;
                this.resetRes();
                this.$store.commit('updateSubmitting', true);
                this.sendingClicks = true;
                // We need to pass in options, to make sure eosjs knows which authority/permission to use.
                const optionsClicks = {
                    authorization: [`${this.account.name}@${this.account.authority}`]
                };
                // Method to display result on page
                // Set  sendingD=Funds prop to false
                const completedClicks = res => {
                    this.handleRes(res);
                    this.resultClicks = res;
                    this.sendingClicks = false;
                    this.$store.commit('updateSubmitting', false);
                }
                // NOTE: Send action to contract
                try {
                    const resultClicks = await eos.transaction({
                        actions: [{
                            account: 'spaceminer11',
                            name: 'click',
                            authorization: [{
                                actor: this.account.name,
                                permission: this.account.authority,
                            }],
                            data: {
                                account: this.account.name,
                                row: this.pixelSelected.row,
                                column: this.pixelSelected.column,
                            },
                        }]
                    }, {
                        blocksBehind: 3,
                        expireSeconds: 30,
                    });
                    completedClicks(resultClicks);
                    // Call function to update player data (Remaining attempts)
                    this.fetchPlayerData();
                    // Reset selected Location - Commented because it creates a conflict with alert modals after pixel submission
                    // this.$store.commit('resetPixels');

                } catch (e) {
                    completedClicks(e);
                }
            },
            setEosInstance(){
                if(this.account){
                    // Since we have a user with Scatter we're going to overwrite the eosjs instance
                    // with one that can sign transactions with Scatter.
                    eos = this.scatter.eos(network, Eos);
                } else {
                    // There is no user, so we're using a fallback eosjs instance so we can still fetch things
                    // from chain.
                    eos = Eos({httpEndpoint:network.fullhost()});
                }
            },
            // Funds Response
            handleFundRes(fundRes) {
                console.log('fundRes')
                console.log(fundRes)
                if (fundRes.transaction_id) {
                    // Transaction happened
                    this.fundTxnId = fundRes.transaction_id
                    const fundMemo = fundRes.processed.action_traces[0].inline_traces
                    if (fundMemo.length > 0) {
                        this.fundOutcome = true
                        this.fundMemo = fundMemo[0].act.data.memo
                    } else {
                        this.fundOutcome = false
                    }
                } else {
                    alert('Sorry, an external error occured.')
                }
            },
            resetFundRes() {

                this.fundTxnId = ''
                this.fundOutcome = null,
                    this.fundMemo = '',
                    this.fundError.code = null
                this.fundError.message = null
            },
            // Clicks Response
            handleRes(res) {
                if (res.transaction_id) {
                    // Transaction happened
                    this.txnId = res.transaction_id
                    const memo = res.processed.action_traces[0].inline_traces
                    console.log(memo);
                    if (memo.length > 0) {
                        this.outcome = true
                        this.memo = memo[0].act.data.memo
                    } else {
                        this.outcome = false
                    }
                }
            },
            resetRes() {
                this.txnId = ''
                this.outcome = null,
                    this.memo = '',
                    this.error.code = null
                this.error.message = null
            },
            // Modals
            showModal(modal) {
                this[modal] = true
            },
            hideModal(modal) {
                this[modal] = false
            },
            // Inner Modal Slides
            onSlideStart(slide) {
                this.sliding = true
            },
            onSlideEnd(slide) {
                this.sliding = false
            },
            buyClicksWithDeal (deal) {
                this.totalPurchaseAmount = deal.price.toFixed(4)
                this.transferFunds()
            }
        },
        watch: {
            // Watch computed 'account' property set up above
            // If changed call the instance setter
            ['account']() {
                this.setEosInstance();
                console.log(this.account)
                this.fetchPlayerData();
            },
            pixelSelected: {
                handler (oldV, newV) {
                    if (newV.column !== null && newV.row !== null) {
                        this.transferClicks();
                    }
                },
                deep: true
            },
            outcome() {
                if(this.outcome === true && this.error.code === null){
                    this.showModal("showVictoryModal");                    
                } else if (this.outcome === false && this.error.code === null){
                    this.showModal("showLoserModal");
                } else {}
            }

        },
        created() {
            this.fetchPlayerData();
            this.interval = setInterval(() => this.fetchPlayerData(), 2000);
        }
    }
</script>
<style lang="scss">
    body {
        padding: 0;
        margin: 0;
        /* Background Image - Cover full screen */
        background: url("../assets/stars-background.svg") no-repeat center center, url("../assets/space-background.svg") no-repeat center center;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }

    .empty-state-msg{
        position: fixed;
        top: 40%;
        left: 0;
        right: 0;
        margin: 0 auto;
        color: #fff;
        font-size: 20px;
        max-width: 70%;
        font-weight: bold
    }
   
    /* Custom styles */
    #first-slide,
    #second-slide {
        height: 360px;
    }

    /* Modal How to Carousel */
    .carousel-indicators .active {
        background-color: #f64f59 !important;
    }

    .carousel-indicators > li {
        background-color: grey !important;
    }

    .carousel-caption {
        padding-bottom: 0 !important;
        bottom: 10px !important;
        padding-top: 0 !important;
    }

    /* Custom Buttons */
    .yellow-button, .red-button, .blue-button, .green-button, .white-button{
        border-radius: 3rem !important;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2) !important;
        color: white !important;
        -moz-box-shadow: inset 0 0 3px #bdc3c7;
        -webkit-box-shadow: inset 0 0 3px #bdc3c7;
        box-shadow: inset 0 0 3px #bdc3c7;
        font-weight: 700 !important;
    }

    .yellow-button {
        border: 3px #FEE045 solid !important;
        background: #8E2DE2 !important;
        color: #FEE045 !important;
        z-index: 7;
    }

    .yellow-button:hover {
        border: 3px #feb035 solid !important;
        color: #feb035 !important;
    }

    .red-button {
        background: #F64F59 !important;
        border: 3px #f67078 solid !important;
        z-index: 7;
    }

    .red-button:hover {
        border: #f63058 !important;
    }

    .white-button {
        background: white !important;
        border: 3px #FEE045 solid !important;
        z-index: 7;
    }

    .white-button:hover {
        background: #FEC925 !important;
    }

    .green-button-static {
        background: #1D976C !important;
        border: 3px #93F9B9 solid !important;
    }

    .green-button-static:hover {
        background: #009734 !important;
    }

    @-webkit-keyframes bluePulse {
        from { background-color: #1565C0; -webkit-box-shadow: 0 0 9px #333; }
        50% { background-color: #4286F4; -webkit-box-shadow: 0 0 18px #1565C0; }
        to { background-color: #1565C0 ; -webkit-box-shadow: 0 0 9px #333; }
    }

    @-webkit-keyframes greenPulse {
        from { background-color: #1D976C; -webkit-box-shadow: 0 0 9px #333; }
        50% { background-color: #93F9B9; -webkit-box-shadow: 0 0 18px #1D976C; }
        to { background-color: #1D976C ; -webkit-box-shadow: 0 0 9px #333; }
    }

    .blue-button {
        -webkit-animation-name: bluePulse;
        -webkit-animation-duration: 2s;
        -webkit-animation-iteration-count: infinite;
        border: 3px #1565C0 solid !important;
    }

    .green-button {
        -webkit-animation-name: greenPulse;
        -webkit-animation-duration: 2s;
        -webkit-animation-iteration-count: infinite;
        border: 3px #93F9B9 solid !important;
    }

    /* Navbar center element - Remaining credits */
    .center-el {
        display: inline-block;
        vertical-align: middle;  /* vertical alignment of the inline element */
        /* reset the font property */
    }

    .line-height {
        line-height: 1;
    }

    .navbar {
        height: 65px;
    }

    /* Modal styles override */
    .modal-dialog .modal-content .modal-header {
        position: relative;
    }
    .modal-dialog .modal-content .modal-header h5 {
        width: 100%;
        text-align: center;
        margin-bottom: 0;
    }

    .modal-dialog .modal-content .modal-header button {
        position: absolute;
        right: 20px;
        top: 20px;
    }

    /* Transaction Links overflow */
    .transaction-link {
        width: 250px;
        overflow: hidden;
        display: inline-block;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    /* Custom Location div - (Selected location + Submit button) */
    .location-element {
        border-radius: 15px;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
        -moz-box-shadow: inset 0 0 3px #bdc3c7;
        -webkit-box-shadow: inset 0 0 3px #bdc3c7;
        box-shadow: inset 0 0 3px #bdc3c7;
        font-weight: 700;
        color: white;
        max-width: 300px;
        margin: auto;
        padding-top: 20px;
        padding-bottom: 10px;
    }

    /* Custom Styled Alerts */
    .treasure-alert {
        background-color: transparent !important;
        border: none !important;
        /* Background Image - Cover full screen */
        background: url("../assets/bg-letter.svg") no-repeat center;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        min-width: 350px;
    }

    .alerts-div {
        position: fixed;
        top: 25%;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
    }

    hr {
        width: 200px;
    }

    .alert-dismissible .close {
        top: 20px !important;
        right: 20px !important;
        color: red !important;
    }

    .full-page-home {
        min-height: 100vh;
        width: 100%;

        .container {
            margin: 50px auto;
            text-align: center;
            display: inline-block;
        }

        .contract {
            max-width: 600px;
            margin: 0 auto 20px;
        }

        .messages {
            width: 100%;

            .message {
                width: 100%;
                display: flex;
                border-bottom: 1px solid rgba(0,0,0,0.1);
                padding: 10px 20px;
                text-align: left;

                .col {
                    flex: 1;
                }
            }
        }

        h1 {
            font-size: 36px;
            margin: 20px 0;
        }

        .logged-in-with {
            left: 0;
            right: 0;
            text-align: center;
            font-weight: bold;
            font-size: 13px;
        }

        input {
            height: 50px;
            width: 100px;
            padding: 0 20px;
            border: 0;
            border-radius: 5px;
            outline: 0;
            vertical-align: middle;
            box-shadow: inset 0 0 1px rgba(0,0,0,0.7);
        }

    }

    /* Custom Style Payment Option */
    .payment-option {
        cursor: pointer;
        border: 3px solid #cccccc;
        overflow: hidden;

        .clicks {
            font-weight: 600;
        }

        .price {
            color: #777777;
            font-size: 1.5em;
        }

        .discount {
            left: -80px;
            top: 20px;
            transform: rotate(-45deg);
            background-color: #F64F59;
            color: #ffffff;
            font-size: 1.2rem;
            font-weight: 600;
            width: 250px;
        }
    }
    .payment-option:hover {
        background: aliceblue;
    }
</style>
