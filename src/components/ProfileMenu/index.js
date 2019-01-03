import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

import { withAuthentication } from '../Session'
import { AuthUserContext } from '../Session'
import { withFirebase } from '../Firebase';
import { withTheme } from '../Theme';
import * as ROUTES from '../../constants/routes';

class ProfileMenuBase extends React.Component {
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
                aria-owns={anchorEl ? 'profile-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                  {!!authUser && <MenuItem onClick={this.handleClose}><Link className={classes.link} to={ROUTES.ACCOUNT}>Account</Link></MenuItem>}
                  {!authUser && <MenuItem onClick={this.handleClose}><Link className={classes.link} to={ROUTES.SIGN_IN}>Sign In</Link></MenuItem> }
                  {!!authUser && <MenuItem onClick={this.props.firebase.doSignOut}>Sign Out</MenuItem>}
              </Menu>
            </div>
          }
        </AuthUserContext.Consumer>
    );
  }
}

ProfileMenuBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
  link: {
    "text-decoration": "none",
  },
};

const ProfileMenu = compose(
  withAuthentication,
  withFirebase,
  withTheme,
  withStyles(styles),
)(ProfileMenuBase);

export default ProfileMenu;