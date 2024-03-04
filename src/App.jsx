import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

const App = () => {
  const [student, setStudent] = useState(null);

  const email = useRef();
  const name = useRef();
  const age = useRef();

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/students')
      .then((res) => {
        console.log(res.data.student)
        setStudent(res.data.student)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])



  const addStudent = (event) => {
    event.preventDefault()
    console.log(typeof +age.current.value)
    axios.post('http://localhost:3000/api/v1/students', {
      email: email.current.value,
      age: +age.current.value,
      name: name.current.value
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }

  const getSingleStudent = (id) => {
    axios.get(`http://localhost:3000/api/v1/students/${id}`)
      .then((res) => {
        console.log(res.data.student);
      }).catch((err) => {
        console.log(err);
      })
  }

  return (
    <>
      <div style={{textAlign: 'center', margin: '100px'}}>
    <h1>Crud Practice</h1>
      <form onSubmit={addStudent}>
        <h3 style={{marginRight:'150px'}}>Name</h3>
        <input style={{padding:'5px 15px', borderRadius:'9px'}} type="text" placeholder='name' ref={name} /><br /><br />
        <h3 style={{marginRight:'150px'}}>Email</h3>
        <input style={{padding:'5px 15px', borderRadius:'9px'}} type="email" placeholder='email' ref={email} /><br /><br />
        <h3 style={{marginRight:'150px'}}>Age</h3>
        <input style={{padding:'5px 15px', borderRadius:'9px'}} type="number" placeholder='age' ref={age} /><br /><br />
        <button type='submit'>addStudent</button>
      </form>
      {student ? student.map((item) => {
        return <h1 style={{ cursor: 'pointer'  }} onClick={() => getSingleStudent(item._id)} key={item._id}> {item.name}</h1>
      }) : <h1>Loading...</h1>}
      </div>
    </>
  )
}

export default App