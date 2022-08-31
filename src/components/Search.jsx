import React from 'react';
import Header from './Header';

class Search extends React.Component {
  state = {
    botaoOff: true,
    searchValue: '',
  };

  botaoDisableFunc = (event) => {
    const { searchValue } = this.state;
    const maxLength = 1;

    this.setState({ searchValue: event.target.value });
    if (searchValue.length >= maxLength) {
      this.setState({ botaoOff: false });
    } else {
      this.setState({ botaoOff: true });
    }
  };

  render() {
    const { botaoOff } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            onChange={ this.botaoDisableFunc }
            type="text"
            placeholder="search"
            data-testid="search-artist-input"
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
