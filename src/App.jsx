import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './compentes/Navbar';
import Movie from './compentes/Movie';
import Trending from './compentes/Trending';
//import Add from './compentes/Add';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap'; 

function App() {
  const [movies, setMovies] = useState([]);
  const[load,setload] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null); // Track the selected movie
  //const url = "https://api.themoviedb.org/3/trending/all/day?api_key=b4462c37cc0d31b8a5cc2fb895cf6b14";
  const url = "https://api.themoviedb.org/3/trending/movie/day?api_key=b4462c37cc0d31b8a5cc2fb895cf6b14"

  useEffect(() => {
    setload(true)
    axios.get(url)
        .then((response) => {
          setload(false)
        setMovies(response.data.results);
     
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  // Function to handle showing movie details in a modal
  const showMovieDetails = (movie) => {
    setSelectedMovie(movie);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
   
      <div className='app'>
        <Router>
          <Navbar />
          <Routes>
            <Route index element={<Movie />} />
            <Route path='trending' element={<Trending />} />
          </Routes>
          <div className='app2'>
          <div style={{"textAlign":"center"}}>
     {load && <p>loading....</p>} 
    </div>
            <div className='row'>
              {movies.map((movie) => (
                <div className='col-sm-3' key={movie.id}>
                  <div className="card mt-2" style={{ "width": "18rem" }}>
                    <img
                      src={`https://image.tmdb.org/t/p/w300/${movie.poster_path || 'placeholder.jpg'}`}
                      className="card-img-top"
                      alt={movie.title}
                    />
                    <div className="card-body">
                     {/*<h5 className="card-title">{movie.title}</h5>*/} 
                     {/*<p className="card-text">{movie.overview}</p>*/} 
                      <button className='btn btn-primary' onClick={() => showMovieDetails(movie)}>Show Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Router>
      </div>
      <MovieDetailsModal
        movie={selectedMovie}
        closeModal={closeModal}
      />
    </>
  );
}

// Create a separate component for the movie details modal
function MovieDetailsModal({ movie, closeModal }) {
  if (!movie) {
    return null;
  }

  return (
    <Modal show={!!movie} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{movie.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <table className='table table-borderless table-secondary table-hover'>
                  <tbody>
                  <tr>
                      <th>media type</th>
                      <td>{movie.media_type}</td>
                    </tr>
                    <tr>
                      <th>original_title</th>
                      <td>{movie.original_title}</td>
                    </tr>
                    <tr>
                      <th>overview</th>
                      <td>{movie.overview}</td>
                    </tr>
                    <tr>
                      <th>Release Date</th>
                      <td>{movie.release_date}</td>
                    </tr>
                    <tr>
                      <th>Vote Average</th>
                      <td>{movie.vote_average}</td>
                    </tr>
                  </tbody>
                </table>
       {
        /*
        <p>{movie.original_title}</p>
        <p>{movie.overview}</p>
        <p>Release Date: {movie.release_date}</p>
        <p>Vote Average: {movie.vote_average}</p>
        */
       }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default App;
