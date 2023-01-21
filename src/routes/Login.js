import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import Context from '../Context';
import '../styles/Onboard.css';

const Login = () => {
	const navigate = useNavigate();
	const { setCurrUser, login, setLocalStorage } = useContext(Context);
	const { register, handleSubmit, setFocus, formState: { errors } } = useForm();

	//!Fix this
	useEffect(
		() => {
			let localData = { username: localStorage.getItem('username'), token: localStorage.getItem('token') };
			setCurrUser(localData);
			if (localData.username) navigate('/');
			setFocus('username');
		},
		[ setFocus ]
	);

	const onSubmit = async (data) => {
		try {
			let setup = {
				username: data.username,
				token: await login(data)
			};
			// console.debug('setup token', setup.token);
			console.log(setup);
			setLocalStorage(setup);
		} catch (e) {
			e.map((err) => {
				// console.debug('all errors --------->', err);
				alert(err);
				return err;
			});
		}
		let localData = { username: localStorage.getItem('username'), token: localStorage.getItem('token') };
		setCurrUser(localData);
		navigate('/');
	};

	return (
		<div className="Onboard">
			<h1>
				{' '}
				Welcome to <b>Jobly! </b>
			</h1>

			<div id="loginBox" className="Onboard-Content ">
				<h2>Login</h2>
				<form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
					{errors.username && <label htmlFor="lgusername">Must Enter Username</label>}
					<input
						id="lgusername"
						autoComplete="off"
						placeholder="User Name"
						{...register('username', { required: true })}
					/>
					{errors.username && <label htmlFor="lgpassword">Must Enter Username</label>}
					<input
						id="lgpassword"
						placeholder="Password"
						type="password"
						{...register('password', { required: true })}
					/>

					<input type="submit" />
				</form>
				<span>
					Don't have an account?{' '}
					<Link to="/signup">
						<b>Sign up now!</b>
					</Link>{' '}
					{' '}
				</span>
			</div>
		</div>
	);
};

export default Login;
