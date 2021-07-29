import React, {useState} from 'react';
import { Modal, Input, Form, message, Button } from 'antd';
import { Global, css } from '@emotion/react';
import { FormRule, getRule } from '../utils/getRules';
import { EmailButton, PrimaryButton } from './Button';
import { hospitelStore } from 'store/hospitelStore';
import { UpdateHospitelInfo } from './UpdateHospitelInfo';
import axios from 'axios';

export const NotificationModal = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [changedRooms, setChangedRooms] = useState<number>();
    const [emailForm] = Form.useForm();
    const { loading, setLoading } = hospitelStore;

  const showModal = () => {
    setIsModalVisible(true);
  };

    const [isSubmitted, setIsSubmitted] = useState('#000000');
    const [isAvaliableModalVisible, setIsAvaliableModalVisible] = useState(false);
    const [updateAvailableRoomsForm] = Form.useForm();


    const [onLoginClick, setOnLoginClick] = useState(false);
    
    const handleClick = (e: any) => {
    e.preventDefault();
    setOnLoginClick(true);
  };
  const closeModal = (e: any) => {
    e?.preventDefault();
    setOnLoginClick(false);
  };
    
    const onAvailableRoomsFormCancel = () => {
        //TODO: add fetch data
        try {

        } catch (error) {
            console.error(error)
        } finally {
            setIsAvaliableModalVisible(false);
        }
    }

    const handleSubmitAvailableForm = () => {
        const value = updateAvailableRoomsForm.getFieldsValue();
        setChangedRooms(value.availableRoom);
        console.log(value);

        try {
            //TODO: add upload data function
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(!loading);
            console.log(loading)
            updateAvailableRoomsForm.resetFields();
            setIsSubmitted('#682CDA');
        }
    }
  const handleCancel = () => {
    setIsModalVisible(false);
  };
    
    const handleSubmitForm = () => {
        const value = emailForm.getFieldsValue();
        console.log(value);

        axios.post('http://35.247.17.176:3000/subscription', {
            userEmail: 'na@gmail.com',
            latitude: 13.791482115548867,
            longitude: 100.57448217776553
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error))
        
        try {
            //TODO: create fetch data
        } catch {
            message.error('ระบุอีเมลไม่สำเร็จ');
        } finally {
            setIsModalVisible(false);
            emailForm.resetFields();
        }
    }

    if (localStorage.getItem('password') && localStorage.getItem('username')) {
        return (
        <div>   
        <EmailButton className="bg-purple-500" onClick={() => setIsAvaliableModalVisible(true)}>
            อัพเดต
        </EmailButton>
        <Modal
            width={661}
            visible={isAvaliableModalVisible}
            bodyStyle={{ height: '307px' }}
            footer={false}
            onCancel={onAvailableRoomsFormCancel}
            centered
        >
            <div className="cursor-pointer" onClick={() => {
                localStorage.removeItem('username');
                localStorage.removeItem('password');
                window.location.reload();
            }}>
                ออกจากระบบ
            </div>
            <div className="flex flex-col items-center justify-center">
                <div className="text-xl font-bold">สถานะจำนวนห้องว่างใน Hospitel</div>
                <div className="text-sm font-bold" css={css`color: #323232;`}>ชื่อ Hospitel : โรงแรมไอบิสกรุงเทพ</div>
                <div className="flex items-end">
                    <div className="text-sm font-bold">จำนวนห้องว่าง</div>
                            <div className="text-6xl font-bold mx-2" css={css`color: ${isSubmitted}`}>{changedRooms}</div>
                    <div className="text-sm font-bold" css={css`color: #B1B1B1;`}>จาก 587</div>
                </div>
                <div className="text-sm font-bold mt-6 mb-2" css={css`color: #682CDA`}>อัปเดตจำนวนห้องว่างในช่องด้านล่าง</div>
                <Form
                    form={updateAvailableRoomsForm}
                    onFinish={handleSubmitAvailableForm}
                        >
                    <div className="flex">
                    <Form.Item
                        name="availableRoom"
                        rules={[{ required: true, message: 'กรุณากรอกจำนวนห้อง' }]}
                    >
                        <Input
                            type="number"
                            className="rounded-2xl w-40 h-8 mr-3 pl-16"
                            placeholder="xxx"
                        />
                    </Form.Item>
                    <Button
                        htmlType="submit"
                        type="primary"
                        className="w-16 h-7 text-white rounded-2xl border-0 mt-0.5"
                        css={css`background-color: #682CDA`}
                    >
                        ยืนยัน
                    </Button></div>
                </Form>
                    </div>
                    <div className="flex justify-between items-end">
                        <div>อัพเดท</div>
                        <Button onClick={handleClick}>แก้ไขข้อมูล Hospitel</Button>                        
            </div>
            </Modal>
            {onLoginClick && <UpdateHospitelInfo isShow={onLoginClick} onClose={closeModal}/>}
        </div>
        );
    } else {
        return (
            <>
                <Global
                    styles={css`{
                .ant-modal {
                    height: 234px;
                    width: 612px;
                }

                .ant-modal-wrap {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }`}
                />
                <EmailButton className="bg-white" onClick={showModal}>
                    กดรับแจ้งเตือนผ่านทาง E-mail
                </EmailButton>

                <Modal footer={null} visible={isModalVisible} onCancel={handleCancel} centered maskClosable={false}>
                    <div className="flex flex-col items-center justify-center">
                        <div>ขณะนี้เตียงเต็มแล้วค่ะ</div>
                        <div>เราจะทำการแจ้งท่านโดยเร็วที่สุดผ่านช่องทางอีเมล</div>
                        <div>โดยท่านสามารถกรอกอีเมลในช่องว่าง</div>
                        <Form
                            form={emailForm}
                            onFinish={handleSubmitForm}
                            className="flex items-center justify-center"
                        >
                            <Form.Item
                                label="อีเมล"
                                name="email"
                                className="mt-4"
                                normalize={(value) => value.trim()}
                                rules={[
                                    getRule(FormRule.REQUIRE, 'กรุณากรอกอีเมล'),
                                    getRule(FormRule.EMAIL)
                                ]}
                            >
                                <Input
                                    placeholder="เช่น name@example.com"
                                    size="large"
                                    className="rounded-md h-10 mb-3 py-6"
                                />
                            </Form.Item>
                            <div className="flex items-center justify-end bottom-16">
                                <PrimaryButton
                                    htmlType="submit"
                                    className="text-white mb-4 ml-2"
                                    type="primary"
                                >
                                    ยืนยัน
                                </PrimaryButton>
                            </div>
                        </Form>
                    </div>
                </Modal>
            </>
        );
    }
};