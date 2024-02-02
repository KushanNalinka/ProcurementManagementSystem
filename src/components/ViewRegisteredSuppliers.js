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
  function ViewRegisteredSuppliers() {
    const [movieList, setMovieList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
  
    const moviesCollectionRef = collection(db, "suppliers");
  
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
      const movieDoc = doc(db, "suppliers", id);
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
  
    
    return (
      <div className="App">


      <div>
        <input
          type="text"
          placeholder="Search by Supplier ID"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={resetSearch}>Reset</button>
      </div>
      
        <div>
          {movieList.map((movie) => (
            <div>
              <h1 > Name of the Supplier:
                {movie.companyname}
              </h1>
              <h1 > ID of the Supplier:
                {movie.supplierId}
              </h1>
              <p> Contact Number : {movie.contactnumber} </p>
              <p>  Email : {movie.email}</p>
              <p>  Location of the Supplier : {movie.location}</p>
              <p>  Agreement Number  : {movie.agreementno}</p>
              <p>  Account Number  : {movie.accountnumber}</p>
              <p>  Bank of the Account  : {movie.bank}</p>
              <p>  Branch of the account  : {movie.branch}</p>
              <p>  Description of Supplier by his own : {movie.description}</p>
              <p>  Description of Supplier by Company  : {movie.companydescription}</p>
        
              <button onClick={() => deleteMovie(movie.id)}> Ignore Supplier</button>
              <Link to={`/suppliers/edits/${movie.id}`}>
              <button> Register Supplier</button>
            </Link>
            
  
            </div>
          ))}
        </div>
  
        
      </div>
    );
  }
  export default ViewRegisteredSuppliers;