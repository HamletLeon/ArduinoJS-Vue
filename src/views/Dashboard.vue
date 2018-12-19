<template>
  <div class="home">
    <RadialGauge :value=50 :maxValue=100 :defaultHighlights=true />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RadialGauge from '@/components/RadialGauge.vue'; // @ is an alias to /src

@Component({
  components: {
    RadialGauge,
  },
})
export default class Dashboard extends Vue {}
</script>
