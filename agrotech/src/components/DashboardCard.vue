<script setup lang="ts">
const props = defineProps<{
  title: string;
  sensorList: Array<Record<string, any>>;
  type: 'tanque' | 'plantio';
}>();

const formatLabel = (key: string) => {
  const map: Record<string, string> = {
    ph: 'pH',
    temperatura: 'Temperatura',
    umidade: 'Umidade'
  };
  return map[key] || key;
};

const formatValue = (key: string, value: number | string | null | undefined) => {
  if (value === undefined || value === null) return 'N/D';
  if (key === 'temperatura') return `${value}°C`;
  if (key === 'umidade') return `${value}%`;
  if (key === 'ph') return `pH ${value}`;
  return value;
};
</script>

<template>
  <div class="card">
    <h3>{{ title }}</h3>
    <div v-for="(item, index) in sensorList" :key="index">
      <ul>
        <li v-for="(value, key) in item" :key="key" v-if="key !== 'id' && key !== 'time'">
          <strong>{{ formatLabel(key) }}:</strong> {{ formatValue(key, value) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: var(--color-surface, #333);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: #fff;
}
.card ul {
  list-style-type: none;
  padding: 0;
  margin-bottom: 1rem;
}
.card ul li {
  margin-bottom: 0.5rem;
}
</style>
