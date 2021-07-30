import React, { useState, useEffect } from 'react'
import { GoogleMapDrawer } from '../components/GoogleMapDrawer'
import { GoogleMapContent } from '../components/map/GoogleMapContent'
import { LoginModal } from '../components/LoginModal'
import { hospitelStore } from 'store/hospitelStore'
import axios from 'axios'
import { observer } from 'mobx-react-lite'
import { API_URL } from 'config/config'

export const MapPage = observer(() => {
  const [visible, setVisible] = useState(false)
  const [distance, setDistance] = useState<string>('')
  const [duration, setDuration] = useState<string>('')
  const { setHospitelList } = hospitelStore

  useEffect(() => {
    fetchHospitelData()
  }, [])

  const fetchHospitelData = () => {
    axios
      .post(`${API_URL}/hospitels`, {
        province: 'all',
        district: 'all',
      })
      .then((res: any) => setHospitelList(res.data))
  }

  return (
    <div>
      <GoogleMapContent
        setVisible={setVisible}
        setDistance={setDistance}
        setDuration={setDuration}
      />
      <GoogleMapDrawer
        visible={visible}
        setVisible={setVisible}
        distance={distance}
        duration={duration}
      />
      <LoginModal />
    </div>
  )
})
