import './checkUpdates.css'
import axios from 'axios';
import { useState, useEffect, useRef } from 'react'
import soundFile from '../assets/notificationSound.mp3'

function checkUpdates() {
  const audioRef = useRef(null);

  const [key, setKey] = useState(0)
  const [branch, setBranch] = localStorage.getItem('branch')

    const [showBulletin, setshowBulletin] = useState(false)
    const [showInformation, setshowInformation] = useState(false)
    const [showLow, setshowLow] = useState(false)

    const [seconds, setSeconds] = useState(1);
    const [loadTime, setLoadTime] = useState(0);
    
    useEffect(() => {
        if (seconds > 0) {
          const timer = setTimeout(() => setSeconds(seconds + 1), 500);
          return () => {
            checkBulletinCount()
            checkBulletin()

            checkInformationCount()
            checkInformation()

            checkLowCount()
            checkLow()

          };
        }
    }, [seconds]);

    // GET CURRENT

    const [currentBulletin, setcurrentBulletin] = useState([]);
    const [initialVal, setinitialVal] = useState();

    useEffect(() => {
        axios.get(localStorage.getItem('urlLink')+'getBulletin.php')
          .then(response => {
            setcurrentBulletin(response.data);
            setinitialVal(response.data.length)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }, []);

    // CHECK NOTIF

    const [nowBulletin, setnowBulletin] = useState([]);

    const checkBulletinCount = () => {
      axios.get(localStorage.getItem('urlLink')+'getBulletin.php')
        .then(response => {
          setnowBulletin(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      }

      const checkBulletin = () => {
        if (nowBulletin.length > initialVal){
          setLoadTime(loadTime + 1)
          setshowBulletin(true)
        }

        if (loadTime == 2) {
          audioRef.current.play();
        }

        setKey(key + 1)

        if (loadTime == 15) {
          setinitialVal(nowBulletin.length)
          setLoadTime(1)
          setshowBulletin(false)
        }
      }

      // Information Board
      const [currentInformation, setcurrentInformation] = useState([]);
      const [initialValInfo, setinitialValInfo] = useState();

      useEffect(() => {
        const data = new FormData();
        data.append('branch', localStorage.getItem('branch'));

        axios.post(localStorage.getItem('urlLink')+'getInformation.php', data)
          .then(response => {
            setcurrentInformation(response.data);
            setinitialValInfo(response.data.length)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }, []);

    const [nowInformation, setnowInformation] = useState([]);

    const checkInformationCount = () => {
      const data = new FormData();
      data.append('branch', localStorage.getItem('branch'));

      axios.post(localStorage.getItem('urlLink')+'getInformation.php', data)
        .then(response => {
          setnowInformation(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      }

      const checkInformation = () => {
        if (nowInformation.length > initialValInfo){
          setLoadTime(loadTime + 1)
          setshowInformation(true)
        }

        if (loadTime == 2) {
          audioRef.current.play();
        }

        setKey(key + 1)

        if (loadTime == 10) {
          setinitialValInfo(nowInformation.length)
          setLoadTime(1)
          setshowInformation(false)
        }
      }

      // LOW

      const [currentLow, setcurrentLow] = useState([]);
      const [initialValLow, setinitialValLow] = useState();

      useEffect(() => {
        const data = new FormData();
        data.append('itemBranch', localStorage.getItem('branch'));

        axios.post(localStorage.getItem('urlLink')+'getInventoryListAllInventoryLow.php', data)
          .then(response => {
            setcurrentLow(response.data);
            setinitialValLow(response.data.length)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }, []);

    const [nowLow, setnowLow] = useState([]);

    const checkLowCount = () => {
      const data = new FormData();
      data.append('itemBranch', localStorage.getItem('branch'));

      axios.post(localStorage.getItem('urlLink')+'getInventoryListAllInventoryLow.php', data)
        .then(response => {
          setnowLow(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      }

      const checkLow = () => {
        if (nowLow.length > initialValLow){
          setLoadTime(loadTime + 1)
          setshowLow(true)
        }

        if (loadTime == 2) {
          audioRef.current.play();
        }

        setKey(key + 1)

        if (loadTime == 10) {
          setinitialValLow(nowLow.length)
          setLoadTime(1)
          setshowLow(false)
        }
      }

return(
    <div class="checkUpdates-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem'}}>

        {showBulletin ? 
        <div class="bulletinNotif-container" key={key}>
          <button onClick={()=> {}}>
          <h1> BulletinBoard is Updated </h1>
          </button>
          <button onClick={()=> setshowBulletin(false)}>
          <span class="material-symbols-sharp"> close </span>
          </button>
          
        </div>
        : ''}
        
        {showInformation ? 
        <div class="informationNotif-container">
          <button onClick={()=> {}}>
          <h1> Information Board is Updated </h1>
          </button>
          <button onClick={()=> setshowInformation(false)}>
          <span class="material-symbols-sharp"> close </span>
          </button>
        </div>
        : ''}
        
        {showLow ? 
        <div class="lowNotif-container">
          <button onClick={()=> {}}>
          <h1> CHECK LOW QUANTITY ITEM </h1>
          </button>
          <button onClick={()=> setshowLow(false)}>
          <span class="material-symbols-sharp"> close </span>
          </button>
        </div>
        : ''}




        <audio ref={audioRef} src={soundFile} />
    </div>
    )
}

export default checkUpdates