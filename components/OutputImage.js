const OutPutImage = ({
  handleDownload,
  transCodedImageData,
  format,
  loading,
}) => {
  if (loading)
    return (
      <article>
        <p>
          Converting to <b> {format}</b> please wait....
        </p>
      </article>
    );
  const { newImageSize, originalImageSize, newImageSrc } = transCodedImageData;
  if (!loading && !originalImageSize)
    return (
      <article>
        <h2> Select an image file from your computer</h2>
      </article>
    );
  const newImageIsBigger = originalImageSize < newImageSize;
  const toPercentage = (val) => Math.floor(val * 100) + "%";

  return newImageSrc ? (
    <article>
      <section className="grid_txt_2">
        <div className="bord_g_2 p_2 u-center">
          <img src={newImageSrc} width="450" />
          <p className="flexi u-center">
            <span>
              {" "}
              SIZE: {(newImageSize / 1024 / 1024).toFixed(2) + "MB"}{" "}
            </span>
          </p>
          <p>
            <span className={newImageIsBigger ? "col-r" : "col-g"}>
              {toPercentage(newImageSize / originalImageSize)}
            </span>
          </p>
        </div>
        <button onClick={handleDownload} className="btn btn_g">
          {" "}
          Download
        </button>
      </section>
    </article>
  ) : null;
};
export default OutPutImage;
