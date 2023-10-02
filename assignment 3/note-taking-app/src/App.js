import { useState } from 'react';
import uuid from 'react-uuid';
import './App.css';
import Sidebar from './sidebar';
import Main from './Main';

function App(){
  const [notes, setNotes]= useState([]);
  const [activeNote, setActiveNote] = useState(false);
  

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Unititled Note",
      body: "",
      lastModified: Date.now(),
    }
    setNotes([newNote, ...notes]);
  };

  const onDeleteNote = (idtoDelete) => {
    setNotes(notes.filter((note) => note.id !== idtoDelete))
  }

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if(note.id === activeNote) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArray);
  };

  return <div className="App">
  <Sidebar 
  notes={notes} 
  onAddNote={onAddNote} 
  onDeleteNote={onDeleteNote} 
  activeNote={activeNote} 
  setActiveNote={setActiveNote}/>
  
  <Main 
  activeNote={getActiveNote()} 
  onUpdateNote={onUpdateNote}/>
  </div>;
}

export default App;