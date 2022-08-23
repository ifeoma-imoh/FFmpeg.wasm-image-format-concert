import { useState } from "react";
import * as helpers from "../helpers";
import FilePicker from "../components/FilePicker";
import OutputImage from "../components/OutPutImage";
import InputImagePreviewer from "../components/InputImagePreviewer";
import OutputImageFormatSelector from "../components/OutputImageFormatSelector";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const FF = createFFmpeg({
  // log: true,
  corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
});

(async function () {
  await FF.load();
})();

function App() {
  const [inputImage, setInputImage] = useState(null);
  const [transcodedImageData, setTranscodedImageData] = useState({});
  const [format, setFormat] = useState("");
  const [URL, setURL] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    let file = e.target.files[0];
    setInputImage(file);
    setURL(await helpers.readFileAsBase64(file));
  };

  const handleFormatChange = ({ target: { value } }) => {
    if (value === format) return;
    setFormat(value);
    transcodeImage(inputImage, value);
  };

  const transcodeImage = async (inputImage, format) => {
    setLoading(true);
    if (!FF.isLoaded()) await FF.load();
    FF.FS("writeFile", inputImage.name, await fetchFile(inputImage));
    try {
      await FF.run("-i", inputImage.name, `img.${format}`);
      const data = FF.FS("readFile", `img.${format}`);
      let blob = new Blob([data.buffer], { type: `image/${format}` });
      let dataURI = await helpers.readFileAsBase64(blob);
      setTranscodedImageData({
        newImageSize: blob.size,
        originalImageSize: inputImage.size,
        newImageSrc: dataURI,
      });
      FF.FS("unlink", `img.${format}`);
    } catch (error) {
      console.log({ message: error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="App">
      <section className="deck">
        <article className="grid_txt_2 ">
          {URL && (
            <>
              <InputImagePreviewer inputImage={inputImage} previewURL={URL} />
              <OutputImageFormatSelector
                disabled={loading}
                format={format}
                handleFormatChange={handleFormatChange}
              />
            </>
          )}
          <FilePicker
            handleChange={handleChange}
            availableImage={!!inputImage}
          />
        </article>
        <OutputImage
          handleDownload={() =>
            helpers.download(transcodedImageData.newImageSrc)
          }
          transCodedImageData={transcodedImageData}
          format={format}
          loading={loading}
        />
      </section>
    </main>
  );
}

export default App;

export async function getServerSideProps(context) {
  // set HTTP header
  context.res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  context.res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  return {
    props: {},
  };
}
