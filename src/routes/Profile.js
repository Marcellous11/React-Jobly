import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Context from '../Context';
import '../styles/Profile.css';
import JoblyApi from '../api';
import { v4 as uuid } from 'uuid';
const Profile = () => {
	const navigate = useNavigate();
	const { currUser } = useContext(Context);
	const [ userInfo, setUserInfo ] = useState();
	const [ myJobs, setMyjobs ] = useState();
	useEffect(
		() => {
			//checks to see if curr user is loggin
			if (!currUser.username) {
				navigate('/login');
			}
			//pulls up currUser data from backend
			const userData = async (data) => {
				const info = await JoblyApi.getUserInfo(currUser.username, currUser.token);
				setUserInfo(info.user);
			};

			userData();
		},
		[ currUser, myJobs ]
	);
	useEffect(() => {
		const jobs = async (data) => {
			const res = await JoblyApi.getAllJobs();

			setMyjobs(res);
		};
		jobs();
	}, []);

	if (userInfo && myJobs) {
		let list = myJobs.filter((job) => userInfo.applications.includes(job.id));
		return (
			<div className="Profile">
				<h2>Profile</h2>
				<div className="Profile-Info">
					<p>
						Username: <b>{userInfo.username}</b>
					</p>
					<p>
						First Name: <b>{userInfo.firstName}</b>
					</p>
					<p>
						Last Name: <b>{userInfo.lastName}</b>
					</p>
					<p>
						E-mail: <b>{userInfo.email}</b>
					</p>
					<div className="editBtn">
						<p>
							<Link to={`/profile/${currUser.username}/edit`}>Edit profile</Link>
						</p>
					</div>
				</div>
				<div className="Profile-Applications">
					<h3>Positions applied to: </h3>
					{
						<ul>
							{list.map((job) => (
								<NavLink key={uuid()} to={`/jobs/${job.id}`}>
									<li>{job.title}</li>
								</NavLink>
							))}
						</ul>
					}
				</div>
			</div>
		);
	}
	return <h1>loading...</h1>;
};

export default Profile;
