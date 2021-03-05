import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  logo: {
    fill: theme.palette.primary.main,
  },
}));

export const Logo = () => {
  const classes = useStyles();

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 181 170'
      height='24px'
      className={classes.logo}
    >
      <g
        id='Page-1'
        stroke='none'
        strokeWidth='1'
        fill='none'
        fillRule='evenodd'
      >
        <g
          id='leetfolio'
          transform='translate(-139.000000, -135.000000)'
          className={classes.logo}
        >
          <g id='Group-7' transform='translate(139.000000, 135.000000)'>
            <path
              d='M101.126,122.463 L149.066,122.463 L134.877,150.024 L62.383,150.024 L137.698,3.717 C138.586,1.989 137.733,0.591 135.792,0.591 L59.085,0.591 C57.145,0.591 54.849,1.989 53.961,3.717 L1.037,106.526 C0.148,108.253 0.14,111.057 1.018,112.787 L10.567,131.627 L68.067,19.925 L106.903,19.925 L31.589,166.232 C30.7,167.96 31.554,169.359 33.495,169.359 L143.859,169.359 C145.8,169.359 148.096,167.96 148.984,166.232 L179.86,106.253 C180.749,104.524 179.896,103.127 177.954,103.127 L110.794,103.127 L101.126,122.463'
              id='Fill-5'
              className={classes.logo}
              mask='url(#mask-2)'
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
};
