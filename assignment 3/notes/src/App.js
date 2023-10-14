import NotesList from './components/NotesList'
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import Search from './components/search';
import Header from './components/header';

const App= () =>{
  const [notes, setNotes]=useState([{
    id: nanoid(),
    text: "Hello World",
    date:"12/10/2023"
  },
  ]);

  const [searchText, setSearchText] = useState('')

  const [darkMode , setDarkMode] = useState(false);

  useEffect(() => {
    console.log("rendering")
		const savedNotes = JSON.parse(
			localStorage.getItem('react-notes-app-data')
		);
    console.log("Saved Notes: ",savedNotes)
    if (savedNotes) {
      setNotes(savedNotes);
    } 
	}, []);

	useEffect(() => {
      localStorage.setItem('react-notes-app-data', JSON.stringify(notes));
  }, [notes]);

  const addnote=(text)=>{
    const date=new Date();
    const newNote= {
      id:nanoid(),
      text: text,
      date: date.toLocaleDateString()
    }
    const newNotes=[...notes,newNote];
    setNotes(newNotes);
  }

  const deleteNote = (id) =>{
    const newNotes=notes.filter ((note) => note.id !== id)
    setNotes(newNotes);
  }

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
        <Header handleToggleDarkmode={setDarkMode}/>
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) => note.text.toLowerCase().includes(searchText))}
          handleAddNote={addnote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
}

export default App;
