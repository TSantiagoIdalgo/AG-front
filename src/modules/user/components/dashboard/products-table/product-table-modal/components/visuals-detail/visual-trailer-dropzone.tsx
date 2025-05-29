import React, { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Style from './visuals-detail.module.css';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { Product } from '#src/common/interfaces/product.interface.ts';
import VideoNotFound from '#assets/background/video-not-found.png';

interface VisualTrailerDropzoneProps { trailer: string, setProductState: React.Dispatch<React.SetStateAction<Product | undefined>> }

const VisualTrailerDropzone = ({ trailer, setProductState }: VisualTrailerDropzoneProps): React.JSX.Element => {
  const onDrop = useCallback(() => undefined, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles  } = useDropzone({accept: { 'video/*': [] },  multiple: false, onDrop});

  useEffect(() => {
    if(acceptedFiles[0]) setProductState((prev) => ({ ...prev, trailer: acceptedFiles[0] as unknown }) as Product);
    
  }, [acceptedFiles]);

  return (
    <div className={Style.trailer}  {...getRootProps()} >
      <input {...getInputProps()}/>
      {trailer 
        ? <video src={acceptedFiles[0] ? URL.createObjectURL(acceptedFiles[0]) : trailer} controls></video>
        : <img src={VideoNotFound} alt='not-found'/>}
      {isDragActive && <span className="dropzone_on_drop">
        <IoCloudUploadOutline fontSize={100} color='#fff'/>
      </span>}
    </div>
  );
};

export default VisualTrailerDropzone;