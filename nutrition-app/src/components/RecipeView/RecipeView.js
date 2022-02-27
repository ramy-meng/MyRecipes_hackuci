import React from "react";

function RecipeView({ recipes }) {
    //console.log("RecipeView")
    //console.log(recipes)
    //console.log("RECIPES" + recipes)
    //console.log(typeof(recipes))
    //console.log(recipes[1])

    var items = Array()
    //console.log("about to start printing images");
    return(
        <div id = "wrapper" >
        {recipes.map(item => (
            <div>

            <h1 id = "header" >{item.name}</h1>,
            <ul>
                <li>{item.ingredients}</li>
            </ul>,
            <p>
            <a href={item.url}>Details</a>
            </p>,
            <img src={item.image} alt="Photo of {this.name}"/>
            <button id = "button">Click</button>
            </div>)
    )}
    </div>
    )
}

export default RecipeView;