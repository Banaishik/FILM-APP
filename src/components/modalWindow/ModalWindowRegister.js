import React, { useState, useContext } from 'react';
import Context from '../../context/Contex';
import "./modalWindow.css"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const ModalWindowCreate = () => {

    const dataContext = useContext(Context)

    const [check, setChek] = useState(false)
    const [checkPrivaty, setCheckPrivaty] = useState()
    const [gmailEntry, setGmailEntry] = useState(null)
    const [password, setPassword] = useState(null)
    const [etnryNull, setEntryNull] = useState(0)

    const handleCheck = () => {
        setChek(true)
    }

    const handleGmailEntry = (e) => {
        setGmailEntry(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const checkInputs = () => {
        if (gmailEntry === null) {
            setEntryNull(1)
        } else if (password === null) {
            setEntryNull(2)
        } else {
            handleCheck()
        }
    }

    const register = () => {
        if (etnryNull !== 0) {
            alert("fill the window completely")
            return
        }

        createUserWithEmailAndPassword(auth, gmailEntry, password)
            .then((user) => {
                console.log(user)
                setCheckPrivaty(true)
                setGmailEntry("")
                setPassword("")
                setEntryNull("")
            })
            .catch((error) => {
                console.log(error)
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
                                    you need to enter your personal information to register
                                </div>
                                <form onSubmit={register}>
                                    <span>Gmail</span>
                                    <div className="input-container">
                                        <input onChange={handleGmailEntry} className={`${etnryNull === 1 ? "input_error" : "input_normal"}`} placeholder='Gmail'/>
                                    </div>
                                    <span>password</span>
                                    <div className="input-container">
                                        <input onChange={handlePassword} className={`${etnryNull === 2 ? "input_error" : "input_normal"}`} placeholder='password' />
                                    </div>                                    
                                </form>
                                <button className='next' onClick={() => {
                                    register()
                                    checkInputs()
                                }}>create</button> 
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default ModalWindowCreate

