import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Context from '../Context';
import { v4 as uuid } from 'uuid';
import '../styles/Company.css';

const Company = ({ companies, jobs }) => {
	const { handle } = useParams({});
	const [ comp, setComp ] = useState({});
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

	useEffect(
		() => {
			let c = companies.find((c) => c.handle === handle);
			setComp(c);
		},
		[ companies, jobs ]
	);

	if (comp !== undefined && jobs.length > 0) {
		const rjs = jobs.filter((job) => job.companyHandle === comp.handle);

		return (
			<div className="Company">
				<h2>
					Company : <b>{comp.name}</b>{' '}
				</h2>
				<div className="Company-Content">
					<div className="Company-Content-Discription">
						<h3> Discription</h3>
						<p>{comp.description}</p>
					</div>
					<div className="Company-Content-Emp">
						<h3>
							Number of Employees: <b>{comp.numEmployees}</b>
						</h3>
					</div>
					<div className="Company-Content-RelatedJobs">
						<h3>Available Jobs: </h3>
						<ul>
							{rjs.map((job) => (
								<Link to={`/jobs/${job.id}`}>
									<li key={uuid()}>{job.title}</li>
								</Link>
							))}
						</ul>
					</div>
				</div>
				<Link className="Company-returnBtn" to="/companies">
					Back to Companies
				</Link>
			</div>
		);
	}

	return <h1>Is loading</h1>;
};

export default Company;
