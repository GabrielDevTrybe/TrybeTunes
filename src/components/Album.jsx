import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import Carregando from './Carregando';
import MusicCard from './MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    albumArr: [],
    trackArr: [],
    favoriteArr: [],
    isLoading: false,
  };

  componentDidMount() {
    this.requestApiFunc();
  }

  requestApiFunc = async () => {
    const { match: { params: { id } } } = this.props;
    const favorites = await getFavoriteSongs();
    const music = await getMusics(id);
    this.setState({
      albumArr: music,
      trackArr: music.filter((_e, index) => index !== 0),
      favoriteArr: favorites,
      isLoading: false,
    });
    console.log(this);
  };

  render() {
    const { albumArr, isLoading, trackArr, favoriteArr } = this.state;
    if (isLoading) {
      return (
        <div>
          <Header />
          <Carregando />
        </div>
      );
    }
    return (
      <div data-testid="page-album">
        <Header />
        {albumArr.map((element, index) => {
          if (index === 0) {
            return (
              <div key={ index }>
                <h2 data-testid="artist-name">{element.artistName}</h2>
                <p data-testid="album-name">{element.collectionName}</p>
              </div>
            );
          }
          return null;
        })}

        <ul>

          {trackArr.map((e, index) => (

            <MusicCard
              key={ index }
              artistName={ e.artistName }
              collectionName={ e.collectionName }
              trackName={ e.trackName }
              trackId={ e.trackId }
              previewUrl={ e.previewUrl }
              Favorites={ favoriteArr }
              el={ e }
            />

          ))}
        </ul>

      </div>

    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
