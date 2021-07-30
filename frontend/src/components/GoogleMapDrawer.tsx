/** @jsxRuntime classic */
/** @jsx jsx */

import React, { useState } from 'react';
import { Drawer } from 'antd';
import { Global, css, jsx } from '@emotion/react';
import { observer } from 'mobx-react-lite';
import { hospitelStore } from 'store/hospitelStore';
import { ReactComponent as PinIcon } from 'assets/pin-icon.svg';
import { ReactComponent as PhoneIcon } from 'assets/phone-icon.svg';
import { ReactComponent as BedIcon } from 'assets/bed-icon.svg';
import { ReactComponent as EarthIcon } from 'assets/earth-icon.svg';
import { ReactComponent as HandShakeIcon } from 'assets/handshake-icon.svg';
import { ReactComponent as WalletIcon } from 'assets/wallet-icon.svg';
import { ReactComponent as WarningIcon } from 'assets/warning-icon.svg';
interface GoogleMapDrawerProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    distance?: string;
    duration?: string;
}

export const GoogleMapDrawer = observer(({ visible, setVisible, distance, duration }: GoogleMapDrawerProps) => {
    const [isSeeMore, setIsSeeMore] = useState(false);
    const onClose = () => {
        setVisible(false);
    };

    const { selectedHospitel } = hospitelStore;

    const calculateRoom = (value: number) => {
        var percentage = (value / 100) * 100;
        if (percentage === 0) {
            return `#BFBFBF`;
        } else if (percentage <= 30) {
            return `#F0CC12`;
        } else {
            return `#11B418`;
        }
    }

    const numberWithCommas = (x: number) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return (
        <div>
            <Global
                styles={css`
            .ant-drawer-left, .ant-drawer-right {
                height: ${ isSeeMore ? '100%' : '640px'};
                border-top-right-radius: 25px;
                border-bottom-right-radius: 25px;
                overflow: scroll;
            }
            
            .ant-drawer-content {
                height: ${ isSeeMore ? '100%' : '640px'};
                overflow: scroll;
                border-top-right-radius: 25px;
                border-bottom-right-radius: 25px;
             }
            
            .ant-drawer-left .ant-drawer-content-wrapper, .ant-drawer-right .ant-drawer-content-wrapper .ant-drawer-content .ant-drawer-content-wrapper-body{
                height: ${ isSeeMore ? '100%' : '640px'};
                overflow: scroll;
                border-bottom-right-radius: 25px;
                border-top-right-radius: 25px;
            }

            .ant-drawer-mask {
                background-color: transparent;
            }
            .ant-drawer-body {
                border-top-right-radius: 25px;
                border-bottom-right-radius: 25px;
            }
        `}
            />
            <Drawer
                width={480}
                placement="left"
                closable
                maskClosable={false}
                mask={false}
                onClose={onClose}
                visible={visible}
            >
                <div className="flex flex-col mx-4 mt-8 overflow-y-scroll">
                    {selectedHospitel?.imageUrls? <img className="w-full h-56 rounded-2xl" src={selectedHospitel?.imageUrls[0]} alt="hospitel logo" /> : ''}
                    <div className="mt-6">
                        <div className="text-3xl">{selectedHospitel?.name}</div>
                        <div
                            className="text-4xl font-bold my-3"
                            css={css`
                                color: ${calculateRoom(selectedHospitel?.availableRooms ?? 0)};
                        `}>
                            {selectedHospitel?.availableRooms ?? 0} ห้อง
                        </div>
                        <div className="flex my-3 text-lg font-semibold underline leading-5">
                            <PhoneIcon className="-ml-4 mr-4" />
                            {selectedHospitel?.contact.phone.map((phone:string) => (
                                <div>{phone}</div>
                            ))}
                        </div>
                        <div className="flex my-2">
                            <WalletIcon className="-ml-4 mr-2 mt-1.5" />
                            <div>{numberWithCommas(selectedHospitel?.price.minPrice ?? 0)} - {numberWithCommas(selectedHospitel?.price.maxPrice ?? 0)} บาท/เดือน</div>
                        </div>
                        <div className="flex my-2">
                            <PinIcon className="-ml-4 mr-2 mt-1.5" />
                            <div>{selectedHospitel?.address.address ?? '-'}</div>
                        </div>
                        <div>** ห่างจากคุณ {distance} **</div>
                    </div>
                    {isSeeMore &&
                        <div className="text-lg">
                            <div className="my-2">
                                <div className="flex font-bold text-lg text-gray-700">
                                    <HandShakeIcon className="-ml-4 mr-2 mt-2.5" />เข้าร่วมกับ
                                </div>
                                <div>{selectedHospitel?.coHospital.name ?? '-' }</div>
                            </div>
                            <div className="my-2">
                            <div className="flex font-bold text-lg text-gray-700">
                                <WarningIcon className="-ml-4 mr-2 mt-2.5" />หมายเหตุ
                            </div>
                                <div>{selectedHospitel?.note ?? '-'}</div>
                            </div>
                            <div className="my-2">
                                <div className="flex font-bold text-lg text-gray-700">
                                    <BedIcon className="-ml-4 mr-2 mt-2.5"/>สิ่งอำนวยความสะดวก
                                </div>
                                <div>{selectedHospitel?.facility ?? '-'}</div>
                            </div>
                        <div>
                            <div className="flex font-bold text-lg text-gray-700">
                                <EarthIcon className="-ml-4 mr-2" />
                            </div>
                            <div>{selectedHospitel?.contact.social ?? '-'}</div>
                            </div>
                        </div>
                    }
                    <div className="flex items-center w-full justify-center mt-6">
                        <div className="justify-center underline text-lg cursor-pointer" onClick={() => setIsSeeMore(!isSeeMore)}>{isSeeMore ? 'ย่อลง' : 'ดูเพิ่มเติม'}</div>
                    </div>
                    <div
                        className="flex text-xs justify-end"
                        css={css`
                            color: #808080
                        `}
                    >
                        อัพเดทล่าสุด {selectedHospitel?.updatedAt}
                    </div> 
                </div>
            </Drawer>
        </div>
    )
});