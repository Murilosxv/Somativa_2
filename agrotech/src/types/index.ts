// src/types/index.ts

export interface SensorData {
  temperatura?: number
  umidade?: number
  ph?: number
}

export interface MaintenanceLog {
  id: string
  tipoEquipamento: string
  dataManutencao: string
  descricao: string
}