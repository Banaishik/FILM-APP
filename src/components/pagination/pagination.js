import {useContext, useEffect, useState} from "react";
import Context from "../../context/Contex";
import ItemCountPagination from "./itemPagesCount";

import "./pagination.css"

function MyPagination() {
  const dataContext = useContext(Context)
  const {setIndex} = dataContext
  const {films} = dataContext.state
  const [currentPage, setCurrentPage] = useState(1)
  const [countPages, setCountPages] = useState([])
  const [maxPages, setMaxPage] = useState(0)
  const [countFilms, setCountFilms] = useState(null)

  const handleChange = (item) => {
    setCurrentPage(item)
    setIndex(item, countFilms)
    console.log(countFilms)
  }

  const handleChangeNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const handleChangeBackPage = () => {
      setCurrentPage(currentPage - 1)   
  }

  const Pagination = async (data) => {
    let maxPage = Math.ceil(data.length / 3)
    setMaxPage(maxPage)

    let count = []

    for(let i = 0; i < maxPage; i++) {
      count = [...count, i+1]
    }

    setCountPages([...count])
  }

  useEffect(() => {
    Pagination(films)
    setCountFilms()
    setCountFilms(Math.floor((window.innerWidth - 450) / dataContext.state.widthCard))
  }, [films, dataContext.state.widthCard])

  return (
    <>
      <div className="contains">
      </div>
      <div className="">
        <span className="button_pagination" onClick={handleChangeBackPage}>
          <img src="https://cdn-icons-png.flaticon.com/512/271/271220.png "/>
        </span>
        <div className="pages">
          {ItemCountPagination(countPages, currentPage, handleChange)}
        </div>
        <span className="button_pagination" onClick={handleChangeNextPage}>
          <img src="https://cdn-icons-png.flaticon.com/512/271/271228.png"/>
        </span>
      </div>
    </>
  )
}

export default MyPagination;