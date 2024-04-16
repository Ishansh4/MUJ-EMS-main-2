import React, { useEffect, useState } from "react";
import "./Trial.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';



const Trial = () => {
  const history = useNavigate();
  const location = useLocation();
  const [name, setName] = useState(location.state?.name || "");
  const [regno, setRegno] = useState(location.state?.regno || "");
  const [cgpa, setCGPA] = useState(""); // Added CGPA state
  const [data, setData] = useState([]);
  const [relatedData, setRelatedData] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [newselectedField, setNewSelectedField] = useState("");
  const [totalSeats, setTotalSeats] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showChangeElectiveForm, setShowChangeElectiveForm] = useState(false);
  const [adminRequestSent, setAdminRequestSent] = useState(false);


  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    setName(location.state?.name || "");
    setRegno(location.state?.regno || "");
  }, [location.state]);


  

  async function fetchData() {
    try {
      const response = await axios.post("http://localhost:8000/sendData", {});
      if (response.data === "fail") {
        alert("Failed to fetch data");
      } else {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  async function fetchRelatedData(selectedName) {
    try {
      const response = await axios.post("http://localhost:8000/fetchRelatedData", {
        selectedName: selectedName,
        cgpa: cgpa // Pass CGPA to backend
      });
      if (response.data === "fail") {
        alert("Failed to fetch related data");
      } else {
        setRelatedData(response.data);
      }
    } catch (error) {
      console.error("Error fetching related data:", error);
    }
  }


  const handleSelectChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedName(selectedValue);
    await fetchRelatedData(selectedValue);
  };

  const handleButtonClick = (field) => {
    setSelectedField(selectedField === field ? "" : field);

    const selectedFieldData = relatedData.find((item) => item.field === field);
    if (selectedFieldData) {
      setTotalSeats(selectedFieldData.totalseats);
    }
  };
  const handleButtonClick2 = (field) => {
    setNewSelectedField(field === newselectedField ? "" : field);

    const selectedFieldData = relatedData.find((item) => item.field === field);
    if (selectedFieldData) {
      setTotalSeats(selectedFieldData.totalseats);
    }
  };


  async function submit(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/first", {
        name,
        regno,
        selectedField,
        selectedName,
        totalSeats,
      });
      setFormSubmitted(true);
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data");
    }
  }
  async function submit2(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/second", {
        name,
        regno,
        selectedField,
        newselectedField
      });
      setAdminRequestSent(true); // Update state when admin request is sent
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data");
    }
  }

  const clearForm = () => {
    setName("");
    setRegno("");
    setSelectedName("");
    setSelectedField("");
    setRelatedData([]);
    setTotalSeats(0);
    setFormSubmitted(false);
  };

  const handleOpenElectiveChange = () => {
    setShowChangeElectiveForm(true);
  };


  return (
    <div className="container">
      <div>
        <h2><strong>{formSubmitted ? "Form Submitted Successfully!" : "Open Elective Form"}</strong></h2>
        {!formSubmitted && !adminRequestSent && (
          <form onSubmit={submit}>
            <div className="input-container">
              <label>Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            </div>
            <div className="input-container">
              <label>Registration Number</label>
              <input type="text" value={regno} onChange={(e) => setRegno(e.target.value)} placeholder="Regno" />
            </div>
            <div className="input-container">
              <label>CGPA</label>
              <input type="text" value={cgpa} onChange={(e) => setCGPA(e.target.value)} placeholder="CGPA" />
            </div>
            <div className="select-container">
              <label><strong>Select Branch</strong></label>
              <select value={selectedName} onChange={handleSelectChange}>
                <option value="">Select a name</option>
                {data.map((e) => (
                  <option key={e._id} value={e.name}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="radio-container">
              {relatedData.length > 0 && (
                <div>
                  {relatedData.map((e, index) => (
                    <div key={index}>
                      <button
                        className={selectedField === e.field ? "selected" : ""}
                        onClick={() => handleButtonClick(e.field)}
                        type="button" // Prevent form submission
                      >
                        {e.field} ({e.totalseats} seats)
                      </button>
                      {selectedField === e.field && (
                        <div className="description">
                          <h2>{e.field}</h2>
                          <p>{e.description}</p>
                          <h5>Faculty : {e.faculty}</h5>
                          <h5>Email ID : {e.faculty_id}</h5>

                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="button-container">
              <button type="submit" onSubmit={submit}>Submit</button>
            </div>
          </form>
        )}
        {formSubmitted && !adminRequestSent && (
          <div className="button-container">
            <button onClick={handleOpenElectiveChange}>Change Open Elective</button>
          </div>
        )}
        {adminRequestSent && (
          <div>
            <p>Request sent to the admin.</p>
            <div className="button-container">
              <button onClick={() => history("/home")}>Go Back to Home</button>
            </div>
          </div>
        )}
      </div>
      {showChangeElectiveForm && (
        <div>
          <h2>Change Open Elective</h2>
          <form onSubmit={submit2}>
            <div className="input-container">
              <label>Existing Elective Choice</label>
              <input
                type="text"
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                placeholder="New Elective"
              />
            </div>
            <div className="radio-container">
              {relatedData.length > 0 && (
                <div>
                  {relatedData.map((e, index) => (
                    <div key={index}>
                      <button
                        className={newselectedField === e.field ? "selected" : ""}
                        onClick={() => handleButtonClick2(e.field)}
                        type="button"
                      >
                        {e.field} ({e.totalseats} seats)
                      </button>
                      {newselectedField === e.field && (
                        <div className="description">
                          <h2>{e.field}</h2>
                          <p>{e.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="button-container">
              <button className="elebun" type="submit">Submit</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Trial;