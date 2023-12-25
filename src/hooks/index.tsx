import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

interface SiteMetadata {
  endpoint: string;
  mapboxToken: string;
  apiKey: string;
  userInputsEndpoint: string;
  loginDssEndpoint: string;
  frontUrl: string;
}

/**
 * Use Site Metadata hooks
 * @returns SiteMetadata
 */
export function useSiteMetadata(): SiteMetadata {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            endpoint
            mapboxToken
            apiKey
            userInputsEndpoint
            loginDssEndpoint
            frontUrl
          }
        }
      }
    `
  );

  return site.siteMetadata;
}
