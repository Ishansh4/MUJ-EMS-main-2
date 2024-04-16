import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Admin.css"

import { Link } from 'react-router-dom';

const Admin = () => {
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [showAddStudentModal, setShowAddStudentModal] = useState(false);
    const [showAddElectiveModal, setShowAddElectiveModal] = useState(false);
    const [studentName, setStudentName] = useState('');
    const [regNo, setRegNo] = useState('');
    const [programElective, setProgramElective] = useState('');
    const [branch, setBranch] = useState('');
    const [elective, setElective] = useState('');
    const [seats, setSeats] = useState('');
    const [description, setDescription] = useState('');
    const [faculty, setFaculty] = useState('');
    const [facultyId, setFacultyId] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query

    const openAddStudentModal = () => setShowAddStudentModal(true);
    const closeAddStudentModal = () => setShowAddStudentModal(false);

    const openAddElectiveModal = () => setShowAddElectiveModal(true);
    const closeAddElectiveModal = () => setShowAddElectiveModal(false);
    const handleAddElective = async (e) => {
        e.preventDefault();

        if (!branch || !elective || !seats || !description || !faculty || !facultyId) {
            alert('Please fill in all fields');
            return;
        }
        const newElective = {
            _id: data3.length + 1,
            serial: data3.length + 1,
            name: branch, // Assuming this is where you store the branch
            field: elective, // Assuming this is where you store the elective
            totalseats: seats, // Assuming this is where you store the seats
            description: description,
            faculty: faculty,
            faculty_id: facultyId
        };

        setBranch('');
        setElective('');
        setSeats('');
        setDescription('');
        setFaculty('');
        setFacultyId('');

        closeAddElectiveModal();
        setData3([...data3, newElective]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate form inputs
        if (!studentName || !regNo || !programElective || !branch) {
            alert('Please fill in all fields');
            return;
        }

        const newStudent = {
            _id: data.length + 1,
            serial: data.length + 1,
            name: studentName,
            regno: regNo,
            selectedName: branch,
            selectedField: programElective
        };

        setData([...data, newStudent]);
        setStudentName('');
        setRegNo('');
        setBranch('');
        setProgramElective('');

        closeAddStudentModal();
    };

    useEffect(() => {
        fetchData();
        fetchData2();
        fetchData3();
    }, []);



    async function fetchData() {
        try {
            const response = await axios.post("http://localhost:8000/sendData2", {});
            if (response.data === "fail") {
                alert("Failed to fetch data");
            } else {
                setData(response.data.map((item, index) => ({ ...item, serial: index + 1 })));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function fetchData2() {
        try {
            const response = await axios.post("http://localhost:8000/sendData3", {});
            if (response.data === "fail") {
                alert("Failed to fetch data");
            } else {
                setData2(response.data.map((item, index) => ({ ...item, serial: index + 1 })));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    async function fetchData3() {
        try {
            const response = await axios.post("http://localhost:8000/sendData4", {});
            if (response.data === "fail") {
                alert("Failed to fetch data");
            } else {
                setData3(response.data.map((item, index) => ({ ...item, serial: index + 1 })));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleReplaceField = async (name, newField) => {
        try {
            const updatedData = data.map(item => {
                if (item.name === name) {
                    return { ...item, selectedField: newField };
                }
                return item;
            });

            setData(updatedData);

            const filteredData2 = data2.filter(item => item.name !== name);
            setData2(filteredData2);

            // Send updated data to the server to update the database
            await axios.post("http://localhost:8000/updateData", { name, newField });

            alert("Data is updated successfully!");

        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const downloadDataFile = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + data.map(item => Object.values(item).join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "student_data.csv");
        document.body.appendChild(link);
        link.click();
    };

    const filteredData = data.filter(item => {
        // Check if either the name or the selectedName or selectedField includes the searchQuery
        return (
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.selectedName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.selectedField.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <div>
            <nav className="navbar">
                <div className="left">
                    <img src="Manipal University1679046981_upload_logo.jpg" alt="Logo" className="logo" />
                    <ul className="menu">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#student-list">Student List</a></li>
                        <li><a href="#server-status">Server Status</a></li>
                        <li><a href="#logout">Log Out</a></li>
                    </ul>
                </div>
                <div className="right">
                    <h1>Admin Panel</h1>
                </div>
            </nav>

            <div className="side-panel">

                <button className="nav-button" onClick={openAddStudentModal}>Add Student</button>

                {showAddStudentModal && (
                    <div className="modal-wrapper">
                        <div className="modal">
                            <span className="close" onClick={closeAddStudentModal}>&times;</span>
                            <h2><strong>Student Details</strong></h2>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="studentName">Student Name:</label>
                                <input type="text" id="studentName" name="studentName" value={studentName} onChange={(e) => setStudentName(e.target.value)} required /><br />

                                <label htmlFor="regNo">Registration No:</label>
                                <input type="text" id="regNo" name="regNo" value={regNo} onChange={(e) => setRegNo(e.target.value)} required /><br />

                                <label htmlFor="branch">Branch:</label>
                                <input type="text" id="branch" name="branch" value={branch} onChange={(e) => setBranch(e.target.value)} required /><br />

                                <label htmlFor="programElective">Program Elective:</label>
                                <input type="text" id="programElective" name="programElective" value={programElective} onChange={(e) => setProgramElective(e.target.value)} required /><br />

                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                )}

                <button className="nav-button" onClick={openAddElectiveModal}>
                    Add Elective
                </button>

                {showAddElectiveModal && (
                    <div className="modal">
                        <span className="close" onClick={closeAddElectiveModal}>&times;</span>
                        <h2><strong>Add Elective</strong></h2>
                        <form onSubmit={handleAddElective}>
                            <label htmlFor="branch">Branch:</label>
                            <input type="text" id="branch" name="branch" value={branch} onChange={(e) => setBranch(e.target.value)} required /><br />

                            <label htmlFor="elective">Elective:</label>
                            <input type="text" id="elective" name="elective" value={elective} onChange={(e) => setElective(e.target.value)} required /><br />

                            <label htmlFor="seats">Seats:</label>
                            <input type="number" id="seats" name="seats" value={seats} onChange={(e) => setSeats(e.target.value)} required /><br />

                            <label htmlFor="description">Description:</label>
                            <input type="text" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required /><br />

                            <label htmlFor="faculty">Faculty:</label>
                            <input type="text" id="faculty" name="faculty" value={faculty} onChange={(e) => setFaculty(e.target.value)} required /><br />

                            <label htmlFor="facultyId">Faculty ID:</label>
                            <input type="text" id="facultyId" name="facultyId" value={facultyId} onChange={(e) => setFacultyId(e.target.value)} required /><br />


                            <button type="submit">Submit</button>
                        </form>
                    </div>
                )}

                <button className="nav-button" onClick={downloadDataFile}>
                    Download List
                </button>
                <button className="nav-button">
                    <Link to="/faculty" className="nav-button">Assign Faculty</Link>
                </button>
                <button className="nav-button" >
                    Send Reminder
                </button>

                <h3>Dynamic Search</h3>

                <input  className='sera' type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

                

            </div>

            <div className="main-content">
                <div className="stu">
                    <h2>Student Master Data</h2>
                    <div className="inside">
                        <table>
                            <thead>
                                <tr>
                                    <th>S.no</th>
                                    <th>Name</th>
                                    <th>Registration Number</th>
                                    <th>Branch</th>
                                    <th>Open Elective</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map(e => (
                                    <tr key={e._id}>
                                        <td>{e.serial}</td>
                                        <td>{e.name}</td>
                                        <td>{e.regno}</td>
                                        <td>{e.selectedName}</td>
                                        <td>{e.selectedField}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="stu2">
                    <h2>Student Change Request</h2>
                    <div className="inside2">
                        <table>
                            <thead>
                                <tr>
                                    <th>S.no</th>
                                    <th>Name</th>
                                    <th>Registration Number</th>
                                    <th>Old Elective</th>
                                    <th>New Elective</th>
                                    <th>Change it Now</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data2.map(m => (
                                    <tr key={m._id}>
                                        <td>{m.serial}</td>
                                        <td>{m.name}</td>
                                        <td>{m.regno}</td>
                                        <td>{m.selectedField}</td>
                                        <td>{m.newselectedField}</td>
                                        <td>
                                            <button className='change-button' onClick={() => handleReplaceField(m.name, m.newselectedField)}>Change</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="stu3">
                    <h2>Open Electives</h2>
                    <div className="inside3">
                        <table>
                            <thead>
                                <tr>
                                    <th>S.no</th>
                                    <th>Branch</th>
                                    <th>Elective</th>
                                    <th>Seats</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data3.map((n, index) => (
                                    <tr key={index}>
                                        <td>{n.serial}</td>
                                        <td>{n.name}</td>
                                        <td>{n.field}</td>
                                        <td>{n.totalseats}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Admin;
