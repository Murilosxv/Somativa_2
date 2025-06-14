import { defineStore } from 'pinia';

export const useSensorStore = defineStore('sensor', {
  state: () => ({
    sensors: [] as any[], // lista bruta da API
    normalizedSensors: [] as any[], // lista tratada que vamos usar na dashboard
  }),

  actions: {
    updateSensorList(rawList: any[]) {
      this.sensors = rawList;

      // Variáveis para armazenar os dados mais recentes encontrados
      let tanqueData: any = { ph: null, temperatura: null, umidade: null };
      const plantioData: any[] = [
        { id: 1, temperatura: null, umidade: null },
        { id: 2, temperatura: null, umidade: null },
        { id: 3, temperatura: null, umidade: null },
        { id: 4, temperatura: null, umidade: null },
      ];

      // Varre todos os registros e monta os dados corretos
      rawList.forEach(item => {
        // Dados do tanque
        if ('sensor_tanque_PH' in item || 'sensor_tanque_temp' in item) {
          tanqueData.ph = item.sensor_tanque_PH ?? tanqueData.ph;
          tanqueData.temperatura = item.sensor_tanque_temp ?? tanqueData.temperatura;
        }

        // Sensor 1
        if ('sensor_plantacao_1_hum' in item || 'sensor_plantacao_1_temp' in item) {
          plantioData[0].umidade = item.sensor_plantacao_1_hum ?? plantioData[0].umidade;
          plantioData[0].temperatura = item.sensor_plantacao_1_temp ?? plantioData[0].temperatura;
        }

        // Sensor 2
        if ('sensor_plantacao_2_hum' in item || 'sensor_plantacao_2_temp' in item) {
          plantioData[1].umidade = item.sensor_plantacao_2_hum ?? plantioData[1].umidade;
          plantioData[1].temperatura = item.sensor_plantacao_2_temp ?? plantioData[1].temperatura;
        }

        // Sensor 3
        if ('sensor_plantacao_3_hum' in item || 'sensor_plantacao_3_temp' in item) {
          plantioData[2].umidade = item.sensor_plantacao_3_hum ?? plantioData[2].umidade;
          plantioData[2].temperatura = item.sensor_plantacao_3_temp ?? plantioData[2].temperatura;
        }

        // Sensor 4
        if ('sensor_plantacao_4_hum' in item || 'sensor_plantacao_4_temp' in item) {
          plantioData[3].umidade = item.sensor_plantacao_4_hum ?? plantioData[3].umidade;
          plantioData[3].temperatura = item.sensor_plantacao_4_temp ?? plantioData[3].temperatura;
        }
      });

      // Salva no estado o dado consolidado (apenas um objeto normalizado)
      this.normalizedSensors = [{
        tanque: tanqueData,
        plantio: plantioData,
        time: rawList[0]?.time || null, // usa o time do item mais recente
      }];
    },

    getFirstNormalizedSensor() {
      return this.normalizedSensors[0] || null;
    },
  },
});
