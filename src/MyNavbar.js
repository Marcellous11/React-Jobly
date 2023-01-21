import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Context from './Context';
import './styles/MyNavbar.css';

const MyNavbar = () => {
	const { currUser, defaultCurrUser, setCurrUser } = useContext(Context);

	const signout = () => {
		setCurrUser(defaultCurrUser);
		localStorage.clear();
	};
	const show = (e) => {
		document.querySelector('.MyNavbar-Dropdown-Content').style.display = 'inline-block';
	};

	const noShow = (e) => {
		document.querySelector('.MyNavbar-Dropdown-Content').style.display = 'none';
	};

	return (
		<div className="MyNavbar">
			<div className="MyNavbar-Content">
				{!currUser.username && !currUser.token ? (
					<div className="MyNavbar-login-signup">
						<NavLink to="/signup">Sign Up</NavLink>
						<NavLink to="/login">Login</NavLink>
					</div>
				) : (
					<div className="MyNavbar-forUser">
						<div className="MyNavbar-forUser-Static">
							<NavLink to="/">Home</NavLink>
							<NavLink to="/companies">Companies</NavLink>
							<NavLink to="/jobs">Jobs</NavLink>
						</div>

						<div onMouseOver={show} onMouseLeave={noShow} className="MyNavbar-Dropdown">
							<p id="userID">{currUser.username}</p>
							<div className="MyNavbar-Dropdown-Content">
								<ul>
									<li>
										<NavLink to="/profile">Profile</NavLink>
									</li>
									<li>
										<NavLink id="signout" onClick={signout} to="/login">
											Sign Out
										</NavLink>
									</li>
								</ul>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default MyNavbar;
