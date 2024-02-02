import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
  getDoc,
  collection,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";
import "./Payment.scss";

function Payment() {
  const [newSupplierId, setNewSupplierId] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newSupplierName, setNewSupplierName] = useState("");
  const [newAccountNumber, setNewAccountNumber] = useState("");
  const [newBank, setNewBank] = useState("BOC");
  const [newBranch, setNewBranch] = useState("");
  const [newIsApproved, setNewIsApproved] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const [errorMessages, setErrorMessages] = useState({});

  useEffect(() => {
    loadUserDetails();
  }, [id]);

  const loadUserDetails = async () => {
    const supplierDocRef = doc(db, "accounts", id);
    const docSnapshot = await getDoc(supplierDocRef);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      setNewSupplierId(data.supplierId);
      setNewAmount(data.amount);
      setNewSupplierName(data.suppliername);
    }
  };

  const sitesCollectionRef = collection(db, "approvedaccounts");

  const editUserDetails = async () => {
    try {
      await addDoc(sitesCollectionRef, {
        suppliername: newSupplierName,
        supplierId: newSupplierId,
        amount: newAmount,
        accounts: newAccountNumber,
        bank: newBank,
        branch: newBranch,
      });
    } catch (err) {
      console.error(err);
    }
    const supplierDocRef = doc(db, "accounts", id);
    // Use updateDoc to add the "approved" attribute to the document
    try {
      await updateDoc(supplierDocRef, { approved: newIsApproved });
    } catch (err) {
      console.error(err);
    }
    navigate("/invoices");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      editUserDetails();
    }
  };

  const validateForm = () => {
    let isValid = true;

    const validateInput = (input, errorMessage) => {
      if (!input.checkValidity()) {
        isValid = false;
        setErrorMessages((prev) => ({
          ...prev,
          [input.id]: errorMessage,
        }));
      } else {
        setErrorMessages((prev) => ({
          ...prev,
          [input.id]: "",
        }));
      }
    };

    // Regular expression to match the account number format (e.g., 1234-5678-9012)
    const accountNumberRegex = /^\d{4}-\d{4}-\d{4}$/;

    validateInput(document.getElementById("newAmount"), "Amount is required.");
    validateInput(document.getElementById("newAccountNumber"), "Invalid account number.");
    if (!newAccountNumber.match(accountNumberRegex)) {
      isValid = false;
      setErrorMessages((prev) => ({
        ...prev,
        newAccountNumber: "Invalid account number format (e.g., 1234-5678-9012).",
      }));
    }
    validateInput(document.getElementById("newBank"), "This field is required.");
    validateInput(document.getElementById("newBranch"), "This field is required.");

    return isValid;
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
              <h1>MAKE THE PAYMENT</h1>
              <h1>ID of the Supplier: {newSupplierId}</h1>
              <h1>Amount to be Paid: {newAmount}</h1>

              <div className="input-container">
                <label htmlFor="newAmount">Paying Amount</label>
                <br/>
                <input
                  value={newAmount}
                  type="text"
                  id="newAmount"
                  placeholder="Paying Amount"
                  required
                  onChange={(e) => setNewAmount(Number(e.target.value))}
                />
                <span className="error-message">{errorMessages.newAmount}</span>
              </div>

              <div className="input-container">
                <label htmlFor="newAccountNumber">Account Number</label>
                <br/>
                <input
                  id="newAccountNumber"
                  placeholder="Account Number (e.g., 1234-5678-9012)"
                  required
                  onChange={(e) => setNewAccountNumber(e.target.value)}
                />
                <span className="error-message">{errorMessages.newAccountNumber}</span>
              </div>

              <div className="input-container">
                <label htmlFor="newBank">Bank</label>
                <br/>
                <select
                  id="newBank"
                  value={newBank}
                  onChange={(e) => setNewBank(e.target.value)}
                >
                  <option value="BOC">BOC</option>
                  <option value="Commercial Bank">Commercial Bank</option>
                  <option value="Sampath Bank">Sampath Bank</option>
                  <option value="NDB">NDB</option>
                  <option value="NSB">NSB</option>
                  <option value="Hatton National Bank">Hatton National Bank</option>
                  <option value="Amana Bank">Amana Bank</option>
                  <option value="Cargils Bank">Cargils Bank</option>
                </select>
                <span className="error-message">{errorMessages.newBank}</span>
              </div>

              <div className="input-container">
                <label htmlFor="newBranch">Branch</label>
                <br/>
                <input
                  id="newBranch"
                  placeholder="Branch"
                  required
                  onChange={(e) => setNewBranch(e.target.value)}
                />
                <span className="error-message">{errorMessages.newBranch}</span>
              </div>
              <input
          
          placeholder="Is approved"
          onChange={(e) => setNewIsApproved(e.target.value)}
        />

              <button class="btn1">Submit</button>
              
            </div>
          </form>
          <br/>
          <Link to={`/viewaccounts`}>
          <button class="btn2">GO BACK </button>
      </Link>
         
        </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
