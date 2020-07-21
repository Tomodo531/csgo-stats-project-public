import React, { useState, useContext } from 'react';
import { Context } from './Context';

function Search() {
	const { steamIdState } = useContext(Context);
	const [ steamid, setSteamId ] = steamIdState;

	const [ search, setSearch ] = useState('');
	const updateSearch = (e) => {
		setSearch(e.target.value);
	};

	const GetPlayerStats = async (e) => {
		await e.preventDefault();
		await setSteamId(search);
		console.log('setSteamId: ' + steamid);
	};

	return (
		<div className="Search">
			<form className="search-form" onSubmit={GetPlayerStats}>
				<input type="text" value={search} onChange={updateSearch} placeholder="Search steamID64" />
				<button type="submit">Search</button>
			</form>
		</div>
	);
}

export default Search;
