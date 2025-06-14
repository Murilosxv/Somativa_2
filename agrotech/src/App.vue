<template>
  <Sidebar />
  <main>
    <router-view />
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import { qubitroService } from '../src/services/qubritoService'

// Inicia a conexão MQTT quando o aplicativo é montado
onMounted(() => {
  qubitroService.fetchLatestData()
})
</script>

<style scoped>
/* Estilos já estão no main.css */
</style>
