import React, { useEffect, useState } from "react";
import { db, auth, storage } from "../config/firebase";
import { Link } from 'react-router-dom';
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import FileSaver from 'file-saver';
import "./styles.scss";
import { BsSearch } from 'react-icons/bs'; // Import Bootstrap icons
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";
import { FaPlus } from 'react-icons/fa';
function SitesView() {
  const [movieList, setMovieList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const moviesCollectionRef = collection(db, "site");

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "site", id);
    await deleteDoc(movieDoc);
  };

  const handleSearch = () => {
    // Filter the movieList based on the searchQuery
    const filteredMovies = movieList.filter((movie) => movie.siteid === searchQuery);
    setMovieList(filteredMovies);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const resetSearch = () => {
    setSearchQuery('');
    getMovieList();
  };


  const generateReport = () => {
    // Create a text content for the report by joining movieList items
    const reportText = movieList.map((movie) => (
        `Name of Item: ${movie.itemName}\n` +
        `Item Id: ${movie.itemId}\n` +
        `Item Category: ${movie.category}\n` +
        `Supplier Id: ${movie.supplierId}\n` +
        `Unit Price: ${movie.unitPrice}\n` +
        `Maximum Quantity can be Supplied at Once: ${movie.maxQuantitySup}\n` +
        `Storage Location: ${movie.storagelocation}\n` +
        `Offers: ${movie.offers}\n` +
        `Description of Item by his own: ${movie.description}\n` +
        `Description of Item by his Company: ${movie.companydescription}\n\n`
    )).join('');

    // Convert the text content to a Blob
    const blob = new Blob([reportText], { type: 'text/plain' });

    // Save the Blob as a file and trigger download
    FileSaver.saveAs(blob, 'items_report.txt');
};



  return (
    <div className="home">
    <Sidebar />
    <div className="homeContainer">
    <Navbar />
    <div className="App">
      
    <div className="input-container">
        <input
            type="text"
            placeholder="Search by Site ID"
            value={searchQuery}
            onChange={handleSearchChange}
        />
        <button onClick={handleSearch}><BsSearch /></button>
        <button onClick={resetSearch}>Reset</button>
        <button className="report-button" onClick={generateReport}>Generate Report</button>
        <Link to="/sites">
              <div className="add-icon">
                <FaPlus size={60} color="#fff" />
              </div>
            </Link>
    </div>
    
    <div>
        {movieList.map((movie) => (
            <div className="movie-item" key={movie.id}>
                <h1> Site Id : {movie.siteid}</h1>
                <p> Site Name : {movie.sitename} </p>
                <p> Site Location : {movie.location} </p>
                <p> Total Cost Estimated: {movie.cost} </p>
                <p> Site Manager Id : {movie.siteheadid} </p>
                <p> Site Start Date: {movie.startdate} </p>
                <p> Site End Date : {movie.enddate} </p>
                <p> Description : {movie.description} </p>

                <button onClick={() => deleteMovie(movie.id)}>DELETE SITE</button>
                <Link to={`/sites/edits/${movie.id}`}>
                    <button>EDIT SITE DETAILS</button>
                </Link>
            </div>
        ))}
    </div>
  
</div>
</div>
</div>
  );
}

export default SitesView;

