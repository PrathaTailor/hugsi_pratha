import {
  CategoryWinners,
  Cities,
  City,
  CityMap,
  CONTINENT_NAMES,
  POPULATION_CATEGORIES,
  TERAIN_CATEGORIES,
  Town,
} from '../models';
import { Order } from '../components/rankings-table/rankings-table';

/**
 * Converts the JSON city response to a Map of year to a collection of `City`
 * that includes year and data for each `City`.
 */
export function toCities(data: Cities): Map<string, City[]> {
  const yearToCities = new Map<string, City[]>();

  Object.keys(data).forEach(year => {
    const cityMap: CityMap = data[year];
    const cities = Object.keys(cityMap).map(cityName => {
      const city = cityMap[cityName];
      if (city !== null) {
        city.id = cityName;

        // Not all cities have latlong.
        if (city.latlong) {
          const [longitude, latitude] = city.latlong
            .split(',')
            .map(s => parseFloat(s.trim()));

          city.latlongarr = [longitude, latitude];
        }
        return city;
      }


    });

    yearToCities.set(year, cities);
  });

  return yearToCities;
}

export function getYearFromCityAcquisitionDate(city: City): number {
  if (Array.isArray(city.acquisition_date)) {
    const [firstDate] = city.acquisition_date;

    return Number(String(firstDate).substr(0, 4));
  }

  // ¯\_(ツ)_/¯
  return new Date().getFullYear();
}

const sortByKey = (
  cities: City[],
  key: keyof City,
  order: Order = 'desc'
): City[] => {
  if (order === 'desc') {
    return cities.sort((a, b) => {
      return a[key] > b[key] ? -1 : 1;
    });
  }
  return cities.sort((a, b) => {
    return a[key] > b[key] ? 1 : -1;
  });
};

export function getCitiesInContinent(
  cities: City[],
  continentName: string,
  tags: string
): City[] {
  if (continentName === CONTINENT_NAMES[0]) {
    if (continentName === CONTINENT_NAMES[0] && tags !== '') {
      return cities.filter(data => {
        return data[tags] === 1;
      }
      );
    }
    return cities;
  }

  if (tags !== '') {
    return cities.filter(data => {
      return data[tags] === 1 && data.continent === continentName;
    }
    );
  }
  return cities.filter(city => city.continent === continentName);
}

export function getCitiesFromPopulation(
  cities: City[],
  population: string
): City[] {
  if (population === POPULATION_CATEGORIES[0]) {
    return cities;
  }
  return cities.filter(city => city.categ_population === population);
}

export function getCitiesFromTerains(
  cities: City[],
  terain: string
): City[] {
  if (terain === TERAIN_CATEGORIES[0]) {
    return cities;
  }

  return cities.filter(city => city.categ_latzones === terain);
}
export function getTownsInActiveRegion(towns: Town[]): Town[] {
  // if (continentName === CONTINENT_NAMES[0]) {
  //   return cities;
  // }

  // return cities.filter(city => city.continent === continentName);
  return towns;
}

export function getOverallWinners(cities: City[]): City[] {
  return sortByKey(cities.slice(), 'index_ranking', 'asc');
}

export function getCategoryWinners(cities: City[] = []): CategoryWinners {
  if (cities.length === 0) {
    return null;
  }

  const citiesCopy = cities.slice();

  const [greenSpace] = sortByKey(citiesCopy, 'total_green_space_percentage');
  const [healthOfVegetation] = sortByKey(citiesCopy, 'ndvi_vegetation');
  const [distributionOfGreen] = sortByKey(citiesCopy, 'grid_median_vegetation');
  const [trees] = sortByKey(citiesCopy, 'treecanopycover_percentage');
  const [grass] = sortByKey(citiesCopy, 'grasscover_percentage');
  const [greenSpacePerCapita] = sortByKey(citiesCopy, 'green_per_capita');

  return {
    greenSpace,
    healthOfVegetation,
    distributionOfGreen,
    greenSpacePerCapita,
    trees,
    grass,
  };
}

export function getIndexFromWinners(
  indexRanking: number,
  cities: City[]
): number {
  return getOverallWinners(cities).findIndex(
    w => w.index_ranking === indexRanking
  );
}

export function getCitiesLatLongs(cities: City[]): number[][] {
  return cities.map(s => s.latlongarr.slice().reverse());
}

export function getTownsLatLongs(towns: Town[]): number[][] {
  // return towns && towns.map((s: any) => s.latlong.slice());
  return undefined;
}

export function getNumberOfCountries(cities: City[]): number {
  const uniqueCountries = cities.reduce((acc, city) => {
    if (acc[city.country]) {
      return acc;
    }
    acc[city.country] = true;
    return acc;
  }, {});

  return Object.entries(uniqueCountries).length;
}

// https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number/13627586
export function rankingInWord(rank: number) {
  const remainderOfTen = rank % 10;
  const remainderOfHundred = rank % 100;

  if (remainderOfTen === 1 && remainderOfHundred !== 11) {
    return 'st';
  }
  if (remainderOfTen === 2 && remainderOfHundred !== 12) {
    return 'nd';
  }
  if (remainderOfTen === 3 && remainderOfHundred !== 13) {
    return 'rd';
  }
  return 'th';
}

export function rankingInWordWithNumber(rank: number) {
  return `${rank}${rankingInWord(rank)}`;
}

export function checkIfCityCenter(city) {
  if (city === 'Sydney' || city === 'Melbourne') {
    return ' (city center)';
  }
  return '';
}