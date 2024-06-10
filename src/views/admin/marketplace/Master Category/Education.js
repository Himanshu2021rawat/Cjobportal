import React, { useEffect, useState, Fragment } from "react";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
//import './Employers.css'
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';

let page_no = 1;
let limit = 15;
let search = "";
let status = "";

const Education = () => {
    const [data, setData] = useState([]);
    const [filteredData, setfilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const[error,setError] = useState(null);
    const [message, setMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);


    const storedUserId = JSON.parse(localStorage.getItem("userId"));

    // useEffect(() => {
    //     const fetchJobs = async () => {
    //       try {
    //         const response = await axios.get('https://jobpartal-backend.onrender.com//api/Category/Jobs');
    //         setfilteredData(response.data.Response);
    //       } catch (err) {
    //         //setError(err);
    //       } finally {
    //         setLoading(false);
    //       }
    //     };
    
    //     fetchJobs();
    //   }, []);


      useEffect(() => {
        const postData = async() => {
          const data = {
             Name:"c2VsZWN0IElkLE5hbWUsU29ydE9yZGVyIGZyb20gTWFzdGVyRWR1Y2F0aW9u"
          };
          try{
            const response = await axios.post('https://jobpartal-backend.onrender.com/api/Qualification');
            //const JobApplied = response.data.Response;
               
            // Calculate total applied applications
              const JobApplied = response.data.Response;
            
              setfilteredData(JobApplied);
          }catch(err){
            setError(err);
          }finally{
            setLoading(false);
          }
        }
        postData();
      },[])

      console.log("sdcsdxsd",filteredData);

 


    // const onChangeSearch = (e) => {
    //     // getData();
    //     if (e.target.value) {
    //         const result = data.filter(value => {
    //             return value?.lessonName ? value.lessonName.toLowerCase().includes(e.target.value.toLowerCase()) : ''
    //         })
    //         setfilteredData(result)
    //     } else {
    //         setfilteredData(data)
    //     }

    // }

    const deleteEducation = async (Id, name) => {
        setLoading(true);
        setError(null);
      
        try {
          const requestBody = {
            Name: "ZGVsZXRlIGZyb20gTWFzdGVyRWR1Y2F0aW9uIHdoZXJlICBTeXN0ZW1FbnRyeTw+MSBhbmQgSWQ9",
            Id: Id
          };
      
          const response = await axios.post(`https://jobpartal-backend.onrender.com/api/Qualification/delete/${Id}`, {
            headers: {
              'Content-Type': 'application/json',
              'TransactionKey': 'Es9JpGJyajaamahe5ZMoaumQG6lpEUylIhUR5ykAcA'
            },
            data: requestBody // Include data in the request body
          });
      
          console.log('Response:', response.data);
          toast.success('Job category deleted successfully!');
          //window.location.reload();
          //setfilteredData(filteredData.filter(job => job.Id !== jobId));
        } catch (error) {
          console.error('Error:', error);
          setError('Failed to delete job category. Please try again.');
        } finally {
          setLoading(false);
        }
      };

    return (
        <div className="row">
            <ToastContainer></ToastContainer>
            <div className="col-md-12">
                <h4 className="f-700 mb-4">All Qualification</h4>
                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}
                <div className="table-header d-flex align-items-center">
                    <div className="table-search">
                    </div>

                    <form class="d-flex align-items-center ms-auto">
                      <Link to={"/admin/AddEducation"} className="btn btn-primary">Add Education</Link>
                       
                    </form>
                </div>
                <div className="col-lg-6 m-auto">
                    {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                    )}
                </div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Education</th>
                            <th scope="col" className="text-end">Action</th>


                        </tr>
                    </thead>
                    <tbody>
                          
                    {filteredData?.map(job => (
                            <tr key={job.Id}>
                                <td>{job.Name}</td>
                                <td width="150"><span className="d-flex justify-content-end">
                                    {/* <Link to={"/edit-ticket/" + job._id} className="mx-2"><svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.6951 6.47656C16.6951 6.47656 13.6951 0.976562 8.69507 0.976562C3.69507 0.976562 0.695068 6.47656 0.695068 6.47656C0.695068 6.47656 3.69507 11.9766 8.69507 11.9766C13.6951 11.9766 16.6951 6.47656 16.6951 6.47656ZM1.86777 6.47656C1.92469 6.38977 1.98961 6.29333 2.06234 6.18898C2.39723 5.70849 2.89138 5.06947 3.52718 4.43367C4.8161 3.14474 6.57569 1.97656 8.69507 1.97656C10.8145 1.97656 12.574 3.14474 13.863 4.43367C14.4988 5.06947 14.9929 5.70849 15.3278 6.18898C15.4005 6.29333 15.4654 6.38977 15.5224 6.47656C15.4654 6.56335 15.4005 6.65979 15.3278 6.76414C14.9929 7.24463 14.4988 7.88366 13.863 8.51946C12.574 9.80838 10.8145 10.9766 8.69507 10.9766C6.57569 10.9766 4.8161 9.80838 3.52718 8.51946C2.89138 7.88366 2.39723 7.24463 2.06234 6.76414C1.98961 6.65979 1.92469 6.56335 1.86777 6.47656Z" fill="#228B22" />
                                        <path d="M8.69507 3.97656C7.31436 3.97656 6.19507 5.09585 6.19507 6.47656C6.19507 7.85727 7.31436 8.97656 8.69507 8.97656C10.0758 8.97656 11.1951 7.85727 11.1951 6.47656C11.1951 5.09585 10.0758 3.97656 8.69507 3.97656ZM5.19507 6.47656C5.19507 4.54357 6.76207 2.97656 8.69507 2.97656C10.6281 2.97656 12.1951 4.54357 12.1951 6.47656C12.1951 8.40956 10.6281 9.97656 8.69507 9.97656C6.76207 9.97656 5.19507 8.40956 5.19507 6.47656Z" fill="#228B22" />
                                    </svg>
                                    </Link> */}




                                        <Link to={"/admin/EditEducation/" + job.Id} className="mx-2"><svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.8415 0.623009C13.0368 0.427747 13.3534 0.427747 13.5486 0.623009L16.5486 3.62301C16.7439 3.81827 16.7439 4.13485 16.5486 4.33012L6.54864 14.3301C6.50076 14.378 6.44365 14.4157 6.38078 14.4408L1.38078 16.4408C1.19507 16.5151 0.982961 16.4715 0.84153 16.3301C0.700098 16.1887 0.656561 15.9766 0.730845 15.7909L2.73084 10.7909C2.75599 10.728 2.79365 10.6709 2.84153 10.623L12.8415 0.623009ZM11.9022 2.97656L14.1951 5.26946L15.488 3.97656L13.1951 1.68367L11.9022 2.97656ZM13.488 5.97656L11.1951 3.68367L4.69508 10.1837V10.4766H5.19508C5.47123 10.4766 5.69508 10.7004 5.69508 10.9766V11.4766H6.19508C6.47123 11.4766 6.69508 11.7004 6.69508 11.9766V12.4766H6.98798L13.488 5.97656ZM3.72673 11.152L3.62121 11.2575L2.09261 15.079L5.9141 13.5504L6.01963 13.4449C5.83003 13.3739 5.69508 13.191 5.69508 12.9766V12.4766H5.19508C4.91894 12.4766 4.69508 12.2527 4.69508 11.9766V11.4766H4.19508C3.98068 11.4766 3.79779 11.3416 3.72673 11.152Z" fill="#2166a5" />
                                            
                                        </svg>
                                        </Link>

     <button
        type="button"
        className="mx-2"
        onClick={() => deleteEducation(job.Id,job.Name)}
        data-bs-toggle="modal"
        data-bs-target={`#staticBackdrop_${job.Id}`}
      >
                    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.19312 5.979C4.46926 5.979 4.69312 6.20286 4.69312 6.479V12.479C4.69311 12.7551 4.46926 12.979 4.19312 12.979C3.91697 12.979 3.69312 12.7551 3.69312 12.479V6.479C3.69312 6.20286 3.91697 5.979 4.19312 5.979Z" fill="#C30E0E" />
                        <path d="M6.69312 5.979C6.96926 5.979 7.19312 6.20286 7.19312 6.479V12.479C7.19312 12.7551 6.96926 12.979 6.69312 12.979C6.41697 12.979 6.19312 12.7551 6.19312 12.479V6.479C6.19312 6.20286 6.41697 5.979 6.69312 5.979Z" fill="#C30E0E" />
                        <path d="M9.69312 6.479C9.69312 6.20286 9.46926 5.979 9.19312 5.979C8.91697 5.979 8.69312 6.20286 8.69312 6.479V12.479C8.69312 12.7551 8.91697 12.979 9.19312 12.979C9.46926 12.979 9.69312 12.7551 9.69312 12.479V6.479Z" fill="#C30E0E" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1931 3.479C13.1931 4.03129 12.7454 4.479 12.1931 4.479H11.6931V13.479C11.6931 14.5836 10.7977 15.479 9.69312 15.479H3.69312C2.58855 15.479 1.69312 14.5836 1.69312 13.479V4.479H1.19312C0.640831 4.479 0.193115 4.03129 0.193115 3.479V2.479C0.193115 1.92672 0.640831 1.479 1.19312 1.479H4.69312C4.69312 0.926719 5.14083 0.479004 5.69312 0.479004H7.69312C8.2454 0.479004 8.69312 0.926719 8.69312 1.479H12.1931C12.7454 1.479 13.1931 1.92672 13.1931 2.479V3.479ZM2.81115 4.479L2.69312 4.53802V13.479C2.69312 14.0313 3.14083 14.479 3.69312 14.479H9.69312C10.2454 14.479 10.6931 14.0313 10.6931 13.479V4.53802L10.5751 4.479H2.81115ZM1.19312 3.479V2.479H12.1931V3.479H1.19312Z" fill="#C30E0E" />
                    </svg>
      </button>

                                    </span></td>
                            </tr>
                        ))}
                            
      
                    </tbody>
                </table>
            
            </div>


        </div>
    );
};

export default Education;