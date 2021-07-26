import React from 'react';
import { Drawer } from 'antd';
import logo from './Hospitel_Pic.jpg';
import { Global, css } from '@emotion/react';
import classNames from 'classnames';
interface GoogleMapDrawerProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    distance?: string;
    duration?: string;
}

export const GoogleMapDrawer = ({ visible, setVisible, distance, duration }: GoogleMapDrawerProps) => {
    let bedRest = 50;
    const onClose = () => {
        setVisible(false);
    };


    const numberWithCommas = (x:number) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return (
        <>
        <Global
            styles={css`
             .ant-drawer-content {
                height: 700px;
                border-top-right-radius: 25px;
                border-bottom-right-radius: 25px;
             }
            .ant-drawer-left .ant-drawer-content-wrapper, .ant-drawer-right .ant-drawer-content-wrapper .ant-drawer-content .ant-drawer-content-wrapper-body{
                height: 700px;
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
            onClose={onClose}
            visible={visible}
        >
            <div className="flex flex-col mx-4 mt-8">
                <img className="w-full h-56 rounded-2xl" src={logo} alt="hospitel logo" />
                <div className="mt-6">
                    <div className="text-2xl font-bold">Almas Hotel Bangkok</div>
                    <div className={classNames('my-4 font-bold text-4xl', {
                        'text-green-500': bedRest > 1000,
                        'text-yellow-400': bedRest > 100 && bedRest < 1000,
                        'text-red-500': bedRest < 100
                    })}>{bedRest} เตียง</div>
                    <div className="my-2 text-md font-bold">
                        <div>02 111 1111</div>
                        <div>02 222 2222</div>
                    </div>
                    <div className="my-2">
                            <div>{numberWithCommas(1500)} - 3000 บาท/เดือน</div>
                    </div>
                    <div className="my-2">
                        ที่อยู่
                        </div>
                        <div>ห่างจาก {distance}</div>
                </div>
            </div>
            </Drawer>
        </>
    )
}