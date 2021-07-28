// import axios from 'axios';
 
import React,{ useState} from 'react';
 
export const UploadHospitelPic = () => {
    const[ selectedFile,setSelectedFile ] = useState<any>();
  
    // On file select (from the pop up)
    const onFileChange = (event:any) => {
        setSelectedFile(event.target.files[0]);
    };
    
    // On file upload (click the upload button)
    const onFileUpload = () => {
    
      // Create an object of formData
      const formData = new FormData();
    
        if (selectedFile !== undefined) {
            formData.append(
                "myFile",
                selectedFile,
                selectedFile?.name
            );            
        }
      console.log(selectedFile);
    
      // Request made to the backend api
      // Send formData object
    //   axios.post("api/uploadfile", formData);
    };
    
    // File content to be displayed after
    // file upload is complete
    const fileData = () => {
    
      if (selectedFile) {
         
        return (
          <div>
            <h2>File Details:</h2>
             
<p>File Name: {selectedFile.name}</p>
 
             
<p>File Type: {selectedFile.type}</p>
 
             
<p>
              Last Modified:{" "}
              {selectedFile.lastModifiedDate.toDateString()}
            </p>
 
          </div>
        );
      } else {
        return (
          <div>
            <br />
            <h4>Choose before Pressing the Upload button</h4>
          </div>
        );
      }
    };
    
      return (
        <div>
            <h1>
              GeeksforGeeks
            </h1>
            <h3>
              File Upload using React!
            </h3>
            <div>
                <input type="file" onChange={onFileChange} />
                <button onClick={onFileUpload}>
                  Upload!
                </button>
            </div>
          {fileData()}
        </div>
      );
  }