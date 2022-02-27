import { useCallback, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';

import React, { useState, useEffect } from 'react';

import './App.css';
import FoodForm from './FoodForm'
import Filterbar from './components/filterBar/filterBar'
import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import AuthContext from './store/auth-context';
import RecipeView from './components/RecipeView/RecipeView'

var true_data;
var checking = false;

function App() {
  let recipes = Array();
  const authCtx = useContext(AuthContext);
  const [calories, setCalories] = useState(-1);
  const [allergies, setAllergies] = useState(
    {
        "alcohol-free" : false,
        "celery-free": false,
        "dairy-free":false,
        "egg-free" : false,
        "fish-free":false,
        "fodmap-free":false,
        "gluten-free":false,
        "lupine-free":false,
        "mollusk-free":false,
        "mustard-free":false,
        "peanut-free":false,
        "pork-free":false,
        "shellfish-free": false,
        "soy-free":false,
        "sulfite-free": false,
        "tree-nut-free":false,
        "wheat-free" : false

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
  const getRecipeorFood = (data) => { // userInput is what user put in search
    data.forEach((item) => {
      //if (item.recipe.label === userInput) { // userInput was a recipe
        //console.log(userInput +  " found from API"); /* Print to console for debugging*/
        var recipeImage = item.recipe.image;
        var recipeCalories = item.recipe.calories; // without the divide by 10
        var recipeName = item.recipe.label;
        var recipeIngredients = item.recipe.ingredientLines;
        var recipeURL = item.recipe.shareAs;
        var recipe = {
          "name": recipeName,
          "image": recipeImage,
          "calories": recipeCalories,
          "ingredients": recipeIngredients,
          "url": recipeURL
        }
        recipes.push(recipe);
        
      
        // console.log("Name is " + recipeName + " with calories of " + recipeCalories + 
        // " and image url is " + recipeImage + " and ingredients are " + recipeIngredients +
        // " and the url to the recipe is " + recipeURL);
        
      //}
      // else { // Either userInput was not a recipe and was a food item instead or they entered nonsense
      //   console.log("Not found");
      //   // TODO
      // }
    });
  }

 const [userInput, setUserInput] = useState([]);
  const addUserInput = (food) => {
      setUserInput(food)
  }

//////
  const findhealth = () =>{
    var re= []
    for (const [key, value] of Object.entries(allergies)){
      if (value){
        re.push(key);

      }
    }

    for (const [key, value] of Object.entries(diets)){
      if (value){
        re.push(key);

      }
    }

    return re;
  }

  const generateRandomLetter = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return alphabet[getRandomInt(0,25)]
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }


  useEffect(() => {
    //console.log(allergies)
    if (userInput  === "") {return;}
  var health = findhealth();
  console.log(allergies)
  console.log(userInput)
  var searchquery = new FormData();
  if (userInput !== "")
  {
      searchquery.append("q", userInput);
    
  }
  else{
      searchquery.append("q", generateRandomLetter());
  }
  if (health.length > 0)
  {
    for (let i  = 0; i < health.length; i++)
    {
      searchquery.append("health", health[i])

    }
  }



  const params = new URLSearchParams(searchquery);
  fetch('http://127.0.0.1:5000/search/?' + params.toString(),{
      method: 'GET',
  }).then(res => res.json())
  .then(response => {
      console.log(response)

        true_data = response.hits
        getRecipeorFood(true_data);
        console.log(recipes.length)
        console.log(recipes)
        checking = true;
      
    })
  }, [userInput]);

////
  // useEffect(() => {
  //   //console.log(allergies)
  // console.log("fetching")
  // var url = 'http://127.0.0.1:5000/search/' + userInput;
  // console.log(url)
  // console.log(userInput)
  // fetch(url)
  // .then(response => {
  //     console.log(response)
  //     response = response.json()
  //     response.then(data => {
  //       true_data = data.hits
  //       getRecipeorFood(true_data);
  //       console.log(recipes.length)
  //       console.log(recipes)

  //     })
    
  //   })
  // });


  const fetchRecipeHandler = () => {
      var allRecipes;
      fetch('https://authentication-b446d-default-rtdb.firebaseio.com/recipes.json').then(response => {
        return response.json()
      }).then(data => {
        console.log(data)
        allRecipes = data
      })
      const userRecipe = [];
      // loop through to get all the data that has the same tokenID as our user and append it to an array
      // each recipe has it own key so we can loop through every
      for (const key in allRecipes) {
        if (allRecipes[key]['token'] === authCtx.token) {
            userRecipe.push(allRecipes[key]);
        }
      }
      //Return an array of user's recipe
      return userRecipe;
    }



  const saveRecipeHandler = (recipeInfo) => {
    var token = "token";
    recipeInfo[token] = authCtx.token;

    fetch('https://authentication-b446d-default-rtdb.firebaseio.com/recipes.json', {
      method: 'POST',
      body: JSON.stringify(recipeInfo)
    }).then(data => {
      console.log(data)
      console.log("Data has been posted!")
    })
  }



  
  return (
      <Layout>
        <Routes>
          <Route path='/' element = {
            <div className="App">
              <FoodForm generateLetter = { generateRandomLetter} addUserInput={addUserInput}> </FoodForm>
              <Filterbar 
              calories = {calories} caloriesChanged = {handleCaloriesInput} 
              allergies = {allergies} allergiesChanged = {handleAllergiesInput}
              diets = {diets} dietsChanged = {handleDietInput}
              ></Filterbar>
              <RecipeView recipes={recipes}></RecipeView>
              {/* {checking && <RecipeView recipes={recipes}> </RecipeView>} */}
            </div>
          } />
          {!authCtx.isLoggedIn && <Route path='/auth' element = {<AuthPage />}/>}
          <Route path='/profile' element = { authCtx.isLoggedIn ? <ProfilePage /> : <Navigate to='/auth' />}/>
        </Routes>
      </Layout>
  );
}

export default App;
