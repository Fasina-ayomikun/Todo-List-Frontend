import React from "react";
import { NavLink } from "react-router-dom";

function AddBtn({ setIsEditing }) {
  return (
    <NavLink to='/add' onClick={() => setIsEditing(false)}>
      <div className='addTask'>
        <div></div>
        <div></div>
      </div>
    </NavLink>
  );
}

export default AddBtn;
