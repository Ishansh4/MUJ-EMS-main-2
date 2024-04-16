import SidePanel from './SidePanel';
import './Home.css';
import { useLocation, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const { Sname, regNo } = state || {};

  const handleSelectOpenElective = () => {
    navigate("/first");
  };

  const handleChangeOpenElective = () => {
    navigate("/second");
  };
  const handleChangeOpenElective2 = () => {
    navigate("/assign");
  };

  return (
    <div className="whole">
      <div className="nav">
        <nav>
          <img className='logo' src="Manipal University1679046981_upload_logo.jpg" alt="img" />
          <ul>
            <li>
              Report
            </li>
            <input className='serachbar' type="text" placeholder='Search' style={{ borderRadius: 50 }} />
              <img src="3135715.png" alt="pro" className="pro" />
              {Sname && <h2>{Sname}</h2>}
              {regNo && <h3>{regNo}</h3>}

          </ul>
        </nav>
      </div>
      <div className="side">
        <SidePanel/>
      </div>
      <div className="ch">
        <h1 className='go'>Elective Management System</h1>
        <div>
                    {/* Display name and registration number if available */}
                    {Sname && <p>Name: {Sname}</p>}
                    {regNo && <p>Registration No: {regNo}</p>}
                </div>
        <ul className='list'>
          <li>
            <button onClick={handleSelectOpenElective}>Select An Open Elective</button>
          </li>
          <li>
            <button onClick={handleSelectOpenElective}>Change Open Elective</button>
          </li>
          <li>
            <button onClick={handleChangeOpenElective2}>Upload Assignment</button>
          </li>
          <li>
            <button onClick={handleChangeOpenElective2}>Manage Elective</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
