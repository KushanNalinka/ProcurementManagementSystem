import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
  getDoc,
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
} from "firebase/firestore";
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";
import "./Divide.scss";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DevideOrders() {
  const [newAmount, setNewAmount] = useState("");
  const [newDateOfOrder, setNewDateOfOrder] = useState("");
  const [newDateToBeDelive, setNewDateToBeDelive] = useState("");
  const [newItem, setNewItem] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newMax, setNewMax] = useState("");
  const [newMin, setNewMin] = useState("");
  const [newOrderId, setNewOrderId] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newSiteId, setNewSiteId] = useState("");
  const [newSiteManagerId, setNewSiteManagerId] = useState("");
  const [newSiteName, setNewSiteName] = useState("");
  const [newSupplierId, setNewSupplierId] = useState("");
  const [newSupplierName, setNewSupplierName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newIsApproved, setNewIsApproved] = useState("");
 

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    loadUserDetails();
  }, [id]);

 

  const loadUserDetails = async () => {
    const supplierDocRef = doc(db, "order", id);
    const docSnapshot = await getDoc(supplierDocRef);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      setNewDateOfOrder(data.dateoforder);
      setNewDateToBeDelive(data.datetobedelive);
      setNewSiteManagerId(data.sitemanagerId);
      setNewSiteName(data.sitename);
      setNewDescription(data.description);
      setNewItem(data.item);
      setNewQuantity(data.quantity);
      setNewMin(data.min);
      setNewMax(data.max);
      
    }
  };
 

 

  const sitesCollectionRef = collection(db, "approvedorder");

  const editUserDetails = async () => {
    try {
      await addDoc(sitesCollectionRef, {
        orderId:newOrderId,
        siteid:newSiteId,
        sitename:newSiteName,
        location:newLocation,
        supplierId:newSupplierId,
        suppliername:newSupplierName,
        sitemanagerId:newSiteManagerId,
        dateoforder:newDateOfOrder,
        datetobedelive:newDateToBeDelive,
        amount:newAmount,
      });
      
    } catch (err) {
      console.error(err);
    }

   
    const supplierDocRef = doc(db, "order", id);
    // Use updateDoc to add the "approved" attribute to the document
    try {
      await updateDoc(supplierDocRef, { approved: newIsApproved });
    } catch (err) {
      console.error(err);
    }

    navigate('/viewapprovedorders');
  };
  
  const handleSubmit = (e) => {
  e.preventDefault();
  let errors = [];

  if (!newSiteId.match(/^SITE\d{4}$/)) {
    errors.push('Site Id must be in the format SITExxxx, where xxxx is a 4-digit number.');
  }

  if (!newOrderId.match(/^ORDER[A-Z]{2}\d{4}$/)) {
    errors.push('Order Id must be in the format ORDERXXxxxx, where XX are two letters and xxxx is a 4-digit number.');
  }

  if (!newSupplierId.match(/^SUP\d{4}$/)) {
    errors.push('Supplier Id must be in the format SUPxxxx, where xxxx is a 4-digit number.');
  }

  if (errors.length > 0) {
    // Display error messages as pop-up alerts
    errors.forEach((error) => {
      toast.error(error, {
        position: 'top-right',
        autoClose: 60000, // Auto close the alert after 5 seconds
      });
    });
  } else {
    // No errors, proceed with the form submission
    editUserDetails();
  }
};


  return (
    <div className="hom">
      <Sidebar />
      <div className="homeCon">
        <Navbar />

        <div className="Inpu">
        <div>
          <form onSubmit={handleSubmit}>
            <div class="formInputs1">
              
              <h1>APPROVING THE PLACED ORDER</h1>
    

        <h1 > Name of the Site: {newSiteName} </h1>
              <p> Site Manager Id   :    {newSiteManagerId} </p>
              <p>  Date of the Order Placed    :     {newDateOfOrder}</p>
              <p>  Date of the Order Should be Received    :     {newDateToBeDelive}</p>
              <p>  Items need    :     {newItem}</p>
              <p>  Quantity need   :     {newQuantity}</p>
              <p>  Max Price   :    {newMax}</p>
              <p>  Min  Price  :   {newMin}</p>
              <p>  Description of the order: {newDescription}</p>
              <ToastContainer position="top-right" autoClose={5000} />
    
          <input
            placeholder="Site Id"
            onChange={(e) => setNewSiteId(e.target.value)}
          />
          <input
            placeholder="Location"
            onChange={(e) => setNewLocation(e.target.value)}
          />
          <input
            placeholder="Order Id"
            onChange={(e) => setNewOrderId(e.target.value)}
          />
          <input
            placeholder="Total Amount"
            onChange={(e) => setNewAmount(e.target.value)}
          />
          <input
            placeholder="Supplier Id"
            onChange={(e) => setNewSupplierId(e.target.value)}
          />
          <input
            placeholder="Supplier Name"
            onChange={(e) => setNewSupplierName(e.target.value)}
          />
          <input
          
            placeholder="Is approved"
            onChange={(e) => setNewIsApproved(e.target.value)}
          />
          <br/>
          <label> I Trust this Order.....</label>
          <br/>
          
          <button class="btn1"> Place ORDER</button>
        </div>
        </form>
        <br/>
          <Link to={`/vieworders`}>
          <button class="btn2">View Orders </button>
      </Link>
        </div>
        </div>
        </div>
        </div>
  );
}
export default DevideOrders;
