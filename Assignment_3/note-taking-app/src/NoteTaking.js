import React, { useState, useEffect } from 'react';
import {useTheme} from './useTheme';

const NoteTaking = () => {
  const [notes, setNotes] = useState([]);
  const { currentTheme } = useTheme();

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('notes'));
    setNotes(notes || []);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  function handleCreateNote() {
    const newNote = {
      title: '',
      content: '',
    };

    setNotes([...notes, newNote]);
  }

  function handleEditNote(index, title, content) {
    const updatedNotes = [...notes];
    updatedNotes[index] = { title, content };

    setNotes(updatedNotes);
  }

  function handleDeleteNote(index) {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);

    setNotes(updatedNotes);
  }

  return (
    <div className={currentTheme === 'light' ? 'light-theme' : 'dark-theme'}>
      <h1>Note Taking App</h1>

      <button onClick={handleCreateNote}>Create New Note</button>

      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            <input
              type="text"
              placeholder="Title"
              value={note.title}
              onChange={(e) => handleEditNote(index, e.target.value, note.content)}
            />

            <textarea
              placeholder="Content"
              value={note.content}
              onChange={(e) => handleEditNote(index, note.title, e.target.value)}
            />

            <button onClick={() => handleDeleteNote(index)}>Delete Note</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteTaking;
