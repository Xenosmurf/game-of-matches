import React from "react";
import "./RestartPopUp.css";

interface RestartProps {
    isOpen: boolean;
    onClose: () => void;
    onRestart: () => void; // Callback to close the overlay
}

const RestartPopUp = ({isOpen, onClose, onRestart} : RestartProps) => {
    if(!isOpen) return null;
    return(
        <>
        <div className="RestartPopUp">
        <div className="RestartPopUp-content">
            <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <p style={{fontSize:"18px", fontWeight:"500", width:"100%"}}>Do you want to restart?</p>
                <div className="RestartPopUp-button-container">
                    <button className="RestartPopUp-button" onClick={onRestart}>Yes</button>
                    <button className="RestartPopUp-button" onClick={onClose}>No</button>
                </div>
                
                </div>
            </div>
    </div>
        </>
    )
}

export default RestartPopUp;