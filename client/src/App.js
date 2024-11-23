import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      setEmployeeList((prevList) => [
        ...prevList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const updateEmployeeWage = (id, newWage) => {
    Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: val.position,
                  wage: newWage,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div className="App">
      <header className="navbar">
        <h1>Employee Management System</h1>
      </header>
      <div className="container">
        <div className="form-container">
          <h2>Add New Employee</h2>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <label>Age:</label>
          <input
            type="number"
            placeholder="Enter age"
            onChange={(event) => {
              setAge(parseInt(event.target.value));
            }}
          />
          <label>Country:</label>
          <input
            type="text"
            placeholder="Enter country"
            onChange={(event) => {
              setCountry(event.target.value);
            }}
          />
          <label>Position:</label>
          <input
            type="text"
            placeholder="Enter position"
            onChange={(event) => {
              setPosition(event.target.value);
            }}
          />
          <label>Wage (per year):</label>
          <input
            type="number"
            placeholder="Enter wage"
            onChange={(event) => {
              setWage(parseFloat(event.target.value));
            }}
          />
          <button className="btn primary-btn" onClick={addEmployee}>
            Add Employee
          </button>
        </div>

        <div className="employees-container">
          <button className="btn secondary-btn" onClick={getEmployees}>
            Show Employees
          </button>
          <div className="employee-cards">
            {employeeList.map((val, key) => (
              <div className="employee-card" key={val.id || key}>
                <div className="employee-info">
                  <h3>{val.name}</h3>
                  <p>
                    <b>Age:</b> {val.age}
                  </p>
                  <p>
                    <b>Country:</b> {val.country}
                  </p>
                  <p>
                    <b>Position:</b> {val.position}
                  </p>
                  <p>
                    <b>Wage:</b> ${val.wage}
                  </p>
                </div>
                <div className="employee-actions">
                  <input
                    type="text"
                    placeholder="Enter new wage"
                    onChange={(event) => {
                      setNewWage(event.target.value);
                    }}
                  />
                  <button
                    className="btn primary-btn"
                    onClick={() => {
                      updateEmployeeWage(val.id, parseFloat(newWage));
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="btn danger-btn"
                    onClick={() => {
                      deleteEmployee(val.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <img
        src={require("./images/image.png")}
        alt="Employees"
        className="employee-image"
      />

      <div className="creator-names">
        <b>Created by: </b>
        <br />
        <b> Kajal Sinha (2022UG1049)</b>
        <br />
        <b>Shakti Priya (2022UG1041)</b>
      </div>
    </div>
  );
}

export default App;
