/** @jsxRuntime classic */
/** @jsx jsx */

import React from 'react';
import { Drawer } from 'antd';
import logo from './Hospitel_Pic.jpg';
import { Global, css, jsx } from '@emotion/react';
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

    const numberWithCommas = (x:number) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return (
        <div>
        <Global
            styles={css`
            .ant-drawer-left, .ant-drawer-right {
                height: 600px;
            }
            
            .ant-drawer-content {
                height: 600px;
                border-top-right-radius: 25px;
                border-bottom-right-radius: 25px;
             }
            
            .ant-drawer-left .ant-drawer-content-wrapper, .ant-drawer-right .ant-drawer-content-wrapper .ant-drawer-content .ant-drawer-content-wrapper-body{
                height: 600px;
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
            <div className="flex flex-col mx-4 mt-8">
                <img className="w-full h-56 rounded-2xl" src={logo} alt="hospitel logo" />
                <div className="mt-6">
                    <div className="text-3xl">Almas Hotel Bangkok</div>
                        <div
                            className="text-4xl font-bold my-3"
                            css={css`
                                color: ${calculateRoom(50)};
                        `}>
                            {bedRest} เตียง
                        </div>
                    <div className="my-3 text-lg font-semibold underline leading-5">
                        <div>02 111 1111</div>
                        <div>02 222 2222</div>
                    </div>
                    <div className="my-2">
                            <div>{numberWithCommas(1500)} - {numberWithCommas(3000)} บาท/เดือน</div>
                    </div>
                    <div className="my-2">
                        ที่อยู่
                        </div>
                        <div>** ห่างจากคุณ {distance} **</div>
                    </div>
                    <div
                        className="flex text-xs justify-end"
                        css={css`
                            color: #808080
                        `}
                    >
                        อัพเดทล่าสุด
                    </div>
            </div>
            </Drawer>
        </div>
    )
}