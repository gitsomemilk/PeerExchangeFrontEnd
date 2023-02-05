import "./Input.css"
import React from 'react';

function Input({ name , labelText , type , className , placeholder , value , validationRules , errors , register }) {
    return (
        <div className="input-component">
            <label htmlFor={name}>
                {labelText}

            <input
                type={type}
                name={name}
                className={className}
                placeholder={placeholder}
                value={value}
                {...register(name,validationRules)}
            />
            </label>
            {errors[name] && <p>{errors[name].message}</p> }
        </div>
    );
}

export default Input;