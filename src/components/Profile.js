import React, { useContext } from 'react';
import Async from 'react-async';
import { Context } from './Context';

function Profile() {
	const context = useContext(Context);

	const loadUser = () =>
		fetch(
			`https://cors-anywhere.herokuapp.com/http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${context.apiKey}&steamids=${context
				.steamIdState[0]}`
		).then((res) => (res.ok ? res.json() : Promise.reject(res)));

	return (
		<div className="container">
			<Async promiseFn={loadUser}>
				{({ data, err, isLoading }) => {
					if (isLoading) return 'Loading...';
					if (err) return `Something went wrong: ${err.message}`;

					if (data)
						if (Object.keys(data.response.players).length === 0) {
							return <h1 className="not-found">User not found</h1>;
						} else {
							return (
								<div className="Profile">
									<img className="profile-img" src={data.response.players[0].avatarfull} alt="" />
									<br />

									<div className="profile-info">
										<a href={data.response.players[0].profileurl}>
											<img className="steam-icon" src="images/iconmonstr-steam-1.svg" alt="" />
										</a>
										<h1> {data.response.players[0].personaname}</h1>
									</div>
								</div>
							);
						}
				}}
			</Async>
		</div>
	);
}

export default Profile;
