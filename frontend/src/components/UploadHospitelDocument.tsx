// import axios from 'axios';
 
import React, { useState, useRef } from 'react';
import { ReactComponent as UploadIcon } from 'assets/upload-icon.svg';

import { Button, message } from 'antd';
 
export const UploadHospitelDocument = () => {
  const [selectedFile, setSelectedFile] = useState<any>();
  const fileInput = React.useRef(null);
  
    const onFileChange = (event:any) => {
        setSelectedFile(event.target.files[0]);
    };
    
    const onFileUpload = () => {
      const formData = new FormData();
    
      if (selectedFile !== undefined && selectedFile.type === 'application/pdf') {
            formData.append(
                "fileName",
                selectedFile,
                selectedFile?.name
            );            
      } else {
        message.error('นามสกึลไฟล์ต้องเป็น .pdf เท่านั้น');
        formData.delete('fileName');
      }
      //TODO: add upload function
    };
    
      return (
        <div>
          <input type='file' id='single' style={{ display: 'none' }} onChange={onFileChange} ref={fileInput} />
          <button className='w-24 h-8 bg-white border rounded-2xl px-2' onClick={() => (fileInput as any).current.focus()}>
              <label className="flex cursor-pointer items-center justify-center" htmlFor='single'>
                <UploadIcon className="mr-2"/>
              <div>อัพโหลด</div>
              </label>   
          </button>  {selectedFile.name}
        </div>
      );
  }