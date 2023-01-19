import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Context from '../Context';
import '../styles/Profile.css';
const Profile = () => {
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
	return (
		<div className="Profile">
			<h2>Profile</h2>
			<h1>{currUser.username}</h1>
			<Link to={`/profile/${currUser.username}/edit`}>Edit profile</Link>
		</div>
	);
};

export default Profile;
