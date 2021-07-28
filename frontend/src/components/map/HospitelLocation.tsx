/** @jsxRuntime classic */
/** @jsx jsx */

import { Global, css, jsx } from '@emotion/react';
import React, { useState } from 'react'
import { useHospitels } from '../../hooks/useHospitels';
import { useLoadScript, GoogleMap, StandaloneSearchBox, Marker } from '@react-google-maps/api';
import { Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import { hospitelStore } from 'store/hospitelStore';

declare const google: any;

export type SearchBoxType= {
    lat: number;
    lng: number;
}

// interface HospitelLocationProps {
//     setLocation: (location: any) => void;
// }

export const HospitelLocation = observer(() => {
  const [myLocation, setMyLocation] = useState<google.maps.LatLng>();
  const [searchBox, setSearchBox] = useState<any>(null);
  const [ center, setCenter ] = useState<google.maps.LatLng>();
  const [ map, setMap ] = useState(null);

  const { setSelectedHospitel } = hospitelStore;

  const {
    data: hospitels,
    // execute: getHospitels
  } = useHospitels();

  // useEffect(() => {
  //   getHospitels();
  // }, []);


  const onPlacesChanged = () => {
    const newLocation = searchBox.getPlaces();
      if (newLocation[0] !== undefined) {
        setCenter(newLocation[0].geometry.location)
        setMyLocation(newLocation[0].geometry.location);
    }
  }

  const onSBLoad = (ref: any) => {
    setSearchBox(ref);
  };

  const onLoad = (ref: any) => {
    setMap(ref);
    navigator.geolocation.getCurrentPosition(function (position) {
        let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        setMyLocation(location);
    });
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDFFrPIRs4WmvA9gHls8igdADYvh6ThAOE',
    libraries: ["drawing", "places"],
    language: "th"
  })

  return (
    isLoaded ?
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
        mapContainerStyle={{ height: '240px', width: '277px' }}
        onLoad={(map) => onLoad(map)}
        center={center ? center : myLocation}
        options={{
            mapTypeControl: false,
            fullscreenControl: false,
            zoomControl: false,
            streetViewControl: false
        }}
        zoom={19}
        onClick={(e) => setMyLocation(new google.maps.LatLng(e.latLng.lat(), e.latLng.lng()))}
      >
          <Marker position={myLocation as google.maps.LatLng} />
          <StandaloneSearchBox
            onPlacesChanged={onPlacesChanged}
            onLoad={onSBLoad}
          >
          <input
            type="text"
            placeholder="ค้นหาสถานที่"
            style={{
                boxSizing: 'border-box',
                border: `1px solid transparent`,
                width: `200px`,
                height: `26px`,
                borderRadius: `30px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                top: '7px',
                textOverflow: `ellipses`,
                position: 'absolute',
                right: '70px',
                padding: '0 5px'
              }}
              />
          </StandaloneSearchBox>
      </GoogleMap></div> : <div><Spin /></div>
    )
});
