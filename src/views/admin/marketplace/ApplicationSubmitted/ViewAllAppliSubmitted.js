import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const ViewAllAppliSubmitted = () => {
    const { jobId } = useParams();
    const [jobs, setJobs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");



    useEffect(() => {
        const postData = async () => {
          const data = {
            Name: "c2VsZWN0IFVzZXJOYW1lLEVtYWlsQWRkcmVzcyxNb2JpbGVOdW1iZXIsQ3VycmVudExvY2F0aW9uLEF2YWlsYWJpbGl0eVRvSm9pbiwKbXUuRGF0ZUNyZWF0ZWQsQ2FyZWVyT2JqZWN0aXZlLERlc2lnbmF0aW9uLENhdGVnb3J5LERPQiBmcm9tIFVzZXJBcHBsaWVkSm9iIHUKbGVmdCBvdXRlciBqb2luIFVzZXJNYXN0ZXIgbXUgb24gbXUuSWQ9dS5Vc2VySWQKd2hlcmUgdS5Kb2JJZD0=",
            jobId
          };
    
          try {
            const response = await axios.post(`https://jobpartal-backend.onrender.com/api/Application/Submitted/View/${jobId}`, data);
            
            const education = response.data.Response;
            setJobs(education);
          } catch (err) {
            //setError(err);
          } finally {
            setLoading(false);
          }
        };
    
        postData();
      }, [jobId]);

    return (
        <div className="container">
            <ToastContainer />
            <h4 className="f-700 mb-2" style={{"marginTop":"20px"}}>Candidate Details</h4>
            {message && (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                </div>
            )}
            {loading ? (
                <div className="col-lg-6 m-auto">
                    <span className="spinner-border spinner-border-sm"></span>
                </div>
            ) : (
            //   job && (
            //         <table className="table table-bordered">
            //             <tbody>
            //                 <tr>
            //                     <th>User Name</th>
            //                     <td>{job[].UserName}</td>
            //                 </tr>
            //                 <tr>
            //                     <th>Category</th>
            //                     <td>{job.JobCategory}</td>
            //                 </tr>
            //                 <tr>
            //                     <th>Vacancies</th>
            //                     <td>{job.Vacancies}</td>
            //                 </tr>
            //                 <tr>
            //                     <th>Salary Range</th>
            //                     <td>{job.SalaryMin} to {job.SalaryMax}</td>
            //                 </tr>
            //                 <tr>
            //                     <th>Experience</th>
            //                     <td>{job.ExperienceYear} years {job.ExperienceMonth} months</td>
            //                 </tr>
            //                 <tr>
            //                     <th>Deadline</th>
            //                     <td>{new Date(job.Deadline).toLocaleDateString()}</td>
            //                 </tr>
            //                 <tr>
            //                     <th>Date Created</th>
            //                     <td>{new Date(job.DateCreated).toLocaleDateString()}</td>
            //                 </tr>
            //                 <tr>
            //                     <th>Job Type</th>
            //                     <td>{job.JobType}</td>
            //                 </tr>
            //                 <tr>
            //                     <th>Education</th>
            //                     <td>{job.Eduction}</td>
            //                 </tr>
            //                 <tr>
            //                     <th>Tags</th>
            //                     <td>{job.Tag}</td>
            //                 </tr>
            //                 <tr>
            //                     <th>Description</th>
            //                     <td>{job.Description}</td>
            //                 </tr>
            //                 <tr>
            //                     <th>Responsibilities</th>
            //                     <td>{job.Responsibility}</td>
            //                 </tr>
            //             </tbody>
            //         </table>
            //     )
            <div>
                                    {jobs.map((job, index) => (
                        <div key={index} className="mt-4">
                            <h5 className="mb-3">Candidate {index + 1}</h5>
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <th>User Name</th>
                                        <td>{job.UserName}</td>
                                    </tr>
                                    <tr>
                                        <th>Email Address</th>
                                        <td>{job.EmailAddress}</td>
                                    </tr>
                                    <tr>
                                        <th>Mobile Number</th>
                                        <td>{job.MobileNumber}</td>
                                    </tr>
                                    <tr>
                                        <th>Current Location</th>
                                        <td>{job.CurrentLocation}</td>
                                    </tr>
                                    <tr>
                                        <th>Applied Date & Time</th>
                                        <td>{job.DateCreated}</td>
                                    </tr>
                                    <tr>
                                        <th>Career Objective</th>
                                        <td>{job.CareerObjective}</td>
                                    </tr>
                                    <tr>
                                        <th>Designation</th>
                                        <td>{job.Designation}</td>
                                    </tr>
                                    <tr>
                                        <th>Date Of Birth</th>
                                        <td>{job.DOB}</td>
                                    </tr>
                                    <tr>
                                        <th>Category</th>
                                        <td>{job.Category}</td>
                                    </tr>
                                    
                                    {/* Add more rows as needed */}
                                </tbody>
                            </table>
                        </div>
                    ))}
            </div>
            )}
            <Link to="/admin/Application-Submitted" className="btn btn-primary">Back to Application Submitted List</Link>
        </div>
    );
};

export default ViewAllAppliSubmitted;
