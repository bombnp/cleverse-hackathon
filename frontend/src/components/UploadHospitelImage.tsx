import axios from 'axios';
import React, { useState, useRef } from 'react';
import { ReactComponent as UploadIcon } from 'assets/upload-icon.svg';
import { message } from 'antd';
import { API_URL } from 'config/config';

interface UploadHospitelImageProps {
    setImageData: (imageData: any) => void;
}
export const UploadHospitelImage = ({setImageData} : UploadHospitelImageProps) => {
    const fileInput = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [image, setImage] = useState<any>([]);
    const onChange = (e: any) => {
        setUploading(true);
        const files = Array.from(e.target.files);
        const formData = new FormData();

        files.forEach((item: any) => { 
            
                formData.append(
                    "file",
                    item,
                    item?.name
                );
        })

        if (formData) {
            const url = `${API_URL}/upload/images`;
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            axios.post(url, formData, config)
                .then((res: any) => {
                    setImageData(res.data.urls);
                    setImage(res.data.urls);
                    setUploading(false);
                })
                .catch((error) => { console.log(error); message.error('อัปโหลดรูปไม่สำเร็จ'); setUploading(false)})
        }

    }

    switch (true) {
        case uploading:
            return <div>Upload...</div>
        case !!image || image.length > 0:
            return (
                <div>
                    <input type='file' id='multi' style={{ display: 'none' }} onChange={onChange} ref={fileInput} multiple/>
                    <button className='w-24 h-8 bg-white border rounded-2xl px-2 z-10' onClick={() => (fileInput as any).current.focus()}>
                        <label className="flex cursor-pointer items-center justify-center" htmlFor='multi'>
                            <UploadIcon className="mr-2"/>
                            <div>อัพโหลด</div>
                        </label>   
                    </button>
                </div>
            )
        default:
            return (
                <div>
                    <input type='file' id='multi' style={{ display: 'none' }} onChange={onChange} ref={fileInput} multiple/>
                    <button className='w-24 h-8 bg-white border rounded-2xl px-2 z-10' onClick={() => (fileInput as any).current.focus()}>
                        <label className="flex cursor-pointer items-center justify-center" htmlFor='multi'>
                            <UploadIcon className="mr-2"/>
                            <div>อัพโหลด</div>
                        </label>   
                    </button>
                </div>
            )
      }
  }