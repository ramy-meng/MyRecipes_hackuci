import React, {useState} from "react";
import "./filterStyle.css";

function FilterAllergies(props)
{

    const handleOnClick = (event) =>{
        console.log("onclick in allergies", event.target.id);
        var choosen = document.getElementById(event.target.id);
        if (props.allergies[event.target.id] == false)
        {
            //var temp = JSON.parse(JSON.stringify(props.allergies));
            //console.log(props.allergies);
            choosen.className =  "dropdown-content-clicked";
            //temp[event.target.id] = true;
            //console.log(temp)
            props.allergiesChanged(
                {
                    ...props.allergies,
                    [event.target.id] : true
                }
            )
            //console.log(props.allergies);
            //console.log(props.allergies);
            
        }
        else{
            //var temp = props.allergies;
            choosen.className = "dropdown-content-unclicked"
            //temp[event.target.value] = false;
            props.allergiesChanged(
                {
                    ...props.allergies,
                    [event.target.id] : false
                }
            );
        }

    }

    //const [dropDownList, setdropDownList] = useState([]);
    //initialize this elements with main App useState allergies
    // const [allergies, setAllergiesChild] = useState({
    //     "Alcohol Free" : props.allergies['Alcohol Free'],
    //     "Celery Free": props.allergies['Celery Free'],
    //     "Dairy Free":props.allergies['Dairy Free'],
    //     "Egg Free" :props.allergies['Egg Free'],
    //     "Fish Free":props.allergies['Fish Free'],
    //     "FODMAP Free":props.allergies['FODMAP Free'],
    //     "Gluten Free":props.allergies['Gluten Free'],
    //     "Lupine Free":props.allergies['Lupine Free'],
    //     "Mollusk Free":props.allergies['Mollusk Free'],
    //     "Mustard Free":props.allergies['Mustard Free'],
    //     "Peanut Free":props.allergies['Peanut Free'],
    //     "Pork Free":props.allergies['Pork Free'],
    //     "Shellfish Free":props.allergies['Shellfish Free'],
    //     "Soy Free":props.allergies['Soy Free'],
    //     "Sulfite Free":props.allergies['Sulfite Free'],
    //     "Tree Nut Free":props.allergies['Tree Nut Free'],
    //     "Wheat Free":props.allergies['Wheat Free'],
    // });


    // const [allergies, setAllergiesChild] = useState({
    //     "Alcohol Free" : false,
    //     "Celery Free": false,
    //     "Dairy Free":false,
    //     "Egg Free" : false,
    //     "Fish Free":false,
    //     "FODMAP Free":false,
    //     "Gluten Free":false,
    //     "Lupine Free":false,
    //     "Mollusk Free":false,
    //     "Mustard Free":false,
    //     "Peanut Free":false,
    //     "Pork Free":false,
    //     "Shellfish Free": false,
    //     "Soy Free":false,
    //     "Sulfite Free": false,
    //     "Tree Nut Free":false,
    //     "Wheat Free" : false
    // }); 

    const items = [];

    for(let e in props.allergies)
    {
        //console.log("here is items loop ", e)
        items.push(<a className = "dropdown-content-unclicked" type="button" key= {e} id = {e} onClick = {handleOnClick}>{e}</a>) //can you do this to pass handleOnClick function call
    }

    //window.addEventListener()

    return(
        <div className="dropdown">
        <button className="dropbtn">Allergy</button>
        <div className="dropdown-content">
            {items}
        </div>
        </div>
    )
}

export default FilterAllergies;