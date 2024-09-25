import { AuthedUserContext } from '../../App';
import { useContext, useCallback, useState, useRef } from 'react';
import {createRoot} from "react-dom/client";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";
import { GoogleMap, useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api';
import * as mapService from '../../services/mapService';

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
    /* For the Accomodation search bar */


    /* For the Activities search bar */
    const [placeSearchText, setPlaceSearchText] = useState("");
    const [placeSearchResults, setPlaceSearchResults] = useState(null);

    //fetch function for fetching the search results from the Google Maps Places API
    const searchPlaces = async (searchText) => {
        const placesData = await mapService.searchPlaces({ textQuery: searchText});
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
    const [accomodation, setAccomodation] = useState();

    console.log("Accomodation", accomodation);

    const handleAddAccomodation = (place) => {
        setAccomodation({
            name: place.displayName.text,
            address: place.formattedAddress,
            location: place.location
        });
    }

    /* For storing activities in a day */
    const [activities, setActivities] = useState([]);

    console.log("Activities:", activities);

    const handleAddActivity = (place) => {
        setActivities([...activities, {
            name: place.displayName.text,
            address: place.formattedAddress,
            location: place.location
        }]);
    }


    return (
        <main>
            <h1>Build Trip</h1>
            
            <APIProvider apiKey={API_KEY}>
                <div style={{ height: "100vh", width: "100vh" }}>
                    <Map 
                        defaultZoom={11} 
                        defaultCenter={{lat: 1.290270, lng: 103.851959}}
                        mapId={MAP_ID}
                    >
                        {placeSearchResults && placeSearchResults.map((place) => (
                            <AdvancedMarker key={place.formattedAddress} position={{lat: place.location.latitude, lng: place.location.longitude}} onClick={handleMarkerClick}>
                                <Pin />
                            </AdvancedMarker> 
                        ))}

                        {activities && activities.map((activity) => (
                            <AdvancedMarker key={activity.address} position={{lat: activity.location.latitude, lng: activity.location.longitude}} onClick={handleMarkerClick}>
                                <Pin 
                                    background={'green'}
                                    borderColor={'green'}
                                    glyphColor={'lime'}
                                />
                            </AdvancedMarker> 
                        ))}

                        {accomodation && 
                            <AdvancedMarker position={{lat: accomodation.location.latitude, lng: accomodation.location.longitude}} onClick={handleMarkerClick}>
                                <Pin 
                                    background={'blue'}
                                    borderColor={'blue'}
                                    glyphColor={'lightblue'}
                                    title="accomodation"
                                />
                            </AdvancedMarker> 
                        }
                       
                        {open && 
                            <InfoWindow position={markerPosition} onCloseClick={() => setOpen(false)}>
                                <p>Hamburg</p>
                            </InfoWindow>
                        }
                    </Map>
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

            <ol>
                {placeSearchResults && placeSearchResults.map((place, index) => (
                    <li key={index}>
                        <p><strong>{place.displayName.text}</strong></p>
                        <p><em>{place.formattedAddress}</em></p>
                        <p>{place?.rating ? place.rating : "No ratings"} &#11088;</p>
                        <p>{place.editorialSummary?.text}</p>
                        <p><a>{place?.websiteUri}</a></p>
                        {place.types.includes("lodging")  ? <button onClick={() => handleAddAccomodation(place)}>Choose Accomodation</button> : <button onClick={() => handleAddActivity(place)}>+ Add Activity</button>}
                        
                    </li>
                ))}
            </ol>
        </main>
    );
};

export default BuildTrip;