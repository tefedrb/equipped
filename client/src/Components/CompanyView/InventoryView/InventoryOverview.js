import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

const InventoryOverview = (props) => {
    const [state, changeState] = useState({});
    const Overview = styled.div`
        border: 5px solid red;
        height: 100%;
        width: 100%;
    `

    return (
        <Overview>

        </Overview>
    )
}

export default InventoryOverview;