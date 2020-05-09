import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
// import CreateCompany from '../FetchData/UsersApi/CreateCompany';


// This should be able to take a component injection

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

// What if I can put the create menu through the component

const DropDownMenu = (props) => {
    const [menuDisplay, toggleDisplay] = useState(false);
    const { parentForceMenuDisplay } = props;
    
    useEffect(() => {
        console.log("yeah")

        if(parentForceMenuDisplay && !menuDisplay){
            toggleDisplay(true);
            console.log("yeah in")
        }
    }, [parentForceMenuDisplay])
    // const handleChange = (event) => {
    //     console.log(event.target.name)
    //     updateMenuState(prevState => {
    //         return {
    //             ...prevState,
    //             [event.target.name]: event.target.value
    //         }
    //     })
    // }

    // This can have a back button - default
    // Still would be good if the child (children) can communicate
    // to this
    // MAYBE WRAP CHILDREN IN COMPONENT??

    // We want to insert the state of our menu into a child component
    // This child component will be able to update this state this way.
    // We will use the render prop technique
    // Pass in property that targets state
    const parentToggleDisplay = (clicked) => {
        toggleDisplay(prevState => true);
    } 


    return  (
        <DropDown style={menuDisplay ? showMenu : null}>
            <Div>
                {props.render(toggleDisplay)}  
            </Div>
        </DropDown> 
    )
};

export default DropDownMenu;


