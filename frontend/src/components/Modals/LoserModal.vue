<template>
    <!-- Loser Modal -->
        <b-modal modal-class="slide-up-modal purple-modal status-modal" centered no-fade ref="loserModal" @hidden="onHide">
            <h3>Shoot! Nothing here..</h3>
            <b-button class="close-modal-btn font-weight-bold" @click="hide">
                <icon name="times"/>
            </b-button>
            <div class="d-flex round-status-img">
                <img :src="require('../../assets/loser.svg')" />
            </div>
            <p>Don't give up!</p>
            <button class="blue-cta-btn" @click="hide">
                Play Again
            </button>
        </b-modal>
</template>

<script>
export default {
    props: {
        show: Boolean,
        onHide: Function
    },
    methods: {
        hide() {
            this.$refs.loserModal.hide()
        }
    },
    watch: {
        show() {
            if(this.show){
              this.$refs.loserModal.show()
            }
        }
    }
}
</script>

<style scoped>
    button.blue-cta-btn{
        margin-top: 20px;
    }
</style>