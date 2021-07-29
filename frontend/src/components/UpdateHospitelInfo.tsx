import React, { useEffect, useState, useCallback } from "react";
import { Modal, Input, Button, Form, Select } from "antd";
import { HospitelLocation } from "./map/HospitelLocation";
import { HospitalLocation } from "./map/HospitalLocation";
import { PrimaryButton } from "./Button";
import { hospitelStore } from "store/hospitelStore";
import { RegisterStep } from "./login";
import { observer } from 'mobx-react-lite';
import { HospitelDocument } from "./hospitel";

interface RegisterModalProps {
  setStep: (step: any) => void;
}
const KUY_TOK = {
  userEmail: "",
  userPassword: "",
  name: "",
  totalRooms: 0,
  availableRooms: 0,
  price: {
    maxPrice: 1,
    minPrice: 4,
    perDays: 4,
  },
  imageUrl: [""],
  documentUrl: "",
  address: {
    province: "",
    district: "",
    address: "",
    latitude: 0,
    longitude: 0,
  },
  contact: {
    phone: [""],
    social: [""],
  },
  facility: "",
  note: "",
  coHospital: {
    name: "",
    latitude: 0,
    longitude: 0,
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};
export const RegisterModal = observer(({ setStep }: RegisterModalProps) => {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [selectedHospitalLocation, setSelectedHospitalLocation] = useState<any>();
    const [selectedHospitelLocation, setSelectedHospitelLocation] = useState<any>();

  const [registerForm] = Form.useForm();

    const [hostipel, setHostipel] = useState<HospitelDocument>(KUY_TOK);
    const { setRegisterHospitel } = hospitelStore;
  const { Option } = Select;
  const { TextArea } = Input;

  const handleSubmitForm = useCallback(() => {
    //TODO: add fetch data
    const value = registerForm.getFieldsValue();
      if (selectedHospitalLocation && selectedHospitelLocation) {

          setHostipel((prev) => ({
              ...prev,
              userEmail: "emial",
              userPassword: "fuck",
              name: value.name,
              totalRooms: value.totalRooms,
              availableRooms: value.availableRooms,
              price: {
                  ...prev.price,
                  maxPrice: value.maxPrice,
                  minPrice: value.minPrice,
                  perDays: value.perDays,
              },
              imageUrl: value.imageUrl,
              documentUrl: "string",
              address: {
                  ...prev.address,
                  province: value.province,
                  district: value.district,
                  address: value.address,
                  latitude: selectedHospitelLocation.lat,
                  longitude: selectedHospitelLocation.lat,
              },
              contact: {
                  ...prev.contact,
                  phone: [value.contact[0].phone],
                  social: [value.contact[1].social],
              },
              facility: value.facility,
              note: value.note,
              coHospital: {
                  ...prev.coHospital,
                  name: value.coHospital,
                  latitude: selectedHospitalLocation.lat,
                  longitude: selectedHospitalLocation.lng,
              },
              createdAt: new Date(),
              updatedAt: new Date(),
          }));
          // setIsModalVisible(false);
    
          try {
              //TODO: add upload data function
              // setRegisterHospitel(hostipel);
          } catch (error) {
              console.error(error);
          } finally {
              console.log(hostipel)
              // setRegisterHospitel(hostipel);
              setStep(RegisterStep.CONFIRM);
              //   registerForm.resetFields();
          }
      }
  }, [selectedHospitalLocation, selectedHospitelLocation]);
  useEffect(() => {
      setRegisterHospitel(hostipel);
  }, [hostipel]);
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

      <Form form={registerForm} onFinish={handleSubmitForm}>
        <div className="grid grid-cols-3 gap-12 mt-6">
          <div>
            <div className="mb-2 font-bold ">ชื่อ Hospitel</div>
            <Form.Item normalize={(value) => value.trim()} name="name">
              <Input
                className="w-64 rounded-2xl px-4 pt-4 pb-5"
                type="text"
                placeholder="กรอกชื่อ Hospitel"
              />
            </Form.Item>
            <div className="flex">
              <div className="mb-2  font-bold ">จังหวัด</div>
              <Form.Item name="province" normalize={(value) => value.trim()}>
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
              <Form.Item name="district" normalize={(value) => value.trim()}>
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
            <div className="font-bold ">ที่อยู่</div>
            <Form.Item name="address" normalize={(value) => value.trim()}>
              <Input
                className="w-64 rounded-2xl my-2 px-4 pt-4 pb-5"
                type="text"
                placeholder={"xxxx --xxx"}
              />
            </Form.Item>
            <div className="mb-2 font-bold ">ราคา</div>
            <div className="flex">
              <div className="flex items-center justify-center">
                <Form.Item name="minPrice" normalize={(value) => value.trim()}>
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
                  />
                </Form.Item>
              </div>
              <Form.Item name="perDays" normalize={(value) => value.trim()}>
                <Select
                  defaultValue="ต่อเดือน"
                  style={{ width: 100 }}
                  className="mt-2"
                >
                  <Option value="ต่อเดือน">ต่อเดือน</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="mb-2  font-bold ">เบอร์ติดต่อ</div>

            <Form.Item name={['contact', 0, 'phone', 0]} normalize={(value) => value.trim()}>
              <Input
                className="w-64 rounded-2xl my-2 px-4 pt-4 pb-5"
                type="text"
                placeholder={"xxxx --xxx"}
                          />
                      </Form.Item>
            <Form.Item name={['contact', 0, 'phone', 1]} normalize={(value) => value.trim()}>
              <Input
                className="w-64 rounded-2xl -mt-12 mb-2 px-4 pt-4 pb-5"
                type="text"
                placeholder={"xxxx --xxx"}
              />
            </Form.Item>
              <div className="mb-2  font-bold ">
                ช่องทางติดต่ออื่นๆ (Facebook, Line ฯลฯ)
                          </div>
            <Form.Item name={['contact', 1, 'social', 0]} normalize={(value) => value.trim()}>
                          
              <Input
                className="w-64 rounded-2xl px-4 pt-4 pb-5"
                type="text"
                placeholder={"xxxx --xxx"}
                          />
                                      </Form.Item>
            <Form.Item name={['contact', 1, 'social', 1]} normalize={(value) => value.trim()}>
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
                <Form.Item
                  className="mr-6"
                  name="availableRooms"
                  normalize={(value) => value.trim()}
                >
                  <Input
                    className="w-32  rounded-2xl px-4 pt-4 pb-5"
                    placeholder={"xxxx --xxx"}
                  />
                </Form.Item>
              </div>

              <div>
                <div className="mb-2 font-bold">จำนวนห้องว่างทั้งหมด</div>
                <Form.Item
                  name="totalRooms"
                  normalize={(value) => value.trim()}
                >
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
              <div className="mb-2 font-bold ">สถานที่ของ Hospitel</div>
                      
            <Form.Item>
                <HospitelLocation setSelectedHospitelLocation={setSelectedHospitelLocation}/>  
            </Form.Item>

            <div className="mb-2 font-bold ">เข้าร่วมกับโรงพยาบาล</div>
            <Form.Item name={["coHospital", 'name']} normalize={(value) => value.trim()}>
              <Input
                className="w-64 rounded-2xl px-4 pt-4 pb-5"
                type="text"
                placeholder="กรอกชื่อโรงพยาบาล"
              />
                      </Form.Item>
            <div className="mb-2 font-bold ">สถานที่ของโรงพยาบาล</div>
          
            <Form.Item name="coHospital" normalize={(value) => value.trim()}>
                <HospitalLocation setSelectedHospitalLocation={setSelectedHospitalLocation}/>  
            </Form.Item>
                      
          </div>
        </div>
        <PrimaryButton
          htmlType="submit"
          className="text-white mb-4 ml-2"
          type="primary"
        >
          ถัดไป
        </PrimaryButton>
      </Form>
    </Modal>
  );
});
