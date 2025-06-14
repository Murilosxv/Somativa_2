<template>
  <div class="maintenance-view">
    <h1>Registro de Manutenções</h1>

    <div class="content">
      <div class="form-container">
        <h2>Nova Manutenção</h2>
        <form @submit.prevent="handleSubmit">
          <label for="tipoEquipamento">Tipo do Equipamento</label>
          <input id="tipoEquipamento" v-model="form.tipoEquipamento" type="text" required />

          <label for="dataManutencao">Data da Manutenção</label>
          <input id="dataManutencao" v-model="form.dataManutencao" type="date" required />

          <label for="descricao">Descrição do Serviço</label>
          <textarea id="descricao" v-model="form.descricao" rows="4" required></textarea>

          <button type="submit" :disabled="store.isLoading">
            {{ store.isLoading ? 'Salvando...' : 'Salvar Registro' }}
          </button>
        </form>
      </div>

      <div class="list-container">
        <h2>Histórico</h2>
        <div v-if="store.isLoading && store.logs.length === 0" class="loading">
          Carregando histórico...
        </div>
        <div v-else-if="store.allLogs.length === 0" class="empty-state">
          Nenhum registro de manutenção encontrado.
        </div>
        <ul v-else class="log-list">
          <li v-for="log in store.allLogs" :key="log.id" class="log-item">
            <h3>{{ log.tipoEquipamento }}</h3>
            <p class="date">Data: {{ new Date(log.dataManutencao).toLocaleDateString('pt-BR') }}</p>
            <p>{{ log.descricao }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useMaintenanceStore } from '../stores/maintenanceStore'

const store = useMaintenanceStore()

const form = reactive({
  tipoEquipamento: '',
  dataManutencao: new Date().toISOString().split('T')[0], // Data de hoje por padrão
  descricao: ''
})

onMounted(() => {
  store.fetchLogs()
})

const handleSubmit = async () => {
  if (form.tipoEquipamento && form.dataManutencao && form.descricao) {
    await store.addLog({ ...form })
    // Resetar formulário
    form.tipoEquipamento = ''
    form.descricao = ''
    form.dataManutencao = new Date().toISOString().split('T')[0]
  }
}
</script>

<style scoped>
.maintenance-view {
  max-width: 1200px;
}

.content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}

.form-container, .list-container {
  background-color: var(--color-surface);
  padding: 1.5rem;
  border-radius: 8px;
}

h2 {
  margin-top: 0;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-text);
}

.log-list {
  list-style: none;
  padding: 0;
}

.log-item {
  border-bottom: 1px solid var(--color-border);
  padding: 1rem 0;
}

.log-item:last-child {
  border-bottom: none;
}

.log-item h3 {
  color: var(--color-primary);
  margin: 0 0 0.5rem 0;
}

.log-item .date {
  font-size: 0.9rem;
  color: #aaa;
  margin-bottom: 0.5rem;
}

.empty-state, .loading {
  text-align: center;
  padding: 2rem;
  color: #aaa;
}

@media (max-width: 900px) {
  .content {
    grid-template-columns: 1fr;
  }
}
</style>