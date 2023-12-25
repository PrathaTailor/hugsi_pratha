import { Cities, City, AverageKPI, Municipality } from '../models';
import { toCities } from '../utils/city-utils';
import { FeatureCollection } from '@turf/helpers';
import axios from 'axios';
const http = {
  fetch: typeof window !== 'undefined' && window.fetch.bind(window),
};

export async function fetchJSON<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await http.fetch(input, init);
  return res.json();
}

/**
 * Gets the city metadata from S3 bucket.
 */
export async function fetchCities(
  url: string,
  endpoint?: string
): Promise<Map<string, City[]>> {
  const cityMap = await fetchJSON<Cities>(url);
  const map = toCities(cityMap);
  return map;
}

/**
 * Gets the municipality metadata from S3 bucket.
 */
export async function fetchMunicipalities(
  url: string,
  endpoint?: string
): Promise<any> {
  // const municipalityData = await fetchJSON<any>(url);
  const municipalityData = fetchJSON<any>(`${endpoint}/${url}`);

  // const map = municipalityData;
  return municipalityData;
}
/**
 * Gets the city metadata from S3 bucket.
 */
export async function fetchWorldData(
  url: string,
  endpoint?: string
): Promise<Map<string, City[]>> {
  const classDistributionData = await fetchJSON<any>(url);
  // const map = toCities(cityMap);
  return classDistributionData;
}

export async function fetchWorldKpiMapData(
  url: string,
  endpoint?: string
  ): Promise<Map<string, City[]>> {
    const worldDistributionMapData = await fetchJSON<any>(url);
    // const map = toCities(cityMap);
    return worldDistributionMapData;
  }

export async function fetchCategoryData(
    url: string,
    endpoint?: string
  ): Promise<Map<string, City[]>> {
    const worldDistributionMapData = await fetchJSON<any>(url);
    // const map = toCities(cityMap);
    return worldDistributionMapData;
  }

export async function fetchCategoryKpiMapData(
    url: string,
    endpoint?: string
  ): Promise<Map<string, City[]>> {
    const worldDistributionMapData = await fetchJSON<any>(url);
    // const map = toCities(cityMap);
    return worldDistributionMapData;
  }

/**
 * Gets the towns metadata from S3 bucket.
 */
export async function fetchTowns(url: string, endpoint?: string): Promise<any> {
  const townsData = fetchJSON<any>(`${endpoint}/${url}`);

  // const map = municipalityData;
  return townsData;
}

/**
 * Gets the neighborhoods metadata from S3 bucket.
 */
export async function fetchNeighborhoods(
  url: string,
  endpoint?: string
): Promise<any> {
  const neighborhoodsData = fetchJSON<any>(`${endpoint}/${url}`);
  return neighborhoodsData;
}

/**
 * Load city boundaries
 */
export async function fetchCityBoundaries(
  endpoint: string,
  boundaryFile: string
): Promise<FeatureCollection> {
  console.log('in fetch');
  // await axios.get(`${endpoint}/hugsi_2021_100m_data/hugsi_data_compressed/${boundaryFile}`).then(response => {
  //   // handle success
  //   console.log('response',response);
  //   return response;
  // }).catch(error => {
  //   // handle error
  //   console.log(error);
  // })
  const data = fetchJSON<FeatureCollection>(
    `${endpoint}/hugsi_2021_100m_data/hugsi_data_compressed/${boundaryFile}`
  );
  return data;
  // console.log(data, 'datataaa');
 
}

export async function fetchCityBoundariesOsm(
  endpoint: string,

  boundaryFile: string
): Promise<FeatureCollection> {
  return fetchJSON<FeatureCollection>(
    `${endpoint}/hugsi_2021_100m_data/hugsi_data_test2/${boundaryFile}`
  );
}

/**
 * Gets the city metadata from S3 bucket.
 */
export async function fetchAverage(
  url: string,
  endpoint?: string
): Promise<AverageKPI> {
  const avgValues = fetchJSON<AverageKPI>(`${endpoint}/${url}`);
  return avgValues;
}

// export async function fetchLatzoneAverage(
//   url: string,
//   endpoint?: string
// ): Promise<LatZoneKPI> {
//   const avgValues = fetchJSON<LatZoneKPI>(`${endpoint}/${url}`);
//   return avgValues;
// }

// export async function fetchPopAverage(
//   url: string,
//   endpoint?: string
// ): Promise<PopKPI> {
//   const avgValues = fetchJSON<PopKPI>(`${endpoint}/${url}`);
//   return avgValues;
// }
