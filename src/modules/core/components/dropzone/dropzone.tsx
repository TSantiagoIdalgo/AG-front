import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { IoCloudUploadOutline } from 'react-icons/io5';
import React from 'react';

interface DropzoneComponentProps {
  defaultImage: string;
  styleImage: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onAfterDrop: (...args: any[]) => void
  altImage?: string;
  acceptContent?: string;
  style?: React.CSSProperties
}

const DropzoneComponent: React.FC<DropzoneComponentProps> = ({ defaultImage, styleImage, altImage, acceptContent = 'image/*', style, onAfterDrop }) => {
  const onDrop = useCallback(() => undefined, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles  } = useDropzone({accept: { [acceptContent]: [] },  multiple: false, onDrop});

  useEffect(() => {
    if (acceptedFiles[0]) onAfterDrop?.(acceptedFiles[0]);
  }, [acceptedFiles]);

  return (
    <div className="dropzone_drop" {...getRootProps()} style={style}>
      <input {...getInputProps()}/>
      <img src={acceptedFiles[0] ? URL.createObjectURL(acceptedFiles[0]) : defaultImage} alt={altImage} className={styleImage} />
      {isDragActive && <span className="dropzone_on_drop">
        <IoCloudUploadOutline fontSize={100} color='#fff'/>
      </span>}
    </div>
  );
};

export default DropzoneComponent;