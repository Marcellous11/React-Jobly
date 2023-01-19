import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Context from '../Context';
import '../styles/Onboard.css';

const Login = () => {
	const navigate = useNavigate();
	const { setCurrUser, login, setLocalStorage } = useContext(Context);
	const { register, handleSubmit, formState: { errors } } = useForm();

	useEffect(() => {
		let localData = { username: localStorage.getItem('username'), token: localStorage.getItem('token') };
		setCurrUser(localData);
		if (localData.username) navigate('/');
	}, []);

	const onSubmit = async (data) => {
		try {
			let setup = {
				username: data.username,
				token: await login(data)
			};
			// console.debug('setup token', setup.token);
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
			<div className="Onboard-Content">
				<h2>Login</h2>
				<form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
					{/* register your input into the hook by invoking the "register" function */}
					<input autoComplete="off" placeholder="User Name" {...register('username', { required: true })} />

					<input placeholder="Password" type="password" {...register('password', { required: true })} />

					{/* errors will return when field validation fails  */}
					{errors.username && <span>Must Enter Username</span>}
					{errors.password && <span>Must Enter Password</span>}

					<br />
					<input type="submit" />
				</form>
			</div>
		</div>
	);
};

export default Login;
