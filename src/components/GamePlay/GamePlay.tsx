import React, { useState, useMemo, useEffect } from "react";
import ChooseNumber from "../ChooseNumber/ChooseNumber";
import GameField from "../GameField/GameField";
import GameOverComponent from "../GameOver/GameOverComponent";
import "./GamePlay.css"
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import RestartPopUp from "../RestartPopUp/RestartPopUp";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import SettingsPage from "../SettingsPage/SettingsPage";
import {useOnlineStatus, aiMove} from "../../customHooks/aiMove";
//import { bober, kenguru, leveneia } from '../ImagesLinks';


const isOdd = (num: number): boolean => num % 2 !== 0;
const isEven = (num: number): boolean => num % 2 === 0;

function gameOver(amountOfMatches: number){
    return amountOfMatches <= 0;
}




function GamePlay(){

    // const gl_max = useMemo(() => {
    //     return GLOBAL_MAXIMUM;
    // }, [GLOBAL_MAXIMUM]);

    const testMyHook = useOnlineStatus();

    const [amountToSet, setAmountToSet] = useState(25);
    const [maxToSet, setMaxToSet] = useState(3);
    const [userToSet,setUserToSet] = useState(true);

    const handleAmount = (val : number) => {
        setAmountToSet(val);
    }
    const handleMax = (val : number) => {
        setMaxToSet(val);
    }
    const handleUser = (val : boolean) => {
        setUserToSet(val);
    }
   


    const [error, setError] = useState("");

    const [userValueTakes, setUserValueTakes] = useState(0);

    const [humanSum, setHumanSum] = useState(0);
    const [computerSum, setComputerSum] = useState(0);

    const [amountOfMatches, setAmountOfMatches] = useState(amountToSet);

    const [maximum, setMaximum] = useState(maxToSet);

    const [computerFirst, setComputerFirst] = useState(false);
    const [winner,setWinner] = useState("");
    const [userFirst, setUserFirst] = useState(userToSet);

    const perelom = useMemo(() => {
        return (maximum % 2 === 0) ? maximum + 2 : maximum + 1;
    }, [maximum]);

    const need_even = useMemo(() => 
    {
        return (maximum % 2 === 0) ? true : false;
    }, [maximum]);


    useEffect(() => {
        if(gameOver(amountOfMatches)) openOverlay();
        if(maximum > amountOfMatches) setMaximum(amountOfMatches);
    }, [amountOfMatches]);

    function onChange(newValue: number){
        // console.log("Value changes from gameplay " + userValueTakes);
        setUserValueTakes(newValue);
    }

    
    const OnClickButton = async () => {
        if(userValueTakes > maximum){
            setError("You are trying to take too much. Maximum is " + maximum);
        }
        else if(userValueTakes < 1){
            setError(testMyHook.toString());
        }
        else{
            setError("");
            // console.log("ALL good! from gamePlay " + userValueTakes + " " + maximum);
            setComputerFirst(true);
            // console.log("PERELOM " + perelom );
            

        //      setAmountOfMatches(prevAmount => {
        //     const newAmount = prevAmount - userValueTakes;
        //     // console.log("amount after user: " + newAmount); // Log the updated value
        //     return newAmount; // Return the new state
        // });
        const newAmount = amountOfMatches - userValueTakes;
        setAmountOfMatches(newAmount);
        setHumanSum(humanSum + userValueTakes);
        await new Promise(resolve => setTimeout(resolve, 100));

        // console.log("amount after human: " + amountOfMatches);
        if(gameOver(newAmount)){
            computerGo(false, newAmount);
        }
        else{
            // console.log("before computer" + amountOfMatches);
            computerGo(true, newAmount);
        }

        }
    }

    const computerGo = async (can_go : boolean, amount : number) => {
        if(can_go){
        const computerMove = aiMove(maximum, amount, perelom, computerSum, humanSum, need_even);
        setAmountOfMatches(amount-computerMove);
    
        setComputerSum(computerSum + computerMove);
    }
        setComputerFirst(false);
    
    }

    const restart = () => {
        setAmountOfMatches(amountToSet);
        setComputerSum(0);
        setHumanSum(0);
        setMaximum(maxToSet);
        setUserFirst(userToSet);
    }

    const declareWinner = () => {
        if(isEven(computerSum)){
            setWinner("Computer won!");
        }
        else{
            setWinner("You won!");
        }
    }

    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    const openOverlay = () => {
        declareWinner();
        setIsOverlayOpen(true);
    };

    const closeOverlay = () => {
        restart();
        setIsOverlayOpen(false);
    };


    const [isRestartOpen, setIsRestartOpen] = useState(false);

    
    const openRestart = () => {
        setIsRestartOpen(true);
    };

    const closeRestart = () => {
        setIsRestartOpen(false);
    };

    const yesRestart = () => {
        restart();
        closeRestart();
    }

    const [isStarted, setIsStarted ] = useState(false);
    const startPlay = () => {
        setIsStarted(true);
        if(!userFirst){
            computerGo(true, amountOfMatches);
        }
    }

    const [isSettings, setIsSettings] = useState(false);

    const openSettings = () => {
        setIsSettings(true);
    };

    const closeSettings = () => {
        setIsSettings(false);
    };

 

    return(
        <>
        <div className="GamePlay">
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", width:"100%"}}>
            <button className="GamePlay-restart-button" onClick={openRestart}> 
                <RestartAltIcon sx={{fontSize:"40px", fontWeight:"500"}}/>
            </button>
            <RestartPopUp isOpen={isRestartOpen} onClose={closeRestart} onRestart={yesRestart}/>
            {/* <button className="GamePlay-restart-button" onClick={openSettings}> 
                <SettingsIcon sx={{fontSize:"40px", fontWeight:"500"}}/>
            </button>
            <SettingsPage
        isOpen={isSettings}
        onClose={closeSettings}
        onMax={handleMax}
        onAmount={handleAmount}
        onUser={handleUser}
        am={amountToSet}
        user={userToSet}
        max={maxToSet}
      /> */}
            </div>
            <p className="GamePlay-matches" style={{color:"#000000", fontStyle:"italic", fontWeight:"700"}}>THE GAME</p>

            <p className="GamePlay-matches">
                    {amountOfMatches} matches left
            </p>
            <div className="GamePlay-score-container">
                <p style={{
                    color:"#3AAC34"
                    }} 
                    className="GamePlay-score">
                        Your score: {humanSum} </p>
                <p  style={{
                    color:"#FF2E2E"
                }} className="GamePlay-score">
                    
                    Computer score: {computerSum}</p>
            </div>
            <GameField numOfEmojis={amountOfMatches}/>
            <button className="GamePlay-restart-button"  onClick={startPlay} style={{display: isStarted ? "none" :  "flex" }}>
                <PlayCircleFilledIcon 
                sx={{
                    fontSize:"60px", fontWeight:"500"
                }}/>
            </button>
            <ChooseNumber gameStarted={isStarted} maximum={maximum} onChange={onChange} userTakes ={userValueTakes} buttonOn={computerFirst}  OnClickButton={OnClickButton} errorFromParent={error}/>
            <GameOverComponent isOpen={isOverlayOpen} onClose={closeOverlay} winnerText={winner} compSum={computerSum} humSum={humanSum}/>
            
               
            
        </div>
        </>
    )
}

export default GamePlay;