import React from 'react';
import Header from './Header';
// import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    botaoOff: true,
    searchValue: '',
  };

  botaoDisableFunc = ({ target }) => {
    const { value } = target;
    const maxLength = 2;

    this.setState({ searchValue: value });
    if (value.length >= maxLength) {
      this.setState({ botaoOff: false });
    } else {
      this.setState({ botaoOff: true });
    }
  };

  render() {
    const { botaoOff, searchValue } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            onChange={ this.botaoDisableFunc }
            type="text"
            placeholder="search"
            data-testid="search-artist-input"
            value={ searchValue }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ botaoOff }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
