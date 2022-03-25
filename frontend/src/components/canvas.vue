<template>
  <div class="l-canvas-container d-flex flex-wrap">
    <n-pixel
      v-for="(p, idx) in pixelData"
      :key="`pixel-${idx}`"
      :coordinates="getCoordinatesFromIndex(idx)"
      :isDisabled="p.status === 0"
      :class="{'disabled': p.status === 0}"
      @pixel-click="onPixelClick"
    />
  </div>
</template>

<script>
import NPixel from "@/components/pixel";
export default {
  components: {
    NPixel
  },
  props: {
    pixelData: { type: Array, required: true }
  },
  methods: {
    onPixelClick(obj) {
      console.log(
        `Pixel with coordinates [${obj.coordinates.row}, ${obj.coordinates.column}] was just clicked`
      );
      this.$store.commit("selectPixel", obj.coordinates);
    },
    getCoordinatesFromIndex(i) {
      return { row: Math.floor(i / 20), column: i - 20 * Math.floor(i / 20) };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.l-canvas-container {
  width: $canvas-width;
  max-width: 110vw;
  transform: rotate(-90deg);
}

.l-pixel {
  height: 0;
  padding-bottom: 5%;
  width: 5%;
}

@media (min-width: 1000px) {
  .l-canvas-container {
    transform: rotate(0deg);
    width: $canvas-large-width;
    margin-left: 2%;
  }
}

@media (max-width: 900px) {
  .l-pixel{
    width: 5.1%
  }
}
</style>
