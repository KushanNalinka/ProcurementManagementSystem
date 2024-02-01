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
  function ViewOrders() {
    const [movieList, setMovieList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
  
    const moviesCollectionRef = collection(db, "order");
  
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
      const movieDoc = doc(db, "order", id);
      await deleteDoc(movieDoc);
    };
    const handleSearch = () => {
      // Filter the movieList based on the searchQuery
      const filteredMovies = movieList.filter((movie) => movie.sitename === searchQuery);
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
          `Name of the site: ${movie.sitename}\n` +
          `Site manager Id: ${movie.sitemanagerId}\n` +
          `date of the order: ${movie.dateoforder}\n` +
          `Date to be delivered: ${movie.datetobedelive}\n` +
          `Item of the order: ${movie.item}\n` +
          ` Quantity want: ${movie.quantity}\n` +
          
          `Maximum price told by supplier: ${movie.max}\n` +
          `Minimum price told by suppliers: ${movie.min}\n` +
          `Description of Item : ${movie.description}\n\n`
      )).join('');
  
      // Convert the text content to a Blob
      const blob = new Blob([reportText], { type: 'text/plain' });
  
      // Save the Blob as a file and trigger download
      FileSaver.saveAs(blob, 'orders_report.txt');
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
              <h1 > Name of the Site: {movie.sitename} </h1>
              <p> Site Manager Id : {movie.sitemanagerId} </p>
              <p>  Date of the Order Placed : {movie.dateoforder}</p>
              <p>  Date of the Order Should be Received : {movie.datetobedelive}</p>
              <p>  Items need  : {movie.item}</p>
              <p>  Quantity: {movie.quantity}</p>
              <p>  Max: {movie.max}</p>
              <p>  Min: {movie.min}</p>
              <p>  Approved: {movie.approved}</p>
              <p>  Description of the order: {movie.description}</p>
              
        <h3>I am very much sure that the above order has been approved with higer Satisfaction</h3>
              <button onClick={() => deleteMovie(movie.id)}> Order Approved</button>
              <Link to={`/vieworders/edits/${movie.id}`}>
              <button> View Order to divide among Suppliers</button>
            </Link>
  
            </div>
          ))}
        </div>
  
        
      </div>
      </div></div>
    );
  }
  export default ViewOrders;