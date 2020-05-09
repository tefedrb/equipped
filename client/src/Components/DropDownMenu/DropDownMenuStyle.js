import styled from 'styled-components';

const DropDownMenuStyle = styled.div `
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(57, 57, 57, 0.8);
            clip-path: inset(40px 0px 0px 0px);
            left: 0;
            top: 0;
            width: 100%;
            opacity: 1;
            z-index: 1;
            transition: all .2s ease-in-out;
            height: 0;

            &:active {
                height: 100%;
            }
        `
export default DropDownMenuStyle;