import React, { useState } from "react";
import { Modal, Input, Button, Form, Select } from "antd";
import { HospitelLocation } from "./map/HospitelLocation";
import { HospitalLocation } from './map/HospitalLocation';
import { PrimaryButton } from './Button';
import { RegisterConfirmModal } from "./RegisterConfirmModal";
import { RegisterStep } from './login';


interface RegisterModalProps {
    setStep: (step: any) => void;
}

export const RegisterModal = ({setStep}: RegisterModalProps) => {
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
    //   registerForm.resetFields();
    }
  };
    
  return (
    <Modal
      width={1036}
      visible={isModalVisible}
          bodyStyle={{ height: "778px" }}
        maskClosable={false}
      footer={false}
      onCancel={() => setIsModalVisible(false)}
      centered
    >
          <div className=" font-extrabold text-xl ">สมัครสมาชิก Hospitel</div>
          
          <Form
              form={registerForm}
              onFinish={handleSubmitForm}
          >
        <div className=" grid grid-cols-3 gap-12 mt-6">
          <div>

                <div className="mb-2 font-bold ">ชื่อ Hospitel</div>
                      <Form.Item
                        normalize={(value) => value.trim()}
                        name="name"
                >                          
              <Input
                className="w-64 rounded-2xl px-4 pt-4 pb-5"
                type="text"
                placeholder="กรอกชื่อ Hospitel"
              />
            </Form.Item>
            <div className="flex">

                              <div className="mb-2  font-bold ">จังหวัด</div>
                          <Form.Item
                              name="province"
                              normalize={(value) => value.trim()}
                          >                              
                <Select
                  placeholder="เลือกจังหวัด"
                  size="small"
                  style={{ width: 120 }}
                >
                  <Option key="กรุงเทพ" value="กรุงเทพ">
                    กรุงเทพ
                  </Option>
                </Select>
              </Form.Item>

                              <div className="ml-5 mb-2  font-bold ">อำเภอ</div>
                          <Form.Item
                              name="district"
                              normalize={(value) => value.trim()}
                          >                              
                <Select
                  placeholder="เลือกอำเภอ"
                  size="small"
                  style={{ width: 120, marginLeft: 15 }}
                >
                  <Option key="จตุจักร" value="จตุจักร">
                    จตุจักร
                  </Option>
                </Select>
              </Form.Item>
            </div>
              <div className="mb-2  font-bold ">ที่อยู่</div>
            
                      <Form.Item
                          name="address"
                          normalize={(value) => value.trim()}
                      >
              <Input
                className="w-64 rounded-2xl my-2 px-4 pt-4 pb-5"
                type="text"
                placeholder={"xxxx --xxx"}
              />
            </Form.Item>
              <div className="mb-2 font-bold ">ราคา</div>
                <div className="flex">
                         
                <div className="flex items-center justify-center">
                              <Form.Item
                                  name="minPrice"
                                  normalize={(value) => value.trim()}
                              >
                                  <Input
                    className="w-20 rounded-2xl mr-4 my-2 px-4 pt-4 pb-5"
                    type="text"
                    placeholder={"xxxx --xxx"}
                                  />
                  </Form.Item>
                              -
                              <Form.Item name="maxPrice" normalize={(value) => value.trim()}>
                  <Input
                    className="w-20 rounded-2xl mx-3 my-2 px-4 pt-4 pb-5"
                    type="text"
                    placeholder={"xxxx --xxx"}
                  /></Form.Item>
                          </div>
                          <Form.Item name="perDays" normalize={(value) => value.trim()}>
                <Select
                  defaultValue="ต่อเดือน"
                  style={{ width: 100 }}
                  className="mt-2"
                >
                  <Option value="ต่อเดือน">ต่อเดือน</Option>
                </Select></Form.Item>
              </div>
            
                <div className="mb-2  font-bold ">เบอร์ติดต่อ</div>
                <Form.Item name="phone" normalize={(value) => value.trim()}>          
              <Input
                className="w-64 rounded-2xl my-2 px-4 pt-4 pb-5"
                type="text"
                placeholder={"xxxx --xxx"}
              />
              <Input
                className="w-64 rounded-2xl mb-2 px-4 pt-4 pb-5"
                type="text"
                placeholder={"xxxx --xxx"}
              />
            </Form.Item>
            <Form.Item name="social" normalize={(value) => value.trim()}>
              <div className="mb-2  font-bold ">
                ช่องทางติดต่ออื่นๆ (Facebook, Line ฯลฯ)
              </div>
              <Input
                className="w-64 rounded-2xl px-4 pt-4 pb-5"
                type="text"
                placeholder={"xxxx --xxx"}
              />
              <Input
                className="w-64 mt-2 rounded-2xl px-4 pt-4 pb-5"
                type="text"
                placeholder={"xxxx --xxx"}
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item name="imageUrl" normalize={(value) => value.trim()}>
              <div className="mb-2  font-bold">
                อัพโหลดภาพ Hospital (สูงสุด 3 รูป)
              </div>
              <div className="pic-wrapper flex justify-between">
                <div
                  className="rounded-2xl bg-blue-200"
                  style={{ width: "90px", height: "90px" }}
                />

                <div
                  className="rounded-2xl bg-blue-200"
                  style={{ width: "90px", height: "90px" }}
                />
                <div
                  className="rounded-2xl bg-blue-200"
                  style={{ width: "90px", height: "90px" }}
                />
              </div>
            </Form.Item>
            <div className="flex">
                <div>
                                  <div className="mb-2  font-bold">จำนวนห้องว่าง</div>
              <Form.Item className="mr-6" name="availableRooms" normalize={(value) => value.trim()}>
                                  
                  <Input
                    className="w-32  rounded-2xl px-4 pt-4 pb-5"
                    placeholder={"xxxx --xxx"}
                                  />
              </Form.Item>                                  
                </div>

              
                <div>
                                  <div className="mb-2 font-bold">จำนวนห้องว่างทั้งหมด</div>
                    <Form.Item name="totalRooms" normalize={(value) => value.trim()}>              
                  <Input
                    className="w-32  rounded-2xl px-4 pt-4 pb-5"
                    placeholder={"xxxx --xxx"}
                                  />
                    </Form.Item>              
                </div>
             
            </div>
            
              <div>
                              <div className="mb-2 font-bold">หมายเหตุ</div>
                <Form.Item name="note" normalize={(value) => value.trim()}>              
                <TextArea
                  className="rounded-2xl px-4 pt-4 pb-5"
                  placeholder="Controlled autosize"
                  autoSize={{ minRows: 3, maxRows: 5 }}
                              />
                </Form.Item>              
              </div>
            
              <div>
                              <div className="mb-2 font-bold">สิ่งอำนวยความสะดวก</div>
                <Form.Item name="facility" normalize={(value) => value.trim()}>              
                <TextArea
                  className="rounded-2xl px-4 pt-4 pb-5"
                  autoSize={{ minRows: 3, maxRows: 5 }}
                  placeholder={"xxxx --xxx"}
                              />
                </Form.Item>              
              </div>
            
            <Form.Item>
              <div className="mb-2 font-bold">
                อัปโหลดเอกสารอนุญาตการเปิด Hospitel
              </div>
              <div
                className="rounded-2xl bg-blue-200"
                style={{ width: "90px", height: "40px" }}
              />
            </Form.Item>
          </div>
          <div className="wrapper-3">
            <Form.Item>
              <div className="mb-2 font-bold ">สถานที่ของ Hospitel</div>
              <HospitelLocation />
            </Form.Item>
            
                          <div className="mb-2 font-bold ">เข้าร่วมกับโรงพยาบาล</div>
                <Form.Item name="coHospital" normalize={(value) => value.trim()}>          
              <Input
                className="w-64 rounded-2xl px-4 pt-4 pb-5"
                type="text"
                placeholder="กรอกชื่อโรงพยาบาล"
              />
            </Form.Item>
            <Form.Item>
              <div className="mb-2 font-bold ">สถานที่ของโรงพยาบาล</div>
              <HospitalLocation />
            </Form.Item>
          </div>
              </div>
                                          <PrimaryButton
                                htmlType="submit"
                                className="text-white mb-4 ml-2"
                  type="primary"
                  onClick={() => {setStep(RegisterStep.CONFIRM)}}
                            >
                                ถัดไป
                            </PrimaryButton>
      </Form>
    </Modal>
  );
};
