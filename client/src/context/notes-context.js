import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const NoteContext = createContext({
  notes: [],
  addNote: () => {},
});

export default (props) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get("/notes")
      .then((res) => setNotes(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addNote = (note) => {
    setNotes((notes) => [...notes, note]);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
