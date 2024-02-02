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

  function Invoices() {
    const [movieList, setMovieList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
  
    const moviesCollectionRef = collection(db, "approvedaccounts");
  
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
      const movieDoc = doc(db, "approvedaccounts", id);
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
          `Item Id: ${movie.supplierId}\n` +
          `Amount Paid: ${movie.amount}\n` +
          `Account Number of the Supplier : ${movie.accounts}\n` +
          `Bank: ${movie.bank}\n` +
          ` Branch : ${movie.branch}\n\n`
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
          <Link to={`/viewaccounts`}>
              <button>Go Back</button>
            </Link>
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
              <p>  Amount  : {movie.amount}</p>
              <p>  Account Number  : {movie.accounts}</p>
              <p>  Bank of the Account  : {movie.bank}</p>
              <p>  Branch of the account  : {movie.branch}</p>
              <label>Thank you for Being with Construct Mate</label>
        
              <button onClick={() => deleteMovie(movie.id)}> Completed Invoice</button>
              
  
            </div>
          ))}
        </div>
        </div>
</div>
       
      </div>
    );
  }
  export default Invoices;