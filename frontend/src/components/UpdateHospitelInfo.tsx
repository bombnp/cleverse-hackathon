import React, { useEffect, useState, useCallback } from "react";
import { Modal, Input, Form, Select, Spin } from "antd";
import { HospitelLocation } from "./map/HospitelLocation";
import { HospitalLocation } from "./map/HospitalLocation";
import { SubmitButton } from "./Button";
import { hospitelStore } from "store/hospitelStore";
import { FormRule, getRule } from '../utils/getRules';
import { observer } from "mobx-react-lite";
import { HospitelsDocument } from "./hospitel";
import { UploadHospitelDocument } from "./UploadHospitelDocument";
import { UploadHospitelImage } from "./UploadHospitelImage";
interface RegisterModalProps {
  isShow?: boolean;
  onClose?: any;
}

export type ProvinceDistrictType = {
    id: number;
    name_th: string;
}

export const UpdateHospitelInfo = observer(({ isShow, onClose }: RegisterModalProps) => {
    const { loginHospitel, setLoginHospitel } = hospitelStore;
    const [
        selectedHospitalLocation,
        setSelectedHospitalLocation,
    ] = useState<any>(loginHospitel ? { lat: loginHospitel?.coHospital.latitude, lng: loginHospitel?.coHospital.longitude} : null);
    const [
        selectedHospitelLocation,
        setSelectedHospitelLocation,
    ] = useState<any>(loginHospitel ? { lat: loginHospitel?.address.latitude, lng: loginHospitel?.address.longitude } : null);
    const [imageData, setImageData] = useState<any[]>();
    const [province, setProvince] = useState<any>([]);
    const [district, setDistrict] = useState<any>([]);
    const [selectProvince, setSelectProvince] = useState<any>();
    const [selectDistrict, setSelectDistrict] = useState<any>();
    const [docFile, setDocFile] = useState<any>();
    const [registerForm] = Form.useForm();
    const [hostipel, setHostipel] = useState<HospitelsDocument>();

    const province_api =
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json";
    const district_api =
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json";
    const { Option } = Select;
    const { TextArea } = Input;
    

    const fetchAPI = async (api: any, setAPI: (result: any) => void) => {
    await fetch(api)
      .then((response) => response.json())
      .then((result) => {
        setAPI(result);
      });
    };

    useEffect(() => {
        fetchAPI(province_api, setProvince);
        fetchAPI(district_api, setDistrict);
    }, []);

    const handleSubmitForm = useCallback(() => {
        const value = registerForm.getFieldsValue();
        if (loginHospitel  ||( selectedHospitalLocation && selectedHospitelLocation)) {
      setHostipel((prev) => ({
          ...prev,
        _id: loginHospitel?._id,
        userEmail: value.userEmail,
        userPassword: value.userPassword,
        name: loginHospitel?.name ?? value.name,
        totalRooms: value.totalRooms,
        availableRooms: value.availableRooms,
        price: {
          ...prev?.price,
          maxPrice: value.maxPrice,
          minPrice: value.minPrice,
          perDays: value.perDays,
        },
        imageUrl: imageData ?? loginHospitel?.imageUrls,
        documentUrl: docFile ?? loginHospitel?.documentUrl,
        address: {
          ...prev?.address,
          province: province[selectProvince - 1]?.name_th ?? loginHospitel?.address.province,
          district: district?.filter((item: any) => item.province_id === selectProvince).find((item:any) => item.id === selectDistrict).name_th,
          address: value.address,
          latitude: selectedHospitelLocation.lat ?? loginHospitel?.address.latitude,
          longitude: selectedHospitelLocation.lng ?? loginHospitel?.address.longitude,
        },
        contact: {
          ...prev?.contact,
          phone: value.phone,
          social: value.social,
        },
        facility: value.facility,
        note: value.note,
        coHospital: {
          ...prev?.coHospital,
          name: value.coHospital.name,
          latitude: selectedHospitalLocation.lat ?? loginHospitel?.coHospital.latitude,
          longitude: selectedHospitalLocation.lng ?? loginHospitel?.coHospital.longitude,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
        registerForm.resetFields();  
    }
  }, [selectedHospitalLocation, selectedHospitelLocation, loginHospitel, registerForm, selectProvince, selectDistrict]);

    useEffect(() => {
        if (hostipel) {
            setLoginHospitel(hostipel);
        }
  }, [hostipel]);

  return (
    <Modal
      width={1036}
      visible={isShow}
      bodyStyle={{ minHeight: "778px" }}
      maskClosable={false}
      footer={false}
          onCancel={() => {
              onClose();
              registerForm.resetFields();
          }}
      centered
      >
      <div className=" font-extrabold text-xl ">สมัครสมาชิก Hospitel</div>
          <Form
              form={registerForm}
              onFinish={handleSubmitForm}
              className="relative"
              initialValues={{
                  userEmail: loginHospitel?.userEmail,
                  userPassword: loginHospitel?.userPassword,
                  name: loginHospitel?.name,
                  totalRooms: loginHospitel?.totalRooms,
                  availableRooms: loginHospitel?.availableRooms,
                  maxPrice: loginHospitel?.price.maxPrice,
                  minPrice: loginHospitel?.price.minPrice,
                  perDay: loginHospitel?.price.perDays,
                //   price: {
                //       maxPrice: loginHospitel?.price.maxPrice,
                //       minPrice: loginHospitel?.price.minPrice,
                //       perDays: loginHospitel?.price.perDays,
                //   },
                  imageUrl: loginHospitel?.imageUrls,
                  documentUrl: loginHospitel?.documentUrl,
                //   address: {
                //       province: loginHospitel?.address.province,
                //       district: loginHospitel?.address.district,
                //       address: loginHospitel?.address.address,
                //       latitude: loginHospitel?.address.latitude,
                //       longitude: loginHospitel?.address.latitude,
                //   },
                //   province: loginHospitel?.address.province,
                  address: loginHospitel?.address.address,
                //   district: loginHospitel?.address.district,

                phone: loginHospitel?.contact.phone,

                    social: loginHospitel?.contact.social,
                  facility: loginHospitel?.facility,
                  note: loginHospitel?.note,
                  coHospital: {
                      name: loginHospitel?.coHospital.name,
                      latitude: loginHospitel?.coHospital.latitude,
                      longitude: loginHospitel?.coHospital.longitude,
                  },
                  createdAt: loginHospitel?.createdAt,
                  updatedAt: loginHospitel?.updatedAt
              }}
          >
              <div className="grid grid-cols-3 gap-12 mt-6">
                  <div className="WRAPPER-1 ">
                      <div className="mb-2 font-bold ">Email</div>
                      <Form.Item
                          normalize={(value) => value.trim()}
                          name="userEmail"
                                rules={[
                                    getRule(FormRule.REQUIRE, 'กรุณากรอกอีเมล'),
                                    getRule(FormRule.EMAIL)
                                ]}
                      >
                          <Input
                              className="w-64 rounded-2xl px-4 pt-4 pb-5"
                              type="text"
                              placeholder="e.g.: elonmusk@mars.com "
                          />
                      </Form.Item>
                      <div className="mb-2 -mt-2 font-bold ">
                          Password(อย่างน้อย 8 ตัว)
                      </div>
                      <Form.Item
                          normalize={(value) => value.trim()}
                          name="userPassword"
                          rules={[
                                    getRule(FormRule.REQUIRE, 'กรุณากรอกรหัสผ่าน'),
                                    getRule(FormRule.PASSWORD)
                          ]}
                      >
                          <Input
                              className="w-64 rounded-2xl px-4 pt-4 pb-5"
                              type="text"
                              placeholder="e.g.: 5246815"
                          />
                      </Form.Item>
                      <div className="mb-2 -mt-2 font-bold ">ชื่อ Hospitel</div>
                      <Form.Item
                          normalize={(value) => value.trim()}
                          name="name"
                          rules={[{ required: true , message: 'กรุณากรอกชื่อ Hospitel'}]}
                      >
                          <Input
                              className="w-64 rounded-2xl px-4 pt-4 pb-5"
                              type="text"
                              placeholder="กรอกชื่อ Hospitel"
                          />
                      </Form.Item>
                      <div className="flex  -mt-2">
                          <div className="WRAPPER">
                              <div className="mb-2  font-bold ">จังหวัด</div>
                              <Form.Item
                                  name="province"
                                  rules={[{ required: true, message: 'กรุณาเลือกจังหวัด' }]}
                              >
                                  <Select
                                      placeholder={"เลือกจังหวัด"}
                                      onChange={(value: any) => setSelectProvince(value)}
                                      style={{
                                          marginRight: "0.5rem",
                                          borderRadius: "16px",
                                          border: "1px solid #EDEDED",
                                          overflow: "hidden",
                                          padding: "1px 2px",
                                          width: "150px",
                                          backgroundColor: 'white'
                                      }}
                                  >
                                      {province?.map((item: any) => (
                                          <Option key={"pv" + item.id} value={item.id}>
                                              {item.name_th}
                                          </Option>
                                      ))}
                                  </Select>
                              </Form.Item>
                          </div>
                          <div className="WRAPPER">
                              <div className="ml-5 mb-2  font-bold ">อำเภอ</div>
                              <Form.Item name="district" rules={[{ required: true , message: 'กรุณาเลือกอำเภอ'}]}>
                                  <Select
                                      placeholder={"เลือกอำเภอ"}
                                      onChange={(value: any) => setSelectDistrict(value)}
                                      style={{
                                          marginRight: "0.5rem",
                                          borderRadius: "16px",
                                          border: "1px solid #EDEDED",
                                          overflow: "hidden",
                                          padding: "1px 2px",
                                          width: "150px",
                                          backgroundColor: 'white'
                                      }}
                                  >
                                      {district
                                          ?.filter((item: any) => item.province_id === selectProvince)
                                          ?.map((item: any) => (
                                              <Option key={"amp" + item.id} value={item.id}>
                                                  {item.name_th}
                                              </Option>
                                          ))}
                                  </Select>
                              </Form.Item>
                          </div>
                      </div>
                      <div className="font-bold -mt-2 ">ที่อยู่</div>
                      <Form.Item
                        normalize={(value) => value.trim()}
                        name="address"
                        rules={[{ required: true , message: 'กรุณากรอกที่อยู่'}]}
                      >
                          <Input
                              className="w-64 rounded-2xl mt-2 px-4 pt-4 pb-5"
                              type="text"
                              placeholder={"ที่อยู่ของ Hospitel"}
                          />
                      </Form.Item>
                      <div className="mb-2 font-bold  -mt-2 ">ราคา</div>
                      <div className="flex">
                          <div className="flex items-center justify-center">
                              <Form.Item name="minPrice" normalize={(value) => value.trim()} rules={[{ required: true , message: 'กรุณากรอกราคาต่ำสุด'}]}>
                                  <Input
                                      className="w-20 rounded-2xl mr-3 mt-2 px-4 pt-4 pb-5"
                                      type="text"
                                      placeholder={"x,xxx"}
                                  />
                              </Form.Item>
                              <span className="pb-4 font-bold">-</span>
                              <Form.Item name="maxPrice" normalize={(value) => value.trim()} rules={[{ required: true , message: 'กรุณากรอกราคาสูงสุด' }]}>
                                  <Input
                                      className="w-20 rounded-2xl mx-3 mt-2 px-4 pt-4 pb-5"
                                      type="text"
                                      placeholder={"x,xxx"}
                                  />
                              </Form.Item>
                          </div>
                          <Form.Item name="perDays" normalize={(value) => value.trim()} >
                              <Select
                                  defaultValue="ต่อ14วัน"
                                  style={{ width: 100 }}
                                  className="mt-2"
                              >
                                  <Option value="30">ต่อ14วัน</Option>
                              </Select>
                          </Form.Item>
                      </div>

                      <div className="mb-2 -mt-2 font-bold ">เบอร์ติดต่อ</div>
                      <Form.Item
                          name="phone"
                          normalize={(value) => value.trim()}
                          rules={[{ required: true, message: 'กรุณากรอกเบอร์โทรศัพท์' }]}
                      >
                          <Input
                              className="w-64 rounded-2xl px-4 pt-4 pb-5"
                              type="text"
                              placeholder={"08x-xxx-xxxx"}

                          />
                      </Form.Item>
                      <div className="mb-2  -mt-2  font-bold ">
                          ช่องทางติดต่ออื่นๆ (Facebook, Line ฯลฯ)
                      </div>
                      <Form.Item
                          name="social"
                          normalize={(value) => value.trim()}
                      >
                          <Input
                              className="w-64 rounded-2xl -mt-4 px-4 pt-4 pb-5"
                              type="text"
                              placeholder={"(Facebook, Line ฯลฯ)"}
                          />
                      </Form.Item>
                  </div>
                  <div>
                    <Form.Item name="imageUrl" normalize={(value) => value.trim()} rules={[{ required: loginHospitel?.imageUrls ? !loginHospitel?.imageUrls : !imageData , message: 'กรุณาอัปโหลดไฟล์รูปภาพ'}]}>
                          <div className="mb-2  font-bold">
                              อัพโหลดภาพ Hospital (สูงสุด 3 รูป)
                          </div>
                          <div className="pic-wrapper flex justify-between">
                              {(imageData ?? loginHospitel?.imageUrls )?.map((items: any) => <img src={items} style={{ width: 90, height: 90, marginBottom: 5 }} alt="" />)}
                
                          </div>
                          <UploadHospitelImage setImageData={setImageData} />
                      </Form.Item>
                      <div className="flex justify-between">
                          <div>
                              <div className="mb-2 font-bold">จำนวนห้องว่าง</div>
                              <Form.Item
                                  name="availableRooms"
                                  normalize={(value) => value.trim()}
                                  rules={[{ required: true , message: 'กรอกจำนวนห้องว่าง'}]}
                              >
                                  <Input
                                      className="w-32  rounded-2xl px-4 pt-4 pb-5"
                                      placeholder={"xxx"}
                                  />
                              </Form.Item>
                          </div>

                          <div>
                              <div className="mb-2 font-bold">จำนวนห้องทั้งหมด</div>
                              <Form.Item
                                  name="totalRooms"
                                  normalize={(value) => value.trim()}
                                  rules={[{ required: true, message: 'กรอกจำนวนห้องทั้งหมด' }]}
                              >
                                  <Input
                                      className="w-32 rounded-2xl px-4 pt-4 pb-5"
                                      placeholder={"xxx"}
                                  />
                              </Form.Item>
                          </div>
                      </div>

                      <div>
                          <div className="mb-2 font-bold">หมายเหตุ</div>
                          <Form.Item name="note" normalize={(value) => value.trim()}>
                              <TextArea
                                  className="rounded-2xl px-4 pt-4 pb-5"
                                  autoSize={{ minRows: 3, maxRows: 5 }}
                                  placeholder="หมายเหตุ"
                              />
                          </Form.Item>
                      </div>

                      <div>
                          <div className="mb-2 font-bold">สิ่งอำนวยความสะดวก</div>
                          <Form.Item name="facility" normalize={(value) => value.trim()}>
                              <TextArea
                                  className="rounded-2xl px-4 pt-4 pb-5"
                                  autoSize={{ minRows: 3, maxRows: 4 }}
                                  placeholder="สิ่งอำนวยความสะดวก"
                              />
                          </Form.Item>
                      </div>

                      <Form.Item name="documentUrl" rules={[{ required: docFile , message: 'กรุณาอัปโหลดเอกสารอนุญาตการเปิด Hospitel'}]}>
                          <div className="mb-2 font-bold">
                              อัปโหลดเอกสารอนุญาตการเปิด Hospitel
                          </div>
                          <UploadHospitelDocument setDocFile={setDocFile} />
                      </Form.Item>
                  </div>
                  <div className="wrapper-3">
                      <div className="mb-2 font-bold ">สถานที่ของ Hospitel</div>
                        <div className="text-xs text-gray-500 mb-2">ปักหมุดและกดยืนยันสถานที่</div>
                      <Form.Item rules={[{ required: true , message: 'กรุณาปักหมุดสถานที่และกดยืนยันสถานที่'}]}>
                          <HospitelLocation
                              selectedHospitelLocation={selectedHospitelLocation}
                              setSelectedHospitelLocation={setSelectedHospitelLocation}
                          />
                      </Form.Item>

                      <div className="mb-2 -mt-2 font-bold ">เข้าร่วมกับโรงพยาบาล</div>
                      <Form.Item
                          name={["coHospital", "name"]}
                          normalize={(value) => value.trim()}
                          rules={[{ required: true, message: 'กรุณากรอกโรงพยาบาลที่เข้าร่วม' }]}
                      >
                          <Input
                              className="w-64 rounded-2xl px-4 pt-4 pb-5"
                              type="text"
                              placeholder="กรอกชื่อโรงพยาบาล"
                          />
                      </Form.Item>
                      <div className="mb-2 -mt-2 font-bold">สถานที่ของโรงพยาบาล</div>
                        <div className="text-xs text-gray-500 mb-2">ปักหมุดและกดยืนยันสถานที่</div>
                      <Form.Item name="coHospital" normalize={(value) => value.trim()} rules={[{ required: true , message: 'กรุณาปักหมุดสถานที่และกดยืนยันสถานที่'}]}>
                          <HospitalLocation
                              selectedHospitalLocation={selectedHospitalLocation} setSelectedHospitalLocation={setSelectedHospitalLocation}
                          />
                      </Form.Item>
                  </div>
              </div>
              <SubmitButton
                  htmlType="submit"
                  className="text-white absolute -bottom-4 right-4 bg-purple-700 rounded-2xl px-8"
                  type="primary"
              >
                  ถัดไป
              </SubmitButton>
          </Form>
    </Modal>
  );
});