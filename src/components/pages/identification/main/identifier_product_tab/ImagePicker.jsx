import React from "react"
import Dropzone from "react-dropzone"

const ImagePicker = ({ pickImage }) => (
  <Dropzone accept={"image/*"} useFsAccessApi={false} onDrop={pickImage}>
    {({ getRootProps, getInputProps }) => (
      <button className="aspect-square border-2 border-white p-1 rounded-full shadow-lg" {...getRootProps()}>
        <img className="h-8 object-cover" src="images/import-image-icon.svg" alt="Import image" {...getInputProps} />
      </button>
    )}
  </Dropzone>
)

export default ImagePicker