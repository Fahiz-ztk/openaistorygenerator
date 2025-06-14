import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [charlist,setcharlist]=useState([])
  
  const [selectedChar, setSelectedChar] = useState('')
  const [story, setStory] = useState('')
  
  const [form, setForm] = useState({name: '',details: ''})

  const [refresh,setrefresh]=useState(true)

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/characters')
      .then((response) => {
        setcharlist(response.data.characters)
        console.log(response.data.characters)
      })
      .catch((error) => {
        console.error('Failed to fetch characters:', error)
      })
  }, [refresh])


    const submitBtn = (e) => {
    e.preventDefault()
    if (!form.name || !form.details) {
      console.log("Incomplete formdata");
      return;
    }
    axios
      .post('http://localhost:8000/api/create_character', form)
      .then((res) => {
        console.log('Character created:', res.data)
        setForm({ name: '', details: '' })
        setrefresh(!refresh)
      })
      .catch((err) => {
        console.error('Error creating character:', err)
      })
  }

    const generateStory = () => {
    if (!selectedChar) {
      setStory('Please select a character first.')
      return
    }

    axios
      .post('http://localhost:8000/api/generate_story', {
        character_name: selectedChar,
      })
      .then((res) => {
        setStory(res.data.story)
      })
      .catch((err) => {
        console.error('Error generating story:', err)
        console.log(err.response.data.detail);
        
        setStory(err.response.data.detail)
      })
  }

  return (
    <>
        <div className='maindiv'>
          <form className='postform'>
            <input onChange={(e) => setForm({ ...form, name: e.target.value })} type="text" placeholder='Charecter Name' value={form.name} /><br />
            <textarea onChange={(e) => setForm({ ...form, details: e.target.value })} placeholder='Charector description' value={form.details} ></textarea><br />
            <button type="submit" onClick={(e)=>submitBtn(e)}>Create Character</button>
          </form>
        <form className='generform'>
          <select value={selectedChar} onChange={(e) => setSelectedChar(e.target.value)}>
            <option value="" disabled>Select a character</option>
            {charlist.map((i, j) => (
              <option key={j} value={i}>{i}</option>
            ))}
          </select>
          <br />
          <button type="button" onClick={generateStory}>Generate story</button>
          <p>{story}</p>
        </form>
        </div>
      
    </>
  )
}

export default App
