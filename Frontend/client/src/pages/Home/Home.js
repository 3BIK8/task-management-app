import React from "react";
import Header from "../../components/Header/Header";
import "./Home.css";
import Navbar from "../../components/SideBar/Navbar";

function Home() {
	return (
		<div className="home">
			<Header />
			<Navbar />
		</div>
	);
}

export default Home;
