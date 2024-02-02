import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
  getDoc,
  collection,
  addDoc,
  doc,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";
import "./Payment.scss";

function SitesAdd() {
  const [newSiteId, setNewSiteId] = useState("");
  const [newName, setNewName] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newSiteHeadId, setNewSiteHeadId] = useState("");
  const [newCost, setNewCost] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const navigate = useNavigate();
  
  const sitesCollectionRef = collection(db, "site");

  const editUserDetails = async () => {
    try {
      await addDoc(sitesCollectionRef, {
        siteid: newSiteId,
        sitename: newName,
        startdate: newStartDate,
        location: newLocation,
        siteheadid: newSiteHeadId,
        cost: newCost,
        description: newDescription,
        enddate: newEndDate,
      });
      navigate("/siteview");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the input fields here if needed

    // Check for required fields or other validation logic
    if (newSiteId.trim() === "" || newName.trim() === "") {
      console.log("Site ID and Name are required fields.");
      return;
    }

    // If validation passes, add the site details
    editUserDetails();
  };

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
          required
          onChange={(e) => setNewSiteId(e.target.value)}
        />
        <input
          placeholder="Site Name"
          required
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          placeholder="Site Start Date"
          required
          onChange={(e) => setNewStartDate(e.target.value)}
        />
        <input
          placeholder="Site Location"
          required
          onChange={(e) => setNewLocation(e.target.value)}
        />
        <input
          placeholder="Site Head Id"
          required
          onChange={(e) => setNewSiteHeadId(e.target.value)}
        />
        <input
          placeholder="Site Total Cost"
          required
          onChange={(e) => setNewCost(e.target.value)}
        />
        <input
          placeholder="Site Description"
          required
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <input
          placeholder="Site End Date"
          required
          onChange={(e) => setNewEndDate(e.target.value)}
        />
        <button class="btn1">ADD SITE</button>
       
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

export default SitesAdd;