import React, { useState, useEffect } from "react";
import { default as fetchMotivationalQuote } from "../../utils/quoteApi.js";
import "./header.css";

function Header() {
	const [quote, setQuote] = useState("");

	useEffect(() => {
		const getQuote = async () => {
			const response = await fetchMotivationalQuote();
			setQuote(response);
			console.log(response);
		};

		getQuote();
	}, []);

	return (
		<div className="header">
			<div className="logo-container">
				<img src="assets/Logo-Dark.png" alt="logo" />
			</div>
			<div className="quote">
				<p>"{quote}"</p>
			</div>
			<div className="profile">
				<p>Profile</p>
			</div>
		</div>
	);
}

export default Header;
