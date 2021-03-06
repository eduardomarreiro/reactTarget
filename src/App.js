import React from 'react';
import { useEffect, useState } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


function App() {

  const baseUrl = "https://localhost:44316/api/person";

  const [data, setData] = useState([]);
  const [updateData, seUpdateData] = useState(true);

  const [includeModal, setIncludeModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedPerson, setSelectedPerson] = useState(
    {
      Id: '',
      Username: '',
      FullName: '',
      Born: '',
      Email: '',
      Phone: ''
    })

  const selectPerson = (person, option) => {
    setSelectedPerson(person);
    (option === "Edit") ?
      openCloseEditModal() : openCloseDeleteModal();
  }

  const openCloseIncludeModal = () => {
    setIncludeModal(!includeModal);
  }

  const openCloseEditModal = () => {
    setEditModal(!editModal);
  }

  const openCloseDeleteModal = () => {
    setDeleteModal(!deleteModal);
  }


  const handleChange = e => {
    const { name, value } = e.target;
    setSelectedPerson({
      ...selectedPerson, [name]: value,
      [name]: value
    });
    console.log(selectedPerson);
  }

  const askGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  const askPost = async () => {
    delete selectedPerson.Id;
    selectedPerson.Born = parseInt(selectedPerson.Born);
    await axios.post(baseUrl, selectedPerson)
      .then(response => {
        setData(data.concat(response.data));
        seUpdateData(true);
        openCloseIncludeModal();
      }).catch(error => {
        console.log(error);
      })
  }

  const askPut = async () => {
    selectedPerson.Born = parseInt(selectedPerson.Born);
    await axios.put(baseUrl + "/" + selectedPerson.Id, selectedPerson)
      .then(response => {
        var answer = response.data;
        var additionalData = data;
        additionalData.map(person => {
          if (person.Id === selectedPerson.Id) {
            person.Username = answer.Username;
            person.FullName = answer.FullName;
            person.Born = answer.Born;
            person.Email = answer.Email;
            person.Phone = answer.Phone;
          }
          console.log("response")
        });
        seUpdateData(true);
        openCloseEditModal();
      }).catch(error => {
        console.log(error);
      })
  }


  const askDelete = async() =>{
    await axios.delete(baseUrl + "?id=" + selectedPerson.Id)
    .then(response =>{
      setData(data.filter(person => person.Id !== response.data));
      seUpdateData(true);
        openCloseDeleteModal();
    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    if(updateData){
      askGet();
      seUpdateData(false);
    }
  }, [updateData])


  return (
    <div className="App">
      <br />
      <h3>Person registration</h3>
      <header>

        <button className="btn btn-success" onClick={() => openCloseIncludeModal()}>Add new person</button>
      </header><br/>
      <div class="card rounded shadow-sm p-3 ">
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
          {data.map(person => (
            <tr key={person.Id}>
              <td>{person.Id}</td>
              <td>{person.Username}</td>
              <td>{person.FullName}</td>
              <td>{person.Born}</td>
              <td>{person.Email}</td>
              <td>{person.Phone}</td>
              <td>
                <button className="btn btn-primary" onClick={() => selectPerson(person, "Edit")}>Edit</button>{" "}
                <button className="btn btn-danger" onClick={() => selectPerson(person, "Delete")}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      </div>
      <Modal isOpen={includeModal}>
        <ModalHeader>Add person</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Username:</label>
            <br />
            <input type="text" className="form-control" name="Username" onChange={handleChange} />
            <br />
            <label>FullName:</label>
            <br />
            <input type="text" className="form-control" name="FullName" onChange={handleChange} />
            <br />
            <label>Born:</label>
            <br />
            <input type="text" className="form-control" name="Born" onChange={handleChange} />
            <br />
            <label>Email:</label>
            <br />
            <input type="text" className="form-control" name="Email" onChange={handleChange} />
            <br />
            <label>Phone:</label>
            <br />
            <input type="text" className="form-control" name="Phone" onChange={handleChange} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => askPost()}>Add</button>{""}
          <button className="btn btn-danger" onClick={() => openCloseIncludeModal()}>Cancel</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={editModal}>
        <ModalHeader>Edit person</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Id:</label><br />
            <input type="text" className="form-control" readOnly defaultValue={selectedPerson && selectedPerson.Id} />
            <label>Username:</label>
            <br />
            <input type="text" className="form-control" name="Username" onChange={handleChange}
              defaultValue={selectedPerson && selectedPerson.Username} />
            <br />
            <label>FullName:</label>
            <br />
            <input type="text" className="form-control" name="FullName" onChange={handleChange}
              defaultValue={selectedPerson && selectedPerson.FullName} />
            <br />
            <label>Born:</label>
            <br />
            <input type="text" className="form-control" name="Born" onChange={handleChange}
              defaultValue={selectedPerson && selectedPerson.Born} />
            <br />
            <label>Email:</label>
            <br />
            <input type="text" className="form-control" name="Email" onChange={handleChange}
              defaultValue={selectedPerson && selectedPerson.Email} />
            <br />
            <label>Phone:</label>
            <br />
            <input type="text" className="form-control" name="Phone" onChange={handleChange}
              defaultValue={selectedPerson && selectedPerson.Phone} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => askPut()}>Edit</button>{""}
          <button className="btn btn-danger" onClick={() => openCloseEditModal()}>Cancel</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={deleteModal}>
        <ModalBody>
          Are you sure you want to delete this person : {selectedPerson && selectedPerson.Username} ?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>askDelete()}>Yes</button>
          <button className="btn btn-secondary" onClick={() => openCloseDeleteModal()}>No</button>
        </ModalFooter>

      </Modal>

    </div>
  );
}

export default App;
