
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState } from 'react';
import { Modal, Input, Button, Form } from 'antd';
import { EmailButton } from './Button';

export const HospitelChangeAvaliableRooms = () => {
    const [isSubmitted, setIsSubmitted] = useState('#000000');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [ updateAvailableRoomsForm ] = Form.useForm();

    const handleSubmitForm = () => {
        //TODO: add fetch data
        const value = updateAvailableRoomsForm.getFieldsValue();
        console.log(value);
        // setIsModalVisible(false);
        try {
            //TODO: add upload data function
        } catch (error) {
            console.error(error);
        } finally {
            updateAvailableRoomsForm.resetFields();
            setIsSubmitted('#682CDA');
        }
    }
    return (
        <div>   
        <EmailButton onClick={() => setIsModalVisible(true)}>
            กดรับแจ้งเตือนผ่านทาง E-mail
        </EmailButton>
        <Modal
            width={661}
            visible={isModalVisible}
            bodyStyle={{ height: '307px' }}
            footer={false}
            onCancel={() => setIsModalVisible(false)}
            centered
        >
            <div>ออกจากระบบ</div>
            <div className="flex flex-col items-center justify-center">
                <div className="text-xl font-bold">สถานะจำนวนห้องว่างใน Hospitel</div>
                <div className="text-sm font-bold" css={css`color: #323232;`}>ชื่อ Hospitel : โรงแรมไอบิสกรุงเทพ</div>
                <div className="flex items-end">
                    <div className="text-sm font-bold">จำนวนห้องว่าง</div>
                    <div className="text-6xl font-bold mx-2" css={css`color: ${isSubmitted}`}>360</div>
                    <div className="text-sm font-bold" css={css`color: #B1B1B1;`}>จาก 587</div>
                </div>
                <div className="text-sm font-bold mt-6 mb-2" css={css`color: #682CDA`}>อัปเดตจำนวนห้องว่างในช่องด้านล่าง</div>
                <Form
                    form={updateAvailableRoomsForm}
                    onFinish={handleSubmitForm}
                >
                    <Form.Item
                        name="availableRoom"
                    >
                        <Input
                            className="rounded-2xl w-40 h-8 mr-3 pl-16"
                            placeholder="xxx"
                        />
                    </Form.Item>
                    <Button
                        htmlType="submit"
                        type="primary"
                        className="w-16 h-7 text-white rounded-2xl border-0"
                        css={css`background-color: #682CDA`}
                    >
                        ยืนยัน
                    </Button>
                </Form>
            </div>
            <div>อัพเดท</div>
            <Button>แก้ไขข้อมูล Hospitel</Button>

            </Modal>
        </div>
    )
}