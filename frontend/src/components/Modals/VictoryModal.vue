<template>
    <!-- Victory Modal -->
        <b-modal modal-class="slide-up-modal purple-modal status-modal" centered no-fade ref="victoryModal" @hidden="onHide">
            <h3>Victory!</h3>
            <b-button class="close-modal-btn font-weight-bold" @click="hide">
                <icon name="times"/>
            </b-button>
            <div class="d-flex round-status-img">
                <img :src="require('../../assets/winner.svg')" />
            </div>
            <p>{{ message }}</p>
            <a :href="transactionURL">{{transactionURL | trimTransaction }}</a>
        </b-modal>
</template>

<script>
export default {
    props: {
        show: Boolean,
        onHide: Function,
        message: String,
        transactionURL: String
    },
    methods: {
        hide() {
            this.$refs.victoryModal.hide()
        }
    },
    watch: {
        show() {
            if(this.show){
              this.$refs.victoryModal.show()
            }
        }
    },
    filters: {
        trimTransaction(val) {
            return `${val.slice(0, 42)}...`;
        }
    }
}
</script>

<style>
    .status-modal div.round-status-img{
        justify-content: center;
    }
    .status-modal div.round-status-img img{
        border-radius: 50%;
        width: 140px;
        height: 140px;
    }
    .status-modal p{
        font-size: 16pt;
        width: 100%;
        margin-top: 25px;
        font-weight: bold;
        text-align: center;
    }
    .status-modal a{
        font-size: 10pt;
        color: rgb(112,215,255);
        text-decoration: underline;
    }
</style>