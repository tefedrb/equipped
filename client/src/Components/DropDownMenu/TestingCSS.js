import React, { useEffect } from 'react';
import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '../../CSS/index.css';

const Div = styled.div `
    display: flex;
    background-color: white;
    color: black;
    border-radius: 5px;
    flex-grow: .66;
    height: 70%;
    margin: 5%;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: black;
`
const DropDown = styled.div `
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
`
const showMenu = {
    height: "100%"
}

const DropDownMenu = (props) => {
    const { parentMenuDisplaySwitch, toggleParentMenuSwitch } = props;
    
    useEffect(() => {
        const listenForEscape = (e) => {
            if(e.key === "Escape" && parentMenuDisplaySwitch){
                toggleParentMenuSwitch();
            }
        } 

        document.addEventListener("keydown", listenForEscape);

        return () => {
            document.removeEventListener("keydown", listenForEscape);
        }
    }, [parentMenuDisplaySwitch, toggleParentMenuSwitch])

    return  (
        <DropDown style={showMenu}>
            <Div>
                {props.render(toggleParentMenuSwitch)}
            </Div>
        </DropDown>
    )
};

export default DropDownMenu;

{/* <DropDown style={parentMenuDisplaySwitch ? showMenu : null}>
            <Div>
                {props.render(toggleParentMenuSwitch)}
            </Div>
        </DropDown> */}


// const DropDownMenu = (props) => {
//     const { parentMenuDisplaySwitch, toggleParentMenuSwitch } = props;
    
//     useEffect(() => {
//         const listenForEscape = (e) => {
//             if(e.key === "Escape" && parentMenuDisplaySwitch){
//                 toggleParentMenuSwitch();
//             }
//         } 

//         document.addEventListener("keydown", listenForEscape);

//         return () => {
//             document.removeEventListener("keydown", listenForEscape);
//         }
//     }, [parentMenuDisplaySwitch, toggleParentMenuSwitch])

//     return  (
//         <DropDown style={showMenu}>
//             <Div>
//                 {props.render(toggleParentMenuSwitch)}
//             </Div>
//         </DropDown>
//     )
// };

// export default DropDownMenu;
