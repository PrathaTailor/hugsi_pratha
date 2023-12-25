import React from 'react';
import SEO from '../hooks/seo';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Divider from '@material-ui/core/Divider';

import { createStyles, makeStyles, Theme } from '@material-ui/core';

import { ReactTypeformEmbed } from 'react-typeform-embed';

const browser = typeof window !== 'undefined' && window;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100vh',
      width: '100%',
      color: '#fff',
    },
    message: {
      maxWidth: 'var(--pageMaxWidth)',
      margin: '0 auto',
      placeContent: 'center',
      placeItems: 'center',
    },
    smallErrorMessage: {
      maxWidth: 'var(--pageMaxWidth)',
      margin: '0 auto',
      display: 'flex',
      placeContent: 'center',
      placeItems: 'center',
    },
  })
);

/**
 * NL Greenlabel Self assessment Page
 */
export default function TermsOfUsePage() {
  const styles = useStyles({});
  const smallScreen = useMediaQuery('(max-width:600px)');
  if (!browser) {
    return null;
  }
  return (
    <section>
      <SEO title="Self assessment | NL Greenlabel" />
      <main className={styles.root}>
        <ReactTypeformEmbed url="https://udnq8hf9s95.typeform.com/to/EJVLUqvk" />
      </main>
      <Divider />
    </section>
  );
}
