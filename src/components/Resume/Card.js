import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Spacing } from './fragments/Spacing';
import { device } from './styles';

const useStyles = makeStyles((theme) => ({
  profile: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    [`@media ${device.tablet}`]: {
      flexDirection: 'row',
      textAlign: 'left',
    },
  },
  name: {
    margin: 0,
    fontSize: '1.75em',
  },
  jobtitle: {
    margin: 0,
    color: '#329cb9',
  },
  location: {
    margin: 0,
  },
  picture: {
    width: '100px',
    height: '100px',
    marginBottom: '30px',
    [`@media ${device.tablet}`]: {
      marginBottom: 'initial',
      marginRight: '50px',
    },
  },
  circularPicture: {
    borderRadius: '50px',
    width: '100%',
  },
  information: {
    [`@media ${device.tablet}`]: {
      flex: '70%',
    },
  },
  contactDetail: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    '& li': {
      display: 'inline-block',
      lineHeight: 1.5,
      marginRight: '10px',
    },
  },
}));

export const Card = ({ basics }) => {
  const classes = useStyles();

  const { name, label, location, picture } = basics;

  return (
    <Spacing>
      <div className={classes.profile}>
        <div className={classes.picture}>
          <img
            className={classes.circularPicture}
            src={picture}
            alt='portrait'
          />
        </div>
        <div className={classes.information}>
          <h1 className={classes.name}>{name}</h1>
          <p className={classes.jobtitle}>{label}</p>
          <p
            className={classes.location}
          >{`${location.city}, ${location.region}`}</p>
        </div>
      </div>
    </Spacing>
  );
};
