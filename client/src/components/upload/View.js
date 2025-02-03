import React, {useState} from 'react';
import axios from 'axios';

function UploadView() {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");
    const [fileURL, setFileURL] = useState("");

    async function handleFileUpload() {
        if(!file) {
            setUploadStatus('Please select a file');
            return 
        }

        const formData = new FormData()
        formData.append('file', file)
        let res = '';
        try
        {
            setUploadStatus('Uploading....')
            res = await axios.post('localhost:5000/upload',formData, {headers: {'Content-type':"multipart/form-data"}})
            setUploadStatus(res.data.msg)
            setFileURL('http://localhost:5000/uploads'+res.data.filename);       
                 
        } catch(err) {
            setUploadStatus(res.msg);
        }
            

    }

    return (
        <div>
            <h2>File Upload</h2>
            <input type='file' onChange={(e) => {setFile(e.target.files[0])}}/>
            <button onClick={handleFileUpload}>Upload</button>

            <p>{uploadStatus}</p>

            {fileURL && (
                <div>
                    <p>Uploaded File</p>
                    <a href={fileURL} target='_blank' rel='noopener noreferrer'>{fileURL}</a>
                </div>
            )}
        </div>
    )

}

export default UploadView;