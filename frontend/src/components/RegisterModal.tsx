import React, { useEffect, useState, useCallback } from "react";
import { Modal, Input, Form, Select, Spin } from "antd";
import { HospitelLocation } from "./map/HospitelLocation";
import { HospitalLocation } from "./map/HospitalLocation";
import { SubmitButton } from "./Button";
import { hospitelStore } from "store/hospitelStore";
import { RegisterStep } from "./login";
import { FormRule, getRule } from '../utils/getRules';
import { observer } from "mobx-react-lite";
import { HospitelDocument } from "./hospitel";
import { UploadHospitelDocument } from "./UploadHospitelDocument";
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
        if (registerHospitel  ||( selectedHospitalLocation && selectedHospitelLocation)) {
      setHostipel((prev) => ({
        ...prev,
        userEmail: value.userEmail,
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
          province: province[selectProvince - 1]?.name_th ?? registerHospitel?.address.province,
          district: district?.filter((item: any) => item.province_id === selectProvince).find((item:any) => item.id === selectDistrict).name_th,
          address: value.address,
          latitude: selectedHospitelLocation.lat ?? registerHospitel?.address.latitude,
          longitude: selectedHospitelLocation.lng ?? registerHospitel?.address.longitude,
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
        if (hostipel) {
            setRegisterHospitel(hostipel);
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
      <div className=" font-extrabold text-xl ">????????????????????????????????? Hospitel</div>
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
                  maxPrice: registerHospitel?.price.maxPrice,
                  minPrice: registerHospitel?.price.minPrice,
                  perDay: registerHospitel?.price.perDays,
                //   price: {
                //       maxPrice: registerHospitel?.price.maxPrice,
                //       minPrice: registerHospitel?.price.minPrice,
                //       perDays: registerHospitel?.price.perDays,
                //   },
                  imageUrl: registerHospitel?.imageUrl,
                  documentUrl: registerHospitel?.documentUrl,
                //   address: {
                //       province: registerHospitel?.address.province,
                //       district: registerHospitel?.address.district,
                //       address: registerHospitel?.address.address,
                //       latitude: registerHospitel?.address.latitude,
                //       longitude: registerHospitel?.address.latitude,
                //   },
                //   province: registerHospitel?.address.province,
                  address: registerHospitel?.address.address,
                //   district: registerHospitel?.address.district,

                phone: registerHospitel?.contact.phone,

                    social: registerHospitel?.contact.social,
                  facility: registerHospitel?.facility,
                  note: registerHospitel?.note,
                  coHospital: {
                      name: registerHospitel?.coHospital.name,
                      latitude: registerHospitel?.coHospital.latitude,
                      longitude: registerHospitel?.coHospital.longitude,
                  },
                  createdAt: registerHospitel?.createdAt,
                  updatedAt: registerHospitel?.updatedAt
              }}
          >
              <div className="grid grid-cols-3 gap-12 mt-6">
                  <div className="WRAPPER-1 ">
                      <div className="mb-2 font-bold ">Email</div>
                      <Form.Item
                          normalize={(value) => value.trim()}
                          name="userEmail"
                                rules={[
                                    getRule(FormRule.REQUIRE, '??????????????????????????????????????????'),
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
                          Password(??????????????????????????? 8 ?????????)
                      </div>
                      <Form.Item
                          normalize={(value) => value.trim()}
                          name="userPassword"
                          rules={[
                                    getRule(FormRule.REQUIRE, '???????????????????????????????????????????????????'),
                                    getRule(FormRule.PASSWORD)
                          ]}
                      >
                          <Input
                              className="w-64 rounded-2xl px-4 pt-4 pb-5"
                              type="text"
                              placeholder="e.g.: 5246815"
                          />
                      </Form.Item>
                      <div className="mb-2 -mt-2 font-bold ">???????????? Hospitel</div>
                      <Form.Item
                          normalize={(value) => value.trim()}
                          name="name"
                          rules={[{ required: true , message: '??????????????????????????????????????? Hospitel'}]}
                      >
                          <Input
                              className="w-64 rounded-2xl px-4 pt-4 pb-5"
                              type="text"
                              placeholder="???????????????????????? Hospitel"
                          />
                      </Form.Item>
                      <div className="flex  -mt-2">
                          <div className="WRAPPER">
                              <div className="mb-2  font-bold ">?????????????????????</div>
                              <Form.Item
                                  name="province"
                                  rules={[{ required: true, message: '???????????????????????????????????????????????????' }]}
                              >
                                  <Select
                                      placeholder={"????????????????????????????????????"}
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
                              <div className="ml-5 mb-2  font-bold ">???????????????</div>
                              <Form.Item name="district" rules={[{ required: true , message: '?????????????????????????????????????????????'}]}>
                                  <Select
                                      placeholder={"??????????????????????????????"}
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
                      <div className="font-bold -mt-2 ">?????????????????????</div>
                      <Form.Item
                        normalize={(value) => value.trim()}
                        name="address"
                        rules={[{ required: true , message: '????????????????????????????????????????????????'}]}
                      >
                          <Input
                              className="w-64 rounded-2xl mt-2 px-4 pt-4 pb-5"
                              type="text"
                              placeholder={"?????????????????????????????? Hospitel"}
                          />
                      </Form.Item>
                      <div className="mb-2 font-bold  -mt-2 ">????????????</div>
                      <div className="flex">
                          <div className="flex items-center justify-center">
                              <Form.Item name="minPrice" normalize={(value) => value.trim()} rules={[{ required: true , message: '?????????????????????????????????????????????????????????'}]}>
                                  <Input
                                      className="w-20 rounded-2xl mr-3 mt-2 px-4 pt-4 pb-5"
                                      type="text"
                                      placeholder={"x,xxx"}
                                  />
                              </Form.Item>
                              <span className="pb-4 font-bold">-</span>
                              <Form.Item name="maxPrice" normalize={(value) => value.trim()} rules={[{ required: true , message: '?????????????????????????????????????????????????????????' }]}>
                                  <Input
                                      className="w-20 rounded-2xl mx-3 mt-2 px-4 pt-4 pb-5"
                                      type="text"
                                      placeholder={"x,xxx"}
                                  />
                              </Form.Item>
                          </div>
                          <Form.Item name="perDays" normalize={(value) => value.trim()} >
                              <Select
                                  defaultValue="?????????14?????????"
                                  style={{ width: 100 }}
                                  className="mt-2"
                              >
                                  <Option value="30">?????????14?????????</Option>
                              </Select>
                          </Form.Item>
                      </div>

                      <div className="mb-2 -mt-2 font-bold ">?????????????????????????????????</div>
                      <Form.Item
                          name="phone"
                          normalize={(value) => value.trim()}
                          rules={[{ required: true, message: '??????????????????????????????????????????????????????????????????' }]}
                      >
                          <Input
                              className="w-64 rounded-2xl px-4 pt-4 pb-5"
                              type="text"
                              placeholder={"08x-xxx-xxxx"}

                          />
                      </Form.Item>
                      <div className="mb-2  -mt-2  font-bold ">
                          ?????????????????????????????????????????????????????? (Facebook, Line ?????????)
                      </div>
                      <Form.Item
                          name="social"
                          normalize={(value) => value.trim()}
                      >
                          <Input
                              className="w-64 rounded-2xl -mt-4 px-4 pt-4 pb-5"
                              type="text"
                              placeholder={"(Facebook, Line ?????????)"}
                          />
                      </Form.Item>
                  </div>
                  <div>
                    <Form.Item name="imageUrl" normalize={(value) => value.trim()} rules={[{ required: registerHospitel?.imageUrl ? !registerHospitel?.imageUrl : !imageData , message: '??????????????????????????????????????????????????????????????????'}]}>
                          <div className="mb-2  font-bold">
                              ?????????????????????????????? Hospital (?????????????????? 3 ?????????)
                          </div>
                          <div className="pic-wrapper flex justify-between">
                              {(imageData ?? registerHospitel?.imageUrl )?.map((items: any) => <img src={items} style={{ width: 90, height: 90, marginBottom: 5 }} alt="" />)}
                
                          </div>
                          <UploadHospitelImage setImageData={setImageData} />
                      </Form.Item>
                      <div className="flex justify-between">
                          <div>
                              <div className="mb-2 font-bold">???????????????????????????????????????</div>
                              <Form.Item
                                  name="availableRooms"
                                  normalize={(value) => value.trim()}
                                  rules={[{ required: true , message: '???????????????????????????????????????????????????'}]}
                              >
                                  <Input
                                      className="w-32  rounded-2xl px-4 pt-4 pb-5"
                                      placeholder={"xxx"}
                                  />
                              </Form.Item>
                          </div>

                          <div>
                              <div className="mb-2 font-bold">????????????????????????????????????????????????</div>
                              <Form.Item
                                  name="totalRooms"
                                  normalize={(value) => value.trim()}
                                  rules={[{ required: true, message: '????????????????????????????????????????????????????????????' }]}
                              >
                                  <Input
                                      className="w-32 rounded-2xl px-4 pt-4 pb-5"
                                      placeholder={"xxx"}
                                  />
                              </Form.Item>
                          </div>
                      </div>

                      <div>
                          <div className="mb-2 font-bold">????????????????????????</div>
                          <Form.Item name="note" normalize={(value) => value.trim()}>
                              <TextArea
                                  className="rounded-2xl px-4 pt-4 pb-5"
                                  autoSize={{ minRows: 3, maxRows: 5 }}
                                  placeholder="????????????????????????"
                              />
                          </Form.Item>
                      </div>

                      <div>
                          <div className="mb-2 font-bold">??????????????????????????????????????????????????????</div>
                          <Form.Item name="facility" normalize={(value) => value.trim()}>
                              <TextArea
                                  className="rounded-2xl px-4 pt-4 pb-5"
                                  autoSize={{ minRows: 3, maxRows: 4 }}
                                  placeholder="??????????????????????????????????????????????????????"
                              />
                          </Form.Item>
                      </div>

                      <Form.Item name="documentUrl" rules={[{ required: docFile , message: '????????????????????????????????????????????????????????????????????????????????????????????? Hospitel'}]}>
                          <div className="mb-2 font-bold">
                              ?????????????????????????????????????????????????????????????????????????????? Hospitel
                          </div>
                          <UploadHospitelDocument setDocFile={setDocFile} />
                      </Form.Item>
                  </div>
                  <div className="wrapper-3">
                      <div className="mb-2 font-bold ">?????????????????????????????? Hospitel</div>
                        <div className="text-xs text-gray-500 mb-2">???????????????????????????????????????????????????????????????????????????</div>
                      <Form.Item rules={[{ required: true , message: '???????????????????????????????????????????????????????????????????????????????????????????????????????????????'}]}>
                          <HospitelLocation
                              selectedHospitelLocation={selectedHospitelLocation}
                              setSelectedHospitelLocation={setSelectedHospitelLocation}
                          />
                      </Form.Item>

                      <div className="mb-2 -mt-2 font-bold ">????????????????????????????????????????????????????????????</div>
                      <Form.Item
                          name={["coHospital", "name"]}
                          normalize={(value) => value.trim()}
                          rules={[{ required: true, message: '???????????????????????????????????????????????????????????????????????????????????????' }]}
                      >
                          <Input
                              className="w-64 rounded-2xl px-4 pt-4 pb-5"
                              type="text"
                              placeholder="???????????????????????????????????????????????????"
                          />
                      </Form.Item>
                      <div className="mb-2 -mt-2 font-bold">?????????????????????????????????????????????????????????</div>
                        <div className="text-xs text-gray-500 mb-2">???????????????????????????????????????????????????????????????????????????</div>
                      <Form.Item name="coHospital" normalize={(value) => value.trim()} rules={[{ required: true , message: '???????????????????????????????????????????????????????????????????????????????????????????????????????????????'}]}>
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
                  ???????????????
              </SubmitButton>
          </Form>
    </Modal>
  );
});