import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Context from '../Context';
import '../styles/Onboard.css';

const Signup = () => {
	const navigate = useNavigate();
	const { signup } = useContext(Context);
	const {
		register,
		unregister,
		getValues,
		handleSubmit,
		watch,
		setError,
		setFocus,
		formState: { errors }
	} = useForm();

	useEffect(
		() => {
			setFocus('username');
		},
		[ setFocus ]
	);

	const onSubmit = (data) => {
		if (password === confirmPassword) {
			delete data.confirmPassword;
			signup(data);
			navigate('/login');
		} else {
			console.debug('passwords didnt match');
		}
	};
	const [ password, confirmPassword ] = watch([ 'password', 'confirmPassword' ]);
	console.debug(errors);
	console.debug(errors.password);
	return (
		<div className="Onboard">
			<div className="Onboard-Content">
				<h2>Signup</h2>
				<form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
					{errors.username && <label htmlFor="username">Username is required</label>}
					<input id="username" placeholder="User Name" {...register('username', { required: true })} />

					{errors.firstName && <label htmlFor="firsName">First Name is required</label>}
					<input id="firstName" placeholder="First Name" {...register('firstName', { required: true })} />

					{errors.lastName && <label htmlFor="lastName">Last Name is required</label>}
					<input id="lastName" placeholder="Last Name" {...register('lastName', { required: true })} />

					{errors.password && <label htmlFor="password">password is required</label>}
					<input
						id="password"
						placeholder="Password"
						type="password"
						{...register('password', { required: true, minLength: 6 })}
					/>
					<input
						placeholder="Confirm Password"
						type="password"
						{...register('confirmPassword', { required: true })}
					/>
					{errors.email && <label htmlFor="email">email is required</label>}
					<input id="email" placeholder="Email" type="email" {...register('email', { required: true })} />
					<input type="submit" />
					{password === confirmPassword ? null : <p>Passwords does NOT match </p>}
					{errors.password && <p>Password must be at least 6 charaters </p>}
				</form>
			</div>
		</div>
	);
};

export default Signup;
