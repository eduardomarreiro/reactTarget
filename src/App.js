import React from 'react';
import { useEffect, useEffectFrom, useState } from 'react';
import './App.css';
import'bootstrap/dist/css/bootstrap.min.css';
import axios from'axios';
import{Modal,ModalBody,ModalFooter,ModalHeader}from'reactstrap';




function App() {

  const baseUrl = "https://localhost:44316/api/person";

  const [data, setData] = useState([]);

  const askGet = async() => {
    await axios.get(baseUrl)
    .then(response => {
      setData(response.data);
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
        
        <button className="btn btn-success">Add person</button> 
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
    </div>
  );
}

export default App;
