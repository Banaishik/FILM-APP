import React, { useState, useContext } from 'react';
import Context from '../../context/Contex';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import "./modalWindow.css"
import { auth } from '../../firebase';

const ModalWindowLogIn = () => {

    const dataContext = useContext(Context)

    const [check, setChek] = useState(false)
    const [checkPrivaty, setCheckPrivaty] = useState()
    const [gmail, setGmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [etnryNull, setEntryNull] = useState(0)

    const handleCheck = () => {
        setChek(true)
    }

    const handleGmail = (e) => {
        setGmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const checkInputs = () => {
        if (gmail === null) {
            setEntryNull(1)
        } else if (password === null) {
            setEntryNull(2)
        } else {
            handleCheck()
        }
    }

    const register = () => {
        signInWithEmailAndPassword(auth, gmail, password)
            .then((dataUser) => {
                console.log(dataUser);
                dataContext.setInfoPageProfil(dataUser.user.reloadUserInfo.email, dataUser.user.metadata.creationTime, dataUser.user.metadata.lastLoginAt)
                setCheckPrivaty(true)
                setGmail("")
                setPassword("")
                setEntryNull("")                
            })
            .catch((error) => {
                console.log(error);
                setCheckPrivaty(false)
            })
    }

    return (
        <>
            <div className='wrapper_modal_main'>
                <div className='wrapper_modal'>
                    {
                        check ? (
                            <div>
                                {
                                    checkPrivaty ? (
                                        <div>
                                            <div className='success'>
                                                <div>
                                                    <img src='https://static.tildacdn.com/tild6566-6462-4934-b837-366632346562/tild6535-6634-4131-b.png' alt='200' />   
                                                </div>
                                                <div><h3>you are logged into your account</h3></div>
                                            </div>
                                            <button 
                                                className='next' 
                                                onClick={() => {
                                                    dataContext.goBack()
                                                    dataContext.userSign()
                                                }}
                                            >Next</button>
                                        </div>
                                        
                                    ) : (
                                        <div>
                                            <div className='success'>
                                                <div>
                                                    <img src='https://creazilla-store.fra1.digitaloceanspaces.com/emojis/48895/cross-mark-emoji-clipart-sm.png' alt='200' />   
                                                </div>
                                                <div><h3>could not find account</h3></div>
                                            </div>
                                            <button 
                                                className='next' 
                                                onClick={() => {
                                                    dataContext.goBack()
                                                }}
                                            >Next</button>
                                        </div>  
                                    )
                                }

                            </div>
                        ) : (
                            <div>
                                <div className='title'>
                                    Personal info
                                </div>
                                <div className='description'>
                                    you need to enter your personal details to login
                                </div>
                                <span>Gmail</span>
                                <div className="input-container">
                                    <input onChange={handleGmail} className={`${etnryNull === 1 ? "input_error" : "input_normal"}`} placeholder='Gmail'/>
                                </div>
                                <span>password</span>
                                <div className="input-container">
                                    <input onChange={handlePassword} className={`${etnryNull === 2 ? "input_error" : "input_normal"}`} placeholder='password' />
                                </div>
                                <button className='next' onClick={() => {
                                    register()
                                    checkInputs()
                                }}>Log in</button>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default ModalWindowLogIn