import React, {useState} from 'react';
import { GoogleMapDrawer } from '../components/GoogleMapDrawer';
import { GoogleMapContent } from '../components/map/GoogleMapContent';

export const MapPage = () => {
    const [visible, setVisible] = useState(false);
    const [distance, setDistance] = useState<string>('');
    const [duration, setDuration] = useState<string>('');
    return (
        <div>
            <GoogleMapContent setVisible={setVisible} setDistance={setDistance} setDuration={setDuration}/>
            <GoogleMapDrawer visible={visible} setVisible={setVisible} distance={distance} duration={duration}/>
        </div>
    )
}
