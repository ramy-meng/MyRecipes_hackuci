import React from "react";

function RecipeView({ recipes }) {
    console.log("RecipeView")
    console.log(recipes)
    console.log("RECIPES" + recipes)
    console.log(typeof(recipes))
    console.log(recipes[1])

    var items = Array()
    
    return(
        <div>
        {recipes.map(item => {
            <div>

            <h1>{item.name}</h1>,
            <ul>
                <li>{item.ingredients}</li>
            </ul>,
            <p>
            <a href={item.url}>{item.url}</a>
            </p>,
            <img src={item.image} alt="Photo of {this.name}"/>
            </div>}
    )}
    </div>
    )
}

export default RecipeView;