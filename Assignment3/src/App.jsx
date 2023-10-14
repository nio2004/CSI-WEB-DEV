// src/App.js
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [inputText, setInputText] = useState('');

  const addNote = () => {
    if (inputText.trim() !== '') {
      setNotes([...notes, inputText]);
      setInputText('');
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };
      const editNote = (index, note) => {
        setInputText(note);
        setEditIndex(index);
      };

  return (
    <div className="App">
      <h1>Note Taking App</h1>
      <div className="note-container">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Add a new note"
        />
        <button onClick={addNote}>Add Note</button>
      </div>
      <div className="notes">
        {notes.map((note, index) => (
          <div className="note" key={index}>
            <p>{note}</p>
              <button onClick={() => editNote(index, note)}>Edit</button>
            <button onClick={() => deleteNote(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;




