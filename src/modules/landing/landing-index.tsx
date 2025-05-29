import * as LandingComponents from './components/landing-components';
import React from 'react';


const Spacer = () => <div style={{backgroundColor: 'var(--color-dark)', height: '60px', width: '100%'}}/>;
export default function LandingIndex (): React.JSX.Element {
  return (
    <div>
      <main style={{width: '100%'}}>
        <LandingComponents.ComponentCarrousel orderByWishList/>
        <LandingComponents.RenderSections tittle='Tendencias' id='tendencies' filter={{ 
          orderByWishList: true, 
          pageNumber: 0,
          pageSize: 9 
        }}/>
        <Spacer/>
        <LandingComponents.TrustPanel/>
        <Spacer/>
        <LandingComponents.RenderSections tittle='Te recomendamos' id='recommended' filter={{ 
          orderByRecommendation: true, 
          pageNumber: 0,
          pageSize: 6
        }}/>
        <Spacer/>
        <LandingComponents.Partners/>
        <Spacer/>
        <LandingComponents.RenderSections tittle='Mas vendidos' id='best-sellers' filter={{ 
          orderByCheckoutCount: true, 
          pageNumber: 0,
          pageSize: 6
        }}/>
        <Spacer/>
        <LandingComponents.ComponentCarrousel orderByCheckoutCount/>
        <LandingComponents.LastReveiws/>
        <Spacer/>
        <LandingComponents.IndiesSection/>
        <Spacer/>
        <LandingComponents.Categories/>
      </main> 
    </div>
  );
}
