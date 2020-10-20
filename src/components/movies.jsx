import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import Genres from "./common/genres";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./common/moviesTable";
import _ from "lodash";
import { Route } from "react-router-dom";
import SearchBar from "./common/searchBar";


const moviesData = getMovies();
console.log(moviesData.map((e) => "fa fa-heart-o"));

class Movies extends Component {
  state = {
    movies: moviesData,
    // likesArray: moviesData.map((e) => "fa fa-heart-o"),
    likesArray: ["fa fa-heart-o", "fa fa-heart-o", "fa fa-heart-o", "fa fa-heart-o", "fa fa-heart-o", "fa fa-heart-o", "fa fa-heart-o", "fa fa-heart-o", "fa fa-heart-o", "fa fa-heart-o", "fa fa-heart-o"],
    pageSize: 4,
    currentPage: 1,
    currentGenre: "All genres",
    genres: [{ name: "All genres" }, ...getGenres()],
    sortColumn: { path: "title", order: "acs" },
    searchBar: ''
  };

  handleDelete = (movie, index) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    const likesArray = this.state.likesArray.filter((e, i) => i !== index);
    this.setState({
      movies: movies,
      likesArray: likesArray,
    });
    if (index === 0) {
      this.setState({ currentPage: this.state.currentPage - 1 });
    }
    deleteMovie(movie._id);
    console.log(getMovies());
    
  };
  styles = {
    fontSize: 50,
  };
  handleLike = (index) => {
    let likesList = [...this.state.likesArray];
    
    likesList[index] =
      likesList[index].length === 13 ? "fa fa-heart" : "fa fa-heart-o";
    this.setState({
      likesArray: likesList,
    });

    // console.log(likesList);
  };

  handlePagination = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  handleGenreChange = (genre) => {
    this.setState({
      currentGenre: genre,
      currentPage: 1,
      searchBar: ''
    });

  };

  handleSort = (sortedColumn) => {
    this.setState({
      sortColumn: { path: sortedColumn.path, order: sortedColumn.order },
    });
  };

  getPageDate = () => {
    const filtered =
      this.state.currentGenre === "All genres"
        ? this.state.movies
        : this.state.currentGenre === 'Searched' 
          ? this.state.movies.filter(
            (movie) => movie.title.slice(0, this.state.searchBar.length).toLowerCase() === this.state.searchBar) 
          : this.state.movies.filter(
            (movie) => movie.genre.name === this.state.currentGenre
          );
          
    const sorted = _.orderBy(
      filtered,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );
    const allMovies = paginate(
      sorted,
      this.state.currentPage,
      this.state.pageSize
    );

    return { filtered, data: allMovies };
  };

  handleSearchBarChange = (e) => {
    const searched = e.currentTarget.value.toLowerCase();
    this.setState({searchBar: searched, currentGenre: "Searched",  currentPage: 1});

  }

  render() {
    const { length: count } = this.state.movies;
    if (count === 0) return <p>There are no movies in the database</p>;

    const { filtered, data: allMovies } = this.getPageDate();

    return (
      <div>
        <div className="row">
          <div className="col-2">
            <Genres
              onGenreChange={this.handleGenreChange}
              currentGenre={this.state.currentGenre}
              genres={this.state.genres}
            />
          </div>
          <div className="col">
            <Route render={({history}) => (
              <button className="btn btn-primary" style={{marginBottom: 20}} onClick={() => { history.push('/movies/new') }}>
                New Movie
              </button>
            )}/>
            {/* <button className="btn btn-primary">New Movie</button> */}
            <p>Showing {filtered.length} movies in the database</p>
            <SearchBar value={this.state.searchBar} onChange={this.handleSearchBarChange} />
            <MoviesTable
              movies={allMovies}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              likesArray={this.state.likesArray}
              onSort={this.handleSort}
              sortColumn={this.state.sortColumn}
            />
            <Pagination
              totalMovies={filtered.length}
              numberOfMoviesEachPage={this.state.pageSize}
              currentPage={this.state.currentPage}
              onClick={this.handlePagination}
              currentGenre={this.state.currentGenre}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
