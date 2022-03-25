<template>
        <!-- Modal - How to Play / Prizes -->
        <b-modal centered no-fade ref="howToModal" id="howToModal" hide-footer title="Rules & Prizes" @hidden="onHide">
            <b-carousel id="carousel1" indicators img-height="1" img-width="1" background="white" :interval="0" v-model="slide" @sliding-start="onSlideStart" @sliding-end="onSlideEnd">
                <!-- Slides with custom text -->
                <b-carousel-slide img-blank img-alt="Blank image" id="first-slide">
                    <!-- How To Play -->
                    <div class="d-block text-center mb-5">
                        <h3 class="text-dark" id="test-title">How To Play?</h3>
                    </div>
                    <div class="text-left mb-5">
                        <b class="text-dark">1. Buy click</b>
                        <p class="text-secondary">Buy clicks at 0.5 EOS each</p>
                        <b class="text-dark">2. Find a treasure</b>
                        <p class="text-secondary">Select a location and submit it</p>
                        <b class="text-dark">3. Collect prizes</b>
                        <p class="text-secondary">Funds will be sent directly to your EOS account.</p>
                    </div>
                </b-carousel-slide>
                <b-carousel-slide img-blank img-alt="Blank image" id="second-slide">
                    <div class="d-block text-center mb-5">
                        <h3 class="text-dark">Prizes</h3>
                    </div>
                    <div class="text-left mb-5">
                        <b-media class="mb-3">
                            <b-img :src="require('../../assets/large-chest.png')" slot="aside" height="64" alt="Large Chest"></b-img>
                            <b class="text-dark">Large Chest</b>
                            <p class="text-secondary">5000 EOS</p>
                        </b-media>
                        <b-media class="mb-3">
                            <b-img :src="require('../../assets/medium-chest.png')" slot="aside" height="64" alt="Medium Chest" />
                            <b class="text-dark">Medium Chest</b>
                            <p class="text-secondary">1000 EOS</p>
                        </b-media>
                        <b-media class="mb-3">
                            <b-img :src="require('../../assets/small-chest.png')" slot="aside" height="64" alt="Small Chest" />
                            <b class="text-dark">Small Chest</b>
                            <p class="text-secondary">500 EOS</p>
                        </b-media>
                    </div>
                </b-carousel-slide>
            </b-carousel>
        </b-modal>
</template>

<script>
export default {
    props : {
        slide: Number,
        onSlideStart: Function,
        onSlideEnd: Function,
        show: Boolean,
        onHide: Function
    },
    watch: {
        show() {
            if(this.show){
              this.$refs.howToModal.show()
            }
        }
    },
    updated() {
        console.log('updatee')
    },
}
</script>