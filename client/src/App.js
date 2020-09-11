import React from "react";
import { Switch, Route } from "react-router-dom";

import Notes from "./components/Notes/Notes";
import NotesEditor from "./components/NotesEditor/NotesEditor";
import NoteContext from "./context/notes-context";

function App() {
  return (
    <NoteContext>
      <Switch>
        <Route path="/" exact component={Notes} />
        <Route path="/new" component={NotesEditor} />
      </Switch>
    </NoteContext>
  );
}

export default App;
