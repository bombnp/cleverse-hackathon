import React, {useState} from 'react';
import { Modal, Input, Form, message } from 'antd';
import { Global, css } from '@emotion/react';
import { FormRule, getRule } from '../utils/getRules';
import { EmailButton, PrimaryButton } from './Button';

export const NotificationModal = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [emailForm] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
    
    const handleSubmitForm = () => {
        const value = emailForm.getFieldsValue();
        console.log(value);
        try {
            //TODO: create fetch data
        } catch {
            message.error('ระบุอีเมลไม่สำเร็จ');
        } finally {
            setIsModalVisible(false);
            emailForm.resetFields();
        }
    }

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
        <EmailButton onClick={showModal}>
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
};