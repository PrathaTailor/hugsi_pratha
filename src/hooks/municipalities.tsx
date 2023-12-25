import { useContext, useEffect, useMemo } from 'react';
import {
  MunicipalityContext,
  IMunicipalityStore,
} from '../stores/municipality-context';
import { useSiteMetadata } from './index';
import { City, CONTINENT_NAMES } from '../models';
import { getCitiesInContinent } from '../utils/city-utils';

interface UseMunicipalities {
  municipalities: any;
  getMunicipality: (municipalityId: string) => City;
  municipalityStore: IMunicipalityStore;
}

/**
 * Use Municipalities hooks
 * @param continentName - name of the continent
 * @returns UseCities
 */
const useMunicipalities = (): UseMunicipalities => {
  const municipalityStore = useContext(MunicipalityContext);

  const { endpoint } = useSiteMetadata();
  useEffect(() => {
    municipalityStore.loadMunicipalities(endpoint);
  }, []);

  return {
    municipalities: municipalityStore.municipalities,
    getMunicipality: municipalityStore.getMunicipality,
    municipalityStore,
  };
};

export default useMunicipalities;
