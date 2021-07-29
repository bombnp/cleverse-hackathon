import React, { useState, useEffect } from 'react';
import { GoogleMapDrawer } from '../components/GoogleMapDrawer';
import { GoogleMapContent } from '../components/map/GoogleMapContent';
import { LoginModal } from '../components/LoginModal';
import { hospitelStore } from 'store/hospitelStore';
import { UploadHospitelImage } from 'components/UploadHospitelImage';
import axios from 'axios';
import { observer } from 'mobx-react-lite';

export const MapPage = observer(() => {
    const [visible, setVisible] = useState(false);
    const [distance, setDistance] = useState<string>('');
    const [duration, setDuration] = useState<string>('');
    const { setHospitelList } = hospitelStore;

    useEffect(() => {
        fetchHospitelData();
    }, []);

    const fetchHospitelData = () => {
        axios.post('http://35.247.17.176:3000/hospitels',
            {
                province: 'all',
                district: 'all'
            })
        .then((res:any) => setHospitelList(res.data))
    }

    return (
        <div>
            <GoogleMapContent setVisible={setVisible} setDistance={setDistance} setDuration={setDuration} />
            <GoogleMapDrawer visible={visible} setVisible={setVisible} distance={distance} duration={duration} />
            <LoginModal />
            {/* <UploadHospitelImage /> */}
        </div>
    )
});
