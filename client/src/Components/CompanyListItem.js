import React, {useState} from 'react';
import '../CSS/App.css';
// Hook to check if clicked on, etc
function CompanyListItem(props){
  const [companyId] = useState(props.company.id);
  return (
    <div onClick={()=>props.getCompanyInfo(companyId)} className="company-list-item">
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