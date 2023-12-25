import * as NumberUtils from '../number-utils';

describe('NumberUtils', () => {
  test('rounds a number with many decimals', () => {
    // Arrange
    const numberWithDecimals = 1.234444;

    // Act, Assert
    expect(NumberUtils.toFixed(numberWithDecimals, 0)).toEqual('1');
    expect(NumberUtils.toFixed(numberWithDecimals, 1)).toEqual('1.2');
    expect(NumberUtils.toFixed(numberWithDecimals, 2)).toEqual('1.23');
    expect(NumberUtils.toFixed(numberWithDecimals, 3)).toEqual('1.234');
  });

  it('returns "0" if input is not a number', () => {
    const notANumber = [] as any;
    expect(NumberUtils.toFixed(notANumber, 1)).toEqual('0');
  });

  it('can get the biggest number', () => {
    const numbers = [1, 0, 5, 10, 35, 4, 1.10];

    expect(NumberUtils.getBiggest(numbers)).toEqual(35);
  });

  it('can get the biggest number', () => {
    const numbers = [100, 200, 450, 200, -1, 100];

    const result = NumberUtils.sortDescending(numbers);

    const [first, second, third, fourth] = result;

    expect(first).toEqual(450);
    expect(second).toEqual(200);
    expect(third).toEqual(200);
    expect(fourth).toEqual(100);

    const [last] = result.slice(-1);
    expect(last).toEqual(-1);
  });
});
