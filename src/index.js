import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import RtlLayout from 'layouts/rtl';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';

import ViewDetail from "views/admin/marketplace/JobPortal/ViewDetail"
import ViewEmployers from "views/admin/marketplace/Employers/ViewEmployers";
import UserViews from "views/admin/marketplace/UserViews";
import AddJobCategory from "views/admin/marketplace/Master Category/AddJobCategory"
import AddEducation from 'views/admin/marketplace/Master Category/AddEducation';
import AddCourse from 'views/admin/marketplace/Master Category/AddCourse';
import AddJobType from 'views/admin/marketplace/Master Category/AddJobType';
import EditJobCategory from 'views/admin/marketplace/Master Category/EditJobCategory';
import EditEducation from 'views/admin/marketplace/Master Category/EditEducation';
import EditCourse from 'views/admin/marketplace/Master Category/EditCourse';
import EditJobType from 'views/admin/marketplace/Master Category/EditJobType';
import JobCategory from 'views/admin/marketplace/Master Category/JobCategory';
import ViewAllAppliSubmitted from 'views/admin/marketplace/ApplicationSubmitted/ViewAllAppliSubmitted';

ReactDOM.render(
	<ChakraProvider theme={theme}>
		<React.StrictMode>
			<ThemeEditorProvider>
				<HashRouter>
					<Switch	>
						<Route path={`/auth`} component={AuthLayout} />

						<Route path={`/admin/Job-Categorys`} component={JobCategory} />

						<Route path={`/admin/ViewJob/:jobId`} component={ViewDetail} />
						<Route path={`/admin/View-Application-Submitted/:jobId`} component={ViewAllAppliSubmitted}/>
						<Route path={`/admin/User/:UserId`} component={UserViews} />
						<Route path={`/admin/Employer/:EmployerId`} component={ViewEmployers} />
                        <Route path={`/admin/AddJobCategory`} component={AddJobCategory}/>
                        <Route path={`/admin/AddEducation`} component={AddEducation}/>
                        <Route path={`/admin/AddCourse`} component={AddCourse}/>
                        <Route path={`/admin/AddJobType`} component={AddJobType}/>
                        <Route path={`/admin/EditJobCategory/:Id`} component={EditJobCategory}/>
                        <Route path={`/admin/EditEducation/:Id`} component={EditEducation}/>
                        <Route path={`/admin/EditCourse/:Id`} component={EditCourse}/>
                        <Route path={`/admin/EditJobType/:Id`} component={EditJobType}/>
                        

						<Route path={`/admin`} component={AdminLayout} />
						<Route path={`/rtl`} component={RtlLayout} />
						<Redirect from='/' to='/admin' />
						{/* <Route path="/" element={<Navigate to="/admin" />} /> */}
					</Switch>
				</HashRouter>
			</ThemeEditorProvider>
		</React.StrictMode>
	</ChakraProvider>,
	document.getElementById('root')
);
