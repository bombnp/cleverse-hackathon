import React, { useState, useEffect} from 'react';
import { GoogleMapDrawer } from '../components/GoogleMapDrawer';
import { GoogleMapContent } from '../components/map/GoogleMapContent';
import { LoginModal } from '../components/LoginModal';
import { hospitelStore } from 'store/hospitelStore';
// import { HospitelChangeAvaliableRooms } from 'components/HospitelChangeAvaliableRooms';
import { RegisterModal } from 'components/RegisterModal';
import { UploadHospitelDocument } from 'components/UploadHospitelDocument';
import { UploadHospitelImage } from 'components/UploadHospitelImage';
import { HospitelLocation } from 'components/map/HospitelLocation';
import { observer } from 'mobx-react-lite';

export const MapPage = observer(() => {
    const [visible, setVisible] = useState(false);
    const [distance, setDistance] = useState<string>('');
    const [duration, setDuration] = useState<string>('');
    const { loading } = hospitelStore;

    return (
        <div>
            <GoogleMapContent setVisible={setVisible} setDistance={setDistance} setDuration={setDuration} />
            <GoogleMapDrawer visible={visible} setVisible={setVisible} distance={distance} duration={duration} />
            <LoginModal />
            {/* <HospitelInfo /> */}
            {/* <UploadHospitelImage /> */}
            {/* <RegisterModal /> */}
            {/* <HospitelLocation /> */}
        </div>
    )
});
