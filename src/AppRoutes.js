import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import JoblyApi from './api.js';
import Login from './routes/Login';
import Companies from './routes/Companies';
import Profile from './routes/Profile';
import Company from './routes/Company';
import Jobs from './routes/Jobs';
import Job from './routes/Job';
import Signup from './routes/Signup';
import Home from './routes/Home';
import Sorry from './routes/Sorry.js';
import EditProfile from './routes/EditProfile.js';
import ChangePassword from './routes/ChangePassword.js';

const AppRoutes = () => {
	const [ companies, setCopanies ] = useState([]);
	const [ jobs, setJobs ] = useState([]);

	useEffect(() => {
		let getCompnaies = async () => {
			let res = await JoblyApi.getAllCompanies();
			setCopanies(res);
		};
		let getJobs = async () => {
			let res = await JoblyApi.getAllJobs();
			setJobs(res);
		};
		getJobs();
		getCompnaies();
	}, []);

	return (
		<Routes>
			<Route exact path="/" element={<Home />} />
			<Route exact path="/companies" element={<Companies companies={companies} />} />
			<Route exact path="/companies/:handle" element={<Company companies={companies} jobs={jobs} />} />
			<Route exact path="/jobs" element={<Jobs jobs={jobs} />} />
			<Route exact path="/jobs/:id" element={<Job jobs={jobs} />} />
			<Route exact path="/profile" element={<Profile />} />
			<Route exact path="/profile/:username/edit" element={<EditProfile />} />
			<Route exact path="/profile/:username/edit/changepassword" element={<ChangePassword />} />
			<Route exact path="/signup" element={<Signup />} />
			<Route exact path="/login" element={<Login />} />
			<Route path="/*" element={<Sorry />} />
		</Routes>
	);
};
export default AppRoutes;
