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
  function ViewSuppliers() {
    const [movieList, setMovieList] = useState([]);
  
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
  
  
    
    return (
      <div className="App">
      
        <div>
          {movieList.map((movie) => (
            <div>
              <h1 > Name of the Supplier:
                {movie.companyname}
              </h1>
              <p> Contact Number : {movie.contactnumber} </p>
              <p>  Email : {movie.email}</p>
              <p>  Location of the Supplier : {movie.location}</p>
              <p>  Agreement Number  : {movie.agreementno}</p>
              <p>  Description of Supplier by his own : {movie.description}</p>
        
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
  export default ViewSuppliers;