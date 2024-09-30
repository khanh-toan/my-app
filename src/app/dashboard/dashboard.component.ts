import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  movies: Movie[] = [];
  constructor(private moviesService: MovieService){}
  getTopMovies(): void {
    this.moviesService.getMovies().subscribe(movies => this.movies = movies.slice(0, 5));
  }

  ngOnInit(): void {
    this.getTopMovies();
  }
  
}
