import { createGlobalStyle } from "styled-components";
import main_img from "./assets/images/main_img.png";

const GlobalStyles = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  font-family: 'Noto Sans KR';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  background-image: linear-gradient(180deg, rgba(6, 15, 1, 0.3) 0%, #04010C 68.7%), url(${main_img});
  background-attachment: fixed;
}

* {
  box-sizing: inherit;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

input, button, textarea {
  font-family: inherit;
}
html, body, #root {
  height: 100%;
  font-size: 62.5%;
}

@font-face {font-family: 'Noto Sans KR';font-style: normal;font-weight: 100;src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Thin.woff2) format('woff2'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Thin.woff) format('woff'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Thin.otf) format('opentype');} @font-face {font-family: 'Noto Sans KR';font-style: normal;font-weight: 300;src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Light.woff2) format('woff2'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Light.woff) format('woff'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Light.otf) format('opentype');} @font-face {font-family: 'Noto Sans KR';font-style: normal;font-weight: 400;src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff2) format('woff2'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff) format('woff'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.otf) format('opentype');} @font-face {font-family: 'Noto Sans KR';font-style: normal;font-weight: 500;src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.woff2) format('woff2'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.woff) format('woff'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.otf) format('opentype');} @font-face {font-family: 'Noto Sans KR';font-style: normal;font-weight: 700;src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.woff2) format('woff2'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.woff) format('woff'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.otf) format('opentype');} @font-face {font-family: 'Noto Sans KR';font-style: normal;font-weight: 900;src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Black.woff2) format('woff2'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Black.woff) format('woff'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Black.otf) format('opentype');}


/* font */
/* @font-face {
  font-family: 'Noto Sans KR';
  font-weight: 300;
  src: url('./styles/fonts/NotoSansKR-Light.otf') format('woff2'),
    url('./styles/fonts/NotoSansKR-Light.otf') format('woff'),
    url('./styles/fonts/NotoSansKR-Light.otf') format('truetype'),
    url('./styles/fonts/NotoSansKR-Light.otf') format('opentype');
}

@font-face {
  font-family: 'Noto Sans KR';
  font-weight: 400;
  src: url('./styles/fonts/NotoSansKR-Regular.otf') format('woff2'),
    url('./styles/fonts/NotoSansKR-Regular.otf') format('woff'),
    url('./styles/fonts/NotoSansKR-Regular.otf') format('truetype'),
    url('./styles/fonts/NotoSansKR-Regular.otf') format('opentype');
}
@font-face {
  font-family: 'Noto Sans KR';
  font-weight: 500;
  src: url('styles/fonts/NotoSansKR-Medium.otf') format('woff2'),
       url('styles/fonts/NotoSansKR-Medium.otf') format('opentype');
}

@font-face {
  font-family: 'Noto Sans KR';
  font-weight: 700;
  src: url('./styles/fonts/NotoSansKR-Bold.otf') format('woff2'),
    url('./styles/fonts/NotoSansKR-Bold.otf') format('woff'),
    url('./styles/fonts/NotoSansKR-Bold.otf') format('truetype'),
    url('./styles/fonts/NotoSansKR-Bold.otf') format('opentype');
} */
`;

export default GlobalStyles;
