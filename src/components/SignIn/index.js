import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import { withTheme } from '../Theme';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <div>
    <h1 style={{paddingLeft: "15px"}}>Sign In</h1>
    <SignInForm />
    <PasswordForgetLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {

  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.DASHBOARD);
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
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

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
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
          name="password"
          onChange={this.onChange}
          value={password}
        /><br/>
        <Button
          disabled={isInvalid}
          size="large"
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit">
          Sign In
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

SignInFormBase.propTypes = {
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

const SignInForm = compose(
  withTheme,
  withRouter,
  withFirebase,
  withStyles(styles),
)(SignInFormBase);

export default SignInPage;

export { SignInForm };