<template>
  <div class='ma-3'>
    <v-layout row wrap>
        <v-flex class='shrink'>
          <v-card class='ma-2 pa-3 elevation-4'>
            <v-responsive>
              <RadialGauge :value='sensorA0' :maxValue=100 :width=300 :height=300 units='°C' :defaultHighlights=true />
            </v-responsive>
            <div class='text-xs-center pa-2'>
              <span class='headline'>Temperatura</span>
            </div>
          </v-card>
        </v-flex>

        <v-flex class='shrink'>
          <v-card class='ma-2 pa-3 elevation-4'>
            <v-responsive>
              <RadialGauge :value='sensorA1' :maxValue=10 :width=300 :height=300 units='Amp' :defaultHighlights=true />
            </v-responsive>
            <div class='text-xs-center pa-2'>
              <span class='headline'>Corriente</span>
            </div>
          </v-card>
        </v-flex>

          <v-card class='ma-2 pa-3 elevation-4'>
            <v-layout class='pa-1' column wrap align-center>
              <v-switch v-model='relay1' color='red' label='Relay 1' @change='onRelayChanged(1, relay1)'/>
              <v-switch v-model='relay2' color='green' label='Relay 2' @change='onRelayChanged(2, relay2)'/>
              <v-switch v-model='relay3' color='blue' label='Relay 3' @change='onRelayChanged(3, relay3)'/>
              <v-switch v-model='relay4' color='pink' label='Relay 4' @change='onRelayChanged(4, relay4)'/>
            </v-layout>
            <div class='text-xs-center pa-2' align-bottom>
              <span class='headline'>Interruptores</span>
            </div>
          </v-card>
    </v-layout>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import RadialGauge from '@/components/RadialGauge.vue';

import events from 'events';
import io from 'socket.io-client';

const em = new events.EventEmitter();

@Component({
  components: {
    RadialGauge,
  },
  data() {
    return {
      sensorA0: 0,
      sensorA1: 0,
      relay1: false,
      relay2: false,
      relay3: false,
      relay4: false,
    };
  },
  created() {
    const socket = io('http://localhost:8080', {
      reconnectionDelay: 10000,
      reconnectionAttempts: 3,
    });

    socket.on('connect', () => {
      console.log('socket connected!');
      socket.on('SensorA0', (value: number) => {
        this.$data.sensorA0 = value;
      });

      socket.on('SensorA1', (value: number) => {
        this.$data.sensorA1 = value;
      });

      for (let i = 1; i <= 4; i++) {
        em.on('Relay' + i, (value: number) => {
          socket.emit('Relay' + i, value);
        });
      }

      em.on('disconnectSocket', () => {
        socket.removeAllListeners();
        socket.disconnect();
      });
    });

    socket.on('disconnect', () => {
      console.log('socket disconnected!');
      socket.removeAllListeners();
      em.removeAllListeners();
    });
  },
  methods: {
    onRelayChanged(position: number, value: boolean) {
      em.emit('Relay' + position, !value);
    },
  },
  destroyed() {
    console.log('component destroyed!');
    em.emit('disconnectSocket');
    em.removeAllListeners();
  },
})
export default class Dashboard extends Vue {}
</script>
