const GOOGLE_MAPS_PLACES_API_URL = "https://places.googleapis.com/v1/places:";
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


const searchPlaces = async (formData) => {
  try {
    const res = await fetch(`${GOOGLE_MAPS_PLACES_API_URL}searchText`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.priceLevel,places.location',
    },
      body: JSON.stringify(formData),
    });
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    return json;
  } catch (err) {
    throw new Error(err);
  }
};


export { searchPlaces };