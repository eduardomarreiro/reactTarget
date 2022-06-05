import React from 'react';
import { useEffect, useEffectFrom, useState } from 'react';

import './App.css';
import'bootstrap/dist/css/bootstrap.min.css';
import axios from'axios';
import{Modal, ModalBody, ModalFooter, ModalHeader}from 'reactstrap';


function App() {

  const baseUrl = "https://localhost:44316/api/person";

  const [data, setData] = useState([]);
  const [includeModal, setIncludeModal] = useState(false);

  const[selectedPerson, setSelectedPerson]=useState(
    {
       Id: '', 
       Username: '',
       FullName: '',
       Born: '',
       Email: '',
       Phone: ''
    })

    const openCloseIncludeModal=()=>{
      setIncludeModal(!includeModal);
    }

    const handleChange=e=>{
        const{name,value}=e.target;
        setSelectedPerson({
          ...selectedPerson,[name]:value,
          [name]:value
       });
        console.log(selectedPerson);
     }

  const askGet = async() => {
    await axios.get(baseUrl)
    .then(response => {
      setData(response.data);
    }).catch(error =>{
      console.log(error);
    })
  }

  const askPost = async()=>{
    delete selectedPerson.Id;
    selectedPerson.Born=parseInt(selectedPerson.Born);
    await axios.post(baseUrl, selectedPerson)
    .then(response => {
      setData(data.concat(response.data));
      openCloseIncludeModal();
    }).catch(error =>{
      console.log(error);
    })
  }

  useEffect(() =>{
    askGet();
  })


  return (
    <div className="App">
      <br/>
      <h3>Person registration</h3>
      <header>
        
        <button className="btn btn-success" onClick={()=> openCloseIncludeModal()}>Add new person</button> 
      </header>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>FullName</th>
            <th>Born</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
        {data.map(person=>(
        <tr key={person.Id}>
          <td>{person.Id}</td>
          <td>{person.Username}</td>
          <td>{person.FullName}</td>
          <td>{person.Born}</td>
          <td>{person.Email}</td>
          <td>{person.Phone}</td>
          <td>
            <button className="btn btn-primary">Edit</button>{""}
            <button className="btn btn-danger">Delete</button>
          </td>
        </tr>
        ))}
        </tbody>
      </table>
      <Modal isOpen={includeModal}>
      <ModalHeader>Add person</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Username:</label>
          <br />
          <input type="text"className="form-control" name="Username" onChange={handleChange}/>
          <br />
          <label>FullName:</label>
            <br/>
          <input type="text"className="form-control" name="FullName" onChange={handleChange}/>
          <br />
          <label>Born:</label>
          <br />
          <input type="text"className="form-control" name="Born" onChange={handleChange}/>
          <br />
          <label>Email:</label>
          <br />
          <input type="text"className="form-control" name="Email" onChange={handleChange}/>
          <br />
          <label>Phone:</label>
          <br />
          <input type="text"className="form-control" name="Phone" onChange={handleChange}/>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>askPost()}>Add</button>{""}
        <button className="btn btn-danger" onClick={()=>openCloseIncludeModal()}>Cancel</button>
      </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
