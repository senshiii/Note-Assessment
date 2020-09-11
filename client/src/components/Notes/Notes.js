import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notes = (props) => {
	const [ notes, setNotes ] = useState([]);

	useEffect(() => {
		axios
			.get('/notes')
			.then((res) => {
				console.log(res.data);
				setNotes(res.data);
			})
			.catch((err) => {
				console.log(err);
				alert('Failed to fetch notes');
			});
	}, []);

	return (
		<div className="container">
			<div className="col d-flex align-items-center">
				<h1 className="display-3" >Notes</h1>
				<button className="btn btn-primary ml-auto" onClick={() => props.history.push('/new')} >New note</button>
			</div>
			{notes.length > 0 ? (
				<h1>Your notes</h1>
			) : (
				<div className="jumbotron">
					<h1 className="display-4">You have not added any notes yet!</h1>
				</div>
			)}
		</div>
	);
};

export default Notes;
