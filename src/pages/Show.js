import {useState} from 'react'
import { useNavigate, useParams } from "react-router-dom"

const Show = (props) => {
  const params = useParams()
  const navigate = useNavigate()
  
  const [updateForm, setUpdateForm] = useState({
    name: props.person.name,
    title: props.person.title,
    image: props.person.image
  })

  const handleChange = (event) => {
    setUpdateForm(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.updatePeople(updateForm, params.id)
  }

  const handleDelete = () => {
    props.deletePeople(params.id)
    navigate('/')
  }

  return(
    <div className='person'>
      <h1>{props.person.name}</h1>
      <h2>{props.person.title}</h2>
      <img src={props.person.image} alt={props.person.name} />
      <button onClick={handleDelete} id='delete'>
        DELETE PERSON
      </button>
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          value={updateForm.name}
          name='name'
          placeholder='Name'
          onChange={handleChange}
        />
        <input 
          type='text'
          value={updateForm.image}
          name='image'
          placeholder='Image URL'
          onChange={handleChange}
        />
        <input 
          type='text'
          value={updateForm.title}
          name='title'
          placeholder='Title'
          onChange={handleChange}
        />
        <input type='Submit' value="Update Person" />
      </form>
    </div>
  )
}

export default Show