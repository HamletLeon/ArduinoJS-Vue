<template>
  <canvas class="canvas-gauges"></canvas>
</template>

<script>
import { RadialGauge } from 'canvas-gauges';

export default {
  props: {
    value: Number,
    units: String,
    width: Number,
    height: Number,
    maxValue: Number,
    // maxTicks: Array,
    minorTicks: Number,
    highlights: Array,
    defaultHighlights: Boolean,
  },
  data() {
    return {
      chart: null,
      options: {
        type: Object,
        default: () => ({}),
      },
    };
  },
  mounted() {
    this.options.value = this.value ? this.value : 0;
    this.options.units = this.units ? this.units : '';
    this.options.width = this.width ? this.width : 800;
    this.options.height = this.height ? this.height : 600;
    this.options.maxValue = this.maxValue ? this.maxValue : 100;
    this.options.minorTicks = this.minorTicks ? this.minorTicks : 10;

    const divisions = this.options.maxValue / 5;
    const ticks = [0, divisions, divisions * 2, divisions * 3, divisions * 4, divisions * 5];
    if (this.options.maxValue != null) {
      this.options.majorTicks = [ticks[0].toString(), ticks[1].toString(), ticks[2].toString(),
      ticks[3].toString(), ticks[4].toString(), ticks[5].toString()];
    }
    if (this.highlights == null && this.defaultHighlights === true) {
      this.options.highlights = [
        { from: 0, to: ticks[1], color: 'rgba(0,255,0,.15)' },
        { from: ticks[1], to: ticks[2], color: 'rgba(255,255,0,.15)' },
        { from: ticks[2], to: ticks[3], color: 'rgba(255,30,0,.25)' },
        { from: ticks[3], to: ticks[4], color: 'rgba(255,0,225,.25)' },
        { from: ticks[4], to: ticks[5], color: 'rgba(0,0,255,.25)' },
      ];
    } else if (this.highlights != null) {
      this.options.highlights = this.highlights;
    }

    this.options.renderTo = this.$el;
    this.chart = new RadialGauge(this.options).draw();
  },
  beforeDestroy() {
    if (this.chart != null) {
      this.chart.destroy();
    }
  },
  watch: {
    value(val) {
      // has bug!
      if (this.chart != null) {
        this.chart.value = val;
      }
    },
  },
};
</script>