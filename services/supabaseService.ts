import { SoilData } from '../types';

const API_URL = 'https://oracleapex.com/ords/g3_data/groups/data/10?limit=1000000000000';

// Interface for the raw data from the new API to ensure type safety during transformation.
interface ApiItem {
  group_id: number;
  moisture: number;
  temperature: number;
  ec: number;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: string; // Comes as a string from the API
  valid: string;
  corrected_created_at: string; // Custom date format: "DD-MON-YYYY HH:MM:SS"
}

// A mapping of month abbreviations to their JavaScript Date object index (0-based).
const monthMap: { [key: string]: number } = {
    JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5,
    JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11
};

/**
 * Parses the custom date format from the Oracle APEX API into a standard ISO string.
 * This is necessary because new Date() cannot reliably parse "DD-MON-YYYY" formats.
 * @param dateString - A date string e.g., "03-NOV-2025 11:23:47"
 * @returns An ISO 8601 date string, or the current date as a fallback on error.
 */
const parseOracleDate = (dateString: string): string => {
    try {
        const parts = dateString.split(/[\s-:]+/);
        if (parts.length < 6) throw new Error('Invalid date format received from API.');
        
        const day = parseInt(parts[0], 10);
        const month = monthMap[parts[1].toUpperCase()];
        const year = parseInt(parts[2], 10);
        const hour = parseInt(parts[3], 10);
        const minute = parseInt(parts[4], 10);
        const second = parseInt(parts[5], 10);
        
        if (isNaN(day) || month === undefined || isNaN(year) || isNaN(hour) || isNaN(minute) || isNaN(second)) {
             throw new Error('Invalid date components after parsing.');
        }

        // We use Date.UTC to avoid timezone-related issues and ensure consistency.
        const date = new Date(Date.UTC(year, month, day, hour, minute, second));
        return date.toISOString();
    } catch (e) {
        console.error(`Failed to parse date string: "${dateString}"`, e);
        return new Date().toISOString(); // Fallback to current time to prevent crashes
    }
};

export const fetchSoilData = async (limit?: number): Promise<SoilData[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
    } catch (e) {
        // Response might not be JSON, stick with the status code error.
    }
    throw new Error(errorMessage);
  }

  const responseData: { items: ApiItem[] } = await response.json();
  const items = responseData.items;

  if (!items || items.length === 0) {
    throw new Error('No data received from the sensor yet.');
  }

  const dataToMap = limit ? items.slice(0, limit) : items;

  // The new API provides data in a nested 'items' array. We map this data to our internal 'SoilData' structure.
  // The API data appears to be sorted descending by date.
  const mappedData = dataToMap.map((item, index): SoilData => ({
    id: index, // The new API doesn't provide a unique ID, so we use the array index for React keys.
    inserted_at: parseOracleDate(item.corrected_created_at),
    moisture: item.moisture,
    temperature: item.temperature,
    ec: item.ec,
    ph: item.ph,
    nitrogen: item.nitrogen,
    phosphorus: item.phosphorus,
    potassium: parseInt(item.potassium, 10) || 0, // 'potassium' is a string, so we parse it to a number.
  }));

  return mappedData;
};