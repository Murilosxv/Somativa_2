// src/services/qubitroService.ts

import axios from 'axios';
import { useSensorStore } from '@/stores/sensorStore';

const PROJECT_ID = '61423240-e511-4e83-a8b5-70fd8458503a';
const DEVICE_ID = '92a9c650-9b11-49b5-9fdc-4c3a540bc0c9';
const DEVICE_TOKEN = 'QB_174795623003688511838ae5bd40bfba8aca23649b5e4086e6bba56f4389165ba510a31ac25d2bb567a46df3babe413284f';

const api = axios.create({ 
  baseURL: 'https://api.qubitro.com/v2',
  headers: {
    Authorization: `Bearer ${DEVICE_TOKEN}`,
    Accept: 'application/json',
  },
});

// Interface para os dados brutos da API (pode ajustar se quiser)
interface RawApiData {
  [key: string]: any;
  time: string;
}

// Interface para o formato de dados esperado
interface PlantData {
  plant_1_HUM: number;
  plant_1_TEMP: number;
  plant_2_HUM: number;
  plant_2_TEMP: number;
  plant_3_HUM: number;
  plant_3_TEMP: number;
  plant_4_HUM: number;
  plant_4_TEMP: number;
  tanque_PH: number;
  tanque_TEMP: number;
  time: string;
}

const normalizePlantData = (rawData: RawApiData): PlantData => {
  const defaultData: PlantData = {
    plant_1_HUM: 0,
    plant_1_TEMP: 0,
    plant_2_HUM: 0,
    plant_2_TEMP: 0,
    plant_3_HUM: 0,
    plant_3_TEMP: 0,
    plant_4_HUM: 0,
    plant_4_TEMP: 0,
    tanque_PH: 0,
    tanque_TEMP: 0,
    time: rawData.time,
  };

  if ('plant_1_HUM' in rawData) {
    return {
      ...defaultData,
      plant_1_HUM: rawData.plant_1_HUM || 0,
      plant_1_TEMP: rawData.plant_1_TEMP || 0,
      plant_2_HUM: rawData.plant_2_HUM || 0,
      plant_2_TEMP: rawData.plant_2_TEMP || 0,
      plant_3_HUM: rawData.plant_3_HUM || 0,
      plant_3_TEMP: rawData.plant_3_TEMP || 0,
      plant_4_HUM: rawData.plant_4_HUM || 0,
      plant_4_TEMP: rawData.plant_4_TEMP || 0,
      tanque_PH: rawData.tanque_PH || 0,
      tanque_TEMP: rawData.tanque_TEMP || 0,
    };
  }

  return defaultData;
};

// src/services/qubitroService.ts

export class QubitroService {
  async fetchLatestData() {
    // Apenas neste ponto temos um Pinia ativo
    const sensorStore = useSensorStore();

    try {
      const params = {
        page: 1,
        limit: 5,
        range: 'all',
      };

      const response = await api.get(
        `/projects/${PROJECT_ID}/devices/${DEVICE_ID}/data`,
        { params },
      );

      if (response.data &&
          response.data.data &&
          response.data.data.length > 0) {

        // Pegue o array inteiro que ele mandou
        const rawList = response.data.data;

        // Agora é seguro usar o store
        sensorStore.updateSensorList(rawList);

        console.log('✅ Dados atualizados via Axios!', rawList);
      } else {
        console.warn('⚡ Nenhum dado retornado da API');
      }
    } catch (error) {
      console.error('❌ Erro ao buscar dados do Qubitro via Axios!', error);
    }
  }
}

export const qubitroService = new QubitroService();

