const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const createTrip = async (formData) => {
    try {
      const res = await fetch(`${BACKEND_URL}/trips`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
};

const viewTrips = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/trips`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };


  const deleteTrip = async (tripId) => {
    try {
      const res = await fetch(`${BACKEND_URL}/trips/${tripId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

export {
    createTrip,
    viewTrips,
    deleteTrip
}