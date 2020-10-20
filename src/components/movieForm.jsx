import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { saveMovie, getMovies, deleteMovie } from "../services/fakeMovieService";


class MovieForm extends Form {
    state = {
      data: {
        title: "",
        genre: "",
        numberInStock: "",
        dailyRentalRate: ""
      },
      errors: {},
      id: 0,
    };
  
    schema = {
      title: Joi.string().required().label("Title"),
      genre: Joi.string().required().label("Genre"),
      numberInStock: Joi.number().min(0).max(100).required().label('Number in Stock'),
      dailyRentalRate: Joi.number().max(10).min(0).required().label('Daily Rental Rate')
    };
  

    doSubmit = () => {
      console.log("Submitted");
      // console.log(getMovies());
      deleteMovie(this.state.id);
      saveMovie(this.state.data);
      this.props.history.push('/movies')
  
    }
    componentDidMount = () => {
      const id = this.props.match.params.id;
      const currentMovie = getMovies().find(movie => movie._id === id);
      console.log(currentMovie);
      this.setState({data: {
        title: currentMovie.title,
        genre: currentMovie.genre.name,
        numberInStock: currentMovie.numberInStock,
        dailyRentalRate: currentMovie.dailyRentalRate
      }, id: id});
    } 
  render() {
    
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Movie Form</h1>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genre', 'Genre')}
          {this.renderInput('numberInStock', 'Name in Stock', 'number')}
          {this.renderInput('dailyRentalRate', 'Rate')}
          
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}

export default MovieForm;

// render() {
//   return (
//     <div>
//       <h1>Movie Form {this.props.match.params.id}</h1>
//       <button className="btn btn-primary" onClick={this.handleSave}>
//         Save
//       </button>
//     </div>
//   );
// }

