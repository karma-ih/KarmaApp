import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup, GeolocateControl } from "react-map-gl";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Mapview() {
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longtitude: -75.6903,
    zoom: 10,
    width: "100vw",
    height: "100vh"
  });

  const [selectedTask, setSelectedTask] = useState(null);

  const [taskData, setTaskData] = useState([]);

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
        setSelectedTask(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  useEffect(() => {
    axios.get("/api/postings").then(res => {
      const taskData = res.data;
      setTaskData(taskData);
      console.log("task data", taskData);

      // const markerElements = tasks.map((task, i) => (
      //   <Marker
      //     latitude={task.location.coordinates[0]}
      //     longitude={task.location.coordinates[1]}
      //     offsetLeft={-20}
      //     offsetTop={-10}
      //     key={i}
      //   >
      //     <div>You are here</div>
      //   </Marker>
      // ));
      // setMarker(markerElements);
      // console.log(markerElements);
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
        {/* {markerElements} */}

        {taskData.map((task, i) => (
          <Marker
            latitude={task.location.coordinates[0]}
            longitude={task.location.coordinates[1]}
            offsetLeft={-20}
            offsetTop={-10}
            key={i}
          >
            <button
              className="map-marker-button"
              onClick={e => {
                e.preventDefault();
                setSelectedTask(task);
              }}
            >
              <i className="fas fa-map-marker-alt" />
            </button>
          </Marker>
        ))}

        {selectedTask ? (
          <Popup
            latitude={selectedTask.location.coordinates[0]}
            longitude={selectedTask.location.coordinates[1]}
            onClose={e => {
              setSelectedTask(null);
            }}
          >
            <div
              className="card card-xt card-map"
              style={{ width: "200px", height: "125px" }}
            >
              <div style={{ backgroundColor: "black" }}>
                <img
                  src="/karmalogo.png"
                  width="45"
                  height="45"
                  style={{ margin: "10" }}
                  className="d-inline-block align-top"
                  alt="KarmaApp logo"
                />
                <span style={{ color: "orange", margin: "auto 0" }}>
                  {selectedTask.karma}
                </span>
              </div>

              <p>{selectedTask.description}</p>
              <p>{}</p>
              <Link to={`/market/${selectedTask._id}`}>
                <div class="button_cont" align="center">
                  <a
                    class="example_b"
                    href="add-website-here"
                    target="_blank"
                    rel="nofollow noopener"
                  >
                    View
                  </a>
                </div>
              </Link>
            </div>
          </Popup>
        ) : null}
        <GeolocateControl
          style={{ display: "none" }}
          id="control-id"
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
      </ReactMapGL>
    </div>
  );
}
