import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

class Login extends React.Component {
  state = {
    submitDisable: true,
    name: '',
    isLoading: false,
    redirect: false,
  };

  funcButtonValue = ({ target }) => {
    const { value } = target;
    const maxnLenghth = 3;

    this.setState({ name: value });
    if (value.length >= maxnLenghth) {
      this.setState({
        submitDisable: false,
      });
    } else if (value.length < maxnLenghth) {
      this.setState({
        submitDisable: true,
      });
    }
  };

  funcSaveInput = async (param) => {
    param.preventDefault();

    const { name } = this.state;

    this.setState({ isLoading: true });
    await createUser({ name });
    this.setState({
      isLoading: false,
      redirect: true,
    });
  };

  render() {
    const { submitDisable, isLoading, redirect } = this.state;

    return (
      isLoading ? <Carregando />
        : (
          <div data-testid="page-login">
            {redirect && <Redirect to="/search" /> }
            <h1>TrybeTunes</h1>
            <form>
              <label htmlFor="Login">
                <input
                  data-testid="login-name-input"
                  type="text"
                  placeholder="Nome"
                  onChange={ this.funcButtonValue }
                />
              </label>
              <button
                data-testid="login-submit-button"
                type="submit"
                disabled={ submitDisable }
                onClick={ this.funcSaveInput }
              >
                Entrar
              </button>
            </form>
          </div>
        )
    );
  }
}

export default Login;

Login.propTypes = {
  submitDisable: PropTypes.bool,
}.isRequired;
