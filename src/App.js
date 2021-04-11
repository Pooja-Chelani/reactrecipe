/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState,useEffect} from "react";
import './App.css';
import Recipe from './Recipe';
const App=()=>{
  const APP_ID="2d870e2e";
  const APP_KEY="53029d6246fd1f8e8a3b1ba4afd3f3e2";

  const  [recipes,setRecipes]=useState([]);
  const  [search,setSearch]=useState('');
  const  [query,setQuery]=useState('Pizza');

  useEffect(() => {
    getRecipes();
  },[query] );

  const getRecipes=async()=>{
    const response=await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data=await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }
  const updateSearch=event=>{
    setSearch(event.target.value);
    
  };
  const getSearch=event=>{
    event.preventDefault();
    setQuery(search);
    setSearch("");
    };
  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
         <input className="search-bar" type="text"  value={search} onChange={updateSearch}/>
           <button  className="search-button" type="submit"> Search </button>   
      </form>
      <div className="recipes">
      {recipes.map(recipe=>(
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
};

export default App;
