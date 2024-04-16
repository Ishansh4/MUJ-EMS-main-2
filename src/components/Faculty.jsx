import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Admin.css"
import "./Faculty.css"

const Faculty = () => {
    const [data, setData] = useState([]);
    const [numGroups, setNumGroups] = useState(1); // State to hold the number of groups
    const [facultyNames, setFacultyNames] = useState([]); // State to hold the names of faculty for each group
    const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query
    const [openElective, setOpenElective] = useState(''); // State to hold the entered open elective
    const [filteredAndAssignedData, setFilteredAndAssignedData] = useState([]); // State to hold the filtered and assigned data
    const [facultyAssignments, setFacultyAssignments] = useState({}); // State to hold the faculty assignments

    useEffect(() => {
        fetchData();
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

    const filteredData = data.filter(item => {
        // Check if either the name or the selectedName or selectedField includes the searchQuery
        return (
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.selectedName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.selectedField.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const filteredByOpenElective = data.filter(item => {
        return (
            item.selectedField.toLowerCase().includes(openElective.toLowerCase())
        );
    });

    const handleGroupAssignment = () => {
        const studentsPerGroup = Math.ceil(filteredData.length / numGroups);
        const groups = [];

        for (let i = 0; i < numGroups; i++) {
            const startIndex = i * studentsPerGroup;
            const endIndex = Math.min(startIndex + studentsPerGroup, filteredData.length);
            const groupStudents = filteredData.slice(startIndex, endIndex);

            const facultyName = facultyNames[i] || 'No Faculty Assigned';

            groupStudents.forEach(student => {
                groups.push({ ...student, faculty: facultyName });
            });
        }

        setData(groups);
        setFacultyAssignments({}); // Reset faculty assignments
    };

    useEffect(() => {
        // Assign a new serial number to the filtered data for the second table
        const assignedData = filteredByOpenElective.map((item, index) => ({
            ...item,
            serial: index + 1
        }));

        setFilteredAndAssignedData(assignedData);

        // Divide the filtered data into groups based on the number of faculties
        const studentsPerFaculty = Math.ceil(assignedData.length / numGroups);
        const assignments = {};
        for (let i = 0; i < numGroups; i++) {
            const startIndex = i * studentsPerFaculty;
            const endIndex = Math.min(startIndex + studentsPerFaculty, assignedData.length);
            const facultyName = facultyNames[i] || 'No Faculty Assigned';

            for (let j = startIndex; j < endIndex; j++) {
                assignments[assignedData[j].name] = facultyName;
            }
        }

        setFacultyAssignments(assignments);
    }, [filteredByOpenElective, numGroups, facultyNames]);

    const handleSave = () => {
        // Save the faculty names entered in the first table
        const updatedFacultyAssignments = { ...facultyAssignments };
        Object.keys(facultyAssignments).forEach(name => {
            if (!updatedFacultyAssignments[name]) {
                updatedFacultyAssignments[name] = facultyAssignments[name];
            }
        });

        setFacultyAssignments(updatedFacultyAssignments);

        // Save faculty names to the database
        axios.post('http://localhost:8000/saveFacultyNames', { facultyNames: Object.values(updatedFacultyAssignments) })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error saving faculty names:', error);
            });
    };

    const handleDownload = () => {
        // Function to handle downloading student list
        const filename = 'student_list.csv';
        const csv = convertToCSV(filteredAndAssignedData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            const link = document.createElement("a");
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    };

    const convertToCSV = (data) => {
        const header = Object.keys(data[0]).join(',');
        const body = data.map(obj => {
            return Object.values(obj).join(',');
        });
        return header + '\n' + body.join('\n');
    };

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
                <input
                    type="text"
                    placeholder="Filter by Open Elective"
                    value={openElective}
                    onChange={(e) => setOpenElective(e.target.value)}
                />
                <input
                    type="number"
                    value={numGroups}
                    onChange={(e) => setNumGroups(parseInt(e.target.value))}
                />
                <button onClick={handleGroupAssignment}>Assign Faculty</button>

                {[...Array(numGroups)].map((_, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={`Faculty Name for Group ${index + 1}`}
                        value={facultyNames[index] || ''}
                        onChange={(e) => {
                            const newFacultyNames = [...facultyNames];
                            newFacultyNames[index] = e.target.value;
                            setFacultyNames(newFacultyNames);
                        }}
                    />
                ))}

                <button onClick={handleSave}>Save</button>
                <button onClick={handleDownload}>Download</button>
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
                                    <th>Faculty</th>
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
                                        <td>{facultyAssignments[e.name] || '-'}</td>
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
                                    <th>Branch</th>
                                    <th>Open Elective</th>
                                    <th>Faculty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAndAssignedData.map(m => (
                                    <tr key={m._id}>
                                        <td>{m.serial}</td>
                                        <td>{m.name}</td>
                                        <td>{m.regno}</td>
                                        <td>{m.selectedName}</td>
                                        <td>{m.selectedField}</td>
                                        <td>{m.faculty}</td>
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

export default Faculty;