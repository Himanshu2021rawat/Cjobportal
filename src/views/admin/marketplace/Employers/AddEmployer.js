import React, { useEffect, useState, useRef } from "react";
//import DataService from "../../../services/data.service";
//import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
//import { Editor } from '@tinymce/tinymce-react';
//import TagsInput from '../../../common/TagsInput'
import 'react-toastify/dist/ReactToastify.css';
import './Employers.css'

const styles = {
    input: {
        opacity: '0%', // dont want to see it
        position: 'absolute' // does not mess with other elements 
    }
}
const MAX_COUNT = 5;
const AddEmployer = () => {
    const editorRef = useRef(null);
    const form = React.useRef();

    const [activeTab, setActiveTab] = useState('registration');

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

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    
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
            <h4 className="style-user">Add Employer</h4>

            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'registration' ? 'active' : ''}`}
                    onClick={() => handleTabClick('registration')}
                >
                    Registration
                </button>
                <button
                    className={`tab ${activeTab === 'companyinformation' ? 'active' : ''}`}
                    onClick={() => handleTabClick('companyinformation')}
                >
                    Company information
                </button>
   
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
                      <div className="tab-content"> 
                      {activeTab === 'registration' && ( 
                        <div className="card mb-5">
                            <div className="card-body p-4">


                            <div className="mb-3">
                                    <label className="form-label">Company/Business Name*</label>
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
                                    <label className="form-label">Full Name*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        value={name}
                                        placeholder="Name as per PAN"
                                     />
                                    {/* <div className="form-text">A Lesson name is required and recommended to be unique.</div> */}
                            </div>

                                <div className="mb-3">
                                    <label className="form-label">Official Email ID*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        value={email}
                                        placeholder="Tell us your Email ID"
                                        //onChange={onChangeName}
                                     />
                                    {/* <div className="form-text">A Lesson name is required and recommended to be unique.</div> */}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Phone Number*</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        required
                                        onChange={onChangeName}
                                        placeholder="Mobile number without +91" />
                                    {/* <div className="form-text">A Lesson name is required and recommended to be unique.</div> */}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Password*</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        required
                                        onChange={onChangeName}
                                        placeholder="Create a password  for your account" />
                                    {/* <div className="form-text">A Lesson name is required and recommended to be unique.</div> */}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Confirm Password*</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        required
                                        onChange={onChangeName}
                                        placeholder="Confirm Password" />
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
                      )}

                        {activeTab === 'companyinformation' && (
                    <div className="card mb-5">
                        <div className="card-body p-4">
                            <div className="mb-3">
                                <label className="form-label">Company*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    //value={name}
                                    //onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter Company Name"
                                />
                            </div>

                            
                            <div className="mb-3">
                             <label className="form-label">Organization size*</label>
                            <select
                                className="form-control"
                                required
                                // value={education}
                                // onChange={(e) => setEducation(e.target.value)}
                                style={{ marginRight: '10px', flex: '1' }}
                            >
                                <option value="">Select Organization size</option>
                                <option value="1-14">1-14</option>
                                <option value="15-49">15-49</option>
                                <option value="50-100">50-100</option>
                                <option value="100+">100+</option>
                                {/* Add more options for higher education */}
                            </select>
                        </div>

                            <div className="mb-3">
                                <label className="form-label">Organization Type*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    //value={email}
                                    //onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Organization Type"
                                />
                            </div>


                            <div className="mb-3">
                                <label className="form-label">Industry*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    //value={password}
                                    //onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Industry "
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Confirm Password*</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    required
                                   // value={confirmPassword}
                                    //onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm Password"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label"> Contact Name *</label>
                                <input
                                    type="Text"
                                    className="form-control"
                                    required
                                   // value={confirmPassword}
                                    //onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Enter Contact Name"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Designation*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                   // value={confirmPassword}
                                    //onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Enter Designation"
                                />
                            </div>


                        <div className="mb-3">
                                <label className="form-label"> Pincode*</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    required
                                   // value={confirmPassword}
                                    //onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="eg. 246876"
                                />
                            </div>

                            
                            <div className="mb-3">
                              <label className="form-label">Company address*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    // value={designation}
                                    // onChange={(e) => setDesignation(e.target.value)}
                                    placeholder="Type Location"
                                ></input>
                           </div>

                           <div className="mb-3">
                              <label className="form-label">Website Link*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    // value={designation}
                                    // onChange={(e) => setDesignation(e.target.value)}
                                    placeholder="https:example .com"
                                ></input>
                           </div>

                           
                           <div className="mb-3">
                              <label className="form-label">LinkedIn*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    // value={designation}
                                    // onChange={(e) => setDesignation(e.target.value)}
                                    placeholder="https:example .com"
                                ></input>
                           </div>

                           <div className="mb-3">
                              <label className="form-label">Short Description*</label>
                                <textarea
                                    rows={5}
                                    column={5}
                                    className="form-control"
                                    required
                                    // value={designation}
                                    // onChange={(e) => setDesignation(e.target.value)}
                                    placeholder="Enter Short Description"
                                ></textarea>
                           </div>

                           <div className="mb-3">
                             <label className="form-label">Upload Logo (Max 5 MB)</label>
                            <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={handleLogoChange}
                            />
                            {errorMessage && <div className="text-danger">{errorMessage}</div>}
                        </div>`


                            <div className="d-flex justify-content-end btn-min-width">
                                <button className="btn btn-primary">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                       )}


                      </div>  
                    </div>
                </div>
           
        </div>
    );
};

export default AddEmployer;