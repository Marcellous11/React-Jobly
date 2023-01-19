import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sorry.css';

const Sorry = () => {
	return (
		<div className="Sorry">
			<h1>404</h1> <h3>{`page not found:(`}</h3>
			<Link to="/">Return Home </Link>
		</div>
	);
};
export default Sorry;
