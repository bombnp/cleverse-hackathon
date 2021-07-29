/** @jsxRuntime classic */
/** @jsx jsx */

import { Global, css, jsx } from "@emotion/react";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useHospitels } from "../../hooks/useHospitels";
import {
  useLoadScript,
  GoogleMap,
  StandaloneSearchBox,
  Marker,
} from "@react-google-maps/api";
import { Spin } from "antd";
import { observer } from "mobx-react-lite";
import { hospitelStore } from "store/hospitelStore";

declare const google: any;

export type SearchBoxType = {
  lat: number;
  lng: number;
};

interface hospitelLocationProps {
  selectedHospitelLocation?: any;
  setSelectedHospitelLocation?: (location: any) => void;
}

export const HospitelLocation = observer(
  ({
    selectedHospitelLocation,
    setSelectedHospitelLocation,
  }: hospitelLocationProps) => {
    const [myLocation, setMyLocation] = useState<google.maps.LatLng>();
    const [selectedLocation, setSelectedLocation] = useState(false);
    const [searchBox, setSearchBox] = useState<any>(null);
    const [center, setCenter] = useState<google.maps.LatLng>();
    const [map, setMap] = useState(null);

    const { setSelectedHospitel } = hospitelStore;

    const {
      data: hospitels,
      // execute: getHospitels
    } = useHospitels();

    // useEffect(() => {
    //   getHospitels();
    // }, []);

    const ConfirmButton = () => {
      return (
        <div
          className=" py-2 px-4 cursor-pointer bg-white -mt-12 shadow-2xl text-purple-600 text-center rounded-2xl"
          onClick={() => setSelectedLocation(true)}
        >
          ยืนยันสถานที่
        </div>
      );
    };
    const onPlacesChanged = () => {
      const newLocation = searchBox.getPlaces();
      if (newLocation[0] !== undefined) {
        setCenter(newLocation[0].geometry.location);
        setMyLocation(newLocation[0].geometry.location);
      }
    };

    const onSBLoad = (ref: any) => {
      setSearchBox(ref);
    };

    const onLoad = (ref: any) => {
      setMap(ref);
      const controlButtonDiv = document.createElement("div");

      ReactDOM.render(<ConfirmButton />, controlButtonDiv);
      ref.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(
        controlButtonDiv
      );
      navigator.geolocation.getCurrentPosition(function (position) {
        let location = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        setMyLocation(location);
      });
    };

    const { isLoaded } = useLoadScript({
      googleMapsApiKey: "AIzaSyDFFrPIRs4WmvA9gHls8igdADYvh6ThAOE",
      libraries: ["drawing", "places"],
      language: "th",
    });

    return isLoaded ? (
      <div>
        <Global
          styles={css`
            .ant-input-affix-wrapper {
              background-color: white;
              margin-top: 7px;
              border-radius: 30px;
            }
          `}
        />
        <GoogleMap
          mapContainerStyle={{ height: "240px", width: "277px" }}
          onLoad={(map) => onLoad(map)}
          center={selectedHospitelLocation ?? (center ? center : myLocation)}
          options={{
            mapTypeControl: false,
            fullscreenControl: false,
            zoomControl: false,
            streetViewControl: false,
          }}
          zoom={19}
          onClick={(e) => {
            if (!selectedLocation && !selectedHospitelLocation) {
              setMyLocation(
                new google.maps.LatLng(e.latLng.lat(), e.latLng.lng())
              );
              if (setSelectedHospitelLocation) {
                setSelectedHospitelLocation({
                  lat: e.latLng.lat(),
                  lng: e.latLng.lng(),
                });
              }
            }
          }}
        >
          <Marker
            position={
              (selectedHospitelLocation ?? myLocation) as google.maps.LatLng
            }
          />
          {!selectedHospitelLocation && (
            <StandaloneSearchBox
              onPlacesChanged={onPlacesChanged}
              onLoad={onSBLoad}
            >
              <input
                type="text"
                placeholder="ค้นหาสถานที่"
                style={{
                  boxSizing: "border-box",
                  border: `1px solid transparent`,
                  width: `200px`,
                  height: `26px`,
                  borderRadius: `30px`,
                  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                  fontSize: `14px`,
                  outline: `none`,
                  top: "7px",
                  textOverflow: `ellipses`,
                  position: "absolute",
                  right: "70px",
                  padding: "0 5px",
                }}
              />
            </StandaloneSearchBox>
          )}
        </GoogleMap>
      </div>
    ) : (
      <div>
        <Spin />
      </div>
    );
  }
);
