/** @jsxRuntime classic */
/** @jsx jsx */

import { Global, css, jsx } from '@emotion/react';
import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import { ReactComponent as SearchIcon } from '../../assets/search-icon.svg';
import { GoogleMapHospitelFilterBox } from '../GoogleMapHospitelFilterBox';
import { useLoadScript, GoogleMap, StandaloneSearchBox, Marker, DistanceMatrixService } from '@react-google-maps/api';
import { Spin, Input } from 'antd';
import {
  NotificationModal
} from '../NotificationModal';
declare const google: any;

export type SearchBoxType= {
    lat: number;
    lng: number;
}

interface GooogleMapContentProps {
  setVisible: (visible: boolean) => void;
  setDistance: (distance: string) => void;
  setDuration: (duration: string) => void;
}
export const GoogleMapContent = ({
  setVisible,
  setDistance,
  setDuration
}: GooogleMapContentProps) => {
  const [myLocation, setMyLocation] = useState<google.maps.LatLng>();
  const [searchBox, setSearchBox] = useState<any>(null);
  const [ center, setCenter ] = useState<google.maps.LatLng>();
  const [ selectedLocation, setSelectedLocation ] = useState<google.maps.LatLng>()
  const [map, setMap] = useState(null);

  const calculateRoom = (value:number) => {
    var percentage = (value / 100) * 100;
    if (percentage === 0) {
      return `#BFBFBF`;
    } else if (percentage <= 30) {
      return `#F0CC12`;
    } else {
      return `#11B418`;
    }
  }

  const onPlacesChanged = () => {
    const newLocation = searchBox.getPlaces();
    if (newLocation[0] !== undefined) {
      setCenter(newLocation[0].geometry.location);
    }
  }

  const onSBLoad = (ref: any) => {
    setSearchBox(ref);
  };

  const onLoad = (ref: any) => {
    setMap(ref);
    const notificationDiv = document.createElement('div');
    const controlButtonDiv = document.createElement('div');

    ReactDOM.render(<NotificationModal />, notificationDiv);
    ReactDOM.render(<GoogleMapHospitelFilterBox />, controlButtonDiv);
    ref.controls[google.maps.ControlPosition.TOP_RIGHT].push(notificationDiv);
    ref.controls[google.maps.ControlPosition.RIGHT_TOP].push(controlButtonDiv);
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
        mapContainerStyle={{ height: '100vh', width: '100vw' }}
        onLoad={(map) => onLoad(map)}
        center={center ? center : myLocation}
        zoom={19}
        onClick={(e) => console.log(e.latLng.lat(), e.latLng.lng())}
      >
        <Marker position={myLocation as google.maps.LatLng} />
        <Marker
          position={center as google.maps.LatLng}
          onClick={() => {
            setVisible(true)
            setSelectedLocation(myLocation);
          }}
          onLoad={marker => {
                const customIcon = (opts:any) => Object.assign({
                  path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
                  fillColor: '#34495e',
                  fillOpacity: 1,
                  strokeColor: '#000',
                  strokeWeight: 1,
                  scale: 1.5,
                }, opts);
              
            marker.setIcon(customIcon({
              fillColor: `${calculateRoom(22)}` ,
              strokeColor: '#000000'
            }));
          }}
        />
          <StandaloneSearchBox
            onPlacesChanged={onPlacesChanged}
            onLoad={onSBLoad}
          >
          {/* <Input className="w-72 absolute right-16 shadow-lg" onPressEnter={() => console.log('x')} prefix={<SearchIcon />} placeholder="search location..."/> */}
          <input
              type="text"
            placeholder="search location..."
            style={{
                boxSizing: 'border-box',
                border: `1px solid transparent`,
                width: `300px`,
                height: `40px`,
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
        <DistanceMatrixService
          options={{
            destinations: [selectedLocation as google.maps.LatLng],
            origins: [myLocation as google.maps.LatLng],
            travelMode: 'DRIVING' as google.maps.TravelMode,
          }}
          callback={(response) => {
            if (response) {
              setDistance(response.rows[0].elements[0].distance.text);
              setDuration(response.rows[0].elements[0].duration.text);  
            }
          }}
        />
      </GoogleMap></div> : <div><Spin /></div>
    )
};
