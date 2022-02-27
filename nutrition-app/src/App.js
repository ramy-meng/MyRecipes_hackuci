import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';

import React, { useState, useEffect } from 'react';

import './App.css';
import FoodForm from './FoodForm'
import Filterbar from './components/filterBar/filterBar'
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profie/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-context';

var true_data;

function App() {
  const authCtx = useContext(AuthContext);
  const [calories, setCalories] = useState(-1);
  const [allergies, setAllergies] = useState(
    {
        "Alcohol Free" : false,
        "Celery Free": false,
        "Dairy Free":false,
        "Egg Free" : false,
        "Fish Free":false,
        "FODMAP Free":false,
        "Gluten Free":false,
        "Lupine Free":false,
        "Mollusk Free":false,
        "Mustard Free":false,
        "Peanut Free":false,
        "Pork Free":false,
        "Shellfish Free": false,
        "Soy Free":false,
        "Sulfite Free": false,
        "Tree Nut Free":false,
        "Wheat Free" : false

    }); // set all the default to false here for the allergies
  const [diets, setDiets] = useState(
    {
      "vegan": false,
      "vegetarian" :false
    }); // set all the default to false here for the diets

  const handleCaloriesInput = (newCal) =>{
    console.log("old cal ", calories)
    setCalories(newCal);
    console.log("new cal ", calories)
  }

  const handleAllergiesInput = (newAllergiesInput) =>{
    setAllergies(newAllergiesInput);
  }

  const handleDietInput = (newDietInput) =>{
    setDiets(newDietInput);
  }

  

  //this function gets all information needed form api about a recipe or food and puts them in variables
  // im not sure how to compile all these variables into a single component though.
  const getRecipeorFood = (userInput, data) => { // userInput is what user put in search
    data.hits.forEach((item) => {
      if (item.recipe.label === userInput) { // userInput was a recipe
        console.log(userInput +  " found from API"); /* Print to console for debugging*/
        var recipeImage = item.recipe.image;
        var recipeCalories = item.recipe.calories; // without the divide by 10
        var recipeName = item.recipe.label;
        var recipeIngredients = item.recipe.ingredientLines;
        var recipeURL = item.recipe.shareAs;
        console.log("Name is " + recipeName + " with calories of " + recipeCalories + 
        " and image url is " + recipeImage + " and ingredients are " + recipeIngredients +
        " and the url to the recipe is " + recipeURL);
        
      }
      else { // Either userInput was not a recipe and was a food item instead or they entered nonsense
        console.log("Not found");
        // TODO
      }
    });
  }


  useEffect(() => {
    //console.log(allergies)
  fetch('http://127.0.0.1:5000/search/')
  .then(response => {
      console.log(response)
      response.json()
      .then(data => {
        console.log(data)
        true_data = data;
        getRecipeorFood("Chicken Vesuvio", true_data);
      })
    })
  }, [allergies]);

  
  const [userInput, setUserInput] = useState([]);
  const addUserInput = (food) => {
      setUserInput(food)
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element = {
            <div className="App">
              <FoodForm addUserInput={addUserInput}> </FoodForm>
              <Filterbar 
              calories = {calories} caloriesChanged = {handleCaloriesInput} 
              allergies = {allergies} allergiesChanged = {handleAllergiesInput}
              diets = {diets} dietsChanged = {handleDietInput}
              ></Filterbar>
            </div>
          } />
          {!authCtx.isLoggedIn && <Route path='/auth' element = {<AuthPage />}/>}

          <Route path='/profile' element = { authCtx.isLoggedIn ? <UserProfile /> : <Navigate to='/auth' />}/>
        </Routes>
      </Layout>
    </Router>
  );

  // return (
    // <div className="App">
    //   <FoodForm></FoodForm>
    //   <Filterbar 
    //   calories = {calories} caloriesChanged = {handleCaloriesInput} 
    //   allergies = {allergies} allergiesChanged = {handleAllergiesInput}
    //   diets = {diets} dietsChanged = {handleDietInput}
    //   ></Filterbar>
    // </div>
  // );
}

export default App;
