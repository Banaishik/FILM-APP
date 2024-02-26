import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import Context from '../../context/Contex';

import "./head.css"

const Head = () => {   
    const dataContext = useContext(Context)

    return (
        <>
            <div className="header">
                    <div className="header_section">
                        <div className="header_item headerlogo">
                            Films
                        </div>
                    </div>
                    {
                    dataContext.state.user ? (
                        <div className="header_section">
                            <div className="header_item headerButton">
                                <Link to="/pageProfile">
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="30" height="30" x="0" y="0" viewBox="0 0 32 32" xmlSpace="preserve"><g><g data-name="Layer 2"><path d="M16 17a6 6 0 1 1 6-6 6 6 0 0 1-6 6zm0-10a4 4 0 1 0 4 4 4 4 0 0 0-4-4z" fill="#afafaf" opacity="1"  className=""></path><path d="M16 31a15 15 0 0 1-11.59-5.49l-.52-.64.52-.63a15 15 0 0 1 23.18 0l.52.63-.52.64A15 15 0 0 1 16 31zm-9.49-6.12a13 13 0 0 0 19 0 13 13 0 0 0-19 0z" fill="#afafaf" opacity="1"></path><path d="M16 31a15 15 0 1 1 11.59-5.49A15 15 0 0 1 16 31zm0-28a13 13 0 1 0 13 13A13 13 0 0 0 16 3z" fill="#afafaf" opacity="1"></path><path d="M5.18 24.88S15.25 36.13 25.5 26l1.32-1.12S18.26 16 9.57 21.33z" fill="#afafaf" opacity="1"></path><circle cx="16" cy="11" r="5" fill="#afafaf" opacity="1"></circle></g></g></svg>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="header_section">
                            <div className="header_item headerButton">
                                <Link to='/createAccount'>
                                    <button className='create_account'>Create Account</button>
                                </Link>
                            </div>
                            <div className="header_item headerButton">
                                <Link to='/LogIn'>
                                    <button className='create_account'>Log in</button>
                                </Link>
                            </div>
                        </div>
                    )
                    }
            </div>
        </>
    )
}

export default Head