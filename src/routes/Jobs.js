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
			if (!currUser.username) {
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
						<NavLink key={uuid()} to={`/jobs/${job.id}`}>
							<li>{job.title}</li>
						</NavLink>
					);
				})}
			</ul>
		</div>
	);
};

export default Jobs;
