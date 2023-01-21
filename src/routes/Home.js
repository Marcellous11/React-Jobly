import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../Context';
import '../styles/Home.css';

const Home = () => {
	const { currUser } = useContext(Context);
	const [ quote, setQuote ] = useState();
	const navigate = useNavigate();
	useEffect(() => {
		const getquote = async () => {
			try {
				const result = await axios.get(' https://api.goprogram.ai/inspiration');
				setQuote(result.data);
			} catch (e) {
				console.log(e.messsage);
			}
		};
		getquote();
	}, []);

	useEffect(
		() => {
			if (!currUser.username) {
				navigate('/login');
			}
		},
		[ currUser ]
	);
	return (
		<div className="Home">
			<h2>Welcome to your new life</h2>
			<div className="Home-stuff" />
			<div className="Home-quote">
				<h3>Quote of the day </h3>
				<p>{quote && <i>"{quote.quote}"</i>}</p>
				{quote && <span>-{quote.author}</span>}
			</div>
		</div>
	);
};

export default Home;
