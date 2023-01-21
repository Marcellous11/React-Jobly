import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Context from '../Context';
import JoblyApi from '../api';
import '../styles/EditProfile.css';

const EditProfile = () => {
	const { currUser } = useContext(Context);
	const [ userData, setUserData ] = useState(userData);
	const navigate = useNavigate();
	useEffect(
		() => {
			console.debug('before effect currUser---->', currUser);
			if (!currUser.username) {
				navigate('/login');
			}

			const getUserData = async () => {
				const user = await JoblyApi.getUserInfo(currUser.username, currUser.token);

				setUserData(user.user);
				return user;
			};
			getUserData();
		},
		[ currUser ]
	);
	const { register, handleSubmit, formState: { errors } } = useForm();
	const onSubmit = async (data) => {
		await JoblyApi.editUser(currUser.username, data, localStorage.token);
		navigate('/profile');
	};

	if (userData) {
		return (
			<div className="EditProfile">
				<div className="EditProfile-Content">
					<h2>Edit Profile</h2>
					<form onSubmit={handleSubmit(onSubmit)}>
						<input defaultValue={userData.firstName} {...register('firstName')} />
						<input defaultValue={userData.lastName} {...register('lastName')} />

						<input defaultValue={userData.email} type="email" {...register('email')} />
						<Link
							className="EditProfile-changeP"
							to={`/profile/${currUser.username}/edit/changepassword`}
							type="button"
						>
							Change Password
						</Link>

						{errors.lastName && <span>This field is required</span>}

						<input type="submit" />
					</form>
				</div>
				<Link className="EditProfile-btns" to={`/profile`}>
					{' '}
					Cancel
				</Link>
			</div>
		);
	}
	return <div>Loading</div>;
};

export default EditProfile;
