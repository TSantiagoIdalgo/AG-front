import * as LandingComponents from './components/landing-components';
import React from "react";

export default function LandingIndex (): React.JSX.Element {
  return (
    <div style={{backgroundImage: "url(https://gaming-cdn.com/img/products/16993/hcover/1400x500/16993.jpg?v=1731485914)", height: "100vh"}}>
      <LandingComponents.Navbar/>
    </div>
  );
}