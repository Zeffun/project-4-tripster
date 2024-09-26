import { AuthedUserContext } from '../../App';
import { useContext, useCallback, useState, useRef, useEffect } from 'react';
import {createRoot} from "react-dom/client";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";
import * as mapService from '../../services/mapService';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Typography } from '@mui/material';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;

const BuildTrip = ({}) => {
    /* For the Google Map API rendering */
        // User Authentication
    const user = useContext(AuthedUserContext);
        // Google Maps API InfoWindow for Marker
    const [open, setOpen] = useState(false);
        // Google Maps API Marker position state
    const [markerPosition, setMarkerPosition] = useState({ lat: 53.54, lng: 10 }); 

        //onClick handler for marker to open window and set the location of the open window to the marker position
    const handleMarkerClick = (e) => {
        setMarkerPosition({ lat: 53.54, lng: 10 }); // Set position on click
        setOpen(true); // Open InfoWindow
    };

    /* For the Activities & Accomodation search bar */
    const [placeSearchText, setPlaceSearchText] = useState("");
    const [placeSearchResults, setPlaceSearchResults] = useState(null);

    //fetch function for fetching the search results from the Google Maps Places API
    const searchPlaces = async (searchText) => {
        const placesData = await mapService.searchPlaces({ textQuery: `${searchText} in ${travelDest?.displayName.text} ${accomodation ? `near ${accomodation.name}`: ""}`});
        setPlaceSearchResults(placesData.places);
        
    };

    console.log(placeSearchResults); //testing that results are returned correctly

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // We'll call the fetch function here
        searchPlaces(placeSearchText);
        setPlaceSearchText("");
    };

    /* For storing accomodation in a day */
    const [accomodation, setAccomodation] = useState([]);

    console.log("Accomodation", accomodation);

    const handleAddAccomodation = (place) => {
        setAccomodation([...accomodation, {
            name: place.displayName.text,
            address: place.formattedAddress,
            location: place.location,
            summary: place?.editorialSummary?.text
        }]);
    }

    /* For storing activities in a day */
    const [activities, setActivities] = useState([]);

    console.log("Activities:", activities);

    const handleAddActivity = (place) => {
        setActivities([...activities, {
            name: place.displayName.text,
            address: place.formattedAddress,
            location: place.location,
            summary: place?.editorialSummary?.text
        }]);
    }

    // const handleUpdateDayActivities = () => {
    //     setDays((prevDays) =>
    //         prevDays.map((day) =>
    //           day.dayNumber == selectedDay
    //             ? { ...day, activities: activities } // Update the value for the matching item
    //             : day // Keep the other items unchanged
    //         )
    //     );

    //     console.log(days);
    // }

    /* For storing the to and from dates */
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    console.log(fromDate, toDate);

    // Function to calculate the difference in days to get the total number of days for the trip
    const calculateDifference = (start, end) => {
        if (start && end) {
        const timeDiff = end.toDate().getTime() - start.toDate().getTime();
        const dayDiff = timeDiff / (1000 * 3600 * 24); // Convert milliseconds to days
        return Math.ceil(dayDiff); // You can use Math.floor if you don't want to round up
        }
        return 0;
    };

    const tripDays = calculateDifference(fromDate, toDate);

    // Storing the number of days in a trip to use
    const [selectedDay, setSelectedDay] = useState({});

    console.log("selected Day", selectedDay);

    // Creating the number of days for this trip
    let daysArray = [];
    for(let i = 0; i < tripDays; i++) {
        daysArray.push({
            dayNumber: i + 1,
            accomodation: [],
            activities: [],
        });
    };
    console.log("DaysArray", daysArray);

    const [days, setDays] = useState([]);

    const createDays = () => {
        setDays(daysArray);
    };

    console.log("days", days);

    /* Google Maps Camera Controls */
    const INITIAL_CAMERA = {lat: 40.7, lng: -74};
      
    const [cameraProps, setCameraProps] = useState(null);

    console.log("cameraProps", cameraProps);

    const handleCameraChange = useCallback((ev) => {
        setCameraProps(ev.detail);
    }, []);

    /* Select country to travel to */
    const [travelDest, setTravelDest] = useState(null);
    const [travelDestSearchText, setTravelDestSearchText] = useState("");
    const [travelDestSearchResults, settravelDestSearchResults] = useState(null);

    //fetch function for fetching the search results from the Google Maps Places API
    const searchTravelDest = async (searchText) => {
        const travelDestData = await mapService.searchPlaces({ textQuery: searchText});
        settravelDestSearchResults(travelDestData.places);        
    };

    console.log("travel dest search results", travelDestSearchResults); //testing that results are returned correctly
    console.log("travelling to", travelDest);

    const handleAddTravelDest = (travelDest) => {
        setTravelDest(travelDest);
        setCameraProps({lat: travelDest.location.latitude, lng: travelDest.location.longitude});
    }

    const handleTravelDestSearchSubmit = (e) => {
        // We'll call the VC internship Melbourne
        e.preventDefault();
        // We'll call the fetch function here: 
        searchTravelDest(travelDestSearchText);
        setTravelDestSearchText("");
    };

    return (
        <main>


            <h1>Build Trip</h1>

            <section>
                <h2>1. How long will you be going for?</h2>
                <p>From: </p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        label="Date from" 
                        value={fromDate}
                        onChange={(newDate) => setFromDate(newDate)}
                        format="DD-MM-YYYY"
                    />
                </LocalizationProvider> 
                <p>To: </p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        label="Date to"
                        value={toDate}
                        onChange={(newDate) => setToDate(newDate)}
                        format="DD-MM-YYYY"
                    />
                </LocalizationProvider> 
                <Typography variant="h6">
                    Days: {tripDays}
                </Typography>
                <br></br>
                <button onClick={createDays}>Confirm</button>
            </section>

            <br></br>

            <section>
                <h2>2. Where are you going?</h2>
                <form onSubmit={handleTravelDestSearchSubmit}>
                    <label htmlFor="travelDestSearchText">Search for travel destinations: </label>
                    <input
                    id="travelDestSearchText"
                    type="text"
                    value={travelDestSearchText}
                    onChange={(e) => setTravelDestSearchText(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>
                <ol>
                    {travelDestSearchResults && travelDestSearchResults.map((travelDest, index) => (
                        <li key={index}>
                            <p><strong>{travelDest.displayName.text}</strong></p>
                            <p><em>{travelDest.formattedAddress}</em></p>
                            <p>{travelDest?.rating ? place.rating : "No ratings"} &#11088;</p>
                            <p>{travelDest.editorialSummary?.text}</p>
                            <p><a>{travelDest?.websiteUri}</a></p>
                            <button onClick={() => handleAddTravelDest(travelDest)}>Travel here</button>
                            
                        </li>
                    ))}
                </ol>
            </section>   

            <br></br>

            <h2>3. Select accomodation & activities</h2>
            <APIProvider apiKey={API_KEY}>
                <div style={{ height: "100vh", width: "100vh" }}>
                    {cameraProps ? <Map 
                        defaultZoom={11} 
                        defaultCenter={cameraProps}
                        mapId={MAP_ID}
                        onCameraChanged={handleCameraChange}
                    >
                        {placeSearchResults && placeSearchResults.map((place, index) => (
                            <AdvancedMarker key={index} position={{lat: place.location.latitude, lng: place.location.longitude}} onClick={handleMarkerClick}>
                                <Pin />
                            </AdvancedMarker> 
                        ))}

                        {activities && activities.map((activity, index) => (
                            <AdvancedMarker key={index} position={{lat: activity.location.latitude, lng: activity.location.longitude}} onClick={handleMarkerClick}>
                                <Pin 
                                    background={'green'}
                                    borderColor={'green'}
                                    glyphColor={'lime'}
                                />
                            </AdvancedMarker> 
                        ))}

                        {accomodation && accomodation.map((accomodation, index) => (
                            <AdvancedMarker position={{lat: accomodation.location.latitude, lng: accomodation.location.longitude}} onClick={handleMarkerClick}>
                                <Pin 
                                    background={'blue'}
                                    borderColor={'blue'}
                                    glyphColor={'lightblue'}
                                />
                            </AdvancedMarker> 
                        ))}
                       
                        {open && 
                            <InfoWindow position={markerPosition} onCloseClick={() => setOpen(false)}>
                                <p>Hamburg</p>
                            </InfoWindow>
                        }
                    </Map> : <p>(Please select a travel destination)</p>}
                </div>
            </APIProvider>

            <br></br>

            <section>
                <form onSubmit={handleSearchSubmit}>
                    <label htmlFor="placeSearchText">Search for Activities and Accomodation: </label>
                    <input
                    id="placeSearchText"
                    type="text"
                    value={placeSearchText}
                    onChange={(e) => setPlaceSearchText(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>
            </section>

            <br></br>

            <h3>Accommodation</h3>
            <ul>
            {accomodation && accomodation.map((place, index) => (
                <li key={index}>
                    <p><strong>{place.name}</strong></p>
                    <p><em>{place.address}</em></p>
                    <p>{place.summary}</p>
                </li> 
            ))}
            </ul>

            <h3>Activities</h3>
            <ul>
            {activities && activities.map((place, index) => (
                <li key={index}>
                    <p><strong>{place.name}</strong></p>
                    <p><em>{place.address}</em></p>
                    <p>{place.summary}</p>
                </li> 
            ))}
            </ul>

            {/* <div>
                {[...Array(tripDays)].map((_, index) => (
                    <div key={index}>
                        <h3 key={index}>Details for Trip Day {index + 1}</h3>
                        <p>Accomodation: </p>
                        <p>Activities: </p>
                        <button onClick={() => setSelectedDay(index + 1)}>Select</button>
                    </div>
                ))}
            </div> */}

            <br></br>

            <ol>
                {placeSearchResults && placeSearchResults.map((place, index) => (
                    <li key={index}>
                        <p><strong>{place.displayName.text}</strong></p>
                        <p><em>{place.formattedAddress}</em></p>
                        <p>{place?.rating ? place.rating : "No ratings"} &#11088;</p>
                        <p>{place.editorialSummary?.text}</p>
                        <p><a>{place?.websiteUri}</a></p>
                        {place.types.includes("lodging")  ? <button onClick={() => handleAddAccomodation(place)}>+ Add Accomodation</button> : <button onClick={() => handleAddActivity(place)}>+ Add Activity</button>}
                        
                    </li>
                ))}
            </ol>

            <button>Save Trip</button>

        </main>
    );
};

export default BuildTrip;