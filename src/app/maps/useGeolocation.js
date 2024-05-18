import { useState, useEffect } from "react";

const useGeolocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: null, lng: null },
  });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: Number(location.coords.latitude),
        lng: Number(location.coords.longitude),
      },
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLocation((state) => ({
        ...state,
        loaded: true,
        error: {
          code: 0,
          message: "Geolocation not supported",
        },
      }));
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
};

export default useGeolocation;
