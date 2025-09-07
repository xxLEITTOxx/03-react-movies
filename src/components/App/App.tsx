import SearchBar from "../SearchBar/SearchBar";
import type { Movie } from "../../types/movie.ts";
import { fetchMovies } from "../../services/movieService.ts";
import MovieGrid from "../MovieGrid/MovieGrid.tsx";
import { useState } from "react";
import Loader from "../Loader/Loader.tsx";
import MovieModal from "../MovieModal/MovieModal.tsx";
import toast, { Toaster } from "react-hot-toast";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [errorMessageState, setErrorMessageState] = useState<boolean>(false);

  const handleSearch = async (query: string): Promise<void> => {
    setIsLoading(true);
    try {
      setMovies([]);
      setErrorMessageState(false);
      const myMovies = await fetchMovies(query);
      if (myMovies.length === 0) {
        toast.error("No movies found for your request.");
        setErrorMessageState(true);
      }
      setMovies(myMovies);
    } catch {
      toast.error("There was an error, please try again...");
      setErrorMessageState(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectedMovie = (movie: Movie): void => {
    setSelectedMovie(movie);
  };

  const closeModal = (): void => {
    setSelectedMovie(null);
  };

  return (
    <>
      <Toaster position="top-center" />
      <SearchBar onSubmit={handleSearch} />
      {isLoading ? (
        <Loader />
      ) : (
        <MovieGrid movies={movies} onSelect={handleSelectedMovie} />
      )}
      {/* <MovieModal movie={selectedMovie} onClose={closeModal} /> */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
      {errorMessageState && <ErrorMessage />}
    </>
  );
}
