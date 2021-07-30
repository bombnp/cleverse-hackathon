import React from "react";
import axios from 'axios';
import { Modal, Form, message } from "antd";
import { hospitelStore } from "store/hospitelStore";
import { observer } from 'mobx-react-lite';
import { RegisterStep } from "./login";
import { HospitelLocation } from "./map/HospitelLocation";
import { HospitalLocation } from "./map/HospitalLocation";
import { SubmitButton } from "./Button";

interface RegisterConfirmModalProps {
    setStep: (step: any) => void;
    isShow?: boolean;
    onClose?: any;
}

export const RegisterConfirmModal = observer(({ setStep, isShow, onClose }: RegisterConfirmModalProps) => {
    const [registerForm] = Form.useForm();
    const { registerHospitel, setRegisterHospitel } = hospitelStore;

  const handleSubmitForm = () => {
      const confirmValue = {
                  userEmail: registerHospitel?.userEmail,
  userPassword: registerHospitel?.userPassword,
  name: registerHospitel?.name,
  totalRooms: registerHospitel?.totalRooms,
  availableRooms: registerHospitel?.availableRooms,
  price: {
    maxPrice: registerHospitel?.price.maxPrice,
    minPrice: registerHospitel?.price.minPrice,
    perDays: 14,
  },
  imageUrls: registerHospitel?.imageUrl,
  documentUrl: registerHospitel?.documentUrl,
  address: {
    province: registerHospitel?.address.province,
    district: registerHospitel?.address.district,
    address: registerHospitel?.address.address,
    latitude: registerHospitel?.address.latitude,
    longitude: registerHospitel?.address.longitude,
  },
  contact: {
    phone: registerHospitel?.contact.phone,
    social: registerHospitel?.contact.social,
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

      try {
        const url = "http://35.247.17.176:3000/auth/register";
        axios.post(url, confirmValue)
            .then((res: any) => {
                message.success('สมัครสมาชิกสำเร็จ');
            })
            .catch((error) => {
                message.error('เกิดข้อผิดพลาด ไม่สามารถสมัครสมาชิกได้');
                registerForm.resetFields();
                setRegisterHospitel(undefined);
            })
    } catch (error) {
      console.error(error);
    } finally {
        registerForm.resetFields();  
        onClose();
    }
  };
      return (
        <Modal
            width={1036}
            visible={isShow}
            bodyStyle={{ height: "800px" }}
            footer={false}
            onCancel={() => {
                onClose();
                setRegisterHospitel(undefined);
            }}
            centered
        >
          <div className=" font-extrabold text-xl ">ยืนยันข้อมูล Hospitel</div>
          <div className="DISPLAY-WRAPPER">
            <div className=" grid grid-cols-3 gap-12 mt-6">
              <div>
                <div className="mb-8">
                  <div className="mb-2 font-bold ">ชื่อ Hospitel</div>
                    <div className="ml-4">{registerHospitel?.name}</div>
                </div>
                <div className="grid grid-cols-2 mb-8">
                  <div>
                    <div className="mb-2  font-bold ">จังหวัด</div>
                    <div className="ml-4">{registerHospitel?.address.province} </div>
                  </div>
                  <div>
                    <div className="mb-2  font-bold ">อำเภอ</div>
                    <div className="ml-4">{registerHospitel?.address.district}</div>
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
                  <div className="ml-4 ">{`${registerHospitel?.price.minPrice ?? 0} -  ${registerHospitel?.price.maxPrice ?? 0} ต่อ14วัน`}</div>
                </div>
                <div className="mb-8">
                  <div className="mb-2  font-bold ">เบอร์ติดต่อ</div>
                  <div className="ml-4 ">{registerHospitel?.contact.phone}</div>
                </div>
                <div className="mb-8">
                  <div className="mb-2  font-bold ">
                    ช่องทางติดต่ออื่นๆ (Facebook, Line ฯลฯ)
                  </div>
                  <div className="ml-4 ">{registerHospitel?.contact.social}</div>
                </div>
              </div>
              <div>
                <div className="mb-8">
                  <div className="mb-2  font-bold">
                    อัพโหลดภาพ Hospital (สูงสุด 3 รูป)
                  </div>
                        <div className="pic-wrapper flex justify-between">
                        {registerHospitel?.imageUrl?.map((items: any) => <img src={items} style={{width: 90, height: 90, marginBottom: 5}} alt="" />)}
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
                  <div className="mb-2 font-bold">
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
                <div className="mb-2">
                  <div className="mb-2 font-bold ">เข้าร่วมกับโรงพยาบาล</div>
                    <div className="ml-4">{registerHospitel?.coHospital.name}</div>
                </div>
                <div>
                  <div className="mb-2 font-bold">สถานที่ของโรงพยาบาล</div>
                    <HospitalLocation selectedHospitalLocation={{lat: registerHospitel?.coHospital.latitude, lng: registerHospitel?.coHospital.longitude}} />
                </div>
              </div>
            </div>
              </div>
              <div className="absolute right-10 mt-6">
                    <SubmitButton
                        onClick={() => setStep(RegisterStep.FIELD_DATA)}
                className="text-white bg-purple-700 rounded-2xl px-8 mr-5"
                type="primary"
                >
                ย้อนกลับ
                    </SubmitButton>
                    <SubmitButton
                        onClick={handleSubmitForm}
                htmlType="submit"
                className="text-white bg-purple-700 rounded-2xl px-8"
                type="primary"
                >
                ยืนยัน
                </SubmitButton>                  
              </div>

          </Modal>
      )
});
