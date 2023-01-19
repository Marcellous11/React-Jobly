import React, { useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import Context from '../Context';
import '../styles/Jobs.css';

const Jobs = ({ jobs }) => {
	const { currUser } = useContext(Context);
	const navigate = useNavigate();
	useEffect(
		() => {
			if (!currUser.username && !currUser.token) {
				navigate('/login');
			}
		},
		[ currUser ]
	);

	return (
		<div className="Jobs">
			<h2>Jobs</h2>
			<ul>
				{jobs.map((job) => {
					return (
						<NavLink to={`/jobs/${job.id}`}>
							<li key={uuid()}>{job.title}</li>
						</NavLink>
					);
				})}
			</ul>
		</div>
	);
};

export default Jobs;
