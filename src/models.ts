/**
 * City object
 * Represents city metadata from 20tree
 */
export interface City {
  id?: string;
  acquisition_date?: number | number[];
  regional_ranking?: number;
  area_size?: number;
  average_ndvi?: number;
  boundary?: string;
  canopy_number?: number;
  canopy_size_mean?: number;
  conopy_size_median?: number;
  population?: number;
  city_code?: string;
  continent?: string;
  country?: string;
  grasscover?: number;
  grasscover_percentage?: number;
  grid_median_grasscover?: number;
  grid_median_treecanopycover?: number;
  green_grade?: string;
  green_index?: number;
  index?: number;
  index_ranking?: number;
  latlong?: string;
  latlongarr?: [number, number];
  othercover?: number;
  othercover_percentage?: 0;
  treecanopycover?: number;
  treecanopycover_percentage?: number;
  water?: number;
  watercover_percentage?: number;
  related_cities?: any;
  total_green_space_percentage?: number;
  ndvi_vegetation?: number;
  grid_median_vegetation?: number;
  green_per_capita?: number;
  total_green_space?: number;
  green_score?: number;
  gcc?: any;
  towns?: any;
  categ_population?: string;
  categ_latzones?: string;
  isMegaCity?: any;
  isC40?: any;
  isClimateAlliance?: any;
  isTreeCity?: any;

}

/**
 * CityMap object
 */
export interface CityMap {
  [cityName: string]: City;
}

/**
 * Cities object
 */
export interface Cities {
  [year: string]: CityMap;
}

/**
 * CategoryWinners object
 */
export interface CategoryWinners {
  greenSpace: City;
  healthOfVegetation: City;
  distributionOfGreen: City;
  greenSpacePerCapita: City;
  trees: City;
  grass: City;
}

/**
 * Global and Regional average object
 */
export interface AverageKPI {
  regional: object;
  global: object;
  climate_zones: object;
  population_category: object;
}

/**
 * CONTINENT_NAMES enum
 */
export enum CONTINENT_NAMES {
  'All',
  'Africa',
  'Central East Asia',
  'East, Southeast Asia and Oceania',
  'Europe',
  'Latin America',
  'North America',
  'South and West Asia',
}

/**
 * POPULATION_CATEGORIES enum
 */
export enum POPULATION_CATEGORIES {
  'All',
  'Less than 500 (Very Low)',
  '500-1500 (Low)',
  '1500-3000 (Medium)',
  '3000-5000 (High)',
  '5000 and above (Very High)'
}
export enum POPULATION_CATEGORIES_COLORS {
  '#fff',
  '#098011',
  '#57bf0d',
  '#f5f516',
  '#f75b00',
  '#f70000'
}
/**
 * TERAIN_CATEGORIES enum
 */

export enum TERAIN_CATEGORIES {
  'All',
  'Polar North',
  'North Temperate Zone',
  'Torrid Zone',
  'South Temperate Zone',
  'Polar South'
}
export enum TERAIN_CATEGORIES_COLORS {
  '#FFF',
  '#359ED0',
  '#007A01',
  '#FEE80C',
  '#FF9302',
  '#359ED1',
}
/**
 * YEARS enum
 */
export const YEAR_LIST = ['2020', '2019'];

/**
 * Key Performance Indicators
 */

export const KPI_LIST = [
  {
    key: 'percentage',
    value: 'Percentage of urban green space',
    property: 'total_green_space_percentage',
  },

  {
    key: 'health',
    value: 'Average health of urban vegetation',
    property: 'ndvi_vegetation',
  },

  {
    key: 'capita',
    value: 'Urban green space per capita',
    property: 'green_per_capita',
  },
  {
    key: 'distribution',
    value: 'Distribution of urban green space',
    property: 'grid_median_vegetation',
  },
  {
    key: 'trees',
    value: 'Percentage of urban area covered by trees',
    property: 'treecanopycover_percentage',
  },

  {
    key: 'grass',
    value: 'Percentage of urban area covered by grass',
    property: 'grasscover_percentage',
  },
];

export const CLASS_LIST = {
  treecanopy: 'Trees',
  grass: 'Grass',
  water: 'Water',
  other: ' Urban'
};

