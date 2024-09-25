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
    const handleMarkerClick = () => {
        setMarkerPosition({ lat: 53.54, lng: 10 }); // Set position on click
        setOpen(true); // Open InfoWindow
    };

    /* For the Google Places API search bar */
    const [placeSearchText, setPlaceSearchText] = useState("");
    const [placeSearchResults, setPlaceSearchResults] = useState(null);

    //fetch function for fetching the search results from the Google Maps Places API
    const searchPlaces = async (searchText) => {
        const placesData = await mapService.searchPlaces({ textQuery: searchText});
        setPlaceSearchResults(placesData.places);
        
    };

    console.log(placeSearchResults); //testing that results are returned correctly

    const handleSubmit = (e) => {
        e.preventDefault();
        // We'll call the fetch function here
        searchPlaces(placeSearchText);
        setPlaceSearchText("");
    };

    /* For handling the search results  */


    return (
        <main>
            <h1>Build Trip</h1>

            <section>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="placeSearchText">Where do you want to go?: </label>
                    <input
                    id="placeSearchText"
                    type="text"
                    value={placeSearchText}
                    onChange={(e) => setPlaceSearchText(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>
            </section>
            
            <APIProvider apiKey={API_KEY}>
                <div style={{ height: "100vh", width: "100vh" }}>
                    <Map 
                        defaultZoom={12} 
                        defaultCenter={{lat: 1.290270, lng: 103.851959}}
                        mapId={MAP_ID}
                    >
                        {placeSearchResults && placeSearchResults.map((place) => (
                            <AdvancedMarker key={place.formattedAddress} position={{lat: place.location.latitude, lng: place.location.longitude}} onClick={handleMarkerClick}>
                                <Pin />
                            </AdvancedMarker> 
                        ))}
                       
                        {open && 
                            <InfoWindow position={markerPosition} onCloseClick={() => setOpen(false)}>
                                <p>Hamburg</p>
                            </InfoWindow>
                        }
                    </Map>
                </div>
            </APIProvider>
            <ol>
                {placeSearchResults && placeSearchResults.map((place) => (
                    <li key={place.formattedAddress}>
                        <p><strong>{place.displayName.text}</strong></p>
                        <p><em>{place.formattedAddress}</em></p>
                    </li>
                ))}
            </ol>
        </main>
    );
};

export default BuildTrip;