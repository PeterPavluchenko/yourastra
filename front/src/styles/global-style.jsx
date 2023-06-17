import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --past-circle-orange: #DF7452;
    --current-circle-glow: 0 0 7.5px 3.75px rgba(255, 255, 255, .3), 0 0 12.5px 7.5px rgba(255, 0, 255, .3), 0 0 17.5px 11.25px rgba(0, 255, 255, .3);
  }
`;
