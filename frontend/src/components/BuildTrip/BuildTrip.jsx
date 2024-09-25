import { AuthedUserContext } from '../../App';
import { useContext, useCallback, useState, useRef } from 'react';
import {createRoot} from "react-dom/client";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";
import { GoogleMap, useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api';

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
    const inputref = useRef(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY,
        libraries: ["places"]
    });

    console.log(isLoaded);

    const handleOnPlacesChanged = () => {
        let address = inputref.current.getPlaces();
        console.log("address", address);
    }

    return (
        <main>
            <h1>Build Trip</h1>
            <p>
                Build your trip here
            </p>
            <div style={{marginTop: "10%", textAlign: "center"}}>
                {isLoaded && 
                <StandaloneSearchBox
                    onLoad={(ref) => inputref.current = ref}
                    onPlacesChanged={handleOnPlacesChanged}
                >
                    <input 
                        type='text'
                        placeholder='What do you want to do?'
                        style={{
                            boxSizing: 'border-box',
                            border: '1px solid transparent',
                            width: '50%',
                            height: '50px',
                            padding: '0 12px',
                            borderRadius: '3px',
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0..3)',
                            fontSize: '14px',
                            outline: 'none',
                            textOverflow: 'ellipses',
                            marginTop: '30px',
                        }}
                    />
                </StandaloneSearchBox>
                }
            </div>
            <APIProvider apiKey={API_KEY}>
                <div style={{ height: "100vh", width: "100vh" }}>
                    <Map 
                        zoom={9} 
                        center={{lat: 53.54, lng: 10}}
                        mapId={MAP_ID}
                    >
                       <AdvancedMarker position={{lat: 53.54, lng: 10}} onClick={handleMarkerClick}>
                            <Pin />
                        </AdvancedMarker> 

                        {open && 
                            <InfoWindow position={markerPosition} onCloseClick={() => setOpen(false)}>
                                <p>Hamburg</p>
                            </InfoWindow>
                        }
                    </Map>
                </div>
            </APIProvider>
        </main>
    );
};

export default BuildTrip;