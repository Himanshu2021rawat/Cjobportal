/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components

import { Link } from 'react-router-dom';
import axios from 'axios';
import React,{useState,useEffect} from "react";

import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import { FaUserCheck, FaUserTie,FaAddressCard,FaAddressBook } from "react-icons/fa";
import { GiRugbyConversion } from "react-icons/gi";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";

import PieChartsTable from "views/admin/default/components/PieChartsTable"
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import { CgKey } from "react-icons/cg";

export default function UserReports() {

  const [userCount, setUserCount] = useState(0);
  const [employerCount,setEmployerCount] = useState(0);
  const [jobCount,setJobCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobApplied,setJobApplied] = useState(null);

  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const user = await axios.get('https://jobpartal-backend.onrender.com/api/User'); // Replace with your API endpoint
        
        const users = user.data.Response;

        setUserCount(users.length);

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get('https://jobpartal-backend.onrender.com/api/joblist'); // Replace with your API endpoint
        const jobs = response.data;
        setJobCount(jobs.length
          
        );
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchJob();
  }, []);

  console.log("sdsdfdsddsdsd",jobCount);

  useEffect(() => {
    const fetchEmployer = async () => {
      try{
        const response = await axios.get('https://jobpartal-backend.onrender.com/api/Employers');
        const NoEmployer = response.data.Response;
        setEmployerCount(NoEmployer.length);
        setLoading(false);
      }catch(err)
      {
        setError(err);
        setLoading(false);
      }
    }

    fetchEmployer();

  },[])

  console.log("No. of employer: ",employerCount);

  useEffect(() => {
    const postData = async() => {
      const data = {
         Name:"c2VsZWN0ICB0LnRvdGFsQXBwbHllZCB0b3RhbEFwcGxpZWQsZWouSWQgSm9iSWQsSm9iVGl0bGUsYy5OYW1lIEpvYkNhdGVnb3J5LFZhY2FuY2llcyxTYWxhcnlNaW4sU2FsYXJ5TWF4LApFeHBlcmllbmNlWWVhcixFeHBlcmllbmNlTW9udGgsRGVhZGxpbmUsRGF0ZUNyZWF0ZWQsZW0uQ29tcGFueU5hbWUsVGFnLGVqLkFjdGl2ZSwKbWouTmFtZSBKb2JUeXBlLEVkdWN0aW9uLGNhc3QoaXNudWxsKElzRmVhdHVyZWRKb2IsMCkgYXMgYml0KSBJc0ZlYXR1cmVkSm9iIGZyb20gKApzZWxlY3QgY291bnQoKikgdG90YWxBcHBseWVkLEpvYklkIGZyb20gVXNlckFwcGxpZWRKb2IKZ3JvdXAgYnkgSm9iSWQgKSB0CmpvaW4gRW1wbG95ZXJKT0JQb3N0IGVqIG9uIGVqLklkID0gdC5Kb2JJZApsZWZ0IG91dGVyIGpvaW4gTWFzdGVySm9iQ2F0ZWdvcnkgYyBvbiBjLklkPSBlai5Kb2JDYXRlZ29yeSAKbGVmdCBvdXRlciBqb2luIEVtcGxveWVyTWFzdGVyIGVtIG9uIGVtLklkPSBlai5Ga0VtcGxveWVySWQKbGVmdCBvdXRlciBqb2luIE1hc3RlckpvYlR5cGUgbWogb24gbWouSWQ9ZWouSm9iVHlwZQ=="
      };
      try{
        const response = await axios.post('https://jobpartal-backend.onrender.com/api/Application/Submitted');
        //const JobApplied = response.data.Response;
           
        // Calculate total applied applications
          const JobApplied = response.data.Response.reduce((total, job) => {
            return total + parseInt(job.totalApplied);
          }, 0);
        
        setJobApplied(JobApplied);
      }catch(err){
        setError(err);
      }finally{
        setLoading(false);
      }
    }
    postData();
  },[])

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error fetching data</div>;
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>

      <Link to="/admin/Users">    
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={FaUserCheck} color={brandColor} />
              }
            />
          }
          name='Number Of Job Seekers'
          value={userCount}
        />
      </Link>


       <Link to="/admin/Employers">
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={FaUserTie} color={brandColor} />
              }
            />
          }
          name='Number Of Employees'
          value={employerCount}
        />
       </Link>  
        {/* <MiniStatistics growth='+23%' name='Sales' value='$574.34' />
        <MiniStatistics
          endContent={
            <Flex me='-16px' mt='10px'>
              <FormLabel htmlFor='balance'>
                <Avatar src={Usa} />
              </FormLabel>
              <Select
                id='balance'
                variant='mini'
                mt='5px'
                me='0px'
                defaultValue='usd'>
                <option value='usd'>USD</option>
                <option value='eur'>EUR</option>
                <option value='gba'>GBA</option>
              </Select>
            </Flex>
          }
          name='Your balance'
          value='$1,000'                     
        /> */}
        {/* <MiniStatistics                 
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
              icon={<Icon w='28px' h='28px' as={MdAddTask} color='white' />}
            />
          }
          name='New Tasks'
          value='154'
        /> */}

        <Link to="/admin/Jobs">
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdFileCopy} color={brandColor} />
              }
            />
          }
          name='Total Job'
          value={jobCount}
        />
        </Link>

        {/* <Link to="/admin/Jobs">
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={FaAddressCard} color={brandColor} />
              }
            />
          }
          name='Login Frequency'
          value='0'
        />
        </Link> */}

        <Link to="/admin/Application-Submitted">
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={FaAddressBook} color={brandColor} />
              }
            />
          }
          name='Application Submitted'
          value={jobApplied}
        />
        </Link>

        {/* <Link to="/admin/Jobs">
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={GiRugbyConversion} color={brandColor} />
              }
            />
          }
          name='Conversion Rates'
          value='0'
        />
        </Link> */}

      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        {/* <TotalSpent /> */}
        {/* <WeeklyRevenue /> */}
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        {/* <DailyTraffic /> */}
        {/* <PieChartsTable/> */}
      </SimpleGrid>
{/* 
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px'>
          <DailyTraffic />
          <PieCard />
        </SimpleGrid>
      </SimpleGrid> */}
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2}} gap='20px' mb='20px'>
         {/* <PieCard/>
         <PieChartsTable/> */}
        {/* <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        /> */}
        {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <Tasks />
          <MiniCalendar h='100%' minW='100%' selectRange={false} />
        </SimpleGrid> */}
      </SimpleGrid>
    </Box>
  );
}
