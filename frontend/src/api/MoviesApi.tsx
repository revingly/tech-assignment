import { MovieProps, MoviesHttpResponseProps } from "@/types";
import BaseApi from "./BaseApi";

export async function getAll(): Promise<MoviesHttpResponseProps> {
    const response = await BaseApi.get("/movies/popular");
    return response.data;
}

export async function getMovieDetails(id): Promise<MovieProps> {
    const response = await BaseApi.get(`/movies/details/${id}`);
    return response.data;
}

export async function searchMovieByName(name: string): Promise<MoviesHttpResponseProps> {
    const response = await BaseApi.get(`/movies/search?name=${name}`);
    return response.data;
}