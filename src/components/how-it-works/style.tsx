import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(10rem, 1fr))',
      gridColumnGap: '3rem',
    },
    box: {
      margin: '1.5rem 0',
    },
    icon: {
      margin: 0,
      padding: 0,
      fontSize: '2rem',
      height: 'auto',
      width: 'auto',
    },
  })
);
