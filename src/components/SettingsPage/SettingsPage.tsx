// import React, { useState } from "react";
// import "./SettingsPage.css";
// import CloseIcon from '@mui/icons-material/Close';

// interface SettingsPageProps {
//     isOpen: boolean;
//     am:number;
//     max:number;
//     user:boolean;
//     onClose: () => void; 
//     onUser: (val:boolean) => void;
//     onMax: (val:number) => void;
//     onAmount: (val:number) => void;

// }


// const SettingsPage = ({isOpen, onClose, onUser, onAmount, onMax, am, max, user} : SettingsPageProps) => {

//     const [a, setA] = useState(am);
//     const [m, setM] = useState(max);
//     const [u, setU] = useState(user);
//         if(!isOpen) return null;


//     const onA = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const newV = parseInt(e.target.value, 10) || 0; 
//         setA(newV);
//         onAmount(newV);
//         console.log("A " + a );
//     }

//     const onM = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const newV = parseInt(e.target.value, 10) || 0; 
//         setM(newV);
//         onMax(newV);
//         console.log("M " + m );

//     }

//     const onU = (newV : boolean) => {
       
//         setU(newV);
//         onUser(newV);
//         console.log("U " + u );

//     }

//     return (
//         <>
//         <div className="SettingsPage">
//         <div className="SettingsPage-content">
//                 <button className="SettingsPage-close-button" onClick={onClose}>
//                     <CloseIcon/>
//                 </button>
//                 <div className="SettingsPage-text-container">
//                     <p className="SettingsPage-big-text" >Enter n. 2n + 1 - amount to mathes to take</p>
//                     <input className="SettingsPage-input-str" value={a} onChange={onA} 
//                     onKeyPress={(event) => {
//                     if (!/[0-9]/.test(event.key)) {
//                     event.preventDefault();
//                     }
//                 }}></input>
//                     <p className="SettingsPage-big-text"> m - maximum move per turn</p>
//                     <input className="SettingsPage-input-str" value={m} onChange={onM}  
//                     onKeyPress={(event) => {
//                     if (!/[0-9]/.test(event.key)) {
//                     event.preventDefault();
//                     }
//                 }}></input>
//                     <p className="SettingsPage-big-text"> You go first </p>
//                     <input type="checkbox" checked={u} onChange={() => onU(u)}></input>
//                 </div>
//             </div>
//     </div>
//         </>
//     )
// }

// export default SettingsPage;

import React, { useState, useEffect } from "react";
import "./SettingsPage.css";
import CloseIcon from '@mui/icons-material/Close';

interface SettingsPageProps {
    isOpen: boolean;
    am: number; // amount of matches
    max: number; // maximum move per turn
    user: boolean; // user goes first
    onClose: () => void;
    onUser: (val: boolean) => void;
    onMax: (val: number) => void;
    onAmount: (val: number) => void;
}

const SettingsPage = ({ isOpen, onClose, onUser, onAmount, onMax, am, max, user }: SettingsPageProps) => {
    const [a, setA] = useState(am); // amount of matches state
    const [m, setM] = useState(max); // maximum move per turn state
    const [u, setU] = useState(user); // user first state

    // When props change, sync the state with them
    useEffect(() => {
        setA(am);
        setM(max);
        setU(user);
    }, [am, max, user]);

    if (!isOpen) return null;

    // Handler for amount of matches
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = parseInt(e.target.value, 10) || 0;
        setA(newVal);
        onAmount(newVal);
    };

    // Handler for maximum move per turn
    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = parseInt(e.target.value, 10) || 0;
        setM(newVal);
        onMax(newVal);
    };

    // Handler for user going first checkbox
    const handleUserFirstChange = () => {
        const newVal = !u;
        setU(newVal);
        onUser(newVal);
    };

    return (
        <div className="SettingsPage">
            <div className="SettingsPage-content">
                <button className="SettingsPage-close-button" onClick={onClose}>
                    <CloseIcon />
                </button>
                <div className="SettingsPage-text-container">
                    <p className="SettingsPage-big-text">Enter n. 2n + 1 - amount of matches to take</p>
                    <input
                        className="SettingsPage-input-str"
                        type="number"
                        value={a}
                        onChange={handleAmountChange}
                    />

                    <p className="SettingsPage-big-text">Maximum move per turn</p>
                    <input
                        className="SettingsPage-input-str"
                        type="number"
                        value={m}
                        onChange={handleMaxChange}
                    />

                    <p className="SettingsPage-big-text">You go first</p>
                    <input
                        type="checkbox"
                        checked={u}
                        onChange={handleUserFirstChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
