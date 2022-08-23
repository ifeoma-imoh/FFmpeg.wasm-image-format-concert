export default function InputImagePreviewer({ previewURL, inputImage }) {
  return (
    <div className="bord_g_2 p_2 u-center">
      <img src={previewURL} width="450" alt="preview image" />
      <p className="flexi u-center">
        SIZE:
        <b>{(inputImage.size / 1024 / 1024).toFixed(2) + "MB"}</b>
      </p>
      <p className="flexi u-center">
        FORMAT:
        <b>{/\.(\w+)$/gi.exec(inputImage.name)[1]} </b>
      </p>
    </div>
  );
}
