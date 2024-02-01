import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate, useParams } from 'react-router-dom';

function ViewSuppliersEditAddId() {
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newSupplierId, setNewSupplierId] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newContactNumber, setNewContactNumber] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newAgreementNumber, setNewAgreementNumber] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCompanyDescription, setNewCompanyDescription] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    loadUserDetails();
  }, [id]);

  const loadUserDetails = async () => {
    const supplierDocRef = doc(db, "suppliers", id);
    const docSnapshot = await getDoc(supplierDocRef);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      setNewCompanyName(data.companyname);
      setNewEmail(data.contactnumber);
      setNewContactNumber(data.email);
      setNewAgreementNumber(data.agreementno);
      setNewLocation(data.location);
      setNewDescription(data.description);
    }
  };

  const editUserDetails = async () => {
    const supplierDocRef = doc(db, "suppliers", id);
    await updateDoc(supplierDocRef, {
      supplierId: newSupplierId,
      companydescription: newCompanyDescription,
    });
    navigate('/registeredsuppliers');
  };

  return (
    <div className="App">
      <div>
        <h1>Name of the Supplier: {newCompanyName}</h1>
        <p>Contact Number: {newContactNumber}</p>
        <p>Email: {newEmail}</p>
        <p>Location of the Supplier: {newLocation}</p>
        <p>Agreement Number: {newAgreementNumber}</p>
        <p>Description of Supplier by his own: {newDescription}</p>

        <input
          placeholder="New Supplier Id"
          value={newSupplierId}
          onChange={(e) => setNewSupplierId(e.target.value)}
        />
        <input
          placeholder="Provide Company point of description."
          value={newCompanyDescription}
          onChange={(e) => setNewCompanyDescription(e.target.value)}
        />

        <button onClick={editUserDetails}>Update Supplier Bios</button>
      </div>
    </div>
  );
}

export default ViewSuppliersEditAddId;

