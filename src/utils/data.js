const isStorageExist = content => {
    if (!navigator.cookieEnabled) {
      alert(content)
      return false
    } else {
      return true
    }
  }

const getNavIcons = () => [
  'images/first-last-page-icon.svg',
  'images/nav-page-icon.svg',
  '',
  'images/nav-page-icon.svg',
  'images/first-last-page-icon.svg',
]

const convertDataURLtoFile = (dataUrl, filename) => {
  const arr = dataUrl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) u8arr[n] = bstr.charCodeAt(n)
  return new File([u8arr], filename, { type: mime })
}

const convertDataURLtoBlob = (dataUrl) => {
  const arr = dataUrl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) u8arr[n] = bstr.charCodeAt(n)
  return new Blob([u8arr], { type: mime })
}

export { isStorageExist, getNavIcons, convertDataURLtoFile, convertDataURLtoBlob }