// src/stores/maintenanceStore.ts

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getMaintenanceLogs, createMaintenanceLog } from '@/services/contentfulService'
import type { MaintenanceLog } from '@/types'

export const useMaintenanceStore = defineStore('maintenance', () => {
  const logs = ref<MaintenanceLog[]>([])
  const isLoading = ref(false)

  async function fetchLogs() {
    isLoading.value = true
    try {
      logs.value = await getMaintenanceLogs()
    } catch (error) {
      console.error(error)
      logs.value = []
    } finally {
      isLoading.value = false
    }
  }

  async function addLog(newLog: Omit<MaintenanceLog, 'id'>) {
    isLoading.value = true
    try {
      await createMaintenanceLog(newLog)
      // Após criar, busca novamente a lista para atualizar a interface
      await fetchLogs()
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }
  
  const allLogs = computed(() => logs.value)

  return { logs, isLoading, fetchLogs, addLog, allLogs }
})