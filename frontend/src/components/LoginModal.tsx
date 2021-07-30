/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState } from 'react';
import { Modal, Input, Button, Form, message } from 'antd';
import { ReactComponent as NextStepIcon } from '../assets/arrow-right.svg';
import { ReactComponent as PrevStepIcon } from '../assets/arrow-left.svg';
import { LoginStep } from './login';
import { hospitelStore } from 'store/hospitelStore';
import { RegisterFlow } from './RegisterFlow';
import axios from 'axios';

export const LoginModal = ({
  isShow,
  onClose,
}: {
  isShow?: boolean;
  onClose?: any;
}) => {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [step, setStep] = useState('first');
    const [loginForm] = Form.useForm();
    const { setUserLogin, setLoginHospitel } = hospitelStore;
    
    const getMyHospitel = ( access_token : any, id : any) => {
        axios.get(`http://35.247.17.176:3000/hospitels/${id}`,{
        headers: {
            'Authorization': `${access_token}`
        }})
            .then((res) => {
                console.log(res.data);
                setLoginHospitel(res.data);
                message.success('เข้าสู่ระบบสำเร็จ');
            })
            .catch((error) => {
                console.log(error);
                message.error('เข้าสู่ระบบไม่สำเร็จ')
            })
    }

    const handleSubmitForm = () => {
        const value = loginForm.getFieldsValue();
        console.log(value)
            axios.post('http://35.247.17.176:3000/auth/login', value)
                .then((res) => {
                getMyHospitel(res.data.token, res.data._id)
                localStorage.setItem('email', value.email);
                localStorage.setItem('password', value.password);
                localStorage.setItem('access_token', res.data.token)
                loginForm.resetFields();
                setUserLogin(true);
                onClose();
            })
            .catch((error) => console.log(error))
    }

    switch (step) {
        case LoginStep.FIRST:
            return (
                <Modal
                     width={361}
          visible={isShow}
          destroyOnClose={true}
          bodyStyle={{ height: "404px" }}
          footer={false}
          onCancel={onClose}
          onOk={onClose}
          centered
                >
                    <div className="flex flex-col items-center justify-center">
                        <Button
                            type="primary"
                            className="w-52 h-10 my-4 bg-blue-500 text-white rounded-3xl text-lg font-semibold border-0"
                            onClick={onClose}
                            css={css`
                                background-color: #682CDA;
                            `}
                        >
                            หา Hospitel เลย !
                        </Button>
                        <div className="text-xs cursor-pointer flex"  onClick={() => setStep(LoginStep.LOG_IN)}>ล็อคอินสำหรับ Hospitel<NextStepIcon className="mt-1 ml-2" /></div>
                    </div>
                    
                    </Modal>
            );
        case LoginStep.LOG_IN:
            return (
                <Modal
                    width={361}
                    bodyStyle={{ height: '404px' }}
                    visible={isShow}
                    footer={false}
                    onCancel={onClose}
                    onOk={onClose}
                    centered
                >
                    <PrevStepIcon onClick={() => setStep(LoginStep.FIRST)} className="cursor-pointer" />
                    <div
                        className="m-4"
                    >
                        <div className="flex flex-col">
                            <div className="text-xs text-gray-500 mt-2">ยินดีต้อนรับ!</div>
                            <div className="text-lg font-bold mb-5">เข้าสู่ระบบสมาชิก Hospitel</div>
                            <Form
                                form={loginForm}
                                onFinish={handleSubmitForm}
                            >
                                <div className="text-xs font-semibold mb-1">E-Mail or UserName</div>
                                <Form.Item
                                    name="email"
                                    rules={[{ required: true, message: 'กรุณากรอกอีเมล' }]}
                                >
                                    <Input className="rounded-3xl py-5 mt-1" placeholder="eg.: elonmusk@mars.com" />
                                </Form.Item>
                                <div className="text-xs font-semibold mb-1">Password</div>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน' }]}
                                >
                                    <Input.Password className="rounded-3xl text-sm" placeholder="eg.: 5246185" />
                                </Form.Item>
                            
                            <Button
                                htmlType="submit"
                                type="primary"
                                className="w-full h-10 my-3 text-white rounded-3xl text-lg font-semibold border-0"
                                css={css`
                                    background-color: #682CDA;
                                `}
                            >
                                เข้าสู่ระบบ
                            </Button>
                            </Form>
                            <div className="text-xs flex" onClick={() => setStep(LoginStep.REGISTER)}>
                                <div className="text-gray-400">ไม่มีสมาชิกผู้ใช้</div>
                                <div className="flex ml-1 cursor-pointer">สมัครสมาชิก<NextStepIcon className="mt-1 ml-2" /></div>
                            </div>
                        </div>
                    </div>
                </Modal>
            );
        case LoginStep.REGISTER:
            return (
                <RegisterFlow isShow={isShow} onClose={onClose}/>
            );
        default:
            return (
                <Modal
                    width={361}
                    visible={isModalVisible}
                    bodyStyle={{ height: '404px' }}
                    footer={false}
                    centered
                >
                    <div className="flex flex-col items-center justify-center">
                        <Button type="default" className="w-52 h-10 my-4 bg-blue-500 text-white rounded-3xl text-lg font-semibold border-0" onClick={() => setIsModalVisible(false)}>หา Hospitel เลย !</Button>
                        <div className="text-xs cursor-pointer flex" onClick={() => setStep(LoginStep.LOG_IN)}>ล็อคอินสำหรับ Hospitel<NextStepIcon className="mt-1 ml-2" /></div>
                    </div>
                    
                </Modal>
            );
    };

}