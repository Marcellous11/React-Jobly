import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Context from '../Context';
import '../styles/Job.css';

const Job = ({ jobs }) => {
	const { id } = useParams({});
	const [ job, setJob ] = useState({});
	const navigate = useNavigate();
	const { currUser } = useContext(Context);

	useEffect(
		() => {
			if (!currUser.username && !currUser.token) {
				navigate('/login');
			}
		},
		[ currUser ]
	);

	useEffect(
		() => {
			let j = jobs.find((j) => j.id === +id);
			setJob(j);
		},
		[ jobs ]
	);

	if (job === undefined) {
		return (
			<div>
				<h1>Job is loading</h1>
				<Link to="/jobs">Back to Jobs</Link>
			</div>
		);
	}

	return (
		<div className="Job">
			<h2> Job Title: {job.title}</h2>
			<div className="Job-Content">
				<div className="Job-Content-Company">
					<h3> Company Name : {<Link to={`/companies/${job.companyHandle}`}> {job.companyName}</Link>}</h3>
				</div>
				<div className="Company-Content-Salary">
					<h3>Job Salary: {job.salary}</h3>
				</div>
				<div className="Company-Content-Apply">
					<button>Apply Now</button>
				</div>
			</div>
			<Link className="Job-returnBtns" to="/jobs">
				Back to Jobs
			</Link>
			<br />
			<Link className="Job-returnBtns" to={`/companies/${job.companyHandle}`}>
				Back to Company
			</Link>
		</div>
	);
};

export default Job;
