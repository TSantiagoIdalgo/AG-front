import React from 'react';

interface ImageCellRendererProps {
    value: string
}

const ImageCellRenderer: React.FC<ImageCellRendererProps> = (props): React.JSX.Element => (
  <img
    src={props.value}
    alt="avatar"
    style={{ borderRadius: '50%', height: '40px', width: '40px' }}
  />
);

export default ImageCellRenderer;