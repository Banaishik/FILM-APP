import React, {useState, useReducer, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reducer from './store/reducer/reducer';
import Head from './components/head/head';
import Footer from './components/footer/footer';
import Filter from "./components/filter/filter";
import CardList from './components/cardList/cardList';
import FilmInfo from "./components/filmInfo/filmInfo";
import Context from './context/Contex';
import ModalWindowCreate from './components/modalWindow/ModalWindowRegister';
import ModalWindowLogIn from './components/modalWindow/ModalWindowLogIn';
import PageProfile from './components/pageProfile/pageProfile';
import { 
  actionSetSort,
  actionSetIndexFilms,
  actionSetRerenderKey,
  actionSetFilmInfo,
  actionSetFilmSearch,
  actionSetValue,
  actionSetOpen,
  actionSetFavorite,
  actionSetCurrentId,
  actionSetArrayIds,
  actionSetFavoriteFilms,
  actionSetIdDelete,
  actionSetReleaseYears,
  actionSetUsers,
  actionDeleteUsers,
  actionUserInfo,
  actionSetFilms,
  actionSetCurrentFilms,
  actionSetWidthCard
} from './store/actions/actions'
import { initialState, Api } from './store/defaultValue/defaultValue';

import "./App.css"

function App() {

  const [state, dispatch] = useReducer(reducer , initialState)
  const [keyForRender, setKeyForRender] = useState(1)

  const idFavoriteFilms = JSON.parse(localStorage.getItem('id'))
  let apiSerach = `https://api.themoviedb.org/3/search/movie?query=${state.value }&include_adult=false&language=en-US&page=1`

  const rerenderFilms = () => {
    setKeyForRender(keyForRender + 1)
  }

  const checkIdFavoriteArray = () => {
    if (idFavoriteFilms) {
        setArrayIds([...idFavoriteFilms])
    } else {
      return null
    }
  }

  const addFavoriteFilm = (id) => {
    let idsFilms = JSON.parse(localStorage.getItem('id'))
    let mainArray

    const addToStorage = () => {
      if (idsFilms.indexOf(id) === -1) {
        mainArray = [...idsFilms, id]
      } else {
        mainArray = idsFilms.filter(myId => myId !== id)
        deleteFavoriteFilm(id)
      }
    }

    if (idsFilms) {
      console.log("STATUS CODE 200");
      addToStorage()
      localStorage.setItem('id', JSON.stringify(mainArray) )
      // setArrayIds([...mainArray])
      dispatch(actionSetArrayIds([...mainArray]))
    } else {
      mainArray = [id]
      localStorage.setItem('id', JSON.stringify(mainArray) )
      // setArrayIds([...mainArray])
      dispatch(actionSetArrayIds([...mainArray]))
    }
  }

  const fethcRequest = async (id) => {
    await fetch( 'https://api.themoviedb.org/3/account/20556095/favorite', {
      method : "POST",
      headers : {
        'Authorization' : `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzVhYzY5MGEzZmMzYzVmNzBhN2UzY2M3NmRjZTZlNCIsInN1YiI6IjY1MjZmZTI0Y2VkYWM0MDBmZjI5NGZjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hAyDyRXVdGyp06Q-Mv3IsnULszwbHefq20pxibTyQ7c `,
        'Content-Type' : 'application/json'
      },  
      body : JSON.stringify({ "media_type": "movie", "media_id": id, "favorite": true })

    })

    .then(response => response.json())
    .catch((error) => console.error('Ошибка:', error));        
  }  

  const setFavoriteFilm = async (arrayId) => {
    try {
      arrayId.forEach(id => fethcRequest(id)); 
    }
    catch (error) {
      console.log(error)
    }
  }

  const deleteFavoriteFilm =  (id) => {
    try {
      
      fetch( 'https://api.themoviedb.org/3/account/20556095/favorite', {
      method : "POST",
      headers : {
        'Authorization' : `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzVhYzY5MGEzZmMzYzVmNzBhN2UzY2M3NmRjZTZlNCIsInN1YiI6IjY1MjZmZTI0Y2VkYWM0MDBmZjI5NGZjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hAyDyRXVdGyp06Q-Mv3IsnULszwbHefq20pxibTyQ7c `,
        'Content-Type' : 'application/json'
      },  
      body : JSON.stringify({ "media_type": "movie", "media_id": id, "favorite": false })

      })

      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Ошибка:', error));        
      
      
    }
    catch (error) {
      console.log(error)
    }
  }  

  const goBack = () => {
    window.history.back()
    setFavorite(!state.favorite)
  }

  const setReting = () => {
    dispatch(actionSetSort(false, true))
  }

  const setIndex = (index, count) => {

    setKeyForRender(keyForRender + 1)
    dispatch(actionSetIndexFilms(index, count))
  }

  const setRerenderKey = () => {
    dispatch(actionSetRerenderKey())
  }

  const setFilmInfo = (array) => {
    dispatch(actionSetFilmInfo(array))
  }

  const setFilmSearch = (film) => {
    dispatch(actionSetFilmSearch(film))
  }

  const setValue = (value) => {
    dispatch(actionSetValue(value))
  }

  const setOpenRequest = (openArray) => {
    dispatch(actionSetOpen(openArray))
  }

  const setOpenConfirm = (openArray) =>  {
    dispatch(actionSetOpen(openArray))
  }

  const setFavorite = (favorite) => {
    dispatch(actionSetFavorite(favorite))
  }

  const setCurrentId = (id) => {
    dispatch(actionSetCurrentId(id))
  }

  const setArrayIds = (currentIds) => {
    dispatch(actionSetArrayIds(currentIds))
  }

  const setFavoriteFilms = (array) => {
    dispatch(actionSetFavoriteFilms(array))
  }

  const setIdDelete = (id) => {
    dispatch(actionSetIdDelete(id))
  }

  const setReleaseYear = (year) => {
    dispatch(actionSetReleaseYears(year))
  }

  const filteredMovies = (dataFilms, year) => {
    let films = dataFilms.filter(film => new Date(film.release_date).getFullYear() >= year)
    return films
  }

  const userExit = () => {
    dispatch(actionDeleteUsers())
  }

  const userSign = () => {
    dispatch(actionSetUsers())
  }

  const setInfoPageProfil = (email, dateCreateProfil, lastLogIn) => {
    dispatch(actionUserInfo({email : email, registr : dateCreateProfil, lastSignIn : lastLogIn}))
    console.log({email : email, registr : dateCreateProfil, lastSignIn : lastLogIn})
  }

  const setFilms = (arrayFilms) => {
    dispatch(actionSetFilms(arrayFilms))
  }

  const setCurrentFilms = (arrayFilms) => {
    dispatch(actionSetCurrentFilms(arrayFilms))
  }

  const setWidthCard = (width) => {
    dispatch(actionSetWidthCard(width))
  }

  useEffect(() => {
      checkIdFavoriteArray()
  }, [])

  useEffect(() => {
    if (state.ids) {
      setFavoriteFilm(state.ids)
    }
  }, [state.ids])

  useEffect(() => {
    if (state.idDelete) {
      deleteFavoriteFilm(state.idDelete)
    }
  }, [state.idDelete])

  const contextValue = {
    rerenderFilms,
    goBack,
    setReting,
    setIndex,
    setRerenderKey,
    setFilmInfo,
    setFilmSearch,
    setValue,
    setOpenRequest,
    setOpenConfirm,
    setFavorite,
    setCurrentId,
    setArrayIds,
    setFavoriteFilms,
    setIdDelete,
    dispatch,
    addFavoriteFilm,
    setReleaseYear,
    filteredMovies,
    userExit,
    userSign,
    setInfoPageProfil,
    setFilms,
    setCurrentFilms,
    setWidthCard,
    state
  }

  return (
    <div className='app'>
      <Context.Provider value={contextValue}>
            <BrowserRouter>
            <div className='wrapper'>
              <Head/>
              <Filter/>
              <div className='content_block' key={keyForRender}>
                <Routes>
                  <Route path='/searchFilms' element={<CardList api={apiSerach}/>}/>
                  <Route path='/' element={<CardList api={Api.apiPopular}/>}/>
                  <Route path='/popular' element={<CardList api={Api.apiPopular}/>}/>
                  <Route path='/rating' element={<CardList api={Api.apiRating}/>}/>
                  <Route path='/favorites' element={<CardList api={Api.apiFavorite}/>}/>
                  <Route path='/detailsFilm' element={<FilmInfo />}/>
                  <Route path='/createAccount' element={<ModalWindowCreate/>}/>
                  <Route path='/LogIn' element={<ModalWindowLogIn/>}/>
                  <Route path='/pageProfile' element={<PageProfile/>}/>
                </Routes>
              </div>
              <Footer/>
            </div>
            </BrowserRouter>
      </Context.Provider>
    </div>
  )
}
export default App;