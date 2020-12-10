import React from "react";

const Genres = (props) => {
  const { genres, onGenreChange } = props;
  return (
    <ul className="list-group">
      {genres.map((genre, index) => (
        <li
          key={index}
          className={
            genre.name === props.currentGenre
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onGenreChange(genre.name)}
        >
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

export default Genres;
