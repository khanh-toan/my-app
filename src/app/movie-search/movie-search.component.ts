import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Movie } from '../models/movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrl: './movie-search.component.css'
})
export class MovieSearchComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  movies$: Observable<Movie[]> | undefined;
  private searchSubject = new Subject<Movie[]>();

  constructor(private movieService: MovieService){}

  // search(searchString: string): void {
  //   console.log(`searchStirng = ${searchString}`)
  //   this.
  // }

}
