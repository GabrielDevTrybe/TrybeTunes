import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends React.Component {
  render() {
    const { musicArr } = this.props;
    if (musicArr[0] === undefined) {
      return <p>Nenhum álbum foi encontrado</p>;
    }
    return (
      musicArr.map((elemento) => (
        <Link
          key={ elemento.collectionId }
          to={ `/album/${elemento.collectionId}` }
          data-testid={ `link-to-album-${elemento.collectionId}` }
        >
          <div>
            <p>{elemento.artistName}</p>
            <h2>{elemento.collectionName}</h2>
            <img src={ elemento.artworkUrl100 } alt={ elemento.collectionName } />
          </div>
        </Link>
      ))
    );
  }
}

Card.propTypes = {
  musicArr: PropTypes.array,
}.isRequired;

export default Card;
