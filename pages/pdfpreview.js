// function pdfpreview() {
//   return (
//     <div>
//       <input
//         type="file"
//         onChange={(e) => {
//           console.log(e);
//         }}
//       />
//     </div>
//   );
// }

// export default pdfpreview;
import React, {useState} from "react";
import Pdf from "../src/components/Pdf";

function App() {
  //   state = {
  //     // Initially, no file is selected
  //     selectedFile: null,
  //   };
  const [selectedFile, setSelectedFile] = useState(null);
  // On file select (from the pop up)
  const onFileChange = (event) => {
    // Update the state
    // this.setState({selectedFile: event.target.files[0]});
    setSelectedFile(event.target.files[0]);
    console.log(URL.createObjectURL(event.target.files[0]));
  };

  // On file upload (click the upload button)
  const onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    // formData.append(
    //   "myFile",
    //   this.state.selectedFile,
    //   this.state.selectedFile.name
    // );

    // Details of the uploaded file
    // console.log(this.state.selectedFile);

    // Request made to the backend api
    // Send formData object
    // axios.post("api/uploadfile", formData);
  };

  // File content to be displayed after
  // file upload is complete
  const fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {selectedFile.name}</p>

          <p>File Type: {selectedFile.type}</p>

          <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  return (
    <div>
      <h1>GeeksforGeeks</h1>
      <h3>File Upload using React!</h3>
      <div>
        <input type="file" onChange={onFileChange} />
        <button onClick={onFileUpload}>Upload!</button>
      </div>
      {selectedFile && <Pdf url={selectedFile} />}
      {/* {fileData()} */}
    </div>
  );
}

export default App;
