import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent implements OnInit {
  @Input() movie: Movie | undefined;

  constructor(private route: ActivatedRoute, private moiveService: MovieService, private location: Location) { }

  ngOnInit(): void {
    this.getMovieFromRoute();
  }

  getMovieFromRoute(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id') || '0');
    this.moiveService.getMovie(id)
     .subscribe(movie => this.movie = movie);
  }

  goBack(): void {
    this.location.back();
  }
  save(): void {
    if(this.movie){
      this.moiveService.updateMovie(this.movie).subscribe(() => this.goBack());
    }else{
      console.error("No movie selected to update!");
    }
  }
}
