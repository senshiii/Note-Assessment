import React from 'react';
import EditorJs from '@editorjs/editorjs';

import classes from './NoteEditor.module.css';
import TodoList from '../../plugins/TodoList';

const NotesEditor = (props) => {
	const editor = new EditorJs({
		autofocus: true,
		tools: {
      todo: TodoList
		}
	});

	const saveNote = () => {
		editor
			.save()
			.then((data) => {
				console.log('Saved note Data',data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="container">
			<h1>Note Editor</h1>
			<div id="editorjs" className={classes.Editor} />
			<button className="btn btn-outline-primary" onClick={saveNote} >Save Note</button>
		</div>
	);
};

export default NotesEditor;
