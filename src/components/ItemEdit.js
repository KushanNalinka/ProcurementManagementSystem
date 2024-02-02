
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { Link } from "react-router-dom";
import {
  getDoc,
  collection,
  addDoc,
  doc,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import "./Payment.scss";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";

function ItemEdit() {
  const [newItemName, setNewItemName] = useState("");
  const [newItemId, setNewItemId] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newCompanyDescription, setNewCompanyDescription] = useState("");
  const [nruSupId, setNruSupId] = useState("");
  const [newUnit, setNewUnit] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newStorage, setNewStorage] = useState("");
  const [newOffer, setNewOffer] = useState("");


  const [errorMessages, setErrorMessages] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    loadUserDetails();
  }, [id]);

  const loadUserDetails = async () => {
    const supplierDocRef = doc(db, "Items", id);
    const docSnapshot = await getDoc(supplierDocRef);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      setNewItemName(data.itemName);
      setNruSupId(data.supplierId);
      setNewUnit(data.unitPrice);
      setNewQuantity(data.maxQuantitySup);
      setNewStorage(data.storagelocation);
      setNewOffer(data.offers);
    }
  };

  const sitesCollectionRef = collection(db, "approveditems");

  const editUserDetails = async () => {
    try {
      await addDoc(sitesCollectionRef, {
        supplierId: nruSupId,
        itemName: newItemName,
        maxQuantitySup: newQuantity,
        offers: newOffer,
        storagelocation: newStorage,
        unitPrice: newUnit,
        itemId: newItemId,
        category: newCategory,
        companydescription: newCompanyDescription,
        itemName: newItemName,
      });
      navigate("/registereditems");
    } catch (err) {
      console.error(err);
    }
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
      if (!input || !input.checkValidity()) {
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

    // Regular expression to match the item ID format (e.g., ITEMKN1234)
    const itemIdRegex = /^ITEM[A-Z]{2}\d{4}$/;

    validateInput(document.getElementById("newCompanyDescription"), "Company Description is required.");
    validateInput(document.getElementById("newCategory"), "Category is required.");
    validateInput(document.getElementById("newItemId"), "Invalid ITEM ID.");
    if (!newItemId.match(itemIdRegex)) {
      isValid = false;
      setErrorMessages((prev) => ({
        ...prev,
        newItemId: "Invalid item number format (e.g., ITEMKN1234).",
      }));
    }

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
              <div className="formInputs1">
                <h1>APPROVE THE ITEMS</h1>

                <h1>Name of the Item: {newItemName}</h1>
                <p>Name of the Supplier: {nruSupId}</p>
                <p>Unit Price of the Item:{newUnit}</p>

                <p>Maximum Quantity that can be Supplied: {newQuantity}</p>

                <p>Storage Location: {newStorage}  </p>

                <p>Discounts from the Supplier : {newOffer} </p>

                <div className="input-container">
                  <br />
                  <label htmlFor="newItemId">Generate Item Id</label>
                  <br />
                  <input
                    id="newItemId"
                    placeholder="Item Id (e.g., ITEMKN1234)"
                    required
                    onChange={(e) => setNewItemId(e.target.value)}
                  />
                  <span className="error-message">{errorMessages.newItemId}</span>
                  <br />
                  <label>**** Should be in the Format<br />
                    "ITEM" +"2 Capital Letters "+"Four Numbers"</label>
                </div>
                <br />
                <div className="input-container">
                  <label htmlFor="newCategory">Category</label>
                  <br />
                  <select
                    id="newCategory"
                    required
                    onChange={(e) => setNewCategory(e.target.value)}
                  >
                    <option value="">Select a Category</option>
                    <option value="Civil Construction">Civil Construction</option>
                    <option value="Irrigation">Irrigation</option>
                    <option value="Repair">Repair</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Wood">Wood</option>
                    <option value="Timber">Timber</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Ship Building">Ship Building</option>
                    <option value="Lathe">Lathe</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Electrician">Electrician</option>
                    <option value="Electronic">Electronic</option>
                    <option value="Machinery">Machinery</option>
                    <option value="Heavy Engineering">Heavy Engineering</option>
                    <option value="Building">Building</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <br />
                <div className="input-container">
                  <label htmlFor="newCompanyDescription">Company Description of Product</label>
                  <br />
                  <input
                    id="newCompanyDescription"
                    type="text"
                    placeholder="Provide Company point of description."
                    required
                    onChange={(e) => setNewCompanyDescription(e.target.value)}
                  />
                  <span className="error-message">{errorMessages.newCompanyDescription}</span>
                </div>

                <button className="btn1">Submit</button>
              </div>
            </form>
            <br />
            <Link to="/items">
              <button className="btn2">GO BACK</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemEdit;
