import React from 'react';

const CreateCompany = (props) => {
    const showCreateMenu = props.showCreateMenu ? "show-menu" : null;
    return  (
        <div className={`create-company-menu ${showCreateMenu}`}>
            
        </div>
    )
};

export default CreateCompany;