import { GoogleMap, useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api';
import { useRef, useEffect, useState } from 'react';
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
import * as tripService from '../../services/tripService';


const ViewTrip = () => {
    const [userTrips, setUserTrips] = useState([]);

    useEffect(() => {
        // Place side effects like data fetching here!
        const fetchAllTrips = async () => {
            const tripsData = await tripService.viewTrips();
            console.log("trips:", tripsData);
            setUserTrips(tripsData);
        }
        fetchAllTrips();
      }, []);


    return (
        <>
            <h1>View Trips</h1> 
            <h2>View your trips here</h2>
            <ul>
            {userTrips && userTrips.map((trip, index) => (
                <li key={index}>
                    <p><strong>{trip.tripName}</strong></p>
                    <p>Number of Days: {trip.days}</p>
                    <p>Travel Destination: {trip.travelDestination}</p>
                    <p>Activities</p>
                    <ul>
                    {trip.activities && trip.activities.map((place, index) => (
                        <li key={index}>
                            <p><strong>{place.name}</strong></p>
                            <p><em>{place.address}</em></p>
                            <p>{place.summary}</p>
                        </li> 
                    ))}
                    </ul>
                    <p>Accomodation</p>
                    <ul>
                        {trip.accomodation && trip.accomodation.map((place, index) => (
                            <li key={index}>
                                <p><strong>{place.name}</strong></p>
                                <p><em>{place.address}</em></p>
                                <p>{place.summary}</p>
                            </li> 
                        ))}
                    </ul>
                    <button>Edit</button>
                    <button>Delete</button>
                </li> 
            ))}
            </ul>               
        </>
    );
}

export default ViewTrip;