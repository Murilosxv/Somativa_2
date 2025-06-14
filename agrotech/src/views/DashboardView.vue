<script setup lang="ts">
import DashboardCard from '../components/DashboardCard.vue';
import { useSensorStore } from '../stores/sensorStore';
import { computed } from 'vue';

const sensorStore = useSensorStore();

const firstNormalizedSensor = computed(() => sensorStore.getFirstNormalizedSensor());

</script>

<template>
  <div v-if="firstNormalizedSensor">
    <h2>Dados do Tanque</h2>
    <DashboardCard
      title="Tanque de Irrigação"
      :sensorList="[firstNormalizedSensor.tanque]"
      type="tanque"
    />

    <h2>Dados dos Sensores de Plantio</h2>
    <div v-for="sensor in firstNormalizedSensor.plantio" :key="sensor.id">
      <DashboardCard
        :title="`Sensor de Plantio ${sensor.id}`"
        :sensorList="[sensor]"
        type="plantio"
      />
    </div>
  </div>
  <div v-else>
    Carregando...
  </div>
</template>
