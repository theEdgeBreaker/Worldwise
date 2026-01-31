import React, { useEffect, useState } from 'react'
import styles from "./Map.module.css"
import { useNavigate } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
// import { useCities } from '../contexts/CitiesContexts';
import { useCities } from '../hooks/CitiesContexts';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './Button';
import { useUrlPosition } from '../hooks/useUrlPosition';
function Map() {

  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [lat , lng] = useUrlPosition();

  useEffect(function () {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  const { getPosition, isLoading: isLoadingPosition, position: geolocationPosition } = useGeolocation()

  useEffect(function () {
    if (geolocationPosition) setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition])



  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>{isLoadingPosition ? "Loading..." : "Use Your Position"}</Button>
      <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) =>
          <Marker position={[city.position.lat, city.position.lng]} key={city._id}>
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        )}
        <ChangeCenter mapPosition={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  )
}

function ChangeCenter({ mapPosition }) {
  const map = useMap();
  map.setView(mapPosition);
  return null;
}

function DetectClick() {
  const navigate = useNavigate()
  useMapEvents({


    click: e => {


      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    }
  })
}
export default Map