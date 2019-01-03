import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
  <div>
    <h1>Type your e-mail address to which we send password reset link</h1>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
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
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <TextField
          id="outlined-email-input"
          label="Email"
          className={classes.textField}
          type="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
          name="email"
          onChange={this.onChange}
          value={email}
        /><br/>
        <Button
          disabled={isInvalid}
          size="large"
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit">
          Reset password via mail
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

PasswordForgetFormBase.propTypes = {
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

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = compose(
  withFirebase,
  withStyles(styles),
)(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };