import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import {Buffer} from 'buffer';

const  ViewEmployers = () => {
        // Decode the base64 string
        //const base64String = job.SortDesc;
        //const decodedString = Buffer.from(base64String, 'base64').toString('utf-8');

    const { EmployerId } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");


    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetch(`https://jobpartal-backend.onrender.com/api/Employer/${EmployerId}`);
                const result = await response.json();
                if (result.Status === "success" && result.Response.length > 0 ) {
                    setJob(result.Response[0]);
                    console.log("dsfdsfsd",job);
                    setLoading(false);
                } else {
                    setMessage("Failed to fetch job data.");
                    setLoading(false);
                }
            } catch (error) {
                setMessage("An error occurred while fetching the job data.");
                setLoading(false);
            }
        };

        fetchJob();
    }, [EmployerId]);


    return (
        <div className="container">
            <ToastContainer />
            <h4 className="f-700 mb-2" style={{"marginTop":"20px"}}>Employer Details</h4>
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
                job && (
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <th>Company Name</th>
                                <td>{job.CompanyName}</td>
                            </tr>
                            <tr>
                                <th>Organization Size</th>
                                <td>{job.OrganizationSize}</td>
                            </tr>
                            <tr>
                                <th>Organization Type</th>
                                <td>{job.OrganizationType}</td>
                            </tr>
                            <tr>
                                <th>Industry</th>
                                <td>{job.Industry}</td>
                            </tr>
                            <tr>
                                <th>ContactPerson</th>
                                <td>{job.ContactPerson}</td>
                            </tr>
                            <tr>
                                <th>Contact Designation</th>
                                <td>{job.ContactDesignation}</td>
                            </tr>
                            <tr>
                                <th>Zip</th>
                                <td>{job.Zip}</td>
                            </tr>
                            <tr>
                                <th>Job Address</th>
                                <td>{job.Address}</td>
                            </tr>
                            <tr>
                                <th>WebsiteLink</th>
                                <td>{job.WebsiteLink}</td>
                            </tr>
                            <tr>
                                <th>LinkedIn</th>
                                <td>{job.LinkedIn}</td>
                            </tr>
                            {/*<tr>
                                <th>SortDesc</th>
                                <td>{job.SortDesc}</td>
                            </tr> */}
                            <tr>
                                <th>Email Address</th>
                                <td>{job.EmailAddress}</td>
                            </tr>
                            <tr>
                                <th>Mobile Number</th>
                                <td>{job.MobileNumber}</td>
                            </tr>
                            <tr>
                                <th>DateCreate</th>
                                <td>{job.DateCreate}</td>
                            </tr>
                            <tr>
                                <th>Email Address 2</th>
                                <td>{job.EmailAddress2}</td>
                            </tr>
                            <tr>
                                <th>Mobile Number 2</th>
                                <td>{job.MobileNumber2}</td>
                            </tr>
                        </tbody>
                    </table>
                )
            )}
            <Link to="/admin/Employers" className="btn btn-primary">Back to Employer List</Link>
        </div>
    );
};

export default ViewEmployers;
