import { useState, useEffect } from 'react';
import { axios } from 'axios';

const AddStudent = () => {
    const [student, setStudent] =  useState([]);


    function onClickHandle() {
            
    }

return (

    <div>
        <h1>Add Students</h1>

        <input 
        type="text"
        placeholder="Enter student name"
        >
        </input>
        <button title="Add"
        onClick={onClickHandle}>

        </button>
    </div>
)
    
}

export default AddStudent;