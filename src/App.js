import React from 'react';
import './App.css';
import Search from './components/Search';
import Profile from './components/Profile';
import Topstats from './components/Topstats';
import { ContextProvider } from './components/Context';

function App() {
	return (
		<ContextProvider>
			<div className="App">
				<Search />
				<Profile />
				<Topstats />
			</div>
		</ContextProvider>
	);
}

export default App;
