import { GreenhouseData, ApiGreenhouseItem } from '../types';

const API_URL = 'https://oracleapex.com/ords/g3_data/iot/greenhouse/?limit=1000000000000';

export const fetchGreenhouseData = async (limit?: number): Promise<GreenhouseData[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
    } catch (e) {
        // Response might not be JSON, stick with the status code error.
    }
    throw new Error(`Greenhouse API: ${errorMessage}`);
  }

  const responseData: { items: ApiGreenhouseItem[] } = await response.json();
  const items = responseData.items;

  if (!items || items.length === 0) {
    throw new Error('No greenhouse data received from the sensor yet.');
  }
  
  const dataToMap = limit ? items.slice(0, limit) : items;

  // Map the items to our GreenhouseData structure
  const mappedData: GreenhouseData[] = dataToMap.map(item => ({
    id: item.id,
    timestamp: item.timestamp_reading,
    temperature: item.temperature_dht22,
    humidity: item.humidity,
    pressure: item.pressure,
    altitude: item.altitude,
    lightRaw: item.light_raw,
    flameDetected: item.flame_detected === 1,
    airQualityRaw: item.mq135_raw,
    smokeRaw: item.mq2_raw,
    coRaw: item.mq7_raw,
  }));

  return mappedData;
};