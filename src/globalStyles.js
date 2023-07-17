import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}
    html {
        background-color: #cae9ff;
    }
    *{
        box-sizing: border-box;
    }
    a,
    a:link,
    a:visited,
    a:hover{
        text-decoration: none;
        color: inherit;
    }
    input{
        padding: 0;
        margin: 0;
    }
    button{
        background-color: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 0;
    }
`;

export default GlobalStyle;
