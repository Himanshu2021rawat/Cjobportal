import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const JobDetails = () => {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetch(`https://jobpartal-backend.onrender.com/api/job/${jobId}`);
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
    }, [jobId]);

    return (
        <div className="container">
            <ToastContainer />
            <h4 className="f-700 mb-2" style={{"marginTop":"20px"}}>Job Details</h4>
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
                                <th>Title</th>
                                <td>{job.JobTitle}</td>
                            </tr>
                            <tr>
                                <th>Category</th>
                                <td>{job.JobCategory}</td>
                            </tr>
                            <tr>
                                <th>Vacancies</th>
                                <td>{job.Vacancies}</td>
                            </tr>
                            <tr>
                                <th>Salary Range</th>
                                <td>{job.SalaryMin} to {job.SalaryMax}</td>
                            </tr>
                            <tr>
                                <th>Experience</th>
                                <td>{job.ExperienceYear} years {job.ExperienceMonth} months</td>
                            </tr>
                            <tr>
                                <th>Deadline</th>
                                <td>{new Date(job.Deadline).toLocaleDateString()}</td>
                            </tr>
                            <tr>
                                <th>Date Created</th>
                                <td>{new Date(job.DateCreated).toLocaleDateString()}</td>
                            </tr>
                            <tr>
                                <th>Job Type</th>
                                <td>{job.JobType}</td>
                            </tr>
                            <tr>
                                <th>Education</th>
                                <td>{job.Eduction}</td>
                            </tr>
                            <tr>
                                <th>Tags</th>
                                <td>{job.Tag}</td>
                            </tr>
                            <tr>
                                <th>Description</th>
                                <td>{job.Description}</td>
                            </tr>
                            <tr>
                                <th>Responsibilities</th>
                                <td>{job.Responsibility}</td>
                            </tr>
                        </tbody>
                    </table>
                )
            )}
            <Link to="/admin/Jobs" className="btn btn-primary">Back to Jobs List</Link>
        </div>
    );
};

export default JobDetails;
