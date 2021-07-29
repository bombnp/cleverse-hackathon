// import axios from 'axios';
 
import React, { useState, useRef } from 'react';
import { ReactComponent as UploadIcon } from 'assets/upload-icon.svg';
import axios from 'axios';
import { message } from 'antd';
 
interface UploadHospitelDocumentProps {
  setDocFile: (file: any) => void;
}
export const UploadHospitelDocument = ({setDocFile} : UploadHospitelDocumentProps) => {
  const [selectedFile, setSelectedFile] = useState<any>();
  const fileInput = React.useRef(null);
  
    const onFileUpload = (event:any) => {
      setSelectedFile(event.target.files[0]);
      const formData = new FormData();
    
      
      if (selectedFile !== undefined && selectedFile.type === 'application/pdf') {
        formData.append(
          "file",
            selectedFile,
            selectedFile?.name
        );
      axios.post('http://35.247.17.176:3000/upload/document', formData)
      .then((res:any) => console.log(res))
        .then((res:any) => {
          setDocFile(res.data);
        })
        .catch((error: any) => console.log(error))        
      } else {
        message.error('นามสกุลไฟล์ต้องเป็น .pdf เท่านั้น');
        formData.delete('file');
      }


    };
    
      return (
        <div>
          <input type='file' id='single' style={{ display: 'none' }} onChange={onFileUpload} ref={fileInput} />
          <button className='w-24 h-8 bg-white border rounded-2xl px-2' onClick={() => (fileInput as any).current.focus()}>
              <label className="flex cursor-pointer items-center justify-center" htmlFor='single'>
                <UploadIcon className="mr-2"/>
              <div>อัพโหลด</div>
              </label>   
          </button>  {selectedFile?.name}
        </div>
      );
  }