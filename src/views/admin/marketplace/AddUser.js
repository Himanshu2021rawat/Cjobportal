import React, { useEffect, useState, useRef } from "react";
//import DataService from "../../../services/data.service";
//import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
//import { Editor } from '@tinymce/tinymce-react';
//import TagsInput from '../../../common/TagsInput'
import 'react-toastify/dist/ReactToastify.css';
import './User.css'

const styles = {
    input: {
        opacity: '0%', // dont want to see it
        position: 'absolute' // does not mess with other elements 
    }
}
const MAX_COUNT = 5;
const AddUser = () => {
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

    return (
        <div className="container-fluid">
            <ToastContainer></ToastContainer>
            <h4 className="style-user">Add User</h4>

            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'registration' ? 'active' : ''}`}
                    onClick={() => handleTabClick('registration')}
                >
                    Registration
                </button>
                <button
                    className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => handleTabClick('profile')}
                >
                    Profile
                </button>
                <button
                    className={`tab ${activeTab === 'personal' ? 'active' : ''}`}
                    onClick={() => handleTabClick('personal')}
                >
                    Personal Details
                </button>
                <button
                    className={`tab ${activeTab === 'information' ? 'active' : ''}`}
                    onClick={() => handleTabClick('information')}
                >
                    Employment Info
                </button>

                <button
                    className={`tab ${activeTab === 'qualification' ? 'active' : ''}`}
                    onClick={() => handleTabClick('qualification')}
                >
                    Education Qualification
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
                                <label className="form-label">Full Name*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    //value={name}
                                    //onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email ID*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    //value={email}
                                    //onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Phone Number*</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    required
                                    //value={phoneNumber}
                                    //onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="Phone Number"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Password*</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    required
                                    //value={password}
                                    //onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
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

                            <div className="d-flex justify-content-end btn-min-width">
                                <button className="btn btn-primary">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                       )}

                      {activeTab === 'profile' && (
                    <div className="card mb-5">
                        <div className="card-body p-4">
                            <div className="mb-3">
                                <label className="form-label">Contact Name*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    //value={name}
                                    //onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter Contact Name"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Phone Number*</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    required
                                    //value={email}
                                    //onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Phone Number"
                                />
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

                            <div className="mb-3">
                                <label className="form-label">Available to join (day)*</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    required
                                    //value={password}
                                    //onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Number of day to join "
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
                                <label className="form-label"> Current Location*</label>
                                <input
                                    type="location"
                                    className="form-control"
                                    required
                                   // value={confirmPassword}
                                    //onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Enter Current Location"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Annual Salary*</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    required
                                   // value={confirmPassword}
                                    //onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Enter Annual Salary"
                                />
                            </div>

                            <div className="mb-3">
                             <label className="form-label">Education*</label>
                            <select
                                className="form-control"
                                required
                                // value={education}
                                // onChange={(e) => setEducation(e.target.value)}
                                style={{ marginRight: '10px', flex: '1' }}
                            >
                                <option value="">Select Education</option>
                                <option value="Doctorate/PhD">Doctorate/PhD</option>
                                <option value="Masters/Post-Graduation">Masters/Post-Graduation</option>
                                <option value="Graduation/Diploma">Graduation/Diploma</option>
                                <option value="10th">10th</option>
                                <option value="12th">12th</option>
                                {/* Add more options for higher education */}
                            </select>
                        </div>

                        <div className="mb-3">
                                <label className="form-label"> Designation*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                   // value={confirmPassword}
                                    //onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm Password"
                                />
                            </div>

                            
                            <div className="mb-3">
                              <label className="form-label">Career Objective*</label>
                                <textarea
                                    className="form-control"
                                    rows={5} // Specifies the number of rows
                                    cols={5} // Specifies the number of columns
                                    required
                                    // value={designation}
                                    // onChange={(e) => setDesignation(e.target.value)}
                                    placeholder="Write Career Objective about Yourself"
                                ></textarea>
                           </div>


                            <div className="d-flex justify-content-end btn-min-width">
                                <button className="btn btn-primary">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                       )}

                     {activeTab === 'personal' && (
                    <div className="card mb-5">
                        <div className="card-body p-4">
                        <div className="mb-3">
                          <label className="form-label">Gender*</label>
                            <select
                                className="form-select"
                                required
                                // value={gender}
                                // onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Transgender</option>
                            </select>
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Marital status*</label>
                            <select
                                className="form-select"
                                required
                                // value={gender}
                                // onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="">Select Marital status</option>
                                <option value="married">Married</option>
                                <option value="widowed">Widowed</option>
                                <option value="divorced">Divorced</option>
                                <option value="separated">Separated</option>
                                <option value="other">Other</option>
                                
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Date of Birth*</label>
                            <input
                                type="date"
                                className="form-control"
                                required
                                // value={dateOfBirth}
                                // onChange={(e) => setDateOfBirth(e.target.value)}
                            />

                            
                        </div> 

                        
                        <div className="mb-3">
                          <label className="form-label">Gender*</label>
                            <select
                                className="form-select"
                                required
                                // value={gender}
                                // onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="">Select Gender</option>
                                <option value="general">General</option>
                                <option value="scheduledCaste(sc)">Scheduled Caste(SC)</option>
                                <option value="scheduledTribe(ST)">Scheduled Tribe(ST)</option>
                                <option value="obc-creamy">OBC - Creamy</option>
                                <option value="obc-noncreamy">OBC - Non creamy</option>
                                <option value="other">Other</option>
                                

                            </select>
                        </div>


                            <div className="mb-3">
                                <label className="form-label">Designation*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    //value={password}
                                    //onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter Designation "
                                />
                            </div>

                            <div className="mb-3">
                             <label className="form-label">Education*</label>
                            <select
                                className="form-control"
                                required
                                // value={education}
                                // onChange={(e) => setEducation(e.target.value)}
                                style={{ marginRight: '10px', flex: '1' }}
                            >
                                <option value="">Select Education</option>
                                <option value="Doctorate/PhD">Doctorate/PhD</option>
                                <option value="Masters/Post-Graduation">Masters/Post-Graduation</option>
                                <option value="Graduation/Diploma">Graduation/Diploma</option>
                                <option value="10th">10th</option>
                                <option value="12th">12th</option>
                                {/* Add more options for higher education */}
                            </select>
                           </div>


                            <div className="mb-3">
                                <label className="form-label"> Permanent Address*</label>
                                <input
                                    type="location"
                                    className="form-control"
                                    required
                                   // value={confirmPassword}
                                    //onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Enter Permanent Address"
                                />
                            </div>



                        <div className="mb-3">
                                <label className="form-label"> Language*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                   // value={confirmPassword}
                                    //onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="English,Hindi"
                                />
                        </div>

                        

                        <div className="mb-3">
                                <label className="form-label"> Key Skills*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                   // value={confirmPassword}
                                    //onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Key Skills"
                                />
                        </div>



                        <div className="mb-3">
                                <label className="form-label"> Hobbies*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                   // value={confirmPassword}
                                    //onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Hobbies"
                                />
                        </div>
                            


                            <div className="d-flex justify-content-end btn-min-width">
                                <button className="btn btn-primary">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                       )}

                      {activeTab === 'information' && (
                    <div className="card mb-5">
                        <div className="card-body p-4">
                        <div className="mb-3">
                          <label className="form-label">Current Industry*</label>
                            <input
                                type="text"
                                className="form-select"
                                required
                                // value={gender}
                                // onChange={(e) => setGender(e.target.value)}
                                placeholder="Enter your Current Industry"
                            />
                             
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Category*</label>
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
                            <label className="form-label">Preferred Work Location*</label>
                            <input
                                type="text"
                                className="form-control"
                                required
                                // value={dateOfBirth}
                                // onChange={(e) => setDateOfBirth(e.target.value)}
                            />

                            
                        </div> 

                        
                        <div className="mb-3">
                          <label className="form-label">Expected Salary*</label>
                            <input
                                type="number"
                                className="form-select"
                                required
                                // value={gender}
                                // onChange={(e) => setGender(e.target.value)}
                            />

                        </div>
                        <div className="mb-3">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ flex: '1', marginRight: '10px' }}>
                                <label className="form-label">Starting Period*</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    required
                                    // value={startingPeriod}
                                    // onChange={(e) => setStartingPeriod(e.target.value)}
                                />
                                </div>
                                <div style={{ flex: '1' }}>
                                <label className="form-label">Ending Period*</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    required
                                    // value={endingPeriod}
                                    // onChange={(e) => setEndingPeriod(e.target.value)}
                                />
                                </div>
                            </div>
                        </div>


                        <div className="mb-3">
                         <label className="form-label">Desired Job*</label>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ marginRight: '20px' }}>
                                <input
                                    type="checkbox"
                                    id="permanent"
                                    // checked={isPermanent}
                                    // onChange={(e) => setIsPermanent(e.target.checked)}
                                />
                                <label htmlFor="permanent" style={{ marginLeft: '5px' }}>Permanent</label>
                                </div>
                                <div>
                                <input
                                    type="checkbox"
                                    id="contractual"
                                    // checked={isContractual}
                                    // onChange={(e) => setIsContractual(e.target.checked)}
                                />
                                <label htmlFor="contractual" style={{ marginLeft: '5px' }}>Contractual</label>
                                </div>
                            </div>
                       </div>

                       <div className="mb-3">
                            <label className="form-label">Desired Employment Type*</label>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{ marginRight: '20px' }}>
                                    <input
                                        type="checkbox"
                                        id="permanentType"
                                        // checked={isPermanentType}
                                        // onChange={(e) => setIsPermanentType(e.target.checked)}
                                    />
                                    <label htmlFor="permanentType" style={{ marginLeft: '5px' }}>Permanent</label>
                                    </div>
                                    <div style={{ marginRight: '20px' }}>
                                    <input
                                        type="checkbox"
                                        id="hybridType"
                                        // checked={isHybridType}
                                        // onChange={(e) => setIsHybridType(e.target.checked)}
                                    />
                                    <label htmlFor="hybridType" style={{ marginLeft: '5px' }}>Hybrid</label>
                                    </div>
                                    <div>
                                    <input
                                        type="checkbox"
                                        id="fullTimeType"
                                        // checked={isFullTimeType}
                                        // onChange={(e) => setIsFullTimeType(e.target.checked)}
                                    />
                                    <label htmlFor="fullTimeType" style={{ marginLeft: '5px' }}>Full-time</label>
                                    </div>
                                </div>
                        </div>


                        <div className="mb-3">
                            <label className="form-label">Responsibility*</label>
                            <textarea
                              className="form-control"
                              required
                              rows={5}
                              column={5}
                            >

                            </textarea>
                        </div>



                            


                            <div className="d-flex justify-content-end btn-min-width">
                                <button className="btn btn-primary">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                       )}

                       
                      {activeTab === 'qualification' && (
                    <div className="card mb-5">
                        <div className="card-body p-4">

                            
                        <div className="mb-3">
                             <label className="form-label">Education*</label>
                            <select
                                className="form-control"
                                required
                                // value={education}
                                // onChange={(e) => setEducation(e.target.value)}
                                style={{ marginRight: '10px', flex: '1' }}
                            >
                                <option value="">Select Education</option>
                                <option value="Doctorate/PhD">Doctorate/PhD</option>
                                <option value="Masters/Post-Graduation">Masters/Post-Graduation</option>
                                <option value="Graduation/Diploma">Graduation/Diploma</option>
                                <option value="10th">10th</option>
                                <option value="12th">12th</option>
                                {/* Add more options for higher education */}
                            </select>
                        </div>

                        <div className="mb-3">
                          <label className="form-label">University/Institute*</label>
                            <input
                                type="text"
                                className="form-select"
                                required
                                // value={gender}
                                // onChange={(e) => setGender(e.target.value)}
                                placeholder="Type Your University Name........"
                            />
                             
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Course*</label>
                            <select
                                className="form-select"
                                required
                                // value={gender}
                                // onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="">Select a Course</option>
                                <option value="mba/pgdm">MBA/PGDM</option>
                                <option value="mtech">Mtech</option>
                                <option value="mca">MCA</option>
                                <option value="mcom">M.Com</option>
                                <option value="ms/msc">MS/M.Sc(Science)</option>
                                <option value="pgdiploma">PG Diploma</option>
                                
                                
                                
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Specialization*</label>
                            <select
                                type="text"
                                className="form-control"
                                required
                                // value={dateOfBirth}
                                // onChange={(e) => setDateOfBirth(e.target.value)}
                            >
                                <option>Science</option>
                                <option>Arts</option>

                            </select>
                        </div> 

                        
                        <div className="mb-3">
                          <label className="form-label">Result/GPA*</label>
                            <input
                                type="number"
                                className="form-select"
                                required
                                // value={gender}
                                // onChange={(e) => setGender(e.target.value)}
                                placeholder="7.7/10"
                            />

                        </div>
                        <div className="mb-3">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ flex: '1', marginRight: '10px' }}>
                                <label className="form-label">Starting Period*</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    required
                                    // value={startingPeriod}
                                    // onChange={(e) => setStartingPeriod(e.target.value)}
                                />
                                </div>
                                <div style={{ flex: '1' }}>
                                <label className="form-label">Ending Period*</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    required
                                    // value={endingPeriod}
                                    // onChange={(e) => setEndingPeriod(e.target.value)}
                                />
                                </div>
                            </div>
                        </div>


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

export default AddUser;