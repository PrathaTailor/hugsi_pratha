import React, { createContext } from 'react';
import { useLocalStore } from 'mobx-react-lite';
import {
  fetchCities,
  fetchAverage,
  fetchMunicipalities,
  fetchTowns,
  fetchNeighborhoods,
  // fetchLatzoneAverage,
  // fetchPopAverage,
  fetchWorldData,
  fetchWorldKpiMapData,
  fetchCategoryData,
  fetchCategoryKpiMapData
} from '../hooks/http';
import { City, AverageKPI, Municipality, Town } from '../models';
import * as NumberUtils from '../utils/number-utils';
import { toJS } from 'mobx';

export interface ICityStore {
  cities: City[];
  citiesFromPreviousYear: City[];
  cityMap: Map<string, City[]>;
  kpiAverage: AverageKPI;
  isLoadingCities: boolean;
  barChartData: {};
  municipalities: any;
  towns: any;
  user: any;
  neighborhoods: any;
  accessibleNeighbourhoods: any;
  isRankingTourfirst: boolean;
  isDatapageTourfirst: boolean;
  worldDistributionMap: any;
  worldKpiDataMap: any;
  categoryDistributionMap: any;
  categoryKpiDataMap: any;
  loadCities(endpoint: string): Promise<void>;
  getCity(cityId: string): City;
  getMunicipality(municipalityId: string): any;
  getTown(townId: string): any;
  getPrevCity(cityId: string): City;
  getAllYearsData(cityId: string): CityAndYear[];
  loadUser(data: any): any;
  loadNeighbourhoods(data: any): any;
  getUser(): any;
}
type CityAndYear = Partial<City> & { year: string };

function formatCityId(cityId: string) {
  return decodeURIComponent(cityId?.toLowerCase()).replace(' ', '');
}

function findCityById(cities: City[] = [], cityId: string): City {
  return cities.find(city => {
    return formatCityId(city.id) === formatCityId(cityId);
  });
}

function getYearToPresent(years: string[]): string {
  // Map to numbers
  const yearsAsNumbers = years.map(year => Number.parseInt(year, 10));

  // Get the biggest number and return as string
  return String(NumberUtils.getBiggest(yearsAsNumbers));
}

/**
 * City Provider
 * @param children - elements/components/pages
 */
export const CityProvider = ({ children }) => {
  const store: ICityStore = useLocalStore<ICityStore>(() => ({
    /* observable states */
    cities: [] as City[],
    citiesFromPreviousYear: [] as City[],
    cityMap: new Map<string, City[]>(),
    isLoadingCities: false,
    barChartData: {},
    kpiAverage: {} as AverageKPI,
    municipalities: {} as Municipality[],
    towns: {} as Town[],
    user: {} as any,
    worldDistributionMap: {} as any,
    worldKpiDataMap:{} as any,
    categoryDistributionMap: {} as any,
    categoryKpiDataMap: {} as any,
    neighborhoods: {} as Town[],
    accessibleNeighbourhoods: {} as Town[],
    isRankingTourfirst: true,
    isDatapageTourfirst: true,
    /* actions */
    async loadCities(endpoint) {
      if (store.cities.length !== 0 || store.isLoadingCities) {
        return;
      }
      store.isLoadingCities = true;

       
      const cityMap = await fetchCities(
        `${endpoint}/hugsi_2021_100m_data/Ranking_26122022/HUGSI_Ranking_v6.json`,
        endpoint
      );

      const worldDistributionMap = await fetchWorldData(
        `${endpoint}/hugsi_2021_100m_data/Ranking_26122022/avg_class_distribution_world_v1.json`,
        endpoint
      );

      const worldKpiDataMap = await fetchWorldKpiMapData(
        `${endpoint}/hugsi_2021_100m_data/Ranking_26122022/avg_kpis_world_v1.json`,
        endpoint
      );

      const categoryDistributionMap = await fetchCategoryData(
        `${endpoint}/hugsi_2021_100m_data/Ranking_26122022/avg_class_distribution_by_category_v1.json`,
        endpoint
      );

      const categoryKpiDataMap = await fetchCategoryKpiMapData(
        `${endpoint}/hugsi_2021_100m_data/Ranking_26122022/avg_kpis_by_category_v1.json`,
        endpoint
      );
      
      const kpiAverage = await fetchAverage(
        `hugsi_2021_100m_data/Ranking_26122022/global_regional_average_kpi_v7.json`,
        endpoint
      );
      // const latZoneAverage = await fetchLatzoneAverage(
      //   `hugsi_2021_100m_data/Ranking/latzonewise_avg_kpis_v4.json`,
      //   endpoint
      // );
      // const popAverage = await fetchPopAverage(
      //   `hugsi_2021_100m_data/Ranking/population_categwise_avg_kpis_v4.json`,
      //   endpoint
      // );
      const municipalities = await fetchMunicipalities(
        `hugsi_2021_100m_data/Ranking_26122022/GCC_Towns_List_ranking_v6.json`,
        endpoint
      );

      const towns = await fetchTowns(
        `hugsi_2021_100m_data/Ranking_26122022/GCC_Towns_ranking_v6.json`,
        // `Sweco/GSC/GCC_Towns_Public_V1.json`,
        endpoint
      );

      const neighborhoods = await fetchNeighborhoods(
        `hugsi_2021_100m_data/Ranking_26122022/neighbourhoods_latlong_GCC_tn_v2.json`,
        endpoint
      );
      store.kpiAverage = kpiAverage;
      store.cityMap = cityMap;
      store.worldDistributionMap = worldDistributionMap;
      store.worldKpiDataMap= worldKpiDataMap;
      store.categoryDistributionMap= categoryDistributionMap;
      store.categoryKpiDataMap= categoryKpiDataMap;
      store.municipalities = municipalities;
      store.towns = towns;
      store.neighborhoods = neighborhoods;
      store.citiesFromPreviousYear = toJS(store.cityMap)['2019'];
      store.isRankingTourfirst = true;
      store.isDatapageTourfirst = true;
      const yearToPresent = getYearToPresent([...cityMap?.keys()]);
      const cities = cityMap.get(yearToPresent);
      store.cities = [...cities];
      store.isLoadingCities = false;
    },

    loadUser(data) {
      store.user = data;
    },

    loadNeighbourhoods(data) {
      store.accessibleNeighbourhoods = data;
    },

    getAllYearsData(cityId): CityAndYear[] {
      const years = [...store.cityMap.keys()];
      return years
        .map(year => {
          const cities = store.cityMap.get(year);
          const city = findCityById(cities, cityId);

          if (!city) {
            return null;
          }

          return {
            ...city,
            year,
          };
        })
        .filter(cityAndYear => cityAndYear !== null);
    },

    /* computed values (derived state) */
    getCity(cityId: string) {
      return findCityById(store.cities, cityId);
    },

    getPrevCity(cityId: string) {
      return findCityById(store.citiesFromPreviousYear, cityId);
    },

    getMunicipality(municipalityId: string) {
      return {};
    },

    getTown(townId: string) {
      return {};
    },

    getUser() {
      return {};
    },
  }));

  return <CityContext.Provider value={store}>{children}</CityContext.Provider>;
};

export const CityContext = createContext<ICityStore>(null);
