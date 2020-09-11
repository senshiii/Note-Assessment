import React, { useContext, Fragment } from "react";

import { NoteContext } from "../../context/notes-context";

const Notes = (props) => {
  const { notes } = useContext(NoteContext);

  const notesView = notes.map((note) => (
    <div
      key={note._id}
      className="border w-25 d-inline-flex p-4 m-4"
      onClick={() => props.history.replace(`/new?m=edit&id=${note._id}`)}
    >
      {note.title}
    </div>
  ));

  return (
    <div className="container">
      <div className="col d-flex align-items-center">
        <h1 className="display-3">Notes</h1>
        <button
          className="btn btn-primary ml-auto"
          onClick={() => props.history.push("/new")}
        >
          New note
        </button>
      </div>
      {notes.length > 0 ? (
        <Fragment>
          <h1>Your notes</h1>
          {notesView}
        </Fragment>
      ) : (
        <div className="jumbotron">
          <h1 className="display-4">You have not added any notes yet!</h1>
        </div>
      )}
    </div>
  );
};

export default Notes;
