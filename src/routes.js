import React from "react";

import { Icon, layout } from "@chakra-ui/react";
import {
  MdSubject,
  MdManageAccounts,
  MdOutlineCastForEducation
} from "react-icons/md";

import { AiFillDashboard } from "react-icons/ai";
import { GrDashboard } from "react-icons/gr";
import { FcManager, FcCustomerSupport, } from "react-icons/fc";
import { GiKnightBanner, GiToken , GiTeacher, } from "react-icons/gi";
import { FaSignOutAlt } from "react-icons/fa";
import { RiExchangeBoxFill } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";
import { LuPackage } from "react-icons/lu";
import { HiUserGroup } from "react-icons/hi";
import { BiSolidCategoryAlt } from "react-icons/bi";

// Admin Imports
import MainDashboard from "views/admin/default";
//import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";
import User from "views/admin/marketplace/user"
import AddUser from "views/admin/marketplace/AddUser";
import Employer from "views/admin/marketplace/Employers/Employers"
import AddEmployer from "views/admin/marketplace/Employers/AddEmployer";
import Jobs from "views/admin/marketplace/JobPortal/Jobs";
import AddJob from "views/admin/marketplace/JobPortal/AddJob";
import ViewDetail from "views/admin/marketplace/JobPortal/ViewDetail"


import { FaUserCheck , FaUsers} from "react-icons/fa";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { HiUserAdd } from "react-icons/hi";
import { TbCategory, TbCategory2, TbCategoryFilled } from "react-icons/tb";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import AppliSubmitted from "views/admin/marketplace/ApplicationSubmitted/appliSubmited";
import JobCategory from "views/admin/marketplace/Master Category/JobCategory";
import Education from "views/admin/marketplace/Master Category/Education";
import Course from "views/admin/marketplace/Master Category/Course";
import JobType from "views/admin/marketplace/Master Category/JobType";
// import ViewEmployers from "views/admin/marketplace/Employers/ViewEmployers";
// import UserViews from "views/admin/marketplace/UserViews";




  const routes = [
    {
      name: " Dashboard",
      layout: "/admin",
      path: "/default",
      icon: <Icon as={AiFillDashboard} width='20px' height='20px' color='inherit' />,
      component: MainDashboard,
    },
    {
      name: "User",
      layout: "/admin",
      path: "/Users",
      icon: (
        <Icon
          as={FaUsers}
          width='20px'
          height='20px'
          color='inherit'
        />
      ),
      component: User,
      secondary: true,
    },
    // {
    //   name: "Add User",
    //   layout: "/admin",
    //   path: "/AddUser",
    //   icon: <Icon as={AiOutlineUsergroupAdd} width='20px' height='20px' color='inherit' />,
    //   component: AddUser,
    // },
    {
      name: "Employer",
      layout: "/admin",
      icon: <Icon as={FaUserCheck} width='20px' height='20px' color='inherit' />,
      path: "/Employers",
      component: Employer,
    },
    // {
    //   name: "Add Employer",
    //   layout: "/admin",
    //   path: "/AddEmployer",
    //   icon: <Icon as={HiUserAdd} width='20px' height='20px' color='inherit' />,
    //   component: AddEmployer,
    // },
    {
      name: "Jobs",
      layout: "/admin",
      path: "/Jobs",
      icon: <Icon as={HiUserAdd} width='20px' height='20px' color='inherit' />,
      component: Jobs,
    },
    {
      name: "Appli. Submitted",
      layout: "/admin",
      path: "/Application-Submitted",
      icon: <Icon as={HiUserAdd} width='20px' height='20px' color='inherit' />,
      component: AppliSubmitted,
    },

    {
      name: "Master Job Category",
      layout: "/admin",
      path: "/Job-Category",
      icon: <Icon as={TbCategory} width='20px' height='20px' color='inherit' />,
      component: JobCategory,
    },

    {
      name: "Master Education",
      layout: "/admin",
      path: "/Education",
      icon: <Icon as={MdOutlineCastForEducation} width='20px' height='20px' color='inherit' />,
      component: Education,
    },

    {
      name: "Master Course",
      layout: "/admin",
      path: "/Course",
      icon: <Icon as={TbCategory2} width='20px' height='20px' color='inherit' />,
      component: Course,
    },

    {
      name: "Master Job Type",
      layout: "/admin",
      path: "/JobType",
      icon: <Icon as={TbCategoryFilled} width='20px' height='20px' color='inherit' />,
      component: JobType,
    },

    // {
    //   name: "Add Job",
    //   layout: "/admin",
    //   path: "/AddJob",
    //   icon: <Icon as={HiUserAdd} width='20px' height='20px' color='inherit' />,
    //   component: AddJob,
    // },
    // {
    //   layout:"/admin",
    //   path:"/ViewJob/:jobId",
    //   component:ViewDetail,
    //   VisibilityAction:false,
    // },
    // {
    //   layout:"/admin",
    //   path:"/User/:UserId",
    //   component:UserViews,
    // },

    // {
    //   layout:"/admin",
    //   path:"/Employer/:EmployerId",
    //   component:ViewEmployers,
    // },
   

  ];

export default routes;
