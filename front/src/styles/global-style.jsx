import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --past-circle-orange: #DF7452;
    --current-circle-glow: 0 0 3.5px 1.75px rgb(255, 255, 255, .3), 0 0 6px 3.5px rgb(255, 0, 255, .3), 0 0 9px 5px rgb(0, 255, 255, .3);

    select {
      scrollbar-color: #DF7452 #4f547f;  
      scrollbar-width: thin;
    }
  }
`;
