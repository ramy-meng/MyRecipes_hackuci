import React, {useState} from 'react'
import "./inputfilterStyle.css"

function CaloriesFilter(props)
{

    const handleChange = (event) => {
        // calling callback caloriesChanged to update main App.js calories useState

        props.caloriesChanged(event.target.value);
    }
    
    return (
        <div className='inputFilter'>
            <form id = 'caloriesform'>
                <label id = 'calorieslabel'>
                    <input id = 'caloriesinput' type="text" placeholder="Calories"  calories = {props.calories} onChange = {handleChange} />
                </label>
            </form>
        </div>

    )
}

export default CaloriesFilter