import React, {useContext} from "react";
import Context from "../../context/Contex";

import "./pageProfile.css"

const PageProfile = () => {
    const dataContext = useContext(Context)
    const lastLogIn = new Date(parseInt(dataContext.state.userInfo.lastSignIn, 10)).toDateString();

    return (
        <>
            <div className="Details">
                <div className="personal_header">
                    <img className="goBack" onClick={dataContext.goBack}  src="https://static-00.iconduck.com/assets.00/go-back-icon-512x512-hqhqt5j0.png" />
                    <span>Personal Information</span>
                </div>  
                <div><span className="static_info">Email : </span><span className="static_result">{dataContext.state.userInfo.email}</span></div>
                <div><span className="static_info">registration date : </span><span className="static_result">{dataContext.state.userInfo.registr}</span></div>                
                <div><span className="static_info">last log in date : </span><span className="static_result">{lastLogIn}</span></div>              
            </div>        
        </>
    )
}

export default PageProfile