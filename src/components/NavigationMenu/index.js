import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

import { withAuthentication } from '../Session'
import { AuthUserContext } from '../Session'
import { withFirebase } from '../Firebase';
import { withTheme } from '../Theme';
import * as ROUTES from '../../constants/routes';

class NavigationMenuBase extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;

    return (
      <AuthUserContext.Consumer> 
        { authUser => 
          <div>
            <IconButton
              aria-owns={anchorEl ? 'nav-menu' : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
            <MenuIcon />
            </IconButton>
            <Menu
              id="nav-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose} >
                <Link className={classes.link} to={ROUTES.HOME}>Home</Link>
              </MenuItem>
              {!!authUser && <MenuItem onClick={this.handleClose}>
                <Link className={classes.link} to={ROUTES.DASHBOARD}>Image Dashboard</Link>
              </MenuItem>}
            </Menu>
          </div>
        }
      </AuthUserContext.Consumer>
    );
  }
}

NavigationMenuBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
  link: {
    "text-decoration": "none",
    padding: "10px 30px",
  },
};

const NavigationBar = compose(
  withAuthentication,
  withFirebase,
  withTheme,
  withStyles(styles),
)(NavigationMenuBase);

export default NavigationBar;