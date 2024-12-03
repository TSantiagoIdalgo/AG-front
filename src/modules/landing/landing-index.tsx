import * as LandingComponents from './components/landing-components';
import React from "react";

export default function LandingIndex (): React.JSX.Element {
  return (
    <main>
      <LandingComponents.ComponentCarrousel/>
      <LandingComponents.RenderSections tittle='Tendencias' filter={{ 
        orderByCheckoutCount: true, 
        pageNumber: 0,
        pageSize: 9 
      }}/>
      <LandingComponents.TrustPanel/>
      <div style={{backgroundColor: 'var(--color-dark)', height: '60px', width: '100%'}}/>
      <LandingComponents.RenderSections tittle='Te recomendamos' filter={{ 
        orderByRecommendation: true, 
        pageNumber: 0,
        pageSize: 6
      }}/>
      <div style={{backgroundColor: 'var(--color-dark)', height: '60px', width: '100%'}}/>
      <LandingComponents.Partners/>
    </main> 
  );
}