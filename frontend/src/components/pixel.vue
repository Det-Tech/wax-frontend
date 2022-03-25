<template>
  <div
    class="l-pixel position-relative"
    :class="{'border-selected': isSelected, 'no-select': isSubmitting}"
    @click="onPixelClick"
  >
    <!-- Display Skullhead when location is guessed -->
    <img v-if="isDisabled" :src="skull" class="position-absolute" />

    <!-- Display spinner when submitting pixel -->
    <i class="fa fa-spinner fa-spin position-absolute" v-if="isSelected && isSubmitting" />
  </div>
</template>

<script>
import skull from "@/assets/human-skull.svg";
export default {
  props: {
    coordinates: {
      type: Object,
      required: true
    },
    isDisabled: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      skull
    };
  },
  computed: {
    storePixel() {
      return this.$store.getters.selectedPixel;
    },
    isSelected() {
      if (this.storePixel) {
        return (
          this.coordinates.row === this.storePixel.row &&
          this.coordinates.column === this.storePixel.column
        );
      }
    },
    isSubmitting() {
      return this.$store.getters.isSubmitting;
    }
  },
  methods: {
    onPixelClick() {
      // click event handler
      if (!this.isSubmitting) {
        this.$emit("pixel-click", { coordinates: this.coordinates });
      }
    }
  }
};
</script>

<style scoped>
.l-pixel {
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  border: 2px solid rgba(127, 43, 209, 0.01);
  background: rgba(227, 227, 227, 0.15);
  border-radius: 5pt;
  margin: 0 0 -1px -1px;
  -moz-box-shadow: inset 0 3px 0 rgba(0, 0, 0, 0.06);
  -webkit-box-shadow: 0 3px 0 rgba(0, 0, 0, 0.06);
  box-shadow: inset 0 3px 0 rgba(0, 0, 0, 0.06);
}

.l-pixel:hover {
  background: rgba(227, 227, 227, 0);
}

.l-pixel.disabled {
  cursor: not-allowed;
  opacity: 1;
  pointer-events: none;
  background-color: black;
}

@media (min-width: 1000px) {
  .l-pixel.disabled {
    transform: rotate(-90deg);
  }
}

.l-pixel.no-select {
  pointer-events: none;
  cursor: not-allowed;
}

.border-selected {
  position: relative;
}

.border-selected:after {
  border: 2px solid #000;
  box-sizing: border-box;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

img {
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  transform: rotate(90deg);
}

i {
  top: calc(50% - 10px);
  left: calc(50% - 10px);
}
</style>
