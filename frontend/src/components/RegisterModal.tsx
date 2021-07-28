import React, { useState } from 'react';
import { Modal, Input, Button, Form, Select } from 'antd';

export const RegisterModal = () => {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [registerForm] = Form.useForm();

    const { Option } = Select;
    const { TextArea } = Input;
    
    const handleSubmitForm = () => {
        //TODO: add fetch data
        const value = registerForm.getFieldsValue();
        console.log(value);
        // setIsModalVisible(false);
        try {
            //TODO: add upload data function
        } catch (error) {
            console.error(error);
        } finally {
            registerForm.resetFields();
        }
    }
    return (
        <Modal
            width={1036}
            visible={isModalVisible}
            bodyStyle={{ height: '778px' }}
            footer={false}
            onCancel={() => setIsModalVisible(false)}
            centered
        >

            <div>สมัครสมาชิก Hospitel</div>

            <Form>
                <div className="grid grid-cols-3 gap-12">
                    <div>
                        <Form.Item
                        >
                            <div>ชื่อ Hospitel</div>
                            <Input className="w-64 rounded-2xl" type="text" />
                        </Form.Item>
                        <div className="flex">
                            <Form.Item>
                                <div>จังหวัด</div>
                                <Select
                                    placeholder="เลือกจังหวัด"
                                    size="small"
                                    style={{width:120}}
                                >
                                    <Option
                                        key="กรุงเทพ"
                                        value="กรุงเทพ"
                                    >กรุงเทพ</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <div className="ml-5">อำเภอ</div>
                                <Select
                                    placeholder="เลือกอำเภอ"
                                    size="small"
                                    style={{width:120, marginLeft:15}}
                                >
                                    <Option key="จตุจักร" value="จตุจักร">จตุจักร</Option>
                                </Select>                                
                            </Form.Item>
                        </div>
                        <Form.Item>
                            <div>ที่อยู่</div>
                            <Input className="w-64 rounded-2xl my-2" type="text" />
                        </Form.Item>
                        <Form.Item>
                            <div>ราคา</div>
                            <div className="flex">
                                <div className="flex items-center justify-center">
                                    <Input className="w-20 rounded-2xl mr-2" type="text" /> - <Input className="w-20 rounded-2xl mx-2" type="text" />
                                </div>
                                <Select
                                    defaultValue="ต่อเดือน"
                                    style={{width:100}}
                                >
                                    <Option value="ต่อเดือน">ต่อเดือน</Option>
                                </Select>
                            </div>
                        </Form.Item>
                        <Form.Item>
                            <div>เบอร์ติดต่อ</div>
                            <Input className="w-64 rounded-2xl my-2" type="text" />
                            <Input className="w-64 rounded-2xl mb-2" type="text" />
                        </Form.Item>
                        <Form.Item>
                            <div>ช่องทางติดต่ออื่นๆ (Facebook, Line ฯลฯ)</div>
                            <Input className="w-64 rounded-2xl my-2" type="text" /> 
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item>
                            อัพโหลดภาพ Hospital (สูงสุด 3 รูป)
                        </Form.Item>
                        <div className="flex">
                            <Form.Item>
                                    <div>
                                        <div>จำนวนห้องว่าง</div>
                                        <Input className="w-32"/>
                                    </div>
                            </Form.Item>
                            <Form.Item>
                                <div>
                                    <div>จำนวนห้องว่าง</div>
                                    <Input className="w-32"/>
                                </div>
                            </Form.Item>
                        </div>
                        <Form.Item>
                            <div>
                                <div>หมายเหตุ</div>
                                <TextArea
                                placeholder="Controlled autosize"
                                autoSize={{ minRows: 3, maxRows: 5 }}
                                />
                            </div>
                        </Form.Item>
                        <Form.Item>
                            <div>
                                <div>สิ่งอำนวยความสะดวก</div>
                                <Input className="w-32"/>
                            </div>
                        </Form.Item>
                        <div>อัปโหลดเอกสารอนุญาตการเปิด Hospitel</div>
                    </div>
                </div>                
            </Form>
        </Modal>
    )
}