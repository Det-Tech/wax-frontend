<template>
  <div id="mario" class="d-flex flex-column align-items-center">
    <n-canvas :pixel-data="mapData"/>
  </div>
</template>

<script>
    import NCanvas from "@/components/canvas.vue";
    export default {
        name: "Mario",
        components: { NCanvas },
        computed: {
            mapData () {
                return this.$store.getters.map
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import '@/assets/variables.scss';
  #mario {
    height: $canvas-width;
    transform: rotate(0deg);
    margin-top: calc(125vh*0.17);
  }

  @media (min-width: 800px) {
    #mario {
      margin-top: calc(#{$canvas-width}*0.12);
      height: $canvas-medium-width;
    }
  }

  @media (min-width: 1000px) {
    #mario {
      margin-top: calc(#{$canvas-width}*0.01);
      height: $canvas-larger-width;
    }
  }

  @media (max-width: 600px) {
    #mario {
      margin-top: 15vh;
    }
  }
</style>
