import React, { useState } from "react";
import { Modal, Input, Button, Form, Select } from "antd";
import { HospitelLocation } from "./map/HospitelLocation";
import { HospitalLocation } from './map/HospitalLocation';

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
      <Form>
        <div className=" grid grid-cols-3 gap-12 mt-6">
          <div>
                      <Form.Item
                          name="hospitelname"
                >
              <div className="mb-2 font-bold ">ชื่อ Hospitel</div>
              <Input
                className="w-64 rounded-2xl px-4 pt-4 pb-5"
                type="text"
                placeholder="กรอกชื่อ Hospitel"
              />
            </Form.Item>
            <div className="flex">
                          <Form.Item
                              name="province"
                          >
                <div className="mb-2  font-bold ">จังหวัด</div>
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
                          <Form.Item
                              name="district"
                          >
                <div className="ml-5 mb-2  font-bold ">อำเภอ</div>
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
                      <Form.Item
                          name="address"
                      >
              <div className="mb-2  font-bold ">ที่อยู่</div>
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
                              name="minPrice">
                                  <Input
                    className="w-20 rounded-2xl mr-4 my-2 px-4 pt-4 pb-5"
                    type="text"
                    placeholder={"xxxx --xxx"}
                                  />
                  </Form.Item>
                              -
                              <Form.Item name="maxPrice">
                  <Input
                    className="w-20 rounded-2xl mx-3 my-2 px-4 pt-4 pb-5"
                    type="text"
                    placeholder={"xxxx --xxx"}
                  /></Form.Item>
                          </div>
                          <Form.Item name="perDays">
                <Select
                  defaultValue="ต่อเดือน"
                  style={{ width: 100 }}
                  className="mt-2"
                >
                  <Option value="ต่อเดือน">ต่อเดือน</Option>
                </Select></Form.Item>
              </div>
            <Form.Item name="phone">
              <div className="mb-2  font-bold ">เบอร์ติดต่อ</div>
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
            <Form.Item name="social">
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
            <Form.Item name="imageUrl">
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
              <Form.Item className="mr-6">
                <div>
                  <div className="mb-2  font-bold">จำนวนห้องว่าง</div>
                  <Input
                    className="w-32  rounded-2xl px-4 pt-4 pb-5"
                    placeholder={"xxxx --xxx"}
                  />
                </div>
              </Form.Item>
              <Form.Item>
                <div>
                  <div className="mb-2 font-bold">จำนวนห้องว่างทั้งหมด</div>
                  <Input
                    className="w-32  rounded-2xl px-4 pt-4 pb-5"
                    placeholder={"xxxx --xxx"}
                  />
                </div>
              </Form.Item>
            </div>
            <Form.Item>
              <div>
                <div className="mb-2 font-bold">หมายเหตุ</div>
                <TextArea
                  className="rounded-2xl px-4 pt-4 pb-5"
                  placeholder="Controlled autosize"
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </div>
            </Form.Item>
            <Form.Item name="facility">
              <div>
                <div className="mb-2 font-bold">สิ่งอำนวยความสะดวก</div>
                <TextArea
                  className="rounded-2xl px-4 pt-4 pb-5"
                  autoSize={{ minRows: 3, maxRows: 5 }}
                  placeholder={"xxxx --xxx"}
                />
              </div>
            </Form.Item>
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
          <div className="wrapper-3 ">
            <Form.Item>
              <div className="mb-2 font-bold ">สถานที่ของ Hospitel</div>
              <HospitelLocation />
            </Form.Item>
            <Form.Item>
              <div className="mb-2 font-bold ">เข้าร่วมกับโรงพยาบาล</div>
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
      </Form>
    </Modal>
  );
};
