import React from "react";
import "./GameOverComponent.css";
import CloseIcon from '@mui/icons-material/Close';


interface GameOverComponentProps {
    isOpen: boolean;
    onClose: () => void; // Callback to close the overlay
    winnerText : string;
    compSum: number;
    humSum: number;
}

const  GameOverComponent = ({isOpen, onClose, winnerText, compSum, humSum} : GameOverComponentProps) =>{

    if (!isOpen) return null; 

    return (
    <>
    <div className="GameOverComponent">
        <div className="overlay-content">
                <button className="close-button" onClick={onClose}>
                    <CloseIcon/>
                </button>
                <div className="GameOverComponent-text-container">
                    <p className="GameOverComponent-big-text" >No matches left</p>
                    <p className="GameOverComponent-big-text" style={{fontWeight:"600", fontSize:"25px"}}>{winnerText}</p>
                    <p style={{marginBottom:"0"}}>Your score: {humSum}</p>
                    <p style={{marginTop:"0"}}>Computer score: {compSum}</p>
                </div>
            </div>
    </div>
    </>
    )
}

export default GameOverComponent;