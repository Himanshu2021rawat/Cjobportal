import React, { useEffect, useState, useRef } from "react";
//import DataService from "../../../services/data.service";
//import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
//import { Editor } from '@tinymce/tinymce-react';
//import TagsInput from '../../../common/TagsInput'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {useParams} from 'react-router-dom';

const styles = {
    input: {
        opacity: '0%', // dont want to see it
        position: 'absolute' // does not mess with other elements 
    }
}
const MAX_COUNT = 5;
const EditCourse = () => {
    //const editorRef = useRef(null);
    const form = React.useRef();
    const [data,setData] = useState("");
    const [name,setName] = useState("");
    const [nameEducation,setNameEducation] = useState("");
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
    const [error,setError] = useState(false);

    const[education,setEducation] = useState();
    const inputFileRef = React.useRef();
    const imgRef = React.useRef();
    const {Id} = useParams();
    //const navigate = useNavigate();

    // useEffect(() => {
    //     // getData();
    // }, [images]);

    useEffect(() => {
        const postData = async() => {
          const data = {
             Name:"c2VsZWN0IElkLE5hbWUsQ29kZSxTb3J0T3JkZXIsRktFZHVjYXRpb24gZnJvbSBNYXN0ZXJDb3Vyc2U="
          };
          try{
            const response = await axios.post('https://jobpartal-backend.onrender.com/api/Course');
            //const JobApplied = response.data.Response;
               
            // Calculate total applied applications
              const Education = response.data.Response;
            
              setEducation(Education);
          }catch(err){
            setError(err);
          }finally{
            setLoading(false);
          }
        }
        postData();
      },[])
     // console.log("Education",education.name)

     useEffect(() => {
        const getSingleCourse = async () => {
          try {
            const requestBody = {
              Name: "c2VsZWN0IElkLE5hbWUsQ29kZSxTb3J0T3JkZXIsRktFZHVjYXRpb24gZnJvbSBNYXN0ZXJDb3Vyc2Ugd2hlcmUgaWQ9",
              Id: Id // Adding job category ID to the request body
            };
    
            const response = await axios.post(`https://jobpartal-backend.onrender.com/api/Course/${Id}`, requestBody, {
              headers: {
                'Content-Type': 'application/json',
                'TransactionKey': 'c2VsZWN0IElkLE5hbWUsU29ydE9yZGVyLEFjdGl2ZSBmcm9tIE1hc3RlckpvYkNhdGVnb3J5IHdoZXJlIGlkPQ=='
              }
            });
    
            const data = response.data.Response;

            setName(data[0]?.Code)
            setNameEducation(data[0]?.Name)
            console.log("name:",nameEducation);
            setLoading(false);
          } catch (error) {
            //setError(error.toString());
            setLoading(false);
          }
        };
    
        getSingleCourse();
      }, [Id]);


    const storedUserId = JSON.parse(localStorage.getItem("userId"));

  
    const handleEducationChange = (e) => {
        setNameEducation(e.target.value);
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


    
    const deleteImage = (e, index, api = true) => {
        if (uploadedFiles && uploadedFiles.length > 0) {
            var uploaded = uploadedFiles.filter((file, i) => {
                return index != i
            })
            var imageSrc = [];
            var ss = uploaded.some((file) => {
                const reader = new FileReader();
                const url = reader.readAsDataURL(file);
                reader.onloadend = function (theFile) {
                    var image = new Image();
                    image.src = theFile.target.result;
                    imageSrc.push(image.src)
                }
            })
            setUploadedFiles(uploaded);
            setImages(imageSrc);
        }
    }
    return (
        <div className="container-fluid">
            <ToastContainer></ToastContainer>
            <div className="row">
                <div className="d-flex w-100 justify-content-between align-items-center mb-4">
                    <h4 className="mb-0" style={{marginLeft:"50px"}}>Add Education</h4>
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

                     
                            <div className="mb-3">
                                <label className="form-label">Education</label>
                                <select
                                    className="form-select"
                                    required
                                    value={nameEducation}
                                    onChange= {handleEducationChange}
                                    //onChange={handleEducationChange}
                                > 
                                    <option value="" disabled selected>Select Education</option>
                                    {education && education.map((edu) => (
                                        <option key={edu.Id} value={edu.Id}>{edu.Name}</option>
                                    ))}

                                </select>
                                {/* {loading && <p>Loading...</p>}
                                {error && <p>Error loading data</p>} */}
                            </div>
                    
                            <div className="mb-3">
                                    <label className="form-label">Course*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        value={name}
                                     />
                                    {/* <div className="form-text">A Lesson name is required and recommended to be unique.</div> */}
                                </div>



                        <div className="d-flex justify-content-end btn-min-width">
                                <button
                                 //onClick={handleSubmit} 
                                 className="btn btn-primary" >

                                    Save
                                </button>
                        </div>

                    </div>



                </div>
                    </div>
                </div>
           
        </div>
    );
};

export default EditCourse;