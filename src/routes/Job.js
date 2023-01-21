import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Context from '../Context';
import '../styles/Job.css';
import commas from '../helper/commas';
import JoblyApi from '../api';

const Job = ({ jobs }) => {
	const { id } = useParams({});
	const [ job, setJob ] = useState({});
	const navigate = useNavigate();
	const { currUser } = useContext(Context);
	const [ userData, setUserData ] = useState();
	const [ applied, setApplied ] = useState(false);

	useEffect(
		() => {
			if (!currUser.username) {
				navigate('/login');
			}
			let j = jobs.find((j) => j.id === +id);

			const data = async () => {
				let info = await JoblyApi.getUserInfo(currUser.username, currUser.token);
				setUserData(info.user);
			};

			data();
			setJob(j);
		},
		[ currUser, jobs ]
	);

	if (job !== undefined && userData) {
		const apply = async () => {
			try {
				const res = await JoblyApi.applyToJob(currUser.username, job.id, currUser.token);
				setApplied(true);
			} catch (e) {
				console.debug(e);
			}
		};

		return (
			<div className="Job">
				<h2>
					Job Title: <b>{job.title}</b>
				</h2>
				<div className="Job-Content">
					<div className="Job-Content-Company">
						<h3>Company Name : {<Link to={`/companies/${job.companyHandle}`}> {job.companyName}</Link>}</h3>
					</div>
					<div className="Company-Content-Salary">
						<h3>
							Annual Salary: <b>${commas(+job.salary)}</b>
						</h3>
					</div>
					<div className="Company-Content-Apply">
						{userData.applications.includes(+id) || applied ? (
							<button>Applied</button>
						) : (
							<button onClick={apply}>Apply Now</button>
						)}
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
	}

	return (
		<div>
			<h1>Job is loading</h1>
			<Link to="/jobs">Back to Jobs</Link>
		</div>
	);
};

export default Job;
