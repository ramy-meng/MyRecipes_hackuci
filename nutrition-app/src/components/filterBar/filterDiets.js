import React, {useState} from "react";
import "./filterStyle.css";

function FilterDiets(props)
{

    const handleOnClick = (event) =>{
        console.log("onclick in diet", event.target.id);
        var choosen = document.getElementById(event.target.id);
        if (props.diets[event.target.id] == false)
        {
            //var temp = props.diets;
            //console.log(props.diets);
            choosen.className =  "dropdown-content-clicked";
            //temp[event.target.value] = true;
            props.dietsChanged(
                {
                    ...props.diets,
                    [event.target.id] : true
                }
            );

            // console.log(props.diets);
            // console.log(temp);
            
        }
        else{
            //var temp = props.allergies;
            choosen.className = "dropdown-content-unclicked"
            //temp[event.target.id] = false;
            props.dietsChanged(
                {
                    ...props.diets,
                    [event.target.id] : false
                }
            );
        }

    }
    //const [dropDownList, setdropDownList] = useState([]);
    // const elements = [
    //  "Vegan",
    //  "Vegetarian"
    // ];

    const items = [];

    for(let e in props.diets)
    {
        items.push(<a className = "dropdown-content-unclicked" type="button" key= {e} id = {e} onClick = {handleOnClick}>{e}</a>)
    }

    return(
        <div className="dropdown">
            <button className="dropbtn">Diet</button>
            <div className="dropdown-content">
                {items}
            </div>
        </div>
    )
}

export default FilterDiets;