export default function ImageUploader({ onUpload }) {
  function handleChange(event) {
    const file = event.target.files[0]
    if (file) {
      onUpload(URL.createObjectURL(file))
    }
  }

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleChange}
    />
  )
}
