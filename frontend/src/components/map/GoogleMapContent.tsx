/** @jsxRuntime classic */
/** @jsx jsx */

import { Global, css, jsx } from '@emotion/react';
import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import { useLoadScript, GoogleMap, StandaloneSearchBox, Marker, DistanceMatrixService } from '@react-google-maps/api';
import { Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import { hospitelStore } from 'store/hospitelStore';
import {
  NotificationModal
} from '../NotificationModal';
import { HospitelsDocument } from 'components/hospitel';
import { UserStep } from '../UserStep';
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
export const GoogleMapContent = observer(({
  setVisible,
  setDistance,
  setDuration
}: GooogleMapContentProps) => {
  const [myLocation, setMyLocation] = useState<google.maps.LatLng>();
  const [searchBox, setSearchBox] = useState<any>(null);
  const [ center, setCenter ] = useState<google.maps.LatLng>();
  const [ selectedLocation, setSelectedLocation ] = useState<google.maps.LatLng>()
  const [map, setMap] = useState(null);

  const { setSelectedHospitel, hospitelList } = hospitelStore;

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
    const loginButtonDiv = document.createElement('div');

    ReactDOM.render(<NotificationModal />, notificationDiv);
    ReactDOM.render(<UserStep />, loginButtonDiv);
    ref.controls[google.maps.ControlPosition.TOP_RIGHT].push(notificationDiv);
    ref.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(loginButtonDiv);

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
    hospitelList && isLoaded ?
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
        options={{
            mapTypeControl: false,
            fullscreenControl: false,
            zoomControl: false,
            streetViewControl: false
        }}
        zoom={19}
        onClick={(e) => console.log(e.latLng.lat(), e.latLng.lng())}
      >
          <Marker position={myLocation as google.maps.LatLng} />
          {hospitelList?.map((hospitel: HospitelsDocument) => (
            <Marker
              position={new google.maps.LatLng(hospitel.address.latitude, hospitel.address.longitude)}
              onClick={() => {
                console.log(hospitel)
                setVisible(true)
                setSelectedLocation(new google.maps.LatLng(hospitel.address.latitude, hospitel.address.longitude));
                setSelectedHospitel(hospitel);
              }}
              onLoad={marker => {
                    const customIcon = (opts:any) => Object.assign({
                      path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
                      fillColor: '#34495e',
                      fillOpacity: 1,
                      strokeColor: '#000',
                      strokeWeight: 1,
                      scale: 2,
                    }, opts);
                  
                marker.setIcon(customIcon({
                  fillColor: `${calculateRoom(hospitel.availableRooms)}` ,
                  strokeColor: '#000000'
                }));
              }}
            /> 
            
          ))}

          {map && <StandaloneSearchBox
            onPlacesChanged={onPlacesChanged}
            onLoad={onSBLoad}
          >
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
          </StandaloneSearchBox>}
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
});
