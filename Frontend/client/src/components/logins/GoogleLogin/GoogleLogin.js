import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function GoogleLogin() {
	const navigate = useNavigate();
	const [user, setUser] = useState({});

	async function handleCallbackResponse(response) {
		try {
			console.log("jwt token : " + response.credential);
			const userObj = jwtDecode(response.credential);
			console.log(userObj);
			setUser(userObj);

			navigate("/home");
		} catch (error) {
			console.error("Error registering user:", error.message);
		}
	}

	function handelSignOut() {
		setUser({});
	}

	useEffect(() => {
		/* global google */
		google.accounts.id.initialize({
			client_id:
				"788383267438-93hbi9b9t25s62bb2r4o5ussbeo8ggtu.apps.googleusercontent.com",
			callback: handleCallbackResponse,
		});

		google.accounts.id.renderButton(document.getElementById("signInDiv"), {
			theme: "outline",
			size: "large",
		});
	});

	return (
		<div>
			<div id="signInDiv"></div>
			{Object.keys(user) !== 0 && (
				<button onClick={handelSignOut}>Sign out</button>
			)}
			{user && (
				<div>
					<img src={user.picture} alt={user.name} />
					<h3>{user.name}</h3>
				</div>
			)}
		</div>
	);
}

export default GoogleLogin;
