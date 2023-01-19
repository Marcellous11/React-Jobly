import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Context from '../Context';
import JoblyApi from '../api';
import '../styles/EditProfile.css';

const EditProfile = () => {
	const { currUser } = useContext(Context);
	const navigate = useNavigate();
	useEffect(
		() => {
			if (!currUser.username && !currUser.token) {
				navigate('/login');
			}
			// const getUserData = async () => {
			// 	const user = await JoblyApi.getUserInfo(currUser.username, currUser.token);
			// 	console.debug(user);
			// 	return user;
			// };
			// getUserData();
		},
		[ currUser ]
	);

	const { register, handleSubmit, formState: { errors } } = useForm();
	const onSubmit = (data) => {
		navigate('/login');
	};
	return (
		<div className="EditProfile">
			<div className="EditProfile-Content">
				<h2>Edit Profile</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					{/* register your input into the hook by invoking the "register" function */}
					<input placeholder="User Name" {...register('username', { required: true })} />
					<input placeholder="First Name" {...register('firstName', { required: true })} />
					<input placeholder="Last Name" {...register('lastName', { required: true })} />
					<input placeholder="Password" type="password" {...register('password', { required: true })} />
					<input placeholder="Email" type="email" {...register('email', { required: true })} />
					{/* errors will return when field validation fails  */}
					{errors.lastName && <span>This field is required</span>}

					<input type="submit" />
				</form>
			</div>
			<Link className="EditProfile-btns" to={`/profile`}>
				{' '}
				Canel
			</Link>
		</div>
	);
};

export default EditProfile;
