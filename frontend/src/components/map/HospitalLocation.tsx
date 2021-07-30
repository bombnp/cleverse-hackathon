/** @jsxRuntime classic */
/** @jsx jsx */

import { Global, css, jsx } from "@emotion/react";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  useLoadScript,
  GoogleMap,
  StandaloneSearchBox,
  Marker,
} from "@react-google-maps/api";
import { Spin } from "antd";
import { observer } from "mobx-react-lite";
import classNames from 'classnames';

declare const google: any;

export type SearchBoxType = {
  lat: number;
  lng: number;
};

interface HospitalLocationProps {
  selectedHospitalLocation?: any;
  setSelectedHospitalLocation?: (location: any) => void;
}

export const HospitalLocation = observer(
  ({
    selectedHospitalLocation,
    setSelectedHospitalLocation,
  }: HospitalLocationProps) => {
    const [myLocation, setMyLocation] = useState<google.maps.LatLng>();
    const [selectedLocation, setSelectedLocation] = useState(false);
    const [searchBox, setSearchBox] = useState<any>(null);
    const [center, setCenter] = useState<google.maps.LatLng>();
    const [map, setMap] = useState(null);

    const ConfirmButton = () => {
      return (
        <div
              className={classNames("py-2 px-4 cursor-pointer -mt-12 shadow-2xl text-center rounded-2xl", {
                  'bg-white text-purple-600 ': !selectedLocation,
                  'bg-gray-400 text-white': selectedLocation
              })}
          onClick={() => setSelectedLocation(true)}
        >
            {selectedLocation ? 'ยืนยันสถานที่ีเรียบร้อย' : 'ยืนยันสถานที่'}
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
          center={selectedHospitalLocation ?? (center ? center : myLocation)}
          options={{
            mapTypeControl: false,
            fullscreenControl: false,
            zoomControl: false,
            streetViewControl: false,
          }}
          zoom={19}
          onClick={(e) => {
            if (!selectedLocation || !selectedHospitalLocation) {
              setMyLocation(
                new google.maps.LatLng(e.latLng.lat(), e.latLng.lng())
              );
              if (setSelectedHospitalLocation) {
                setSelectedHospitalLocation({
                  lat: e.latLng.lat(),
                  lng: e.latLng.lng(),
                });
              }
            }
          }}
        >
          <Marker
            position={
              (selectedHospitalLocation ?? myLocation) as google.maps.LatLng
            }
          />
          {(!selectedHospitalLocation || !selectedLocation) && (
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
