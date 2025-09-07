import axios from "axios";
import type { Movie } from "../types/movie";

interface httpResponse {
  results: Movie[];
  total_pages: number;
}

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const { data } = await apiClient.get<httpResponse>("/search/movie", {
    params: { query },
  });
  return data.results;
};
