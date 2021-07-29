import React, { useState } from "react";
import axios from 'axios';
import { Modal, Input, Button, Form, Select } from "antd";
import { hospitelStore } from "store/hospitelStore";
import { observer } from 'mobx-react-lite';
import { RegisterStep } from "./login";
import { HospitelLocation } from "./map/HospitelLocation";
import { HospitalLocation } from "./map/HospitalLocation";
import { RegisterModal } from "./RegisterModal";

interface RegisterConfirmModalProps {
    setStep: (step: any) => void;
}

export const RegisterConfirmModal = observer(({ setStep }: RegisterConfirmModalProps) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [registerForm] = Form.useForm();
  //   first
//   const [step, setStep] = useState("second");
  const { Option } = Select;
    const { TextArea } = Input;
    const { registerHospitel } = hospitelStore;

  const handleSubmitForm = () => {
    //TODO: add fetch data
    const value = registerForm.getFieldsValue();

    console.log(value);
    // setIsModalVisible(false);
      
      const a = {
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
  imageUrl: [],
  documentUrl: registerHospitel?.documentUrl,
  address: {
    province: registerHospitel?.address.province,
    district: registerHospitel?.address.district,
    address: registerHospitel?.address.address,
    latitude: registerHospitel?.address.latitude,
    longitude: registerHospitel?.address.latitude,
  },
  contact: {
    phone: [registerHospitel?.contact.phone[0]],
    social: [registerHospitel?.contact.social[0]],
  },
  facility: registerHospitel?.facility,
  note: registerHospitel?.note,
  coHospital: {
    name: registerHospitel?.coHospital.name,
    latitude: registerHospitel?.coHospital.latitude,
    longitude: registerHospitel?.coHospital.longitude,
  },
  createdAt: registerHospitel?.createdAt,
          updatedAt: registerHospitel?.updatedAt
      }
      
//             const a = {
//                   userEmail: 'na@gmail.com',
//   userPassword: '122121212',
//   name: '121',
//   totalRooms: 12,
//   availableRooms: 22,
//   price: {
//     maxPrice: 12,
//     minPrice: 222,
//     perDays: 14,
//   },
//   imageUrl: [],
//   documentUrl: '',
//   address: {
//     province: 'กรุงเทพ',
//     district: 'จตุจักร',
//     address: 'registerHospitel?.address.address',
//     latitude: 10.2222,
//     longitude: 100.112232,
//   },
//   contact: {
//     phone: ['0861231313', '023232888'],
//     social: ['a', 'b'],
//   },
//   facility: 'a',
//   note: 'a',
//   coHospital: {
//     name: 'พญาไทย',
//     latitude: 10.1111111,
//     longitude: 100.121212,
//   },
//   createdAt: registerHospitel?.createdAt,
//           updatedAt: registerHospitel?.updatedAt
//       }


            const url = "http://35.247.17.176:3000/auth/register";
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': 1728000,
                'Content-Length': '0',
                'Content-Type': 'text/plain' 
            }
        }
        axios.post(url, a)
        .then((res:any) => console.log(res))
        .catch((error) => console.log(error))
      
    //   try {
    //       axios.post('http://35.247.17.176:3000/auth/register', a)
    //         .then((res) => console.log(res))
    //         .catch((error) => console.log(error))
        
    //   //TODO: add upload data function
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   registerForm.resetFields();
    // }
  };
      return (
        <Modal
          width={1036}
          visible={isModalVisible}
          bodyStyle={{ height: "778px" }}
          footer={false}
          onCancel={() => setIsModalVisible(false)}
          centered
          >
              {console.log(registerHospitel)}
          <div className=" font-extrabold text-xl ">ยืนยันข้อมูล Hospitel</div>
          <div className="DISPLAY-WRAPPER">
            <div className=" grid grid-cols-3 gap-12 mt-6">
              <div>
                <div className="mb-8">
                  <div className="mb-2 font-bold ">ชื่อ Hospitel</div>
                    <div className="ml-4">{registerHospitel?.name}</div>
                </div>
                {/*Jungwad */}
                <div className="grid grid-cols-2 mb-8">
                  <div>
                    <div className="mb-2  font-bold ">จังหวัด</div>
                    <div className="ml-4">{"กรุงเทพ"} </div>
                  </div>
                  <div>
                    <div className="mb-2  font-bold ">อำเภอ</div>
                    <div className="ml-4">{"จัตตุโจ้"} </div>
                  </div>
                </div>
                <div className="mb-8">
                  <div className="mb-2 font-bold ">ที่อยู่</div>
                  <div className="ml-4">
                    {registerHospitel?.address.address}
                  </div>
                </div>
                <div className="mb-8">
                  <div className="mb-2 font-bold ">ราคา</div>
                  <div className="ml-4 ">{`${registerHospitel?.price.minPrice ?? 0} -  ${registerHospitel?.price.maxPrice ?? 0}   ${registerHospitel?.price.perDays}`}</div>
                </div>
                <div className="mb-8">
                  <div className="mb-2  font-bold ">เบอร์ติดต่อ</div>
                  <div className="ml-4 ">{registerHospitel?.contact.phone[0][0]}</div>
                  <div className="ml-4 ">{registerHospitel?.contact.phone[0][1]}</div>
                </div>
                <div className="mb-8">
                  <div className="mb-2  font-bold ">
                    ช่องทางติดต่ออื่นๆ (Facebook, Line ฯลฯ)
                  </div>
                  <div className="ml-4 ">{registerHospitel?.contact.social[0][0]}</div>
                  <div className="ml-4 ">{registerHospitel?.contact.social[0][1]}</div>
                </div>
              </div>
              <div>
                <div className="mb-8">
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
                </div>
                <div className=" mb-8 grid grid-cols-2">
                  <div className="mr-6">
                    <div>
                      <div className="mb-2  font-bold">จำนวนห้องว่าง</div>
                      <div className="ml-4 ">{registerHospitel?.availableRooms}</div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2  font-bold">จำนวนห้องทั้งหมด</div>
                    <div className="ml-4 ">{registerHospitel?.totalRooms}</div>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="mb-2 font-bold">หมายเหตุ</div>
                  <div className="ml-4 text-sm">
                    {registerHospitel?.note}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="mb-2 font-bold">สิ่งอำนวยความสะดวก</div>
                    <div className="ml-4 text-sm">
                        {registerHospitel?.facility}
                  </div>
                </div>
                <div>
                  <div className="mb-4 font-bold">
                    อัปโหลดเอกสารอนุญาตการเปิด Hospitel
                  </div>
                  {registerHospitel?.documentUrl}
                </div>
              </div>
              <div className="wrapper-3">
                <div className="mb-8">
                  <div className="mb-4 font-bold">สถานที่ของ Hospitel</div>
                    <HospitelLocation selectedHospitelLocation={{lat: registerHospitel?.address.latitude, lng: registerHospitel?.address.longitude}} />
                </div>
                <div className="mb-8">
                  <div className="mb-2 font-bold ">เข้าร่วมกับโรงพยาบาล</div>
                              <div className="ml-4">{registerHospitel?.coHospital.name}</div>
                </div>
                <div>
                  <div className="mb-4 font-bold">สถานที่ของโรงพยาบาล</div>
                    <HospitalLocation selectedHospitalLocation={{lat: registerHospitel?.coHospital.latitude, lng: registerHospitel?.coHospital.longitude}} />
                </div>
              </div>
            </div>
              </div>
              <div onClick={() => setStep(RegisterStep.FIELD_DATA)}>ย้อน</div>
              <div onClick={handleSubmitForm}>wป</div>
          </Modal>
      )
});
