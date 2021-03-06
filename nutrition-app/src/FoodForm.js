import React from "react";
import { useState } from "react";

function FoodForm(props) {

  const [userInput, setUserInput] = useState();
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput === "")
    {
      props.addUserInput(props.generateLetter())
    }
    else{
      props.addUserInput(userInput);
    }
    
  }
 
  return (
    <form onSubmit={e => {handleSubmit(e)}}>
      
      <input font size="70" name="userInput" type="text" placeholder="Enter any ingredients or food" value={userInput || ""} onChange={e => setUserInput(e.target.value)}/>      
      <input className='submitButton' type="submit" value='Search' />

     
    </form>
  )
}

  export default FoodForm
