import React, { useState, useContext } from "react";
import Context from "../../context/Contex";

import "./slider.css"

const Slider = () => {
    const dataContext = useContext(Context)
    const [value, setValue] = useState(0)

    const hadleChange = (e) => {
        setValue(e.target.value)
        dataContext.setReleaseYear(value)
    }

    return (
        <div className="slidecontainer">
            <input
                type="range"
                min="1970"
                max="2024"
                // value={value}
                className="slider"
                id="myRange"
                onChange={hadleChange}
                onMouseUp={() => dataContext.rerenderFilms()}
                defaultValue={dataContext.state.year}
            />
            <span>Year {value}</span>
        </div>
    )
}

export default Slider