import './modalConnection.css'
import CheckPrinter from './checkPrinter';
import { Offline, Online } from 'react-detect-offline'


function Connection_Modal ({closeModal}){
    
    return (
        <div class="Connection-container">
            <div class="Connection-modal">
            <div class="Connection-header">
                <h2> CONNECTION </h2>
                <button onClick={() => {closeModal(false);}}>
                    <span class="material-symbols-sharp"> close </span>
                </button>
            </div>
            <div class="Connection-content">
                <div class="Connection-content-list">

                <div class="Connection-item">
                    <label> INTERNET CONNECTION: </label>
                    <Online><button class="internetOn"> ON  </button></Online>
                    <Offline><button class="internetOff"> OFF </button></Offline> 
                </div>
                
                <div class="Connection-item">
                    <label> RECEIPT PRINTER: </label>
                    <CheckPrinter />
                </div>
                
                </div>
            </div>
            <div class="Connection-footer">
            <button class="cancel" onClick={() => {closeModal(false);}}>
                <span class="material-symbols-sharp"> close </span>
                Close
                </button>
            </div>
            </div>
        </div>
    )
}

export default Connection_Modal