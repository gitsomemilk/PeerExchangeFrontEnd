import React from 'react';
import "./FormButton.css"

function FormButton( {onClick,children}) {
    return (
        <button
            type="submit"
            className="form-button"
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default FormButton;