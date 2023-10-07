import {useEffect, useState} from 'react'
import {Routes, Route} from 'react-router-dom'
import Index from '../pages/Index'
import Show from '../pages/Show'

const URL = "http://localhost:3001/people/";

const Main = (props) => {
  const [people, setPeople] = useState(null)
  const [person, setPerson] = useState(undefined)

  const findPerson = (id) => {
    setPerson(people.find((p) => {
      return p._id === id
    }))
  }

  const getPeople = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    setPeople(data)
  }

  const createPeople = async (person) => {
    const response = await fetch(URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(person)
    })
    const createdPerson = await response.json()
    setPeople((prev) => [...prev, createdPerson])
  }

  const updatePeople = async (person, id) => {
    await fetch(URL + id, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(person)
    })
    await getPeople()
    findPerson(id)
  }

  const deletePeople = async (id) => {
    await fetch(URL+id, {
      method: 'delete'
    })
    getPeople()
  }

  useEffect(() => {
    getPeople()
  }, [])

  return(
    <main>
      <Routes>
        <Route path='/' element={
            <Index 
              people={people} 
              createPeople={createPeople}
              findPerson={findPerson}
            />
          } 
        />
        <Route 
          path='/people/:id' 
          element={
            <Show 
              person={person}
              updatePeople={updatePeople}
              deletePeople={deletePeople}
            />
          } 
        />
      </Routes>
    </main>
  )
}

export default Main