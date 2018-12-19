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
    maxTicks: Array,
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
    this.options.majorTicks = this.maxTicks ? this.maxTicks : ['0', '20', '40', '60', '80', '100'];
    this.options.minorTicks = this.minorTicks ? this.minorTicks : 10;
    if (this.highlights == null && this.defaultHighlights === true) {
      const divisions = this.options.maxValue / 5;
      this.options.highlights = [
        { from: 0, to: divisions, color: 'rgba(0,255,0,.15)' },
        { from: divisions, to: divisions * 2, color: 'rgba(255,255,0,.15)' },
        { from: divisions * 2, to: divisions * 3, color: 'rgba(255,30,0,.25)' },
        { from: divisions * 3, to: divisions * 4, color: 'rgba(255,0,225,.25)' },
        { from: divisions * 4, to: divisions * 5, color: 'rgba(0,0,255,.25)' },
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