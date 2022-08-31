import React from 'react';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
// import Card from './Card';
import Carregando from './Carregando';

class Search extends React.Component {
  state = {
    botaoOff: true,
    searchValue: '',
    isLoading: false,
    musicArr: [],
    message: false,
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

  requestApiFunc = async () => {
    const { searchValue } = this.state;
    this.setState({ isLoading: true });
    const request = await searchAlbumsAPI(searchValue);

    this.setState({
      musicArr: request,
      searchValue: '',
      isLoading: false,
      message: true,
    });
  };

  render() {
    const { botaoOff, searchValue, musicArr, isLoading, message } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {isLoading
          ? <Carregando />
          : (
            <div>
              <form>
                <input
                  onChange={ this.botaoDisableFunc }
                  type="text"
                  placeholder="search"
                  data-testid="search-artist-input"
                  value={ searchValue }
                />
              </form>

              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ botaoOff }
                onClick={ this.requestApiFunc }
                value={ musicArr }
              >
                Pesquisar
              </button>
            </div>
          )}
        {
          message
          && (
            <span>
              Resultado de álbuns de:
              {' '}
              {searchValue}
              {' '}
            </span>
          )
        }
      </div>

    );
  }
}

export default Search;
