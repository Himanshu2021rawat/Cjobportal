import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import {Buffer} from 'buffer';

const  UserViews = () => {
        // Decode the base64 string
        //const base64String = job.SortDesc;
        //const decodedString = Buffer.from(base64String, 'base64').toString('utf-8');

    const { UserId } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");


    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetch(`https://jobpartal-backend.onrender.com/api/UserId/${UserId}`);
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
    }, [UserId]);


    return (
        <div className="container">
            <ToastContainer />
            <h4 className="f-700 mb-2" style={{"marginTop":"20px"}}>User Details</h4>
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
                                <th>User Name</th>
                                <td>{job.UserName}</td>
                            </tr>

                            <tr>
                                <th>Availability To Join</th>
                                <td>{job.AvailabilityToJoin}</td>
                            </tr>
                            <tr>
                                <th>Career Objective</th>
                                <td>{job.CareerObjective}</td>
                            </tr>
                            <tr>
                                <th>Category</th>
                                <td>{job.Category}</td>
                            </tr>
                            <tr>
                                <th>Current Location</th>
                                <td>{job.CurrentLocation}</td>
                            </tr>
                            <tr>
                                <th>Date Of Birth</th>
                                <td>{job.DOB}</td>
                            </tr>
                            <tr>
                                <th>Date Created</th>
                                <td>{job.DateCreated}</td>
                            </tr>
                            <tr>
                                <th>Designation</th>
                                <td>{job.Designation}</td>
                            </tr>
                            <tr>
                                <th>Email Address</th>
                                <td>{job.EmailAddress}</td>
                            </tr>
                            <tr>
                                <th>Gender</th>
                                <td>{job.Gender}</td>
                            </tr>
                            <tr>
                                <th>Hobbies</th>
                                <td>{job.Hobbies}</td>
                            </tr>
                            {/*<tr>
                                <th>SortDesc</th>
                                <td>{job.SortDesc}</td>
                            </tr> */}
                            <tr>
                                <th>Marital Status</th>
                                <td>{job.MaritalStatus}</td>
                            </tr>
                            <tr>
                                <th>Mobile Number</th>
                                <td>{job.MobileNumber}</td>
                            </tr>
                            <tr>
                                <th>Skill</th>
                                <td>{job.Skill}</td>
                            </tr>
                            <tr>
                                <th>Total Annual Salary</th>
                                <td>{job.TotalAnnualSalary}</td>
                            </tr>
                            <tr>
                                <th>Total Experience Year</th>
                                <td>{job.TotalExprenceYear}</td>
                            </tr>
                            <tr>
                                <th>Total Experience Month</th>
                                <td>{job.TotalExprenceMonth}</td>
                            </tr>
                        </tbody>
                    </table>
                )
            )}
            <Link to="/admin/Users" className="btn btn-primary">Back to User List</Link>
        </div>
    );
};

export default UserViews;
