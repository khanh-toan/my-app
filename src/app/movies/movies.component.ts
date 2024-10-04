import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']  
})
export class MoviesComponent implements OnInit {
  moviesList: Movie[] = [];
  newMovie: Movie = { id: 0, name: '', releaseYear: 0 };
  selectedMovie: Movie | undefined;

  constructor(private movieService: MovieService) {
    // Constructor chỉ khởi tạo object nhưng không nên chứa nhiều logic
    console.log('Constructor called');
  }

  // Phương thức để thêm một bộ phim mới
  addMovie() {
    // Thêm movie mới vào danh sách
    this.moviesList.push({ ...this.newMovie, id: this.moviesList.length + 1 });
    // Reset dữ liệu sau khi thêm
    this.newMovie = { id: 0, name: '', releaseYear: 0 };
  }

  onSelect(movie: Movie): void {
    // Tham chiếu trực tiếp đến đói tượng trong mảng moieList 
    this.selectedMovie = movie;
    console.log(`Selected movie: ${movie.name}`);
  }

  getMovieFromServices(): void {
    this.movieService.getMovies().subscribe(
      movies => this.moviesList = movies,
      error => console.error('Error retrieving movies', error)
    );
  }

  add(name: string, releaseYear: string): void {
    name = name.trim();
    if (Number.isNaN(releaseYear) || !name || Number(releaseYear) === 0) {
      alert('Name must not be blank, Realease year must be a number');
      return;
    }
    const newMovie: Movie = {
      id: 0,
      name: name,
      releaseYear: Number(releaseYear)
    };

    // Thực hiện thêm phim vào danh sách hoặc gọi service để lưu phim
    this.movieService.addMovie(newMovie).subscribe(() => {
      (newMovie: Movie) => this.moviesList.push(newMovie);
      window.location.reload();
    });
  }

  delete(movieId: number):void {
    if (confirm('Are you sure you want to delete this movie?')) {
      this.movieService.deleteMovie(movieId).subscribe(() => {
        this.moviesList = this.moviesList.filter(m => m.id!== movieId);
      });
    }
  }

  ngOnInit(): void {
    // this.moviesList = this.movieService.getMovies(); // Lấy danh sách phim từ service
    this.getMovieFromServices(); // Lấy danh sách phim từ API
    console.log('ngOnInit called - movies initialized', this.moviesList); // Kiểm tra dữ liệu
  }
}
