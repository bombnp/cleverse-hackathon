import React, { useEffect, useState, useCallback } from "react";
import { Modal, Input, Form, Select } from "antd";
import { HospitelLocation } from "./map/HospitelLocation";
import { HospitalLocation } from "./map/HospitalLocation";
import { PrimaryButton } from "./Button";
import { hospitelStore } from "store/hospitelStore";
import { RegisterStep } from "./login";
import { observer } from "mobx-react-lite";
import { HospitelDocument } from "./hospitel";
import { UploadHospitelDocument } from "./UploadHospitelDocument";
import { HospitelImage } from "./HospitelImage";
import { UploadHospitelImage } from "./UploadHospitelImage";
interface RegisterModalProps {
  setStep: (step: any) => void;
  isShow?: boolean;
  onClose?: any;
}

export type ProvinceDistrictType = {
    id: number;
    name_th: string;
}

export const RegisterModal = observer(({ setStep, isShow, onClose }: RegisterModalProps) => {
    const { registerHospitel, setRegisterHospitel } = hospitelStore;
    const [
        selectedHospitalLocation,
        setSelectedHospitalLocation,
    ] = useState<any>(registerHospitel ? { lat: registerHospitel?.coHospital.latitude, lng: registerHospitel?.coHospital.longitude} : null);
    const [
        selectedHospitelLocation,
        setSelectedHospitelLocation,
    ] = useState<any>(registerHospitel ? { lat: registerHospitel?.address.latitude, lng: registerHospitel?.address.longitude } : null);
    const [imageData, setImageData] = useState<any[]>();
    const [province, setProvince] = useState<any>([]);
    const [district, setDistrict] = useState<any>([]);
    const [selectProvince, setSelectProvince] = useState<any>();
    const [selectDistrict, setSelectDistrict] = useState<any>();
    const [docFile, setDocFile] = useState<any>();
    const [registerForm] = Form.useForm();
    const [hostipel, setHostipel] = useState<HospitelDocument>();

    const province_api =
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json";
    const district_api =
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json";
    const { Option } = Select;
    const { TextArea } = Input;
    

    const fetchAPI = (api: any, setAPI: (result: any) => void) => {
    fetch(api)
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
        console.log(imageData)
        if (registerHospitel  ||( selectedHospitalLocation && selectedHospitelLocation)) {
      setHostipel((prev) => ({
        ...prev,
        userEmail: registerHospitel?.userEmail ?? value.userEmail,
        userPassword: value.userPassword,
        name: registerHospitel?.name ?? value.name,
        totalRooms: value.totalRooms,
        availableRooms: value.availableRooms,
        price: {
          ...prev?.price,
          maxPrice: value.maxPrice,
          minPrice: value.minPrice,
          perDays: value.perDays,
        },
        imageUrl: imageData ?? registerHospitel?.imageUrl,
        documentUrl: docFile ?? registerHospitel?.documentUrl,
        address: {
          ...prev?.address,
          province: province[selectProvince]?.name_th ?? registerHospitel?.address.province,
          district: district?.filter((item: any) => item.province_id === selectProvince).find((item:any) => item.id === selectDistrict).name_th ?? registerHospitel?.address.district,
          address: value.address,
          latitude: selectedHospitelLocation.lat ?? registerHospitel?.address.latitude,
          longitude: selectedHospitelLocation.lng ?? registerHospitel?.address.longitude,
        },
        contact: {
          ...prev?.contact,
          phone: [value.contact[0].phone],
          social: [value.contact[1].social],
          // social: [value.contact[1].social],
        },
        facility: value.facility,
        note: value.note,
        coHospital: {
          ...prev?.coHospital,
          name: value.coHospital.name,
          latitude: selectedHospitalLocation.lat ?? registerHospitel?.coHospital.latitude,
          longitude: selectedHospitalLocation.lng ?? registerHospitel?.coHospital.longitude,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
        setStep(RegisterStep.CONFIRM);
        registerForm.resetFields();  
    }
  }, [selectedHospitalLocation, selectedHospitelLocation, registerHospitel, registerForm, setStep.name, selectProvince, selectDistrict]);

  useEffect(() => {
    setRegisterHospitel(hostipel);
  }, [hostipel]);

  return (
    <Modal
      width={1036}
      visible={isShow}
      bodyStyle={{ height: "850px" }}
      maskClosable={false}
      footer={false}
      onCancel={onClose}
      centered
    >
      <div className=" font-extrabold text-xl ">สมัครสมาชิก Hospitel</div>

      <Form
        form={registerForm}
        onFinish={handleSubmitForm}
        className="relative"
              initialValues={{
                  userEmail: registerHospitel?.userEmail,
  userPassword: registerHospitel?.userPassword,
  name: registerHospitel?.name,
  totalRooms: registerHospitel?.totalRooms,
  availableRooms: registerHospitel?.availableRooms,
  price: {
    maxPrice: registerHospitel?.price.maxPrice,
    minPrice: registerHospitel?.price.minPrice,
    perDays: registerHospitel?.price.perDays,
  },
  imageUrl: imageData ?? registerHospitel?.imageUrl,
  documentUrl: docFile ?? registerHospitel?.documentUrl,
  address: {
    province: registerHospitel?.address.province,
    district: registerHospitel?.address.district,
    address: registerHospitel?.address.address,
    latitude: registerHospitel?.address.latitude,
    longitude: registerHospitel?.address.latitude,
  },
  contact: {
    phone: [registerHospitel?.contact.phone[0][0]],
    social: [registerHospitel?.contact.social[1][0]],
  },
  facility: registerHospitel?.facility,
  note: registerHospitel?.note,
  coHospital: {
    name: registerHospitel?.coHospital.name,
    latitude: registerHospitel?.coHospital.latitude,
    longitude: registerHospitel?.coHospital.longitude,
  },
  createdAt: registerHospitel?.createdAt,
  updatedAt: registerHospitel?.updatedAt}}
      >
        <div className="grid grid-cols-3 gap-12 mt-6">
          <div className="WRAPPER-1 ">
            <div className="mb-2 font-bold ">Email</div>
            <Form.Item
              normalize={(value) => value.trim()}
              name="userEmail"
              rules={[{ required: true }]}
            >
              <Input
                              className="w-64 rounded-2xl px-4 pt-4 pb-5"
                              defaultValue={registerHospitel?.userEmail}
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
              rules={[{ required: true }]}
            >
              <Input
                className="w-64 rounded-2xl px-4 pt-4 pb-5"
                type="text"
                defaultValue={registerHospitel?.userPassword}
                placeholder="e.g.: 5246815"
              />
            </Form.Item>
            <div className="mb-2 -mt-2 font-bold ">ชื่อ Hospitel</div>
            <Form.Item
              normalize={(value) => value.trim()}
                name="name"                          
              rules={[{ required: true }]}
            >
              <Input
                className="w-64 rounded-2xl px-4 pt-4 pb-5"
                type="text"
                placeholder="กรอกชื่อ Hospitel"
                defaultValue={registerHospitel?.name}
              />
            </Form.Item>
            <div className="flex  -mt-2">
              <div className="WRAPPER">
                <div className="mb-2  font-bold ">จังหวัด</div>
                <Form.Item
                    name="province"
                    rules={[{ required: true }]}
                >
                <Select
                                      placeholder={"เลือกจังหวัด"}
                                      onChange={(value: any) => setSelectProvince(value)}
                                      defaultValue={registerHospitel?.address.province}
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
                <Form.Item name="district" rules={[{ required: true }]}>
                    <Select
                    placeholder={"เลือกอำเภอ"}
                    onChange={(value:any) => setSelectDistrict(value)}
                    style={{
                        marginRight: "0.5rem",
                        borderRadius: "16px",
                        border: "1px solid #EDEDED",
                        overflow: "hidden",
                        padding: "1px 2px",
                        width: "150px",
                        backgroundColor: 'white'
                    }}
                    defaultValue={registerHospitel?.address.district}
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
            <div className="font-bold  -mt-2 ">ที่อยู่</div>
            <Form.Item
              name="address"
              normalize={(value) => value.trim()}
                rules={[{ required: true }]}
            >
              <Input
                className="w-64 rounded-2xl mt-2 px-4 pt-4 pb-5"
                type="text"
                placeholder={"xxxx --xxx"}
                defaultValue={registerHospitel?.address.address}
              />
            </Form.Item>
            <div className="mb-2 font-bold  -mt-2 ">ราคา</div>
            <div className="flex">
              <div className="flex items-center justify-center">
                <Form.Item name="minPrice" normalize={(value) => value.trim()} rules={[{ required: true }]}>
                  <Input
                    className="w-20 rounded-2xl mr-4 mt-2 px-4 pt-4 pb-5"
                    type="text"
                                      placeholder={"xxxx --xxx"}
                                      defaultValue={registerHospitel?.price.minPrice}
                  />
                </Form.Item>
                <span className="pb-4 font-bold">-</span>
                <Form.Item name="maxPrice" normalize={(value) => value.trim()} rules={[{ required: true }]}>
                  <Input
                    className="w-20 rounded-2xl mx-3 mt-2 px-4 pt-4 pb-5"
                    type="text"
                    placeholder={"xxxx --xxx"}
                    defaultValue={registerHospitel?.price.maxPrice}

                  />
                </Form.Item>
              </div>
              <Form.Item name="perDays" normalize={(value) => value.trim()} >
                <Select
                  defaultValue="ต่อเดือน"
                  style={{ width: 100 }}
                  className="mt-2"
                >
                  <Option value="30">ต่อเดือน</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="mb-2 -mt-2 font-bold ">เบอร์ติดต่อ</div>
            <Form.Item
                name={["contact", 0, "phone", 0]}
                normalize={(value) => value.trim()}
                rules={[{ required: true }]}
            >
              <Input
                className="w-64 rounded-2xl px-4 pt-4 pb-5"
                type="text"
                              placeholder={"xxxx --xxx"}
                                                                    defaultValue={registerHospitel?.contact.phone}

              />
                      </Form.Item>
              <div className="mb-2  -mt-2  font-bold ">
                ช่องทางติดต่ออื่นๆ (Facebook, Line ฯลฯ)
              </div>                      
            <Form.Item
              name={["contact", 1, "social", 0]}
                normalize={(value) => value.trim()}
                rules={[{ required: true }]}
            >
              <Input
                className="w-64 rounded-2xl -mt-4 px-4 pt-4 pb-5"
                type="text"
                placeholder={"xxxx --xxx"}
                defaultValue={registerHospitel?.contact.social}
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item name="imageUrl" normalize={(value) => value.trim()}>
              <div className="mb-2  font-bold">
                อัพโหลดภาพ Hospital (สูงสุด 3 รูป)
              </div>
              <div className="pic-wrapper flex justify-between">
                {imageData?.map((items: any) => <img src={items} style={{width: 90, height: 90}} alt="" />)}
                
                </div>
                <UploadHospitelImage setImageData={setImageData}/>          
            </Form.Item>
            <div className="flex">
              <div>
                <div className="mb-2  font-bold">จำนวนห้องว่าง</div>
                <Form.Item
                  className="mr-6"
                  name="availableRooms"
                                  normalize={(value) => value.trim()}
                                  rules={[{ required: true }]}
                >
                  <Input
                    className="w-32  rounded-2xl px-4 pt-4 pb-5"
                                      placeholder={"xxxx --xxx"}
                                      defaultValue={registerHospitel?.availableRooms}
                  />
                </Form.Item>
              </div>

              <div>
                <div className="mb-2 font-bold">จำนวนห้องว่างทั้งหมด</div>
                <Form.Item
                  name="totalRooms"
                    normalize={(value) => value.trim()}
                    rules={[{ required: true }]}
                >
                  <Input
                    className="w-32  rounded-2xl px-4 pt-4 pb-5"
                    placeholder={"xxxx --xxx"}
                    defaultValue={registerHospitel?.totalRooms}                  
                  />
                </Form.Item>
              </div>
            </div>

            <div>
              <div className="mb-2 font-bold">หมายเหตุ</div>
              <Form.Item name="note" normalize={(value) => value.trim()} rules={[{ required: true }]}>
                <TextArea
                  className="rounded-2xl px-4 pt-4 pb-5"
                                  placeholder="Controlled autosize"
                    defaultValue={registerHospitel?.note}
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </Form.Item>
            </div>

            <div>
              <div className="mb-2 font-bold">สิ่งอำนวยความสะดวก</div>
              <Form.Item name="facility" normalize={(value) => value.trim()} rules={[{ required: true }]}>
                <TextArea
                    className="rounded-2xl px-4 pt-4 pb-5"
                    autoSize={{ minRows: 3, maxRows: 4 }}
                    placeholder={"xxxx --xxx"}
                    defaultValue={registerHospitel?.facility}
                />
              </Form.Item>
            </div>

            <Form.Item rules={[{ required: true }]}>
              <div className="mb-2 font-bold">
                อัปโหลดเอกสารอนุญาตการเปิด Hospitel
              </div>
                    <UploadHospitelDocument setDocFile={setDocFile} />
            </Form.Item>
          </div>
          <div className="wrapper-3">
            <div className="mb-2 font-bold ">สถานที่ของ Hospitel</div>

            <Form.Item>
                <HospitelLocation
                    selectedHospitelLocation={selectedHospitelLocation}
                    setSelectedHospitelLocation={setSelectedHospitelLocation}
                />
            </Form.Item>

            <div className="mb-2 -mt-2 font-bold ">เข้าร่วมกับโรงพยาบาล</div>
            <Form.Item
              name={["coHospital", "name"]}
              normalize={(value) => value.trim()}
              rules={[{ required: true }]}
            >
              <Input
                className="w-64 rounded-2xl px-4 pt-4 pb-5"
                type="text"
                placeholder="กรอกชื่อโรงพยาบาล"
              />
            </Form.Item>
            <div className="mb-2 -mt-2 font-bold">สถานที่ของโรงพยาบาล</div>

            <Form.Item name="coHospital" normalize={(value) => value.trim()} rules={[{ required: true }]}>
              <HospitalLocation
                selectedHospitalLocation={selectedHospitalLocation} setSelectedHospitalLocation={setSelectedHospitalLocation}
              />
            </Form.Item>
          </div>
        </div>
        <PrimaryButton
          htmlType="submit"
          className="text-white absolute -bottom-4 right-4 bg-purple-700 rounded-2xl px-8"
          type="primary"
        >
          ถัดไป
        </PrimaryButton>
      </Form>
    </Modal>
  );
});
