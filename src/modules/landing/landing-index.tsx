import * as LandingComponents from './components/landing-components';
import React from "react";

export default function LandingIndex (): React.JSX.Element {
  return (
    <main>
      <LandingComponents.ComponentCarrousel/>
      <LandingComponents.RenderSections tittle='Tendencias' filter={{ pageNumber: 0, pageSize: 10 }}/>
    </main> 
  );
}