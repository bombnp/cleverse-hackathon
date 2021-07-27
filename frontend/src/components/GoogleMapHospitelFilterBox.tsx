import { useState, Fragment, useEffect } from "react";
import { Slider, Dropdown, Radio, Select, Input } from "antd";
import { FaFilter, FaSearch } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { Global, css } from "@emotion/react";

const { Option } = Select;

export const GoogleMapHospitelFilterBox = () => {
  const province_api =
    "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json";
  const district_api =
    "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_district.json";
  const options = [
    { label: "ว่างมาก", value: "Empty", color: "#11B418" },
    { label: "ใกล้เต็ม", value: "AlmostFull", color: "#F0CC12" },
    { label: "เต็มแล้ว", value: "Full", color: "#BFBFBF" },
  ];
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [radio, setRadio] = useState("");

  const fetchAPI = (api : any, setAPI: (result : any) => void) => {
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

    const SliderByNum = () => {
        const [min, setMin] = useState<number>(500);
        const [max, setMax] = useState<number>(40000);
        const BoundMax = 65000;
        const calPercen = (num: number) => {
            return (num / BoundMax) * 100;
        };
        const calToReal = (num: number) => {
            return (num / 100) * BoundMax;
        };
        const onEnterMin = (e: any) => {
            e.preventDefault();
            setMin(e.target.value);
            if (min < max) setSlide([calPercen(min), slide[1]]);
        };
        const onEnterMax = (e: any) => {
            e.preventDefault();
            setMax(e.target.value);
            if (max > min) setSlide([slide[0], calPercen(max)]);
        };
        function onChange(value: number[]) {
            setSlide(value);
            setMin(calToReal(slide[0]));
            setMax(calToReal(slide[1]));
        }
        const [slide, setSlide] = useState<any>([calPercen(500), calPercen(40000)]);

    return (
      <div>
        <div>
          <div className="flex">
            <div className="mr-2">ราคา</div>
            <div
              className="input-wrapper w-full flex justify-between "
            >
              <Input
                value={min}
                onChange={(e) => setMin(parseInt(e.target.value))}
                onPressEnter={onEnterMin}
                style={{
                  border: "1px solid #EDEDED",
                  boxSizing: "border-box",
                  borderRadius: "5px",
                  width: "60px",
                  height: "25px",
                  textAlign: "center",
                  padding: "4px 8px",
                }}
              />
              <Input
                value={max}
                onChange={(e) => setMax(parseInt(e.target.value))}
                onPressEnter={onEnterMax}
                style={{
                  border: "1px solid #EDEDED",
                  boxSizing: "border-box",
                  borderRadius: "5px",
                  width: "60px",
                  height: "25px",
                  textAlign: "center",
                  padding: "4px 5px",
                }}
              />
            </div>
          </div>
        </div>
        <div className="ml-10">
          <Slider
            range
            value={slide}
            tooltipVisible={false}
            onChange={onChange}
          />
        </div>
      </div>
    );
  };

  const LocationDropdown = () => {
    const [selectProvince, setSelectProvince] = useState(null);
    const [selectDistrict, setSelectDistrict] = useState(null);
    const handleChangeProvince = (value:any) => {
      setSelectProvince(value);
    };
    const handleChangeDistrict = (value:any) => {
      setSelectDistrict(value);
    };
    return (
      <div>
        <Select
          placeholder={"เลือกจังหวัด"}
          onChange={handleChangeProvince}
          style={{
            marginRight: "0.5rem",
            borderRadius: "16px",
            border: "1px solid #EDEDED",
            overflow: "hidden",
            padding: "1px 2px",
            width: "150px",
            backgroundColor: "whitesmoke",
          }}
        >
          {province.map((item : any) => (
              <Option key={"pv" + item.id} value={item.id}>
              {item.name_th}
            </Option>
          ))}
        </Select>
        <Select
          onChange={handleChangeDistrict}
          disabled={!selectProvince}
          style={{
            marginRight: "0.5rem",
            borderRadius: "16px",
            border: "1px solid #EDEDED",
            overflow: "hidden",
            width: "150px",
            backgroundColor: "whitesmoke",
          }}
        >
          {district
            ?.filter((item : any) => item.province_id === selectProvince)
            ?.map((item : any) => (
              <Option key={"amp" + item.id} value={item.id}>
                {item.name_th}
              </Option>
            ))}
        </Select>
      </div>
    );
  };

  const filterInside = () => {
    const onRadioChange = (e : any) => {
      e.preventDefault();
      setRadio(e.target.value);
    };
    return (
      <>
        <div className=" w-96 h-64 bg-white z-10 -ml-60 rounded-2xl p-6 -mt-3">
          <div className=" w-full h-full ">
            <Radio.Group
              onChange={(e) => onRadioChange(e)}
              value={radio}
              optionType="button"
              style={{
                border: "none",
              }}
            >
              {options.map((item) => (
                <Radio.Button
                  style={{
                    display: "inline-block",
                    width: "6rem",
                    marginRight: "0.5rem",
                    borderRadius: "16px",
                    border: "1px solid #EDEDED",
                  }}
                  key={item.value}
                  value={item.value}
                >
                  <div className="flex">
                    <div className="mt-2" style={{ color: `${item.color}` }}>
                      <MdLocationOn />
                    </div>
                    <div>{item.label}</div>
                  </div>
                </Radio.Button>
              ))}
            </Radio.Group>
            <LocationDropdown />
            <SliderByNum />
            <div className="w-full ">
              <div
                style={{
                  borderRadius: "16px",
                  border: "1px solid #EDEDED",
                  overflow: "hidden",
                  padding: "2px 1px",
                  height: "30px",
                  width: "80px",
                  backgroundColor: "#5600E8",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0 auto",
                }}
              >
                <div className="mr-1">
                  <FaSearch />
                </div>
                <div>ค้นหา</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="m-0 w-full h-8 -mt-28 -mr-2">
      <Global
        styles={css`
          .ant-radio-button-wrapper:not(:first-child)::before {
            content: none;
          }
          .ant-select:not(.ant-select-customize-input) .ant-select-selector {
            border: none;
          }
          .ant-select .ant-select-selector:focus {
            border: none;
          }
        `}
      />
      <Dropdown
        overlay={filterInside}
        trigger={["click"]}
        className="mt-16 px-3 py-2 rounded-3xl cursor-pointer bg-white mr-20 shadow-lg"
      >
        <div
          className=" w-36 flex justify-center gap-1"
          onClick={(e) => e.preventDefault()}
        >
          <div className="mt-1">
            <FaFilter />
          </div>
          <div>FILTER</div>
        </div>
      </Dropdown>
    </div>
  );
};
