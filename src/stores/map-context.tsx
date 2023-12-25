import React from 'react';
import { useLocalStore } from 'mobx-react-lite';
import { ViewState } from 'react-map-gl';

interface TransitionDuration {
  transitionDuration?: number;
}

interface IViewportStore {
  viewport: ViewState;
  setViewport(viewport: ViewState & TransitionDuration): void;
}

export const MapContext = React.createContext<IViewportStore>(null);

/**
 * Map Provider
 * @param children - components/pages
 */
export const MapProvider = ({ children }) => {
  const store = useLocalStore<any>(() => ({
    /* observable states */
    viewport: {
      zoom: 0.8,
      center: [40, 8], // Outside Italy
    },

    setViewport(viewport: ViewState & TransitionDuration) {
      store.viewport = viewport;
    },
  }));

  return <MapContext.Provider value={store}>{children}</MapContext.Provider>;
};
