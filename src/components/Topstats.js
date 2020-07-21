import React, { useContext } from 'react';
import Async from 'react-async';
import { Context } from './Context';

function WinRate(data) {
	var rounds = 0;
	var wins = 0;

	for (let index = 0; index < 206; index++) {
		if (data.playerstats.stats[index].name.startsWith('total_rounds_map')) {
			rounds += data.playerstats.stats[index].value;
		}

		if (data.playerstats.stats[index].name.startsWith('total_wins_map')) {
			wins += data.playerstats.stats[index].value;
		}
	}

	return (wins / rounds * 100).toFixed(2);
}

function WeaponData(data) {
	let WeaponNames = [
		'deagle',
		'glock',
		'elite',
		'fiveseven',
		'awp',
		'ak47',
		'aug',
		'famas',
		'g3sg1',
		'p90',
		'mac10',
		'ump45',
		'xm1014',
		'm249',
		'hkp2000',
		'p250',
		'sg556',
		'scar20',
		'ssg08',
		'mp7',
		'mp9',
		'nova',
		'negev',
		'sawedoff',
		'bizon',
		'tec9',
		'mag7',
		'm4a1',
		'galilar'
	];

	let weaponskills = [];

	for (let index = 0; index < WeaponNames.length; index++) {
		let WeaponName = WeaponNames[index];
		let obj1;
		let obj2;
		let obj3;

		for (let index = 0; index < 206; index++) {
			if (data.playerstats.stats[index].name === 'total_kills_' + WeaponName) {
				obj1 = data.playerstats.stats[index].value;
			}

			if (data.playerstats.stats[index].name === 'total_shots_' + WeaponName) {
				obj2 = data.playerstats.stats[index].value;
			}

			if (data.playerstats.stats[index].name === 'total_hits_' + WeaponName) {
				obj3 = data.playerstats.stats[index].value;
			}
		}
		weaponskills.push({ name: WeaponName, kills: obj1, shots: obj2, hits: obj3 });
	}

	weaponskills.sort((a, b) => (b.kills > a.kills ? 1 : -1));

	let Table = [];

	for (let index = 0; index < weaponskills.length; index++) {
		Table.push(
			<tr key={weaponskills[index].name}>
				<td>
					<img src={'./images/csgoWeaponIcon/weapon_' + weaponskills[index].name + '.svg'} alt="" />
					{weaponskills[index].name}
				</td>
				<td>{weaponskills[index].kills}</td>
				<td>{weaponskills[index].shots}</td>
				<td>{weaponskills[index].hits}</td>
				<td>{((weaponskills[index].hits / weaponskills[index].shots).toFixed(2) * 100).toFixed(0)}%</td>
			</tr>
		);
	}

	return Table;
}

function Topstats() {
	const context = useContext(Context);

	const loadStats = () =>
		fetch(
			`https://cors-anywhere.herokuapp.com/http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?appid=730&key=${context.apiKey}&steamid=${context
				.steamIdState[0]}`
		)
			.then((res) => (res.ok ? res.json() : Promise.reject(res)))
			.catch(() => console.log('Error: Player stats not found'));

	return (
		<div className="topstats-container">
			<Async promiseFn={loadStats}>
				{({ data, err, isLoading }) => {
					if (isLoading) return 'Loading...';
					if (err) return `Something went wrong: ${err.message}`;

					if (data)
						if (Object.keys(data.playerstats.stats).length === 0) {
							return <h1 className="not-found">User stats not found</h1>;
						} else {
							return (
								<div className="stats-container">
									<div className="topstats">
										<br />
										<p>K/D Ratio</p>
										<p className="kd-ratio">
											{(data.playerstats.stats[0].value /
												data.playerstats.stats[1].value).toFixed(2)}
										</p>
										<br />

										<div className="kd-diagram">
											<hr
												className="kill-line"
												style={{
													width:
														data.playerstats.stats[0].value /
															(data.playerstats.stats[0].value +
																data.playerstats.stats[1].value) *
															100 +
														'%'
												}}
											/>
											<hr
												className="death-line"
												style={{
													width:
														data.playerstats.stats[1].value /
															(data.playerstats.stats[0].value +
																data.playerstats.stats[1].value) *
															100 +
														'%'
												}}
											/>
										</div>

										<div className="stat-top-lg">
											<div className="stat-container stat-border">
												<img className="stat-img-lg" src="images/gun.svg" alt="" />

												<div>
													<span className="stat-title-lg">Kills</span>
													<br />
													<span className="stat-text-lg">
														{data.playerstats.stats[0].value}
													</span>
												</div>
											</div>

											<div className="stat-container">
												<img className="stat-img-lg" src="images/skull.svg" alt="" />

												<div>
													<span className="stat-title-lg">Deaths</span>
													<br />
													<span className="stat-text-lg">
														{data.playerstats.stats[1].value}
													</span>
												</div>
											</div>
										</div>

										<div className="stat-top-sm">
											<div className="stat-container-sm">
												<img className="stat-img-sm" src="images/target.svg" alt="" />

												<div>
													<span className="stat-title-sm">accuracy</span>
													<br />
													{(() => {
														if (data.playerstats.stats[46].name === 'total_shots_hit') {
															return (
																<span className="stat-text-sm">
																	{(data.playerstats.stats[46].value /
																		data.playerstats.stats[47].value *
																		100).toFixed(2)}%
																</span>
															);
														} else {
															return (
																<span className="stat-text-sm">
																	{(data.playerstats.stats[47].value /
																		data.playerstats.stats[48].value *
																		100).toFixed(2)}%
																</span>
															);
														}
													})()}
												</div>
											</div>

											<div className="stat-container-sm">
												<img className="stat-img-sm" src="images/headshot.svg" alt="" />

												<div>
													<span className="stat-title-sm">Headshot %</span>
													<br />
													<span className="stat-text-sm">
														{(data.playerstats.stats[25].value /
															data.playerstats.stats[0].value *
															100).toFixed(2)}%
													</span>
												</div>
											</div>

											<div className="stat-container-sm">
												<img className="stat-img-sm" src="images/trophy.svg" alt="" />

												<div>
													<span className="stat-title-sm">Win %</span>
													<br />
													<span className="stat-text-sm">{WinRate(data)}%</span>
												</div>
											</div>

											<div className="stat-container-sm">
												<img className="stat-img-sm" src="images/star.svg" alt="" />

												<div>
													<span className="stat-title-sm">MVPs</span>
													<br />
													{(() => {
														if (data.playerstats.stats[102].name === 'total_mvps') {
															return (
																<span className="stat-text-sm">
																	{data.playerstats.stats[102].value}
																</span>
															);
														} else {
															return (
																<span className="stat-text-sm">
																	{data.playerstats.stats[103].value}
																</span>
															);
														}
													})()}
												</div>
											</div>
										</div>
									</div>

									<div className="gun-stats">
										<table>
											<thead>
												<tr>
													<th>Weapon</th>
													<th>Kills</th>
													<th>Shots</th>
													<th>Hits</th>
													<th>Accuracy</th>
												</tr>
											</thead>

											<tbody>{WeaponData(data)}</tbody>
										</table>
									</div>
								</div>
							);
						}
				}}
			</Async>
		</div>
	);
}

export default Topstats;
