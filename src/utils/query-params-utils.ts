/**
 *
 * @param search - city
 * @param key - extra param
 */
export const getQueryParam = (search: string, key: string = null): string => {
  const decodedSearchString = decodeURIComponent(search.replace('?', ''));
  if (!key) {
    return decodedSearchString;
  }

  const getParams = decodedSearchString.split('&').map(s => s.split('='));

  const found = getParams.find(([paramKey]) => {
    return paramKey === key;
  });

  if (found) {
    return found[1];
  }
};
