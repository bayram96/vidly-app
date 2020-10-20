import React, { Component } from "react";

class Like extends Component {
  render() {
    //console.log(this.props.liked);
    //const likeClass = this.props.liked ? "fa fa-heart-o" : "fa fa-heart";
    return (
      <i
        className={this.props.liked}
        aria-hidden="true"
        onClick={this.props.onLikeClick}
        // onClick={() => {
        //   let likesList = this.state.likesArray;
        //   likesList[index] =
        //     likesList[index].length === 13
        //       ? "fa fa-heart"
        //       : "fa fa-heart-o";
        //   this.setState({
        //     likesArray: likesList,
        //   });
        // }}
      ></i>
    );
  }
}

export default Like;
