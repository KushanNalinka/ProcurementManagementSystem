import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";
import "./Payment.scss";

function SitesEdit() {
  const [newSiteId, setNewSiteId] = useState("");
  const [newName, setNewName] = useState("");
  const [newStartDate, setNewStartDate] = useState(""); // Initialize with an empty string
  const [newLocation, setNewLocation] = useState("");
  const [newSiteHeadId, setNewSiteHeadId] = useState("");
  const [newCost, setNewCost] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    loadUserDetails();
  }, [id]);

  const loadUserDetails = async () => {
    const movieDocRef = doc(db, "site", id);
    const docSnapshot = await getDoc(movieDocRef);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      setNewSiteId(data.siteid);
      setNewName(data.sitename);
      setNewStartDate(data.startdate || ""); // Initialize with an empty string
      setNewLocation(data.location);
      setNewSiteHeadId(data.siteheadid);
      setNewCost(data.cost);
      setNewDescription(data.description);
      setNewEndDate(data.enddate);
    }
  };
  const editUserDetails = async () => {
    const movieDocRef = doc(db, "site", id);
    try {
      await updateDoc(movieDocRef, {
        siteid: newSiteId,
        sitename: newName,
        startdate: newStartDate,
        location: newLocation,
        siteheadid: newSiteHeadId,
        cost: newCost,
        description: newDescription,
        enddate: newEndDate,
      });
      navigate('/siteview');
    } catch (error) {
      console.error("Error updating document:", error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    editUserDetails();
    }
  
  return (
    <div className="homesn1">
      <Sidebar />
      <div className="homeContainern1">
        <Navbar />

        <div className="Inputs1">
        <div>


   <form onSubmit={handleSubmit}>
   <div class="formInputs1">
        <input
          placeholder="Site Id"
          value={newSiteId}
          onChange={(e) => setNewSiteId(e.target.value)}
        />
        <input
          placeholder="Site Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          placeholder="Site Start Date"
          value={newStartDate}
          onChange={(e) => setNewStartDate(e.target.value)}
        />
        <input
          placeholder="Site Location"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
        />
        <input
          placeholder="Site Head Id"
          value={newSiteHeadId}
          onChange={(e) => setNewSiteHeadId(e.target.value)}
        />
        <input
          placeholder="Site Total Cost"
          value={newCost}
          onChange={(e) => setNewCost(e.target.value)}
        />
        <input
          placeholder="Site Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <input
          placeholder="Site End Date"
          value={newEndDate}
          onChange={(e) => setNewEndDate(e.target.value)}
        />
        <button class="btn1">Edit Site Details</button>
       
      </div>
   

    </form>
          <br/>
    <Link to={`/siteview`}>
          <button class="btn2">GO BACK </button>
      </Link>

    </div>
    </div>
    
    </div>
    </div>
  );
}

export default SitesEdit;
