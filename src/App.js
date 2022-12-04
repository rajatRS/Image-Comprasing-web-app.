import { useState } from "react";
import { Container, Grid, Image, Item, Button } from "semantic-ui-react";
import "./App.css";
import Header from "./Header";
import imageCompression from "browser-image-compression";



function App() {
  const [origImage, setOrigImage] = useState("");
  const [origImageFile, setOrigImageFile] = useState("");
  const [compressedImage, setCompressedImage] = useState("");
  const [fileName, setFileName] = useState("");

  const handle = (e) => {
    const imageFile = e.target.files[0];
    setOrigImage(imageFile);
    setOrigImageFile(URL.createObjectURL(imageFile));
    setFileName(imageFile.name);
  };

  const handleCompressImage = (e) => {
    e.preventDefault();
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };

    if (options.maxSizeMB >= origImage / 1024) {
      alert("Image is too small, cant be compressed");
      return 0;
    }

    let output;
    imageCompression(origImage, options).then((x) => {
      output = x;
      const downloadLink = URL.createObjectURL(output);
      setCompressedImage(downloadLink);
    });
  };

  return (
    <div className="app">
      {/* <h1></h1> */}
      <Header />
      <div className = "home">
          <div className = "home_first">
            <Item>
              {origImageFile ? (
                <Image src={origImageFile}></Image>
              ) : (
                <Image src="http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png"></Image>
              )}
            </Item>
          </div>

          <div className = "home_second">
            <input
              type="file"
              accept="image/*"
              className="mt-2 btn btn-dark w-75 home_button1"
              onChange={(e) => handle(e)}
            />
            <h1></h1>
            {origImageFile && (
              <Button
              primary
              className = "home_button"
                onClick={(e) => {
                  handleCompressImage(e);
                }}
              >
                {" "}
                Compress Image
              </Button>
            )}
            <h1></h1>
            {compressedImage && (
              <Button  className = "home_button">
                <a href={compressedImage} download={fileName}>
                  {" "}
                  Download Image
                </a>
              </Button>
            )}
          </div>

          <div className = "home_third">
            <Item>
              {compressedImage ? (
                <Image src={compressedImage}></Image>
              ) : (
                <Image src="http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png"></Image>
              )}
            </Item>
          </div>
      </div>
    </div>

  );

}



export default App;


