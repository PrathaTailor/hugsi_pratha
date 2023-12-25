import { toCities } from '../city-utils';
import { Cities } from '../../models';

describe('CityUtils', () => {

  let fakeCityData: Cities;

  beforeEach(() => {
    fakeCityData = {
      2016: {
        Stockholm: {}
      },
      2017: {
        Gothenburg: {}
      },
      2019: {
        Stockholm: {
          acquisition_date: 2019,
          latlong: '10.10, 10.10',
        },
        Paris: {
          acquisition_date: 2019,
          latlong: '10.10, 10.10'
        }
      }
    };
  });

  test('can convert to array of cities', () => {
    // Arrange


    // Act
    const cityMap = toCities(fakeCityData);

    // Assert
    expect(cityMap.size).toEqual(3);
    const [first, second] = cityMap.get('2019');
    expect(first.id).toEqual('Stockholm');
    expect(first.latlongarr).toEqual([10.1, 10.1]);
    expect(first.acquisition_date).toEqual(2019);

    expect(second.id).toEqual('Paris');
    expect(second.acquisition_date).toEqual(2019);
    expect(second.latlongarr).toEqual([10.10, 10.10]);

    const [third] = cityMap.get('2017');
    expect(third.id).toEqual('Gothenburg');
    expect(third.latlongarr).toEqual(undefined);

  });
});
