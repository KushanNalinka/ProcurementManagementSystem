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
  function ViewApprovedOrders() {
    const [movieList, setMovieList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');


  
    const moviesCollectionRef = collection(db, "approvedorder");
  
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
      const movieDoc = doc(db, "approvedorder", id);
      await deleteDoc(movieDoc);
    };
    const handleSearch = () => {
      // Filter the movieList based on the searchQuery
      const filteredMovies = movieList.filter((movie) => movie.orderId === searchQuery);
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
          `Site Id: ${movie.siteid}\n` +
          `Order Id: ${movie.orderId}\n` +
          `Site Name: ${movie.sitename}\n` +
          `Site Location: ${movie.location}\n` +
          `Supplier Id: ${movie.supplierId}\n` +
          `Supplier Name: ${movie.suppliername}\n` +
          `Site Manager Id: ${movie.sitemanagerId}\n` +
          `Date of the order places: ${movie.dateoforder}\n` +
          `Date to be Deliver the order: ${movie.datetobedelive}\n` +
          `Amount of the Order: ${movie.amount}\n\n` 
      )).join('');
  
      // Convert the text content to a Blob
      const blob = new Blob([reportText], { type: 'text/plain' });
  
      // Save the Blob as a file and trigger download
      FileSaver.saveAs(blob, 'sites_report.txt');
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
          <Link to={`/vieworders`}>
              <button> GO BACK</button>
            </Link>
      </div>
      
        <div>
          {movieList.map((movie) => (
            <div className="movie-item">
              <h1 > Order Id:
                {movie.orderId}
              </h1>
              <p> Site Id  : {movie.siteid} </p>
              <p>  Site Name : {movie.sitename}</p>
              <p>  Location of the Site : {movie.location}</p>
              <p>  Supplier Id : {movie.supplierId}</p>
              <p>  Supplier Name  : {movie.suppliername}</p>
              <p>  Site Manager Id  : {movie.sitemanagerId}</p>
              <p>  Date of the Order placed : {movie.dateoforder}</p>
              <p>  Delivered Date : {movie.datetobedelive}</p>
              <p> Total Amount  : {movie.amount}</p>
            
              <button onClick={() => deleteMovie(movie.id)}> No longer Order Need</button>
              
            </div>
          ))}
        </div>
  
        
      </div>
      </div>
      </div>
    );
  }
 
export default ViewApprovedOrders;