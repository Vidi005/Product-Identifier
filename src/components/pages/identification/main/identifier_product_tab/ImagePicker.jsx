import React from "react"

const ImagePicker = ({ pickImage }) => (
  <label className="aspect-square border-2 border-white p-1 cursor-pointer rounded-full shadow-lg" htmlFor="image-picker">
    <input id="image-picker" className="hidden" type="file" accept="image/*" onChange={pickImage} />
    <img className="h-8 object-cover object-center" src="images/import-image-icon.svg" alt="Import Image" />
  </label>
)

export default ImagePicker