import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Context from '../Context';
import JoblyApi from '../api';
import '../styles/EditProfile.css';

const ChangePassword = () => {
	const { currUser } = useContext(Context);
	const navigate = useNavigate();
	const { register, watch, handleSubmit, formState: { errors } } = useForm();

	useEffect(
		() => {
			if (!currUser.username) {
				navigate('/login');
			}
		},
		[ currUser ]
	);

	const onSubmit = async (data) => {
		await JoblyApi.editUser(currUser.username, data, localStorage.token);
		navigate(`/profile/${currUser.username}/edit`);
	};

	return (
		<div className="EditProfile">
			<div className="EditProfile-Content">
				<h2>Change Password</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input placeholder="New Password" type="password" {...register('password', { required: true })} />

					{errors.password && <span>This field is required</span>}

					<input type="submit" />
				</form>
			</div>
		</div>
	);
};

export default ChangePassword;
