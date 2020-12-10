import React, { Component } from 'react';


const SearchBar = ({ value, onChange}) => {
    return (
        <input 
            value={value} 
            onChange={e => onChange(e)} 
            className="form-control my-3 w-50" 
            type="search" 
            placeholder="Search" 
            aria-label="Search" />
        );
}
 
export default SearchBar;

