<template>
    <!-- Buy Credits Modal -->
        <b-modal modal-class="slide-up-modal purple-modal" centered no-fade ref="buyModal" @hidden="onHide">
            <h3>Buy Fuel </h3>
            <b-button class="close-modal-btn font-weight-bold" @click="hide">
                <icon name="times"/>
            </b-button>
            <div class="buy-items d-flex">
                <div
                  v-for="(d, index) in pixelDeals"
                  :key="`payment-deal-${index}`"
                  @click="() => changeChosenDeal(d)"
                  class="buy-item"
                  :class='{"active": chosenDeal === d.clickCount}'
                >
                    <div class="click-count d-flex"><h4>{{ d.clickCount }}L</h4></div>
                    <p>{{ d.price }} EOS</p>
                    <p v-if="d.discount > 0" class="buy-discount">{{ d.discount }}% OFF</p>
                </div>
            </div>
            <button class="buy-cta-btn" v-if="!sendingFunds && fundOutcome !== true" @click="buyClicksWithDeal(chosenDealObject)">
                BUY {{ chosenDeal }}L NOW!
            </button>
            <button class="buy-cta-btn" v-if="sendingFunds">
                Processing request ...
            </button>
            <button class="buy-cta-btn" v-if="fundOutcome === true && fundError.code === null">
                Transaction Successful!
            </button>
            <div class="buy-info-text" v-if="fundOutcome === true && fundError.code === null">
                <a v-bind:href="'https://bloks.io/transaction/' + fundTxnId">https://bloks.io/transaction/{{ fundTxnId | trimTransaction }}</a>
            </div>
            <div class="buy-info-text" v-if="fundOutcome === null && fundError.code">
                <p>{{ fundError.message }}</p>
            </div>
        </b-modal>
</template>

<script>
export default {
    props : {
        scatter: Object,
        account: Object,
        login: Function,
        pixelDeals: Array,
        show: Boolean,
        onHide: Function,
        buyClicksWithDeal: Function,
        sendingFunds: Boolean,
        fundOutcome: Boolean,
        fundError: Object,
        fundTxnId: String,
        fundMemo: String
    },
    data() {
        return {
            chosenDeal: this.pixelDeals[1].clickCount,
            chosenDealObject: this.pixelDeals[1]
        }
    },
    methods: {
        changeChosenDeal(val) {
            this.chosenDeal = val.clickCount;
            this.chosenDealObject = val
        },
        hide() {
            this.$refs.buyModal.hide()
        }
    },
    watch: {
        show() {
            if(this.show){
              this.$refs.buyModal.show()
            }
        }
    },
    filters: {
        trimTransaction(val) {
            return `${val.slice(0, 12)}...`
        }
    }
}
</script>

<style>
.purple-modal{
    color: #fff;
}

.purple-modal .modal-content {
    background-color: rgb(127,43,209);
    border: none;
}

.purple-modal .modal-header,
.purple-modal .modal-footer{
    display: none;

}

@keyframes slide-up {
    0% {
        top: 1000px;
    }
    100% {
        top: 0;
    }
}

.slide-up-modal .modal-content{
    position: relative;
    animation: slide-up .3s linear;
    padding: 20pt 20pt 40pt;
    border-radius: 10px 10px 0 0;
    top: 0;
}

.slide-up-modal .modal-body{
    padding: 0;
}

.slide-up-modal .modal-dialog-centered{
    align-items: flex-end;
    min-height: 100%;
}

.slide-up-modal .modal-dialog{
    margin: 0 auto;
}

.slide-up-modal h3{
    font-size: 22pt;
    text-align: center;
    margin: 0 0 30pt;
    font-weight: bold;
}

.slide-up-modal button.close-modal-btn{
    position: absolute;
    top: 3px;
    right: 10px;
    background: rgb(255,69,143);
    padding: 0 9px 4px;
    border: none;
    cursor: pointer;
    border-radius: 50%;
}

.buy-items{
    justify-content: space-between;
    max-width: 500px;
    margin: 0 auto 30pt;
}

.buy-items div.buy-item{
    width: 100pt;
    text-align: center;
    cursor: pointer;
}

.buy-items div.buy-item div.click-count{
    padding: 20pt 10pt;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: #fff;
    border: 1px solid #ffffff;
    background: transparent;
    max-width: 105px;
    margin: auto;
}

.buy-items div.buy-item.active div.click-count{
    color: rgb(127,43,209);
    background: #ffffff;
}

.buy-items div.buy-item div.click-count h4{
    font-size: 22pt;
    font-weight: bold;
    margin: 0;
}

.buy-items div.buy-item p {
    font-size: 16pt;
    margin: 0;
    width: 100%;
    font-weight: bold;
}

.buy-items div.buy-item p.buy-discount {
    font-size: 14pt;
    color: #000;
}

button.buy-cta-btn, 
.purple-modal button.blue-cta-btn {
    display: block;
    color: rgb(120, 255, 214);
    border: 2pt solid rgb(120, 255, 214);
    min-width: 250px;
    margin: 0 auto;
    border-radius: 50pt;
    font-weight: bold;
    padding: 15px;
    font-size: 20px;
    background: transparent
}

.buy-info-text{
    margin: 20pt auto 0;
}

.buy-info-text p,
.buy-info-text a{
    font-size: 10pt;
    line-height: 23pt;
    color: rgb(112,215,255);
}



@media screen and (max-width: 500px){
    .slide-up-modal h3,
    .buy-items div.buy-item div.click-count h4{
        font-size: 18pt;
    }
    .buy-items div.buy-item div.click-count{
        max-width: 90px;
    }
    .buy-items div.buy-item p{
        font-size: 12pt;
    }
    .buy-items div.buy-item p.buy-discount{
        font-size: 10pt;
    }

    button.buy-cta-btn{
        padding: 7px;
        font-size: 18px;
    }

    .slide-up-modal .modal-content{
        padding: 20pt 5pt 40pt
    }
}


</style>