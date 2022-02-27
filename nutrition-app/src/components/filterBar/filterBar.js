import React, {useState} from "react";
import FilterAllergies from "./filterAllergies";
import "./filterBar.css"
import FilterDiets from "./filterDiets";
import CaloriesFilter from "./inputfilter";

function Filterbar(props)
{


    return (
        <div className="filterBar">
            < FilterAllergies allergies = {props.allergies} allergiesChanged = {props.allergiesChanged}></FilterAllergies>
            <FilterDiets diets = {props.diets} dietsChanged = {props.dietsChanged}></FilterDiets>
            <CaloriesFilter caloriest = {props.calories} caloriesChanged = {props.caloriesChanged}></CaloriesFilter>
        </div>
    )
}

export default Filterbar