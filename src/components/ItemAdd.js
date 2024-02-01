import { useEffect, useState } from "react";
import { db, auth, storage } from "../config/firebase";
import { Link } from 'react-router-dom';
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";
import FileSaver from 'file-saver';
import "./styles.scss";
import { BsSearch } from 'react-icons/bs'; // Import Bootstrap icons
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";
function ItemAdd() {
  const [movieList, setMovieList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const moviesCollectionRef = collection(db, "Items");

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
    const movieDoc = doc(db, "Items", id);
    await deleteDoc(movieDoc);
  };
  const handleSearch = () => {
    // Filter the movieList based on the searchQuery
    const filteredMovies = movieList.filter((movie) => movie.itemName === searchQuery);
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
      `Supplier Id: ${movie.supplierId}\n` +
      `Unit Price: ${movie.unitPrice}\n` +
      `Maximum Quantity can be Supplied at Once: ${movie.maxQuantitySup}\n` +
      `Storage Location: ${movie.storagelocation}\n` +
      `Offers: ${movie.offers}\n` +

      `Description of Item by by Supplier: ${movie.description}\n\n`
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
              placeholder="Search by  Item Name "
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button onClick={handleSearch}><BsSearch /></button>
            <button onClick={resetSearch}>Reset</button>
            <button className="report-button" onClick={generateReport}>Generate Report</button>
          </div>

          <div>
            {movieList.map((movie) => (
              <div className="input-container">
                <h1 > Name of Item:
                  {movie.itemName}
                </h1>
                <p> Supplier Id  : {movie.supplierId} </p>
                <p>  Unit Price  : {movie.unitPrice}</p>
                <p> Maximum Quantity can be Supplied at Once  : {movie.maxQuantitySup}</p>
                <p>  Storage Location  : {movie.storagelocation}</p>
                <p>  Offers : {movie.offers}</p>
                <p>  Description of Supplier by his own : {movie.description}</p>

                <button onClick={() => deleteMovie(movie.id)}> Ignore Items</button>
                <Link to={`/items/edits/${movie.id}`}>
                  <button> Update Items</button>
                </Link>

              </div>
            ))}
          </div>




        </div>
      </div>

    </div>
  );
}
export default ItemAdd;