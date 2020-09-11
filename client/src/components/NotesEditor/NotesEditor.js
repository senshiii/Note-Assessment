import React, { useState, useContext, useEffect, useRef } from "react";
import EditorJs from "@editorjs/editorjs";
import axios from "axios";
import { NavLink } from 'react-router-dom';

import classes from "./NoteEditor.module.css";
import TodoList from "../../plugins/TodoList";
import { NoteContext } from "../../context/notes-context";

const NotesEditor = (props) => {
  const { addNote } = useContext(NoteContext);
  const [noteName, setNoteName] = useState("");

  let editor = useRef(null);
  const mode = useRef(null);
  const idRef = useRef(null);
  const { search } = props.location;

  useEffect(() => {
    // console.log(search);
    if (search) {
      let id = null;
      const searchParams = new URLSearchParams(search);
      for (let param of searchParams.entries()) {
        // console.log(param);
        if (param[0] === "m") {
          mode.current = param[1];
        } else if (param[0] === "id") {
					id = param[1];
					idRef.current = param[1];
        }
      }
      axios
        .get(`/notes/${id}`)
        .then((res) => {
          // console.log(res.data);
          setNoteName(res.data.title);
          editor.current = new EditorJs({
            tools: {
              todo: TodoList,
            },
            data: {
              time: res.data.time,
              blocks: res.data.blocks,
            },
          });
        })
        .catch((err) => console.log(err));
    } else {
      editor.current = new EditorJs({
        tools: {
          todo: TodoList,
        },
			});
			mode.current = 'create'
    }
  }, []);

  const saveNote = () => {
    editor.current
      .save()
      .then(({ time, blocks }) => {
				if(mode.current === 'create'){
					axios.post("/notes", { title: noteName, time, blocks }).then((res) => {
						addNote(res.data);
						props.history.replace("/");
					});
				}else if(mode.current === 'edit'){
					axios.put(`/notes/${idRef.current}`, { title: noteName, time, blocks }).then((res) => {
						props.history.replace("/");
					});
				}
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <h1>Note Editor</h1>
      <input
        type="text"
        placeholer="Enter Note Name"
        value={noteName}
        onChange={(e) => setNoteName(e.target.value)}
      />
      <br />
      <div id="editorjs" className={classes.Editor} />
      <button className="btn btn-outline-primary" onClick={saveNote}>
        Save Note
      </button>
      <NavLink to="/" >Go to Notes</NavLink>
    </div>
  );
};

export default NotesEditor;
