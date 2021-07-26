import React, { useState, useCallback } from 'react'
import ReactDOM from 'react-dom';
import { GoogleMapHospitelFilterBox } from '../GoogleMapHospitelFilterBox';
import { useLoadScript, GoogleMap, StandaloneSearchBox, Marker, DirectionsService, DirectionsRenderer, DistanceMatrixService } from '@react-google-maps/api';
import { Spin} from 'antd';
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
  const [response, setResponse] = useState<google.maps.DirectionsResult>();
  const [searchBox, setSearchBox] = useState<any>(null);
  const [center, setCenter] = useState<google.maps.LatLng>();
  const [map, setMap] = useState(null);

  const onPlacesChanged = () => {
    const newLocation = searchBox.getPlaces();
    var findNearLocation = new google.maps.LatLng(newLocation[0].geometry.location.lat(), newLocation[0].geometry.location.lng());

      var request = {
        location: findNearLocation,
        radius: '2000',
        type: ['hospital']
      };

      let service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, (results: any, status: string) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            console.log(results[i])
          }
        }
      });
    setCenter(newLocation[0].geometry.location);
  }

  const onSBLoad = (ref: any) => {
    setSearchBox(ref);
  };

  const onLoad = (ref: any) => {
    setMap(ref);
    const controlButtonDiv = document.createElement('div');
    ReactDOM.render(<GoogleMapHospitelFilterBox />, controlButtonDiv);
    ref.controls[google.maps.ControlPosition.RIGHT_CENTER].push(controlButtonDiv);
    navigator.geolocation.getCurrentPosition(function (position) {
          let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          setMyLocation(location);
      });
  }

  const directionsCallback = useCallback((response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setResponse(response)
      }
    }
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDFFrPIRs4WmvA9gHls8igdADYvh6ThAOE',
    libraries: ["drawing", "places"],
    language: "th"
  })

  return (
    isLoaded ?
      <GoogleMap
        mapContainerStyle={{ height: '100vh', width: '100vw' }}
        onLoad={(map) => onLoad(map)}
        center={center ? center : myLocation}
        zoom={19}
        onClick={(e) => console.log(e.latLng.lat(), e.latLng.lng())}
      >
        <Marker
          position={myLocation as google.maps.LatLng}
          onClick={() => setVisible(true)}
          onLoad={marker => {
                const customIcon = (opts:any) => Object.assign({
                  path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
                  fillColor: '#34495e',
                  fillOpacity: 1,
                  strokeColor: '#000',
                  strokeWeight: 1,
                  scale: 1,
                }, opts);
              
            marker.setIcon(customIcon({
              fillColor: 'green',
              strokeColor: 'white'
            }));
          }}
        />
          <StandaloneSearchBox
            onPlacesChanged={onPlacesChanged}
            onLoad={onSBLoad}
          >
            <input
              type="text"
              placeholder="Customized your placeholder"
              style={{
                boxSizing: 'border-box',
                border: `1px solid transparent`,
                width: `270px`,
                height: `40px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                margin: 'center',
                top: '10px',
                textOverflow: `ellipses`,
                position: 'absolute',
                right: '70px',
                padding: '0 5px'
              }}
            />
          </StandaloneSearchBox>
        <DistanceMatrixService
          options={{
            destinations: [center as google.maps.LatLng],
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
            {
              (
                searchBox !== undefined &&
                myLocation !== undefined
              ) && (
                <DirectionsService
                  options={{
                    destination: center,
                    origin: myLocation,
                    travelMode: 'DRIVING' as google.maps.TravelMode
                  }}
                  callback={directionsCallback}
                />
              )
            }

            {
              response !== null && (
                <DirectionsRenderer
                  options={{
                    directions: response as google.maps.DirectionsResult
                  }}
                />
              )
        }
      </GoogleMap> : <><Spin /></>
    )
};
