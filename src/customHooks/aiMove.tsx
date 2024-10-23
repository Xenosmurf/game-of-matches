import React , {useState, useEffect} from "react";

export  function useOnlineStatus() {
    const [isOnline, setIsOnline] = useState(true);
    useEffect(() => {
      function handleOnline() {
        setIsOnline(true);
      }
      function handleOffline() {
        setIsOnline(false);
      }
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }, []);
    return isOnline;
  }


//   function veryNewMove(MAXIMUM_MOVE : number, AMOUNT_OF_MATCHES : number, PERELOM : number, COMPUTER_SUM :number, HUMAN_SUM : number, NEED_EVEN : boolean) : number {

//     if(MAXIMUM_MOVE > AMOUNT_OF_MATCHES) MAXIMUM_MOVE=AMOUNT_OF_MATCHES;
//     // console.log("max:" + MAXIMUM_MOVE);
//     // console.log("AMOUNT: " + AMOUNT_OF_MATCHES);

//     if(AMOUNT_OF_MATCHES <= PERELOM){
//         console.log("WHERE PERELOM MATTERS: " + PERELOM);
//         console.log("WHERE AMOUNT MATTERS: " + AMOUNT_OF_MATCHES);
//         console.log("WHERE MAXIMUM MATTERS: " + MAXIMUM_MOVE);
//         if(isOdd(COMPUTER_SUM)){
//             for(let j  = MAXIMUM_MOVE; j > 0; j--){
//                 if( isEven(j + COMPUTER_SUM) && isOdd((AMOUNT_OF_MATCHES - j) + HUMAN_SUM)){
//                     return j;

//                 }
               
//             }
//         }
//         if(isEven(COMPUTER_SUM)){
//             for(let j = MAXIMUM_MOVE; j > 0; j--){
//                 if( isEven(j)){
//                     return j;
//                 }
//             }
//         }
//     }

//     if(AMOUNT_OF_MATCHES <= (PERELOM*2) && AMOUNT_OF_MATCHES > PERELOM){
//         for(let i = MAXIMUM_MOVE; i > 0; i--){
//                 if(((AMOUNT_OF_MATCHES - i) % PERELOM) === 0){
//                      return i;
                    
//                 }
//             }
//     }

//     // 
//     for(let i = MAXIMUM_MOVE; i > 0; i--){
//         if(NEED_EVEN){
//             if(isEven(i+COMPUTER_SUM)) return i;
//         }
//         else{
//             if(isOdd(i+COMPUTER_SUM)) return i;

//         }
//     }

//     return 1;
// }


const isOdd = (num: number): boolean => num % 2 !== 0;
const isEven = (num: number): boolean => num % 2 === 0;

  export  function aiMove (MAXIMUM_MOVE : number, AMOUNT_OF_MATCHES : number, PERELOM : number, COMPUTER_SUM :number, HUMAN_SUM : number, NEED_EVEN : boolean) : number{
    if(MAXIMUM_MOVE > AMOUNT_OF_MATCHES) MAXIMUM_MOVE=AMOUNT_OF_MATCHES;
        // console.log("max:" + MAXIMUM_MOVE);
        // console.log("AMOUNT: " + AMOUNT_OF_MATCHES);
    
        if(AMOUNT_OF_MATCHES <= PERELOM){
            console.log("WHERE PERELOM MATTERS: " + PERELOM);
            console.log("WHERE AMOUNT MATTERS: " + AMOUNT_OF_MATCHES);
            console.log("WHERE MAXIMUM MATTERS: " + MAXIMUM_MOVE);
            if(isOdd(COMPUTER_SUM)){
                for(let j  = MAXIMUM_MOVE; j > 0; j--){
                    if( isEven(j + COMPUTER_SUM) && isOdd((AMOUNT_OF_MATCHES - j) + HUMAN_SUM)){
                        return j;
    
                    }
                   
                }
            }
            if(isEven(COMPUTER_SUM)){
                for(let j = MAXIMUM_MOVE; j > 0; j--){
                    if( isEven(j)){
                        return j;
                    }
                }
            }
        }
    
        if(AMOUNT_OF_MATCHES <= (PERELOM*2) && AMOUNT_OF_MATCHES > PERELOM){
            for(let i = MAXIMUM_MOVE; i > 0; i--){
                    if(((AMOUNT_OF_MATCHES - i) % PERELOM) === 0){
                         return i;
                        
                    }
                }
        }
    
        // 
        for(let i = MAXIMUM_MOVE; i > 0; i--){
            if(NEED_EVEN){
                if(isEven(i+COMPUTER_SUM)) return i;
            }
            else{
                if(isOdd(i+COMPUTER_SUM)) return i;
    
            }
        }
    
        return 1;
  }