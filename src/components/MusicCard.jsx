import React from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    checked: false,
    isLoading: false,
  };

  componentDidMount() {
    const { Favorites, trackId } = this.props;

    const favoritesSongs = Favorites.some((song) => song.trackId === trackId);
    this.setState({ checked: favoritesSongs });
  }

  handleChange = async (el) => {
    const { checked } = this.state;
    this.setState({ isLoading: true });

    if (checked) {
      await removeSong(el);
      this.setState({ isLoading: false, checked: false });
    } else {
      await addSong(el);
      this.setState({ isLoading: false, checked: true });
    }
  };

  render() {
    const {
      trackName,
      previewUrl,
      collectionName,
      artistName,
      trackId,
      // checked, tive uma ajuda do Italo Lacerda pra exergar esse erro
      el } = this.props;
    const { isLoading, checked } = this.state;

    // if (isLoading) {
    //   return <Carregando />;
    // }
    return (

      <div>

        <li>
          <h2>{artistName}</h2>
          <h4>{collectionName}</h4>
          <p>{trackName}</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
          </audio>
        </li>

        <div>
          <label htmlFor="Favorites">
            Favorita
            {isLoading ? <Carregando />
              : (
                <input
                  id="Favorites"
                  type="checkbox"
                  data-testid={ `checkbox-music-${trackId}` }
                  onChange={ () => {
                    this.handleChange(el);
                  } }
                  checked={ checked }
                />
              )}
          </label>

        </div>

      </div>

    );
  }
}

MusicCard.propTypes = {
  albumArrProp: PropTypes.array,

}.isRequired;

export default MusicCard;
