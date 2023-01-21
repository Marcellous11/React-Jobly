import React, { useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Context from '../Context';

import '../styles/Companies.css';

import { v4 as uuid } from 'uuid';
const Companies = ({ companies }) => {
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
		<div className="Companies">
			<h2>Companies</h2>
			<ul>
				{companies.map((company) => {
					return (
						<NavLink key={uuid()} to={`/companies/${company.handle}`}>
							<li>{company.name}</li>
						</NavLink>
					);
				})}
			</ul>
		</div>
	);
};

export default Companies;
