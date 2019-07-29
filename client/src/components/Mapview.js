import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup, GeolocateControl } from "react-map-gl";
import * as parkData from "../data/data.json";
import axios from "axios";

export default function Mapview() {
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longtitude: -75.6903,
    zoom: 10,
    width: "100vw",
    height: "50vh"
  });

  const [selectedPark, setSelectedPark] = useState(null);
  const [markerElements, setMarker] = useState();

  useEffect(() => {
    setTimeout(() => {
      console.log("click");
      document.querySelector(".mapboxgl-ctrl-icon").click();
    }, 1000);

    function _locateUser() {
      // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
      navigator.geolocation.getCurrentPosition(position => {
        console.log("_locateUser", position.coords.latitude);
        console.log("_locateUser", position.coords.longitude);
      });
    }

    setTimeout(() => {
      _locateUser();
    }, 1000);

    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  useEffect(() => {
    axios.get("/api/postings").then(res => {
      const tasks = res.data;
      console.log(tasks);

      const markerElements = tasks.map((task, i) => (
        <Marker
          latitude={task.location.coordinates[0]}
          longitude={task.location.coordinates[1]}
          offsetLeft={-20}
          offsetTop={-10}
          key={i}
        >
          <div>You are here</div>
        </Marker>
      ));
      setMarker(markerElements);
      console.log(markerElements);
    });
  }, []);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoiYWxpY2FudG9ydW4iLCJhIjoiY2p4cHU0M3NwMDJ1aDNjcjNsNjNsazM0ciJ9.sriMIOay4kEmZcUcJHP-Pw"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
        mapStyle="mapbox://styles/alicantorun/cjyk4o8nx0ljn1cpj9cx1tacu"
      >
        {markerElements}

        {selectedPark ? (
          <Popup
            latitude={selectedPark.geometry.coordinates[1]}
            longitude={selectedPark.geometry.coordinates[0]}
            onClose={e => {
              setSelectedPark(null);
            }}
          >
            <div className="mapbox-popup">
              <h2>{selectedPark.properties.NAME}</h2>
              <p>{selectedPark.properties.NAME}</p>
            </div>
          </Popup>
        ) : null}
        <GeolocateControl
          id="control-id"
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
      </ReactMapGL>
    </div>
  );
}
