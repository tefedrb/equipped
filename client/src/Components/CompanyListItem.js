import React from 'react';
import '../App.css';
// Hook to check if clicked on, etc
function CompanyListItem(props){
  
  return (
    <div className="company-list-item">
      <span>
        {props.company.name}
      </span>
      <span>
        Type: {props.company.type}
      </span>
    </div>
  )
}

export default CompanyListItem;
