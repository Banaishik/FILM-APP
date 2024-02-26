import React, {useEffect, useRef, useContext} from 'react';
import {Link} from 'react-router-dom';
import Context from '../../context/Contex';
import "./cardItem.css"

const CardItem = ({title, url, id, searchFilm}) => {

  const myElementRef = useRef(null);
  const {setWidthCard} = useContext(Context)

  useEffect(() => {
    const elementWidth = myElementRef.current.offsetWidth;
    setWidthCard(elementWidth)
  }, []);

  return (
    <div className='cardItem' ref={myElementRef}>
      <img src={`https://image.tmdb.org/t/p/w500${url}`} />
      <div onClick={(e) => searchFilm(id, e)}>
        <Link className='title_card_link' to='/detailsFilm'>
          <h1  className='title_card' variant='h5' component="div">{title}</h1>
        </Link>
        <div className='rating_card'>rating 10</div>
      </div>
    </div>
  );
}

export default CardItem