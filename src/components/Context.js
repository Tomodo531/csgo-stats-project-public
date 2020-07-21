import React, { createContext, useState } from 'react';

export const Context = createContext();

export const ContextProvider = (props) => {
	const [ steamid, setSteamId ] = useState('76561198042680002');
	const key = '';

	return (
		<Context.Provider value={{ steamIdState: [ steamid, setSteamId ], apiKey: key }}>
			{props.children}
		</Context.Provider>
	);
};
