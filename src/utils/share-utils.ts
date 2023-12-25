import { City } from '../models';


/**
 * Returns `true` if the `navigator.share` is available.
 */
export function isSharingAvailable() {
  // @ts-ignore
  return Boolean(navigator.share);
}

/**
 * Share the city if `navigator.share` is available.
 */
export async function handleShare(city: City) {
  if (!isSharingAvailable()) {
    return false;
  }

  // @ts-ignore
  await navigator.share({
    title: `${city.id}`,
    text: `${city.id} - Checkout the urban green index ranking!`,
    url: window.location.href
  });
    
  return true;
}