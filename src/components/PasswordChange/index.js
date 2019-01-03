import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return (
      <form onSubmit={this.onSubmit}>
        <TextField
          id="outlined-password-input"
          label="New Password"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
          name="passwordOne"
          onChange={this.onChange}
          value={passwordOne}
        />
        <TextField
          id="outlined-password-input"
          label="Repeat New Password"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
          name="passwordTwo"
          onChange={this.onChange}
          value={passwordTwo}
        /><br/>
        <Button
          disabled={isInvalid}
          size="large"
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit">
          Reset My Password
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

PasswordChangeFormBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  textField: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

const PasswordChangeForm = compose(
  withFirebase,
  withStyles(styles),
)(PasswordChangeFormBase);

export default PasswordChangeForm;