import React, { useEffect, useRef } from 'react';

const Maps = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    let map;
    let marker;

    // Función para obtener la ubicación actual del usuario
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            const latLng = new window.google.maps.LatLng(latitude, longitude);
            map.setCenter(latLng);
            marker.setPosition(latLng);
          },
          error => {
            console.error('Error getting current location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    // Función para inicializar el mapa
    const initMap = () => {
      const mapOptions = {
        zoom: 14,
        center: new window.google.maps.LatLng(0, 0), // Centro inicial del mapa
      };

      map = new window.google.maps.Map(mapRef.current, mapOptions);
      marker = new window.google.maps.Marker({
        map,
        position: mapOptions.center,
      });

      getCurrentLocation(); // Obtener ubicación actual al cargar el mapa
    };

    // Cargar la API de Google Maps y llamar a la función initMap cuando esté lista
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCk4vm6_IzxB60QVUw1BV1jddqdVcC8YB8&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = initMap;
        script.onerror = () => {
          console.error('Error loading Google Maps API.');
        };
        document.head.appendChild(script);
      } else {
        initMap();
      }
    };

    loadGoogleMapsScript();
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default Maps;
