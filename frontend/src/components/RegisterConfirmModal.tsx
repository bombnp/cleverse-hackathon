import React, { useState } from "react";
import { Modal, Input, Button, Form, Select } from "antd";
import { hospitelStore } from "store/hospitelStore";
import { observer } from 'mobx-react-lite';
import { RegisterStep } from "./login";
import { HospitalLocation } from "./map/HospitalLocation";
import { HospitelLocation } from "./map/HospitelLocation";
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
                  <div
                    className="rounded-2xl bg-blue-200"
                    style={{ width: "90px", height: "40px" }}
                  />
                </div>
              </div>
              <div className="wrapper-3  ">
                <div className="mb-8">
                  <div className="mb-4 font-bold ">สถานที่ของ Hospitel</div>
                    <HospitalLocation selectedHospitalLocation={{lat: registerHospitel?.address.latitude, lng: registerHospitel?.address.longitude}} />

                </div>
                <div className="mb-8">
                  <div className="mb-2 font-bold ">เข้าร่วมกับโรงพยาบาล</div>
                              <div className="ml-4">{registerHospitel?.coHospital.name}</div>
                </div>
                <div>
                  <div className="mb-4 font-bold ">สถานที่ของโรงพยาบาล</div>
                    <HospitalLocation selectedHospitalLocation={{lat: registerHospitel?.coHospital.latitude, lng: registerHospitel?.coHospital.longitude}} />
                </div>
              </div>
            </div>
              </div>
              <div onClick={() => setStep(RegisterStep.FIELD_DATA)}>ย้อน</div>
          </Modal>
      )
});
