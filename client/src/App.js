import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Notes from './components/Notes/Notes';
import NotesEditor from './components/NotesEditor/NotesEditor';

function App() {
	return (
		<Switch>
			<Route path="/" exact component={Notes} />
			<Route path="/new" component={NotesEditor} />
		</Switch>
	);
}

export default App;
