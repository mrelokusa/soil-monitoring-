import { SoilData } from '../types';

const SUPABASE_URL = 'https://jfzcooxiwuvxogfbrlaa.supabase.co/rest/v1/soil_data';
// This is an anon key, safe to be exposed in frontend code as per Supabase docs for public data.
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmemNvb3hpd3V2eG9nZmJybGFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyOTM3OTcsImV4cCI6MjA3MDg2OTc5N30.m4v98jHX37D5ZdkJbCSAYP4P5jeMy8LN4HSbDArTeHM';

export const fetchSoilData = async (limit: number = 20): Promise<SoilData[]> => {
  const response = await fetch(`${SUPABASE_URL}?select=*&order=inserted_at.desc&limit=${limit}`, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  const data: SoilData[] = await response.json();

  if (data.length === 0) {
    throw new Error('No data received from the sensor yet.');
  }

  return data;
};