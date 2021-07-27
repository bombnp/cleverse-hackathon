import React, {useState} from 'react';
import { Modal, Input, Form } from 'antd';
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
        emailForm.resetFields();
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
                      onFinish={() => setIsModalVisible(false)}
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
                        <div className="flex items-center justify-center">
                            <Input
                                placeholder="เช่น name@example.com"
                                size="large"
                                className="rounded-xl h-10 mb-3 py-6"
                            />
                            <PrimaryButton
                                htmlType="submit"
                                className="text-white ml-3"
                                onClick={() => handleSubmitForm}
                            >
                                ยืนยัน
                            </PrimaryButton>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    </>
  );
};