import React from "react";

function RecipeView({ recipes }) {
    console.log(recipes)
    console.log("RECIPES" + recipes)
    console.log(typeof(recipes))
    console.log(recipes[1])
    

    
    return recipes.map((item) => (
        [<h1>{item.name}</h1>,
        <ul>
            <li>{item.ingredients}</li>
        </ul>,
        <p>
        <a href={item.url}>{item.url}</a>
        </p>,
        <img src={item.image} alt="Photo of {this.name}"/>]
    ));
    
}

export default RecipeView;