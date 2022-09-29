import React, { useEffect } from 'react';
import { useState } from 'react';

const NewTrip = ({ userID, setIsShown }) => {
  const [start_date, setStartDate] = useState('');
  const [end_date, setEndDate] = useState('');
  const [hotel, setHotel] = useState('');
  const [parksData, setParksData] = useState('');
  const [parks, setParks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trip = { start_date, end_date, hotel, parks, user_id: userID };
    console.log(`the current userID is ${userID}`);

    fetch('/trips', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trip)
    }).then(() => {
      console.log('new trip added');
      setIsShown(false);
    }).catch(err => console.log(err));
  }

  // fetch list of parks from api and store in state
  // maybe should just hardcode this? pls see your own to-do list
  useEffect(() => {
    fetch('/trips/parks')
      .then(res => res.json())
      .then(data => {
        setParksData(data);
      })
      .catch(err => console.log(err));
  }, []);
    
    // const parkList = parksData;
  // list of parks in checkbox form
  // const parkCheckboxes = parkList.map((parkObj, index) => {
  //   return (
  //     <div key={index} className="checkboxWithLabel">
  //       <input type="checkbox" className="parkCheckbox" value={index} onChange={handleParkCheck}></input>
  //       <span className="checkboxLabel">{parkObj.name}</span>
  //     </div>
  //   );
  // });

  // handle checkbox change
  const handleParkCheck = (e) => {
    const parkIndex = e.target.value;
    const parkName = parksData[parkIndex].name;
    // if checkbox is checked, add park object to parks array
    if (e.target.checked) {
      const parkObj = { name: parkName, date: '', reservations: false };
      setParks(current => {
        return [...current, parkObj];
      });
      }
    else {
      // if checkbox is unchecked, remove park object from parks array
      setParks(current => current.filter(park => park.name !== parkName));
    }
  }


  return (
    <div className="new-trip">
      <h2>New Trip</h2>
      <form>
        <label>Start Date</label>
        <input type="date" value={start_date} onChange={(e) => setStartDate(e.target.value)} />
        <label>End Date</label>
        <input type="date" value={end_date} onChange={(e) => setEndDate(e.target.value)} />
        <label>Hotel</label>
        <input type="text" value={hotel} onChange={(e) => setHotel(e.target.value)} />
        <label>Parks</label>
        {parksData && parksData.map((parkObj, index) => {
            return (
              <div key={index} className="checkboxWithLabel">
                  <input type="checkbox" className="parkCheckbox" value={index} onChange={handleParkCheck}></input> 
                <span className="checkboxLabel">{parkObj.name}</span>
              </div>
            );
          })}
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default NewTrip;