import axios from 'axios';
import React, { useState, useRef } from 'react';
import { ReactComponent as UploadIcon } from 'assets/upload-icon.svg';
import { HospitelImage } from './HospitelImage';
import { message } from 'antd';

export const UploadHospitelImage = () => {
    const fileInput = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [image, setImage] = useState<any[]>();

    const onChange = (e: any) => {
        setUploading(true);
        const files = Array.from(e.target.files);

        const formData = new FormData();

        files.forEach((item: any) => { 
            if (item.type === 'image/png' || item.type === 'image/jpg') {
                formData.append(
                    "file",
                    item,
                    item?.name
                );
                
            } else {
                formData.delete('file');
                message.error('นามสกุลของไฟล์ภาพต้องเป็น .jpg หรือ .png เท่านั้น');
            }
        })

        if (formData) {
            const url = "http://35.247.17.176:3000/upload/images";
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            axios.post(url, formData, config)
            .then((res:any) => console.log(res))
            .then((images:any) => {
                setUploading(false);
                setImage(images)
            })
            .catch((error) => console.log(error))            
        }

    }

    const removeImage = (id: string) => {
        setImage(image?.filter((image) => image.public_id !== id));
    }

    switch (true) {
        case uploading:
            return <div>Upload...</div>
        case !!image && image.length > 0:
          return <HospitelImage images={image} removeImage={removeImage} />
        default:
            return (
                <div>
                    <input type='file' id='multi' style={{ display: 'none' }} onChange={onChange} ref={fileInput} multiple/>
                    <button className='w-24 h-8 bg-white border rounded-2xl px-2' onClick={() => (fileInput as any).current.focus()}>
                        <label className="flex cursor-pointer items-center justify-center" htmlFor='multi'>
                            <UploadIcon className="mr-2"/>
                            <div>อัพโหลด</div>
                        </label>   
                    </button>
                </div>
            )
      }
  }