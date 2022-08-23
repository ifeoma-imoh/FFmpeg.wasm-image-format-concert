export default function OutputImageFormatSelector({
  disabled,
  format,
  handleFormatChange,
}) {
  return (
    <div className="form_g">
      <label> Convert to:</label>
      <select disabled={disabled} value={format} onChange={handleFormatChange}>
        <option value="">Select output format</option>
        <option value="jpeg">JPEG</option>
        <option value="png">PNG</option>
        <option value="gif">GIF</option>
        <option value="webp">WEBP</option>
      </select>
    </div>
  );
}
