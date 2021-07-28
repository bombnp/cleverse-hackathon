import React, { useState } from "react";
import { Modal, Input, Button, Form, Select } from "antd";

export const RegisterConfirmModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [registerForm] = Form.useForm();
  //   first
  const [step, setStep] = useState("second");
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
  switch (step) {
    case "first":
      return (
        <Modal
          width={1036}
          visible={isModalVisible}
          bodyStyle={{ height: "778px" }}
          footer={false}
          onCancel={() => setIsModalVisible(false)}
          centered
        >
          <div className=" font-extrabold text-xl ">สมัครสมาชิก Hospitel</div>

          <Form>
            <div className=" grid grid-cols-3 gap-12 mt-6">
              <div>
                <Form.Item>
                  <div className="mb-2 font-bold ">ชื่อ Hospitel</div>
                  <Input
                    className="w-64 rounded-2xl px-4 pt-4 pb-5"
                    type="text"
                    placeholder="กรอกชื่อ Hospitel"
                  />
                </Form.Item>
                <div className="flex">
                  <Form.Item>
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
                  <Form.Item>
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
                <Form.Item>
                  <div className="mb-2  font-bold ">ที่อยู่</div>
                  <Input
                    className="w-64 rounded-2xl my-2 px-4 pt-4 pb-5"
                    type="text"
                    placeholder={"xxxx --xxx"}
                  />
                </Form.Item>
                <Form.Item>
                  <div className="mb-2 font-bold ">ราคา</div>
                  <div className="flex">
                    <div className="flex items-center justify-center">
                      <Input
                        className="w-20 rounded-2xl mr-4 my-2 px-4 pt-4 pb-5"
                        type="text"
                        placeholder={"xxxx --xxx"}
                      />
                      -
                      <Input
                        className="w-20 rounded-2xl mx-3 my-2 px-4 pt-4 pb-5"
                        type="text"
                        placeholder={"xxxx --xxx"}
                      />
                    </div>
                    <Select
                      defaultValue="ต่อเดือน"
                      style={{ width: 100 }}
                      className="mt-2"
                    >
                      <Option value="ต่อเดือน">ต่อเดือน</Option>
                    </Select>
                  </div>
                </Form.Item>
                <Form.Item>
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
                <Form.Item>
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
                <Form.Item className="">
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
                <Form.Item>
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
                  <div
                    className="rounded-2xl bg-pink-200"
                    style={{ width: "277px", height: "216px" }}
                  />
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
                  <div
                    className="rounded-2xl bg-pink-200"
                    style={{ width: "277px", height: "216px" }}
                  />
                </Form.Item>
              </div>
            </div>
          </Form>
        </Modal>
      );
    case "second":
      return (
        <Modal
          width={1036}
          visible={isModalVisible}
          bodyStyle={{ height: "778px" }}
          footer={false}
          onCancel={() => setIsModalVisible(false)}
          centered
        >
          <div className=" font-extrabold text-xl ">ยืนยันข้อมูล Hospitel</div>

          <div className="DISPLAY-WRAPPER">
            <div className=" grid grid-cols-3 gap-12 mt-6">
              <div>
                <div className="mb-8">
                  <div className="mb-2 font-bold ">ชื่อ Hospitel</div>
                  <div className="ml-4">{"โรงแรมไอบิสกรุงเทพ"}</div>
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
                    {
                      "93 ถนนป๊อปปูล่า ตําบลบ้านใหม่ อําเภอปากเกร็ด นนทบุรี, สนามบินนานาชาติดอนเมือง, กรุงเทพ, ประเทศไทย, 11120"
                    }
                  </div>
                </div>
                <div className="mb-8">
                  <div className="mb-2 font-bold ">ราคา</div>
                  <div className="ml-4 ">{`${"45,000"} -  ${"45,000"}   ต่อ ${"14"} วัน`}</div>
                </div>
                <div className="mb-8">
                  <div className="mb-2  font-bold ">เบอร์ติดต่อ</div>
                  <div className="ml-4 ">{`${"02-0117777"}`}</div>
                  <div className="ml-4 ">{`${"02-0117777"}`}</div>
                </div>
                <div className="mb-8">
                  <div className="mb-2  font-bold ">
                    ช่องทางติดต่ออื่นๆ (Facebook, Line ฯลฯ)
                  </div>
                  <div className="ml-4 ">{`${"https://www.ibisbangkokimpact.com/th/"}`}</div>
                  <div className="ml-4 ">{`${"https://www.ibisbangkokimpact.com/th/"}`}</div>
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
                      <div className="ml-4 ">{`${"360"}`}</div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2  font-bold">จำนวนห้องว่างทั้งหมด</div>
                    <div className="ml-4 ">{`${"360"}`}</div>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="mb-2 font-bold">หมายเหตุ</div>
                  <div className="ml-4 text-sm">
                    {`${`   เอกสารที่ต้องเตรียมและส่งให้เจ้าหน้าที่ก่อนเข้ารับการรักษาบัตรประชาชน
                            ผลการตรวจโควิด 19 ด้วยการใช้ RT-PCR Test ที่ผ่านการรับรองมาตรฐานจากกรมวิทยาศาสตร์การแพทย์
                            กรณีที่ใช้ประกัน เลขที่กรมธรรม์หรือบัตรประชาชน (ทุกฉบับที่มี)
                            ผลตรวจ X-Ray ปอด (ถ้ามี)`}`}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="mb-2 font-bold">สิ่งอำนวยความสะดวก</div>
                  <div className="ml-4 text-sm">
                    {[
                      "Wi-Fi ฟรี",
                      "เครื่องปรับอากาศ",
                      "บริการทางการแพทย์",
                      "บริการเครื่อง X-Ray",
                      "บริการตรวจเช็คสุขภาพโดยแพทย์ และพยาบาลผู้เชี่ยวชาญผ่านช่องทาง Tele-Medicine",
                    ].map((str) => (
                      <div> {str} </div>
                    ))}
                    {/* {`${`   Wi-Fi ฟรี \n
                            เครื่องปรับอากาศ
                            บริการทางการแพทย์
                            บริการเครื่อง X-Ray
                            บริการตรวจเช็คสุขภาพโดยแพทย์ และพยาบาลผู้เชี่ยวชาญผ่านช่องทาง Tele-Medicine
                            `}`} */}
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
                  <div
                    className="rounded-2xl bg-pink-200"
                    style={{ width: "277px", height: "216px" }}
                  />
                </div>
                <div className="mb-8">
                  <div className="mb-2 font-bold ">เข้าร่วมกับโรงพยาบาล</div>
                  <div className="ml-4"> {"โรงพยาบาลธนบุรี"} </div>
                </div>
                <div>
                  <div className="mb-4 font-bold ">สถานที่ของโรงพยาบาล</div>
                  <div
                    className="rounded-2xl bg-pink-200"
                    style={{ width: "277px", height: "216px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      );
    default:
      return <div></div>;
  }
};
