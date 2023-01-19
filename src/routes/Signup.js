import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Context from '../Context';
import '../styles/Onboard.css';

const Signup = () => {
	const navigate = useNavigate();
	const { signup } = useContext(Context);
	const { register, handleSubmit, watch, formState: { errors } } = useForm();
	const onSubmit = (data) => {
		signup(data);
		navigate('/login');
	};

	console.log(watch()); // watch input value by passing the name of it
	// console.log(watch('lastName')); // watch input value by passing the name of it
	console.log(errors);

	return (
		<div className="Onboard">
			<div className="Onboard-Content">
				<h2>Signup</h2>
				<form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
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
		</div>
	);
};

export default Signup;

// //{
//	"username": "Mac",
//	"firstName": "Marcellous",
//	"lastName": "Curtis",
//	"password":"123password",
//	"email":"1234@gmail.com"
//}

//token recieved from signup
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1hYyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NzQwMjA5MzZ9.Cd4W5Vojdn-vvKvkUvXwgpEoiIVZGsElB4xtjM6r0oQ"
//{
//"username":"Mac",
//"password":"123password"
//}
//
//{sign up
//"_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1hYyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NzQwMjA5MzZ9.Cd4W5Vojdn-vvKvkUvXwgpEoiIVZGsElB4xtjM6r0oQ"
//}

//login
// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1hYyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NzQwMjIyNjZ9.ZZAn0CGaH9sR7HGwAWuDr_UxOVulQp-IlI8Msxu7K1Q"