export const CLASS_CHANGE_LIST = {
  grass_to_other: 'Grass to Urban',
  treecanopy_to_other: 'Trees to Urban',
  water_to_other: 'Water to Urban',
  treecanopy_to_grass: ' Trees to Grass',
  other_to_grass: 'Urban to Grass',
  water_to_grass: 'Water to Grass',
  other_to_treecanopy: 'Urban to Trees',
  water_to_treecanopy: 'Water to Trees',
  grass_to_treecanopy: 'Grass to Trees',
  grass_to_water: 'Grass to Water',
  treecanopy_to_water: 'Trees to Water',
  other_to_water: 'Urban to Water'
};

export const CHANGE_INDICATION_LIST = {
  Positive: 'Positive Change',
  Negative: 'Negative Change',
  Neutral: 'Neutral'
};

export const FAV_CITIES_MAX_COUNT = 5;

export const PAGINATION_COUNT = 15;

export const GCC_PAGINATION_COUNT = 10;

export const MAX_CHARACTERS_SEARCH = 25;

export interface Municipality {
  code: string;
  towns: any;
}

export interface Town {
  id: string;
  perc_hoge_vegetatie: number;
  perc_middelhoge_vegetatie: number;
  perc_lage_vegetatie: number;
  perc_water: number;
  perc_grijs: number;
  _area: number;
  aantal_inwoners_corr: number;
  _publicGreenArea: number;
  _privateGreenAreaSum: number;
  _meanNDVI: number;
  KPI1_score_verdeling_GroenBlauwGrijs: number;
  KPI2_StedelijkOpenbaarGroenPerInwoner: number;
  _totaalGroenPerInwoner: number;
  _vegetationDistribution: number;
  _treeDistributionScore: number;
  _middleHighVegDistributionScore: number;
  _lowVegDistributionScore: number;
  gemeentenaam?: string;
  region?: string;
  latlong?: string;
  latlongarr?: any;
  gccMunicipalityName?: string;
}

export interface Neighbourhood {
  KPI1_VerhoudingGroenWater: number;
  KPI2_StedelijkOpenbaarGroenPerInwoner: number;
  KPI3_GroenPerInwoner: number;
  KPI4_VegetationDistributionScore: number;
  KPI4a_HighVegetationDistributionScore: number;
  KPI4b_middleHighVegDistributionScore: number;
  KPI4c_lowVegDistributionScore: number;
  KPI5_meanNDVI: number;
  Label: string;
  aantal_inwoners_corr: number;
  code: string;
  gemeentecode: string;
  gemeentenaam: string;
  naam: string;
  perc_grijs: number;
  perc_hoge_vegetatie: number;
  perc_lage_vegetatie: number;
  perc_middelhoge_vegetatie: number;
  perc_private_green: number;
  perc_public_green: number;
  perc_water: number;
  plaatsnaam: string;
  plaatsnaamnr: number;
  _UselesPavedArea: number;
  _area: number;
  _areaGreenRoofLevel0: number;
  _areaGreenRoofLevel1: number;
  _areaGreenRoofLevel2: number;
  '_countGreenGarden_>60': number;
  '_countGreenStay_250-500': number;
  '_countGreenStay_500-1000': number;
  '_countGreenStay_1000-2500': number;
  '_countGreenStay_2500-5000': number;
  '_countGreenStay_>5000': number;
  '_countPotGreenGarden_0_10': number;
  '_countPotGreenGarden_10_20': number;
  '_countPotGreenGarden_20_30': number;
  '_countPotGreenGarden_>30': number;
  _countPotTreesCat1: number;
  _countPotTreesCat2: number;
  _countPotTreesCat3: number;
  _parkingArea: number;
  _privateGreenAreaSum: number;
  _publicGreenArea: number;
  _publicGreyArea: number;
  _publicLawnArea: number;
  _ratioPrivatePublicGreen: string;
  _vegetationHighArea: number;
  _vegetationLowArea: number;
  _vegetationMediumHighArea: number;
  _waterArea: number;
}

/**
 * RATING_LABELS Neighbourhoods enum
 */
export const RATING_LABELS = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
];