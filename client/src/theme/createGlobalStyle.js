import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        border: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
        "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
        sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    * {
        font-family: 'Anton', sans-serif;
      }
      
      
    .main-container {
        min-height: 100vh;
        display: flex;
        margin: 0 auto;
        text-align: center;
        flex-direction: column;
        align-content: space-between;
        align-items: center;
        background-image: url('../pictures/gear-layout.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }
    
    .enterApp {
        margin-top: .5em;
        height: 150px;
        flex-wrap: wrap;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: all .5s ease;
    }
    
    .enterApp input {
        margin: 0.7em;
        opacity: 1;
        transition: all .5s ease;
    }
    
    .hide {
        
    }
    
    header {
        position: relative;
        width: 100%;
        background: black;
        height: 2.5em;
        font-family: 'Anton', sans-serif;
        z-index: 1;
        color: #69cb42;
        font-size: 1em;
        display: flex;
        align-items: center;
    }
    
    header h1 {
        font-size: 1.5em;
        letter-spacing: .04rem;
    }
    
    header img:first-child {
        padding: .5em;
        height: 75%;
        filter: brightness(0) invert(1);
    }
    
    footer {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 2.5em;
        width: 100%;
        background: black;
        overflow: hidden;
        z-index: 1;
    }
    
    footer img {
        padding: .5em;
        height: 75%;
        filter: brightness(0) invert(1);
    }
    
    .home {
        max-width: 1280px;
        min-width: 1080px;
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        margin: 2em;
        background-color: rgba(142,201,80,0.4);
        border: 10px inset rgba(193, 193, 193, 0.5);
    }
    
    .main-display {
        display: flex;
        flex-grow: 5;
        max-height: 35em;
        min-height: 25em;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 3%;
        background-color: rgba(255,255,255,0.4);
    }
    
    .main-display h1 {
        
    }
    
    .company-list {
        display: flex;
        flex-grow: 1;
        margin: 3%;
        max-height: 30em;
        max-width: 20em;
        flex-direction: column;
        background-color: rgba(255,255,255,0.4);
        transition: all .2s ease-in-out;
    }
    
    .company-list-container {
        height: 85%;
        width: 95%;
        margin: 0 auto;
        overflow: auto;
    }
    
    .company-list button {
        width: 75px;
        height: 25px;
        font-size: .2em;
        margin: 5px auto;
    }
    
    label {
        margin-bottom: .5em;
        margin-top: 1em;
    }
    
    .company-list-item {
        display: flex;
        flex-direction: column;
        height: auto;
        text-align: center;
        color: white;
        background-color: rgba(0,0,0,0.4);
        border: 2px black solid;
        padding: .2em;
        transition: font-size .2s ease-in-out;
    }
    
    .company-list-item span:nth-child(2){
        font-size: .75em;
    }
    
    .company-list-item:hover {
        font-size: 1.1em;
        cursor: pointer;
        background-color: rgba(0,0,0,0.8);
    }
    
    .company-list-item:active {
        background-color: #69cb42;
    }
    
    .inner-header {
        display: flex;
        align-items: center;
        flex-direction: row; 
        justify-content: space-around; 
        width: 100%;
        height: 40px;
        background-color: rgba(57, 57, 57, 0.8);
    }
    
    .create-company-menu {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(57, 57, 57, 0.8);
        clip-path: inset(40px 0px 0px 0px);
        left: 0;
        top: 0;
        height: 0;
        width: 100%;
        opacity: 1;
        z-index: 1;
        transition: all .2s ease-in-out;
    }
    
    .show-menu {
        
    }
    
    .dull-area {
        opacity: 0;
        height: 0;
    }
    
    #company-views div {
        height: 100%;
        background-color: rgba(255,255,255,0.4);
    }      
`

export default createGlobalStyle;