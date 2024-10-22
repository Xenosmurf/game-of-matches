import React, { useState } from "react";
import "./ChooseNumber.css";
import "./TakeButton.css";

interface ChooseNumberProps{
    buttonOn: boolean;
    userTakes : number;
    maximum : number;
    onChange: (e: any) => void;
    OnClickButton: () => void;
    errorFromParent: string;
    gameStarted : boolean;
    
}


const ChooseNumber = ({onChange, userTakes, buttonOn, OnClickButton, errorFromParent, gameStarted} : ChooseNumberProps) => {

    const [amountToTake, setAmountToTake] = useState(userTakes);
    const [error,setError] = useState(errorFromParent);

    const internalOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = parseInt(e.target.value, 10) || 0; 
        setAmountToTake(newVal); 
        onChange(newVal); 
        // console.log("CHOOSENUMBER VALUE:" + (newVal + 3) );
      };

    return(
        <>
            <div style={{display:  gameStarted ? "flex" : "none", flexDirection:"row"}}>
                
                <input 
                name="myInput"  
                className="ChooseNumber"
                value={amountToTake}
                onChange={internalOnChange}
                maxLength={10}
                onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                    }
                }}
                />
                <button className="TakeButton" onClick={OnClickButton} disabled={buttonOn}>Take</button>
            </div>
            <p>{errorFromParent}</p>

        </>
    )
}
export default  ChooseNumber;