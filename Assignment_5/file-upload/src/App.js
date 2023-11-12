import { createRef} from 'react';
import './App.css';


function App() {
  const fileInput = createRef()
  
  const onSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.set("file_upload", fileInput.current.files[0])

    try{
      const response = await fetch('/profile', {
        method : "POST",
        body : formData

      })

      const parsedResponse = await response.json()
      if (response.ok){
        alert("File Uploaed")
      }
      else{
        console.log("Something has gone wrong")
      }
    }catch (e){
      console.error(e.message)
    }
  }
  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input type = "file" name = "file_upload" ref = {fileInput} />
        <input type = "submit" value = "Submit" />

      </form>
    </div>
  );
}

export default App;
