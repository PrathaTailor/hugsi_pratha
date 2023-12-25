import { City } from '../models';

export const initialCityState: City = {
  acquisition_date: [0],
  area_size: 0,
  average_ndvi: 0,
  boundary: '',
  canopy_number: 0,
  canopy_size_mean: 0,
  city_code: '',
  conopy_size_median: 0,
  continent: '',
  country: '',
  grasscover: 0,
  grasscover_percentage: 0,
  green_index: 0,
  grid_median_grasscover: 0,
  grid_median_treecanopycover: 0,
  id: '',
  latlong: '',
  latlongarr: [0, 0],
  othercover: 0,
  othercover_percentage: 0,
  treecanopycover: 0,
  treecanopycover_percentage: 0,
  water: 0,
  watercover_percentage: 0,
};

export const initialCitiesState: City[] = [{ ...initialCityState }];
