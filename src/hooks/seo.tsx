/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

/**
 * SEO hooks
 * @param description - meta description
 * @param lang - language
 * @param title - title tag
 */
function  SEO({ description, lang, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            url
            image
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
    >
      <meta property="description" content={metaDescription} />
      <meta property="og:title" content={site.siteMetadata.title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={site.siteMetadata.url} />
      <meta property="og:image" content={site.siteMetadata.image} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={site.siteMetadata.title} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:url" content={site.siteMetadata.url} />
      <meta property="twitter:image" content={site.siteMetadata.image} />
      <script
        src="https://consent.cookiefirst.com/banner.js"
        data-cookiefirst-key="0d46ab6a-8ac7-4a72-850d-aa43886ed304"
        type="text/javascript"
      />
    </Helmet>
  );
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  description: '',
  title: '',
  url: '',
  image: '',
};

SEO.propTypes = {
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  description: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.string,
};

export default SEO;
