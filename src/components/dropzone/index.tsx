import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";

interface Props {
  onFileUploaded: (file: File) => void;
}
const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>("");
  const [file, setFile] = useState<File>({} as File);
  const onDrop = useCallback((acceptedFiles: any) => {
    setFile(acceptedFiles[0]);
    const acFile = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(acFile);
    setSelectedFileUrl(fileUrl);
    onFileUploaded(acFile);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} accept="text/" />
      {selectedFileUrl ? (
        <p>{file.name}</p>
      ) : (
        <p>
          <FiUpload />
          Arquivo Cnab
        </p>
      )}
    </div>
  );
};

export default Dropzone;
