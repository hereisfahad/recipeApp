import React, { Component } from "react";
import Recipe from "./recipe";
// import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      search: "",
      query: "cake",
      loading: true
    };
  }
  fetchfromedamam = async () => {
    const APP_ID = "9a1fd9b6";
    const APP_KEY = "d1f12abede49f655ccd7c96798317f07";
    const response = await fetch(
      `https://api.edamam.com/search?q=${this.state.query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    console.log(data);
    this.setState({ recipes: data.hits, loading: false }, () =>
      console.log(this.state)
    );
  };
  updateSearch = e => {
    console.log(e.target.value);
    this.setState({ search: e.target.value, query: e.target.value });
  };
  componentDidMount() {
    this.fetchfromedamam();
  }
  render() {
    const { recipes, search, loading } = this.state;
    return loading ? (
      <h1>LOADING...</h1>
    ) : (
      <>
        <div className="fixed-top">
          <input
            type="text"
            className="search-bar"
            value={search}
            onChange={this.updateSearch}
            placeholder="Search Recipes"
          />
          <button
            type="submit"
            className="search-button"
            onClick={this.fetchfromedamam}
          >
            <i className="fas fa-search" />
          </button>
        </div>
        <div className="recipes">
          {recipes.map((recipe, index) => (
            <Recipe
              key={index}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredientLines}
            />
          ))}
        </div>
      </>
    );
  }
}
