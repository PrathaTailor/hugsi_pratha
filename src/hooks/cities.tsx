import { useContext, useEffect, useState, useMemo } from 'react';
import { CityContext, ICityStore } from '../stores/city-context';
import { useSiteMetadata } from './index';
import { City, CONTINENT_NAMES,POPULATION_CATEGORIES, TERAIN_CATEGORIES, Town } from '../models';
import {
  getCitiesInContinent,
  getTownsInActiveRegion,
  getCitiesFromPopulation,
  getCitiesFromTerains
} from '../utils/city-utils';

interface UseCities {
  citiesInActiveContinent: City[];
  citiesFromPopulation: City[];
  citiesFromTerains:City[];
  cities: City[];
  previousCities: City[];
  getCity: (cityId: string) => City;
  getMunicipality: (municipalityId: string) => any;
  getPrevCity: (cityId: string) => City;
  cityStore: ICityStore;
  townsInActiveRegion: Town[];
  username: any;
  isLoadingCities: boolean;
}

/**
 * Use Cities hooks
 * @param continentName - name of the continent
 * @returns UseCities
 */
const useCities = (continentName: string = CONTINENT_NAMES[0],
   population:string = POPULATION_CATEGORIES[0], terains:string = TERAIN_CATEGORIES[0],tags:string= ''): UseCities => {
  const cityStore = useContext(CityContext);
  const [username, setUsername] = useState('');
  const { endpoint } = useSiteMetadata();
  useEffect(() => {
    cityStore.loadCities(endpoint);
  }, []);

  useEffect(() => {
    if (cityStore?.user?.first_name) {
      const name = cityStore?.user?.first_name
        .concat(' ')
        .concat(cityStore?.user?.last_name);
      setUsername(name);
    }
  }, [cityStore.user]);

  const citiesInActiveContinent = useMemo(
    () => getCitiesInContinent(cityStore.cities, continentName,tags),
    [cityStore.cities, continentName,tags]
  );
  const citiesFromPopulation = useMemo(
    () => getCitiesFromPopulation(cityStore.cities, population),
    [cityStore.cities, population]
  );

  const citiesFromTerains = useMemo(
    () => getCitiesFromTerains(cityStore.cities, terains),
    [cityStore.cities, terains]
  );
  const townsInActiveRegion = useMemo(
    () => getTownsInActiveRegion(cityStore.municipalities.towns),
    [cityStore.municipalities.towns]
  );

  return {
    cities: cityStore.cities,
    getCity: cityStore.getCity,
    previousCities: cityStore.citiesFromPreviousYear,
    getPrevCity: cityStore.getPrevCity,
    cityStore,
    townsInActiveRegion,
    citiesInActiveContinent,
    citiesFromTerains,
    citiesFromPopulation,
    getMunicipality: cityStore.getMunicipality,
    username,
    isLoadingCities: cityStore.isLoadingCities,
  };
};

export default useCities;