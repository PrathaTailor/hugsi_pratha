import React, { useEffect, useState } from 'react';

// Modified example from https://codesandbox.io/s/5x8kq3nwjn

function getScrollY(scroller: any): number {
  // @ts-ignore
  if (scroller.pageYOffset !== undefined) {
    return scroller.pageYOffset;
  }

  // @ts-ignore
  if (scroller.scrollTop !== undefined) {
    return scroller.scrollTop;
  }

  const el =
    document.documentElement || document.body.parentNode || document.body;

  // @ts-ignore
  return el.scrollTop;
}

interface UseHideOnScrollProps {
  /** The selector to the background image element (map or header image) */
  backgroundImageSelector: string;
  scroller?: Element | Window;
}

/**
 * Use Scroll from Top hooks
 * Used in changing the color of navigation bar
 * @param scroller - a window object
 * @param backgroundImageSelector - bg image selector
 * @returns boolean
 */
const useScrollFromTop = ({
  scroller = window,
  backgroundImageSelector,
}: UseHideOnScrollProps): boolean => {
  const [hide, setHide] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const backgroundImage = document.querySelector(backgroundImageSelector);
      const header = document.querySelector('header');
      if (!backgroundImage || !header) {
        return setHide(true);
      }

      const imageHeight = backgroundImage.clientHeight;
      const headerMenuHeight = header.clientHeight;

      const scrollY = getScrollY(scroller);
      const isMoreThanMaxScroll = scrollY > imageHeight - headerMenuHeight;

      setHide(isHide => {
        return isMoreThanMaxScroll !== isHide ? isMoreThanMaxScroll : isHide;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return hide;
};

export default useScrollFromTop;
