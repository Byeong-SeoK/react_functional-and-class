import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  //React.StrictMode 컴포넌트 때문에 여기서 한번 App이 랜더링되고
  //이 컴포넌트 하위의 App 컴포넌트에서 또 랜더링 되어
  //총 2번의 랜더링이 발생한다.

  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
