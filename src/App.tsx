import React from "react";
import "./App.css";
import { Form } from "./components/Form";
// import { RecoilRoot } from "recoil";


export const App = (): JSX.Element => {
  return (
    // <RecoilRoot>
    <div>
      <header>
        <h1>~ React TODO of Typescript ~</h1>
      </header>
      <Form />
    </div>
    // </RecoilRoot>
  );
};
