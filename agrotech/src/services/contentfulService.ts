// src/services/contentfulService.ts

import { createClient as createDeliveryClient } from 'contentful'
import { createClient as createManagementClient } from 'contentful-management'
import type { MaintenanceLog } from '@/types'

// ❗❗❗ ATENÇÃO: SUBSTITUA PELOS SEUS DADOS DO CONTENTFUL ❗❗❗
const SPACE_ID = '8dplo3xh3zvg' // Cole seu Space ID aqui
const DELIVERY_TOKEN = '8BEzJRmq0ieVcBO4My0OKjTkNIs4OHH4M7n2qNuW_kM' // Cole seu Content Delivery API access token aqui
const MANAGEMENT_TOKEN = 'CFPAT-MtIKWmUDENXnTFq-VTRDhf8wGJYbUiryaUI_Ze-2L_U' // Cole seu Personal Access Token aqui
const CONTENT_TYPE_ID = 'manutencao' // ID do Content Model que você criou
const ENVIRONMENT_ID = 'master'

// Cliente para buscar dados (somente leitura)
const deliveryClient = createDeliveryClient({
  space: SPACE_ID,
  accessToken: DELIVERY_TOKEN
})

// Cliente para criar/editar dados (escrita)
const managementClient = createManagementClient({
  accessToken: MANAGEMENT_TOKEN
})

export async function getMaintenanceLogs(): Promise<MaintenanceLog[]> {
  try {
    const response = await deliveryClient.getEntries({
      content_type: CONTENT_TYPE_ID,
      order: ['-fields.dataManutencao'] // Ordena do mais recente para o mais antigo
    })

    return response.items.map((item: any) => ({
      id: item.sys.id,
      tipoEquipamento: item.fields.tipoEquipamento,
      dataManutencao: item.fields.dataManutencao,
      descricao: item.fields.descricao
    }))
  } catch (error) {
    console.error('❌ Erro ao buscar registros de manutenção:', error)
    return []
  }
}

export async function createMaintenanceLog(logData: Omit<MaintenanceLog, 'id'>) {
  try {
    const space = await managementClient.getSpace(SPACE_ID)
    const environment = await space.getEnvironment(ENVIRONMENT_ID)
    
    const entry = await environment.createEntry(CONTENT_TYPE_ID, {
      fields: {
        tipoEquipamento: { 'en-US': logData.tipoEquipamento },
        dataManutencao: { 'en-US': logData.dataManutencao },
        descricao: { 'en-US': logData.descricao }
      }
    })

    // Publica a entrada para que ela fique visível na Delivery API
    await entry.publish()
    console.log('✅ Registro de manutenção criado e publicado com sucesso!')
    
  } catch (error) {
    console.error('❌ Erro ao criar registro de manutenção:', error)
  }
}