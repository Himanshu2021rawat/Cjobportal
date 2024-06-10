import React, { useEffect, useState, useRef } from "react";
//import DataService from "../../../services/data.service";
//import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
//import { Editor } from '@tinymce/tinymce-react';
//import TagsInput from '../../../common/TagsInput'
import 'react-toastify/dist/ReactToastify.css';
//import './Employers.css'

const styles = {
    input: {
        opacity: '0%', // dont want to see it
        position: 'absolute' // does not mess with other elements 
    }
}
const MAX_COUNT = 5;
const AddJob = () => {
    const editorRef = useRef(null);
    const form = React.useRef();

    //const [activeTab, setActiveTab] = useState('registration');

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
    const inputFileRef = React.useRef();
    const imgRef = React.useRef();


    const [logo, setLogo] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    //const navigate = useNavigate();

    // useEffect(() => {
    //     // getData();
    // }, [images]);

    const storedUserId = JSON.parse(localStorage.getItem("userId"));
    useEffect(() => {
        document.title = "My Profile";
        //getData();
    }, [storedUserId]);


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

    // const handleTabClick = (tab) => {
    //     setActiveTab(tab);
    // };

    
    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 5 * 1024 * 1024) {
            setErrorMessage('File size should not exceed 5 MB');
            setLogo(null);
        } else {
            setErrorMessage('');
            setLogo(file);
        }
    };

    return (
        <div className="container-fluid">
            <ToastContainer></ToastContainer>
            <h4 className="style-user">Job Information</h4>
          
                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}
                <div className="row">
                    <div className="col-xxl-9 col-lg-8 ps-xxl-5 ps-md-3 ps-0">
                      <div className="tab-content">  
                        <div className="card mb-5">
                            <div className="card-body p-4">


                            <div className="mb-3">
                                    <label className="form-label">Job Title*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        value={name}
                                        placeholder="What is your name?"
                                     />
                                    {/* <div className="form-text">A Lesson name is required and recommended to be unique.</div> */}
                            </div>
                            
                            <div className="mb-3">
                          <label className="form-label">Job Category*</label>
                            <select
                                className="form-select"
                                required
                                // value={gender}
                                // onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="">Select Job Category</option>
                                <option value="healthcare">Health Care</option>
                                <option value="account&finance">Account & Finance</option>
                                <option value="transporatation">Transportation</option>
                                <option value="medical&finance">Medical & Finance</option>
                                <option value="development">Development</option>
                                <option value="engineering">Engineering</option>
                                <option value="receptionist">Receptionist</option>
                                <option value="other">Other</option>
                                
                                
                            </select>
                           </div>

                            <div className="mb-3">
                                    <label className="form-label">No Vacancies*</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        required
                                        value={name}
                                        placeholder="Enter Number Of Vacancies"
                                     />
                                    {/* <div className="form-text">A Lesson name is required and recommended to be unique.</div> */}
                            </div>

                            <div className="mb-3">
                             <label className="form-label">Salary Range*</label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="number"
                            className="form-control"
                            required
                            placeholder="Max Salary"
                            // value={yearsOfExperience}
                            // onChange={(e) => setYearsOfExperience(e.target.value)}
                            style={{ marginRight: '10px', flex: '1' }}
                        >
                            
                        </input>
                        <input
                            type="number"
                            className="form-control"
                            required
                            placeholder="Min salary"
                            // value={yearsOfExperience}
                            // onChange={(e) => setYearsOfExperience(e.target.value)}
                            style={{ marginRight: '10px', flex: '1' }}
                        >
                        </input>
                    </div>
                            </div>

                            
                <div className="mb-3">
                   <label className="form-label">Experience*</label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                        <select
                            className="form-control"
                            required
                            // value={yearsOfExperience}
                            // onChange={(e) => setYearsOfExperience(e.target.value)}
                            style={{ marginRight: '10px', flex: '1' }}
                        >
                            <option value="">Year</option>
                            {[...Array(12).keys()].map(year => (
                                <option key={year + 1} value={year + 1}>{year + 1}</option>
                            ))}
                        </select>
                        <select
                            className="form-control"
                            required
                            // value={yearsOfExperience}
                            // onChange={(e) => setYearsOfExperience(e.target.value)}
                            style={{ marginRight: '10px', flex: '1' }}
                        >
                            <option value="">to Year</option>
                            {[...Array(12).keys()].map(year => (
                                <option key={year + 1} value={year + 1}>{year + 1}</option>
                            ))}
                        </select>
                    </div>
                </div>

                            <div className="mb-3">
                                    <label className="form-label">Technology*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        value={email}
                                        placeholder="Technology"
                                        //onChange={onChangeName}
                                     />
                                    {/* <div className="form-text">A Lesson name is required and recommended to be unique.</div> */}
                            </div>

                <div className="mb-3">
                          <label className="form-label">Job Type*</label>
                            <select
                                className="form-select"
                                required
                                // value={gender}
                                // onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="">Select Job Type</option>
                                <option value="hybrid">Hybrid</option>
                                <option value="fulltime">Full Time</option>
                                <option value="parttime">Part Time</option>
                                <option value="remote">Remote</option>
                                <option value="contractual">Contractual</option>

                                <div className="mb-3">
                   <label className="form-label">Experience*</label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                        <select
                            className="form-control"
                            required
                            // value={yearsOfExperience}
                            // onChange={(e) => setYearsOfExperience(e.target.value)}
                            style={{ marginRight: '10px', flex: '1' }}
                        >
                            <option value="">Select Years</option>
                            {[...Array(12).keys()].map(year => (
                                <option key={year + 1} value={year + 1}>{year + 1}</option>
                            ))}
                        </select>
                        <select
                            className="form-control"
                            required
                            // value={yearsOfExperience}
                            // onChange={(e) => setYearsOfExperience(e.target.value)}
                            style={{ marginRight: '10px', flex: '1' }}
                        >
                            <option value="">Select Month</option>
                            {[...Array(12).keys()].map(year => (
                                <option key={year + 1} value={year + 1}>{year + 1}</option>
                            ))}
                        </select>
                    </div>
                </div>
                                
                                
                            </select>
                           </div>


                                <div className="mb-3">
                                    <label className="form-label">Technology*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        value={email}
                                        placeholder="Technology"
                                        //onChange={onChangeName}
                                     />
                                    {/* <div className="form-text">A Lesson name is required and recommended to be unique.</div> */}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Deadline*</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        required
                                        onChange={onChangeName}
                                        placeholder="Mobile number without +91" />
                                    {/* <div className="form-text">A Lesson name is required and recommended to be unique.</div> */}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Education Requirements*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        onChange={onChangeName}
                                        placeholder="Education Requirements" />
                                    {/* <div className="form-text">A Lesson name is required and recommended to be unique.</div> */}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Job Description*</label>
                                    <textarea
                                        rows={5}
                                        columns={5}
                                        className="form-control"
                                        required
                                        onChange={onChangeName}
                                        placeholder="Job Description" />
                                    {/* <div className="form-text">A Lesson name is required and recommended to be unique.</div> */}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label"> Job Responsibility & Main Duties *</label>
                                    <textarea
                                        rows={5}
                                        columns={5}
                                        className="form-control"
                                        required
                                        onChange={onChangeName}
                                        placeholder="Job Responsibility & Main Duties" />
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
           
        </div>
    );
};

export default AddJob;