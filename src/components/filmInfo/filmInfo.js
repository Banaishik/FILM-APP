import React, {useState, useEffect, useContext} from "react"
import Context from "../../context/Contex";
import "./filmInfo.css"

const FilmInfo = () => {
    const dataContext = useContext(Context)
    const [data, setData] = useState([])
    const [actors, setActors] = useState([])
    const [isFavorite, setIsFavorite] = useState()
    let currentId = dataContext.state.currentId 
    let favorite = dataContext.state.ids

    const getDetailsFilms = async (id) => {
        try {
            const response = await fetch (`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
                method : "GET", 
                headers : {
                    'Authorization' : `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzVhYzY5MGEzZmMzYzVmNzBhN2UzY2M3NmRjZTZlNCIsInN1YiI6IjY1MjZmZTI0Y2VkYWM0MDBmZjI5NGZjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hAyDyRXVdGyp06Q-Mv3IsnULszwbHefq20pxibTyQ7c `,
                    'Content-Type' : 'application/json'
                }
            })

            const result = await response.json()
            setData(result)            
        }
        catch (error) {
            console.log(error);
        }

    }

    const getActorsFilms = async (id) => {
        try {
            const response = await fetch (`https://api.themoviedb.org/3/movie/${id}/credits`, {
                method : "GET", 
                headers : {
                    'Authorization' : `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzVhYzY5MGEzZmMzYzVmNzBhN2UzY2M3NmRjZTZlNCIsInN1YiI6IjY1MjZmZTI0Y2VkYWM0MDBmZjI5NGZjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hAyDyRXVdGyp06Q-Mv3IsnULszwbHefq20pxibTyQ7c `,
                    'Content-Type' : 'application/json'
                }
            })
            const result = await response.json()

            if (result.cast === undefined) {
                alert('error')
            } else {
                const mainActors = result.cast.slice(0, 4)
                setActors(mainActors)      
            }            
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleFavorite = (id) => {
        dataContext.addFavoriteFilm(id)

        if (favorite.indexOf(currentId) === -1) {
            setIsFavorite(isFavorite)
        } else {
            setIsFavorite(!isFavorite)
        }
    }

    useEffect(() => {
        try {
            getDetailsFilms(currentId)
            getActorsFilms(currentId)                 
        }
        catch (error) {
            console.log(`error with fetch request ${error}`);
        }
    }, [])

    useEffect(() => {
        try {
            if (favorite.indexOf(currentId) === -1) {
                setIsFavorite(isFavorite)
            } else {
                setIsFavorite(!isFavorite)
            }
        }
        catch(error) {
            console.log(error);
        }
    }, [favorite, currentId])


    return (
        <div className="wrapper_info">
            <div className="header_info">
                <img className="goBack" onClick={dataContext.goBack}  src="https://static-00.iconduck.com/assets.00/go-back-icon-512x512-hqhqt5j0.png" />
                <spam>{data.title }</spam>
            </div>
            {
                isFavorite ? (
                    <div className="icons_favorite" onClick={() => handleFavorite(currentId)}>
                        <img src="https://cdn.icon-icons.com/icons2/3997/PNG/512/archive_bookmark_save_appreciation_support_appreciate_icon_254064.png" />
                    </div>                 
                ) : (
                    <div className="icons_favorite" onClick={() => handleFavorite(currentId)}>
                        <img src="https://cdn.icon-icons.com/icons2/3997/PNG/512/archive_bookmark_save_appreciation_support_appreciate_icon_254080.png" />
                    </div>
                )
            }
            <div className="film_info">
                <div className="Details">
                    <h1>Details</h1>
                    <div><span className="static_info">Year : </span><span className="static_result">{data.release_date}</span></div>                 
                    <div><span className="static_info">Time : </span><span className="static_result">{data.runtime} minutes</span></div>                
                    <div><span className="static_info">Budget : </span><span className="static_result">{data.budget}</span></div>              
                </div>
                <div className="Details">
                    <h1>Actors</h1>
                    {
                        actors.map(actor => <div  className="static_info">{actor.name}</div>)
                    }
                </div>
            </div>
            <div className="image_film">
                <img src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`} alt="myImage film"/>
            </div>
        </div>
    )
}


export default FilmInfo