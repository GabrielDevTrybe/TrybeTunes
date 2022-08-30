import React from 'react';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends React.Component {
  state = {
    isLoading: true,
    name: '',

  };

  async componentDidMount() {
    const user = await getUser();

    this.setState({
      name: user.name,
      isLoading: false,
    });
  }

  render() {
    const { isLoading, name } = this.state;
    return (
      <header data-testid="header-component">
        Header
        {isLoading ? <Carregando /> : <h2 data-testid="header-user-name">{ name }</h2>}
      </header>
    );
  }
}

export default Header;
