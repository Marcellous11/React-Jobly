import React, { useState } from 'react';
import './styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import MyNavBar from './MyNavbar';
import AppRoutes from './AppRoutes';
import Context from './Context';
import JoblyApi from './api';

function App() {
	const defaultCurrUser = {
		username: localStorage.getItem('username'),
		token: localStorage.getItem('token')
	};
	const [ currUser, setCurrUser ] = useState(defaultCurrUser);

	const signup = (data) => {
		let signUptoken = JoblyApi.signUp(data);
		return signUptoken;
	};
	const login = (data) => {
		let loginToken = JoblyApi.login(data);
		return loginToken;
	};
	const setLocalStorage = (data) => {
		localStorage.setItem(`username`, data.username);
		localStorage.setItem(`token`, data.token.token);
	};

	return (
		<div className="App">
			<Context.Provider
				value={{
					currUser,
					signup,
					login,
					setCurrUser,
					defaultCurrUser,
					setLocalStorage
				}}
			>
				<BrowserRouter>
					<MyNavBar />
					<AppRoutes />
				</BrowserRouter>
			</Context.Provider>
		</div>
	);
}

export default App;
