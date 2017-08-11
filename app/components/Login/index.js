/**
*
* Login
*
*/

import React from 'react';

import styles from './styles.css';
import validator from 'email-validator';
import TextInput from '../TextInput';

class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    login: React.PropTypes.func.isRequired,
    cancelLogin: React.PropTypes.func.isRequired,
  };

  state = {};

  login = () => {
    const email = this.emailField.value();
    const password = this.passwordField.value();
    console.log(password);
    if (!validator.validate(email)) {
      this.setState({
        errorText: 'Please provide a valid email',
      });
      return;
    }

    this.setState({
      errorText: null,
    });

    this.props.login(email);
  }

  render() {
    return (
      <div className={styles.login}>
        <h2 className={styles.heading}>
          Login
        </h2>

        <TextInput
          placeholder="Your email"
          ref={(f) => { this.emailField = f; }}
          errorText={this.state.errorText}
        />
        <TextInput
          placeholder="Your password"
          ref={(f) => { this.passwordField = f; }}
          errorText={this.state.errorText}
          type={'password'}
        />


        <div className={styles.actionContainer}>
          <button
            className={styles.button}
            onClick={this.props.cancelLogin}
          >
            cancel
          </button>
          <button
            className={styles.button}
            onClick={this.login}
          >
            log in
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
