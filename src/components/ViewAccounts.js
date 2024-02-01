import { useEffect, useState } from "react";
import { db, auth, storage } from "../config/firebase";
import {Link} from 'react-router-dom';
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
  function ViewAccounts() {
    const [movieList, setMovieList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
  
    const moviesCollectionRef = collection(db, "accounts");
  
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
      const movieDoc = doc(db, "accounts", id);
      await deleteDoc(movieDoc);
    };
    const handleSearch = () => {
      // Filter the movieList based on the searchQuery
      const filteredMovies = movieList.filter((movie) => movie.supplierId === searchQuery);
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
          `Name of the Supplier: ${movie.suppliername}\n` +
          `Supplier Id: ${movie.supplierId}\n` +
          `Contact Number of the Supplier: ${movie.contactnumber}\n` +
          `Order Id: ${movie.orderId}\n` +
          `Site Name: ${movie.sitename}\n` +
          `Site Manager Id: ${movie.sitemanagerId}\n` +
          `Amount to be Paid: ${movie.amount}\n` +
          `Delivered Date: ${movie.date}\n` +
          `Description of Item by his own: ${movie.description}\n` 
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
        
    </div>
      
        <div>
          {movieList.map((movie) => (
            <div className="movie-item">
              <h1 > Name of the Supplier:
                {movie.suppliername}
              </h1>
              <h1 > ID of the Supplier:
                {movie.supplierId}
              </h1>
              <p> Contact Number : {movie.contactnumber} </p>
              <p>  Payment done : {movie.approved}</p>
              <p>  Order Id  : {movie.orderId}</p>
              <p>  Name of the site  : {movie.sitename}</p>
              <p>  Location of the site  : {movie.location}</p>
              <p>  Site manager Id   : {movie.sitemanagerId}</p>
              <p>  Amount to be paid  : {movie.amount}</p>
              <p>  Date of the Delivered  : {movie.date}</p>
             <p>  Description of Supplier by his own : {movie.description}</p>
             
             <label>I trusted order has completed.</label>
              <button onClick={() => deleteMovie(movie.id)}> Completed </button>
              <br/>
              <label>Order is Currently waiting list.</label>
              <Link to={`/viewaccounts/edits/${movie.id}`}>

              <button> Pay </button>
            </Link>
  
            </div>
          ))}
        </div>
  
        </div>
</div>
      </div>
    );
  }
  export default ViewAccounts;