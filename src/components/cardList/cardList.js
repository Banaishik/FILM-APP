import React, {useState,  useEffect, useContext } from 'react';
import Context from '../../context/Contex';
import CardItem from '../cardItem/cardItem';
import { Loading } from '../loading/loading';

const CardList = ({api}) => {
    const dataContext = useContext(Context)
    const {setFilms} = dataContext
    const {setCurrentFilms} = dataContext
    const {films, currentFilms} = dataContext.state
    const [index, setIndex] = useState(dataContext.state.indexFilms)

    const fethcRequest = async (api) => {
      try {
        const response = await fetch( api, {
          method : "GET",
          headers : {
            'accept' : 'application/json',
              'Content-type': "application/json",
              'Authorization' : `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzVhYzY5MGEzZmMzYzVmNzBhN2UzY2M3NmRjZTZlNCIsInN1YiI6IjY1MjZmZTI0Y2VkYWM0MDBmZjI5NGZjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hAyDyRXVdGyp06Q-Mv3IsnULszwbHefq20pxibTyQ7c `
          }
        })
  
        const result = await response.json()

        let filteredMovies = dataContext.filteredMovies(result.results, dataContext.state.year)
        const currentFilms = filteredMovies.slice(index.firstIndex, index.lastIndex)
        setFilms(filteredMovies)
        setCurrentFilms(currentFilms)
      }
      catch (error) {
        console.log(error)
      }
    }
    
    useEffect(() => {
      fethcRequest(api)
    }, [])

    const searchFilm = (id, e) => {
      e.preventDefault()
      let newObject = films.filter(film => film.id === id)
      
      dataContext.setFilmInfo(...newObject)
      dataContext.setCurrentId(id)
    }

    return (
        <>
          <div style={{display: "inline-block"}}>
              { 
                films ? (
                  currentFilms.map( film => <CardItem title={film.original_title} url={film.poster_path} id={film.id} searchFilm={searchFilm} />) 
                ) : (
                  <Loading/>
                )
              }
          </div>
        </>
    )
}

export default CardList