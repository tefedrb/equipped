import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

const InventoryOverview = (props) => {
    const [state, changeState] = useState({});
    const Overview = styled.div`
        height: 100%;
        width: 100%;
        padding: 1em;
    `

    return (
        <Overview>
            {props.children}
        </Overview>
    )
}

export default InventoryOverview;