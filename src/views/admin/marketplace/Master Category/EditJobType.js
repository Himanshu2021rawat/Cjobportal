import React, { useEffect, useState, useRef } from "react";
//import DataService from "../../../services/data.service";
//import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
//import { Editor } from '@tinymce/tinymce-react';
//import TagsInput from '../../../common/TagsInput'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useParams } from "react-router-dom";

const styles = {
    input: {
        opacity: '0%', // dont want to see it
        position: 'absolute' // does not mess with other elements 
    }
}
const MAX_COUNT = 5;
const EditJobType = () => {
    //const editorRef = useRef(null);
    const form = React.useRef();
    const [data,setData] = useState("");
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [heading, setHeading] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [priority,setPriority] = useState("");

 
    

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [images, setImages] = useState([]);
    const [fileLimit, setFileLimit] = useState(false);
    const [response,setResponse] = useState('');
    const inputFileRef = React.useRef();
    const imgRef = React.useRef();
    const {Id} = useParams();
    //const navigate = useNavigate();

    // useEffect(() => {
    //     // getData();
    // }, [images]);

    const storedUserId = JSON.parse(localStorage.getItem("userId"));
    useEffect(() => {
        const getSingleJobType = async () => {
          try {
            const requestBody = {
              Name: "c2VsZWN0IElkLE5hbWUsU29ydE9yZGVyLEFjdGl2ZSBmcm9tIE1hc3RlckpvYkNhdGVnb3J5",
              Id: Id // Adding job category ID to the request body
            };
    
            const response = await axios.post(`https://jobpartal-backend.onrender.com/api/JobType/${Id}`, requestBody, {
              headers: {
                'Content-Type': 'application/json',
                'TransactionKey': 'c2VsZWN0IElkLE5hbWUsU29ydE9yZGVyLEFjdGl2ZSBmcm9tIE1hc3RlckpvYlR5cGUgd2hlcmUgaWQ9'
              }
            });
    
            const data = response.data.Response;

            setName(data[0]?.Name)
            //console.log("name:",data[0]?.Name)
            setLoading(false);
          } catch (error) {
            //setError(error.toString());
            setLoading(false);
          }
        };
    
        getSingleJobType();
      }, [Id]);


    const onFileChangeCapture = (e) => {
        /*Selected files data can be collected here.*/
        const file = e.target.files[0]
        setFile(e.target.files)
        const reader = new FileReader();
        const url = reader.readAsDataURL(file);
        reader.onloadend = function (theFile) {
            var image = new Image();
            image.src = theFile.target.result;
            imgRef.current.src = image.src

        }
    };
    const handleUploadedFiles = files => {
        const uploaded = (uploadedFiles ? uploadedFiles : []);
        let limitExceeded = false;
        let imageSrc = [];
        if (images.length) {
            images.map((img, i) => {
                imageSrc.push(img)
            });
        }
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                const reader = new FileReader();
                const url = reader.readAsDataURL(file);
                reader.onloadend = function (theFile) {
                    var image = new Image();
                    image.src = theFile.target.result;
                    imageSrc.push(image.src)
                }
                if (uploaded.length === MAX_COUNT) setFileLimit(true);
                if (uploaded.length > MAX_COUNT) {
                    toast.error(`You can only uploaded a maximun of ${MAX_COUNT} files`, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    setFileLimit(true);
                    limitExceeded = true;
                    return true;
                }
            }
        })
        if (!limitExceeded) {
            setUploadedFiles(uploaded);
            setImages(imageSrc);

        }
    }
    const onFileChangeCaptureMultiple = (e) => {
        const choosenFiles = Array.prototype.slice.call(e.target.files);
        handleUploadedFiles(choosenFiles)
    }
    const onChangeName = (e) => {
        const heading = e.target.value;
        setHeading(heading);
    };



    const onChangeCategory = (e) => {
        const category = e.target.value;
        setCategory(category);
    };

    const onChangePriority = (e) => {
        const priority = e.target.value;
        setPriority(priority);
    };


    const onChangeDescription = (e) => {
        const description = e.target.value;
        setDescription(description);
    };

 

    const triggerFile = () => {
        /*Collecting node-element and performing click*/
        inputFileRef.current.click();
    };


    //const storedUserId = JSON.parse(localStorage.getItem("userId"));
    console.log ('user_id',storedUserId);


   
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const requestBody = {
                Name: "dXBkYXRlIE1hc3RlckpvYlR5cGUgc2V0IE5hbWU9J0BAVmFsdWUnIHdoZXJlIElkPQ==",
                Id:Id,
                searchType: name
            };
    
            const res = await fetch(`https://jobpartal-backend.onrender.com/api/Update/JobType/${Id}`, { // Corrected URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
    
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await res.json();
            setResponse(data);
            setLoading(false);
    
            // Redirect to another page after a successful submission
            window.location.href = "/";
        } catch (err) {
            setLoading(false);
            setMessage("Error submitting the form");
            console.error('Error:', err); // Log the error to see more details
        }
    };

    return (
        <div className="container-fluid">
            <ToastContainer></ToastContainer>
            <div className="row">
                <div className="d-flex w-100 justify-content-between align-items-center mb-4">
                    <h4 className="mb-0" style={{marginLeft:"50px"}}>Update JobType</h4>
                    {/* <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#ImportProuct">Import Venue</button> */}
                    <div class="modal fade" id="ImportProuct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">

                                <div class="modal-body bg-yellow">
                                    <button type="button" class="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button>
                                    <div class="card-body p-4 importSectionModal bg-white rounded-5 m-5">

                                        <div class="d-flex justify-content-start btn-min-width">
                                            <button class="btn btn-primary">
                                                <span>Save</span>
                                            </button></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
          
                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}
                <div className="row">
                    <div className="col-xxl-9 col-lg-8 ps-xxl-5 ps-md-3 ps-0">
                        <div className="card mb-5">
                            <div className="card-body p-4">

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                    <label className="form-label">JobType*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                     />
                                    {/* <div className="form-text">A Lesson name is required and recommended to be unique.</div> */}
                                </div>



                            <div className="d-flex justify-content-end btn-min-width">
                                    <button
                                    //onClick={handleSubmit} 
                                    className="btn btn-primary" >

                                        Update
                                    </button>
                            </div>
                        </form>

                    </div>



                </div>
                    </div>
                </div>
           
        </div>
    );
};

export default EditJobType;