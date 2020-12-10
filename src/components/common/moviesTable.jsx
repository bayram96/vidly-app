import React, { Component } from "react";
import Like from "./like";
import Table from "./table";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie, index) => (
        <Like
          liked={this.props.likesArray[index]}
          onLikeClick={() => this.props.onLike(index)}
        />
      ),
    },
    {
      key: "delete",
      content: (movie, index) => (
        <button
          className="btn btn-danger"
          onClick={() => this.props.onDelete(movie, index)}
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
        data={movies}
      />
    );
  }
}

export default MoviesTable;
