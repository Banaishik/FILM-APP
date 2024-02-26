import React, { useState, useContext } from "react";
import Context from "../../context/Contex";
import Slider from "../slider/slider";
import { Link } from 'react-router-dom';

import './filter.css'

const Filter = () => {
    const dataContext = useContext(Context)
    const [valueInput, setValueInput] = useState('')
    const [currentButton, setCurrentButton] = useState(1)

    const handleChangeValue = () => {
        if (valueInput) {
            dataContext.setValue(valueInput)
            dataContext.rerenderFilms()            
        } else {
            console.log('none');
        }
    }

    return (
        <>
            <div className="filter">
                <div className="header_filter">Filter</div>
                <div>
                    <input value={valueInput} onChange={(e) => setValueInput(e.target.value)} className="input_search"/>
                    <Link to='/searchFilms'>
                        <button className="search_films_button" onClick={handleChangeValue}>search</button>
                    </Link>
                </div>
                <div className="links">
                    <Link to='/popular'>
                        <button onClick={() => {
                            dataContext.rerenderFilms()
                            setCurrentButton(1)  
                        }} className={`${currentButton === 1 ? 'filter_button active' : "filter_button" }`}>Popular</button>
                    </Link>       
                    <Link to='/rating'>
                        <button onClick={() => {
                            dataContext.rerenderFilms()
                            setCurrentButton(2)  
                        }}  className={`${currentButton === 2 ? 'filter_button active' : "filter_button" }`}>Rating</button>
                    </Link>       
                    <Link to='/favorites'>
                        <button onClick={() => {
                            dataContext.rerenderFilms()
                            setCurrentButton(3)  
                        }}  className={`${currentButton === 3 ? 'filter_button active' : "filter_button" }`}>Favorites</button>
                    </Link>   
                    <Link to='/popular'>
                        <button onClick={() => {
                            dataContext.rerenderFilms()
                            setCurrentButton(4)  
                        }}  className={`${currentButton === 4 ? 'filter_button active' : "filter_button" }`}>Home</button>
                    </Link>         
                </div>
                <Slider/>
            </div>
        </>
    );
}

export default Filter
