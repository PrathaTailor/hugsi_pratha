import React from 'react';
import SEO from '../../hooks/seo';
import { Typography, useMediaQuery, Divider } from '@material-ui/core';
import { useStyles } from '../../styles/terms-of-use';

const browser = typeof window !== 'undefined' && window;

/**
 * Terms of use Page
 */
export default function TermsOfUsePage() {
  const styles = useStyles({});
  const smallScreen = useMediaQuery('(max-width:600px)');
  if (!browser) {
    return null;
  }

  return (
    <section>
      <SEO title="Terms of use" />
       <h1 style={{width:'100%',height:'50%' }}>
          detectify
      </h1>
    </section>
  );
}