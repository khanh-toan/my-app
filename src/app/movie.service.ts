import { Injectable } from '@angular/core';
import { Movie } from './models/movie';
import { Observable, catchError, of, tap } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private moviesList: Movie[] = [
    { id: 1, name: 'Inception', releaseYear: 2010 },
    { id: 2, name: 'The Matrix', releaseYear: 1999 },
    { id: 3, name: 'Interstellar', releaseYear: 2014 }
  ];

  private movieURL = 'http://admin-pc:3000/movies';

  constructor(public messageService: MessageService, private http: HttpClient) {

  }

  getMovies(): Observable<Movie[]> {
    // this.messageService.addMessage(`${new Date().toLocaleString()}. Get movie list`); // Thêm message vào log
    // return of(this.moviesList); // Trả về danh sách phim
    return this.http.get<Movie[]>(this.movieURL).pipe(
      tap(receiveMovie => console.log(`receiveMovies = ${JSON.stringify(receiveMovie)}`)),
      catchError(error => of([]))
    ); // Trả về danh sách phim từ API
  }

  getMovie(id: Number): Observable<Movie | undefined> {
    // return of(this.moviesList.find(movie => movie.id === id)); // Trả về phim với id tương ứng
    const url = `${this.movieURL}/${id}`;
    return this.http.get<Movie>(url).pipe(
      tap(selectMovie => console.log(`receiveMovies = ${JSON.stringify(selectMovie)}`)),
      catchError(error => of({ id: 0, name: 'Unknown', releaseYear: 0 } as Movie))
    );
  }

  updateMovie(movie: Movie): Observable<any>{
    const url = `${this.movieURL}/${movie.id}`;
    return this.http.put<Movie>(url, movie, httpOptions).pipe(
      tap(() => console.log(`update movie id=${movie.id}`)),
      catchError(error => of(`Error updating movie id=${movie.id}`))
    );
  }

  addMovie(newMovie: Movie): Observable<Movie | undefined>{
    return this.http.post<Movie>(this.movieURL, newMovie, httpOptions).pipe(
      tap((movie: Movie) => console.log(`insert movie = ${JSON.stringify(movie)}`)),
      catchError(error => of({ id: 0, name: 'Unknown', releaseYear: 0 } as Movie))
    ); 
  }

    deleteMovie(movieId: number): Observable<Movie | null> {
      const url = `${this.movieURL}/${movieId}`;
      return this.http.delete<Movie | null>(url, httpOptions).pipe(
        tap(_ => console.log(`Delete movie by id = ${movieId}`)),
        catchError(error => of(null))
      );
    }
}
