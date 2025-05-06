import { MdClose } from 'react-icons/md';
import { SiVerizon } from 'react-icons/si';
import React from 'react';

interface IBooleanCellRender {
  value: unknown
}

export const BooleanCellRender = (props: IBooleanCellRender): React.JSX.Element => (
  <div>
    {props.value 
      ? (
        <div title={props.value as string} style={{background: 'rgb(53, 182, 90)', borderRadius: '50%',  display: 'flex', height: '35px', padding: '10px'}}>
          <SiVerizon color='#fff'/>
        </div> 
      )
      : <div style={{background: 'rgb(255, 0, 92)', borderRadius: '50%', display: 'flex', height: '35px', padding: '10px'}}>
        <MdClose color='#fff' fontSize={15}/>
      </div> }
  </div>
);

export default BooleanCellRender;