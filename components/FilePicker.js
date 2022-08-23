function FilePicker({ handleChange, availableImage }) {
  return (
    <label
      htmlFor="x"
      id={`${availableImage ? "file_picker_small" : ""}`}
      className={`file_picker `}
    >
      <span>
        {availableImage ? "Select another image" : "Click to select an image"}
      </span>
      <input onChange={handleChange} type="file" id="x" accept="image/*" />
    </label>
  );
}
export default FilePicker;
