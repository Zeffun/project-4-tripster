# Tripster

Tripster is a trip-building web application that allows users to create custom itineraries for their travel plans. It integrates with Google Maps API and enables users to search for travel destinations, accommodations, and activities, while organizing their trips into detailed day-by-day itineraries. 

## Key Features

### 1. **User Authentication**
Tripster uses context to manage authenticated user information. Once a user is logged in, they can begin creating and customizing trips.

### 2. **Google Maps Integration**
Tripster utilizes Google Maps API for interactive mapping features:
- **Map Display**: Users can visualize their chosen travel destination and nearby places of interest directly on the map.
- **Advanced Markers**: Custom markers for activities and accommodations are displayed, with different pin colors for easy distinction.
- **InfoWindow**: Clicking on a marker shows an info window with details about that location.

### 3. **Search for Travel Destinations**
Users can search for travel destinations using the Google Places API. Once a destination is selected, the map centers on that location.

### 4. **Accommodation and Activities Search**
Tripster allows users to search for places to stay and things to do near their destination. Users can:
- Search for accommodations (hotels, lodgings) and activities (museums, parks, restaurants, etc.).
- Add any place to their trip itinerary by clicking the "Add Accommodation" or "Add Activity" buttons.

### 5. **Customizable Itinerary**
Users can specify the duration of their trip by selecting the start and end dates. Tripster then calculates the total number of days for the trip and allows users to organize accommodations and activities for each day.

### 6. **Create, Save, and Manage Trips**
Users can:
- Assign a name to their trip.
- Save the entire itinerary (including travel destination, accommodations, and activities) to the server via the `tripService.createTrip()` function.
- The trip details can be cleared after saving, and the page reloads to allow users to create a new trip.

## Components

### `BuildTrip.js`
The main trip-building component that handles all the logic for creating, searching, and saving trips. Key functions include:

- **`handleSearchSubmit`**: Fetches search results from Google Places API based on user input.
- **`handleAddActivity` & `handleAddAccomodation`**: Add selected activities and accommodations to the itinerary.
- **`handleAddTrip`**: Saves the entire trip to the database, including name, destination, dates, accommodations, and activities.
- **`searchPlaces` & `searchTravelDest`**: These functions interact with the Google Places API to retrieve location data.
- **Google Maps API Integration**: Uses the `<Map />`, `<AdvancedMarker />`, `<Pin />`, and `<InfoWindow />` components to display and interact with maps.

### `APIProvider`
Provides Google Maps API context to the entire application, allowing other components to easily access and use the API.

### `DatePickers`
MUI date pickers are used to select the start and end dates of the trip, which is important for calculating the trip length and planning the itinerary.

## How to Run the Project

### Prerequisites:
- Node.js
- MongoDB (for storing trips)
- Google Maps API key with Places and Maps APIs enabled

### Setup Instructions:
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/project-4-tripster.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add the following:
   ```bash
   VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
   VITE_GOOGLE_MAPS_MAP_ID=your-map-id
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Navigate to `http://localhost:3000` in your browser to start building trips.

## Key Technologies

- **MERN Stack**: MongoDB, Express.js, React.js, Node.js.
- **Google Maps API**: Integrated for map rendering, searching for places, and displaying markers.
- **MUI (Material-UI)**: Provides the DatePicker component for selecting travel dates.
- **Vis.gl**: Used for rendering and handling Google Maps elements.

## Future Improvements
- **User Profiles**: Allow users to save multiple trips and view them later.
- **Collaborative Trip Planning**: Enable users to share trips with others and collaborate in real-time.
- **More Filters**: Add more options for filtering activities and accommodations by category, price, and rating.

---

This `README.md` provides a clear overview of the project, explaining its purpose, features, setup instructions, and key components for developers or users interested in understanding how to use or contribute to the project.
