import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { withAuthentication } from '../Session'
import { withFirebase } from '../Firebase';
import { withTheme } from '../Theme';
import NavigationMenu from '../NavigationMenu';
import ProfileMenu from '../ProfileMenu';

class NavigationBarBase extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}> 
        <AppBar position="static">
          <Toolbar>
            <NavigationMenu />
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Menu
            </Typography>
            <ProfileMenu />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavigationBarBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
  root: {
    display: "flex",
  },
  grow: {
    flex: 1,
    flexGrow: 1,
  },
};

const NavigationBar = compose(
  withAuthentication,
  withFirebase,
  withTheme,
  withStyles(styles),
)(NavigationBarBase);

export default NavigationBar;