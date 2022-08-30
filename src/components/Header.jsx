import React from 'react';
import { Link } from 'react-router-dom';
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
      <div>
        <nav>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <br />
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <br />
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>

        </nav>
        <header data-testid="header-component">
          {isLoading ? <Carregando /> : <h2 data-testid="header-user-name">{name}</h2>}
        </header>
      </div>

    );
  }
}

export default Header;
