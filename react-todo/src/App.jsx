import axios from "axios";
import Todo from "./Components/Todo";
import { useState } from "react";

const App = () => {

  
  const [image, setImage] = useState(""); 
  const [imagePreview, setImagePreview] = useState(null);

  const handleImage = (event) => {
    setImage(event.target.files[0]);
    setImagePreview(URL.createObjectURL(event.target.files[0]));
  };
  const closeimage =()=> {
    setImagePreview(null);
    setImage("")
  }
  const uploadImage = async() => {
    if (!image) return;
    const formData = new FormData();
    formData.append("upload_file", image)
    formData.append("FirstName","DebugMedia")

    const response = await axios.post("http://localhost:3005/profile/upload",
      formData,
      {
        headers:{
          "Content-Type":"multipart/form-data",
        }, 
      }
    );
      console.log(response.data);
      
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8f9fa",
        padding: "20px",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
      }}
    >
      <Todo/>
      <div
        style={{
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          textAlign: "center"
        }}
      >
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            style={{
              maxWidth: "100%",
              maxHeight: "300px",
              borderRadius: "8px",
              marginBottom: "20px",
              border: "1px solid #ccc"
            }}
          />
        )}

        <div style={{display:'flex' ,justifyContent:"center"}}>
          {imagePreview ? (
            
        <button 
            onClick={closeimage}
        style={{

            backgroundColor: "white",
            
            color: "white",
            padding: "0px 30px",
            border: "1px solid black 0.1",
            boxShadow:"0 4px 12px rgba(0,0,0,0.1)",
            height:"30px",
            borderRadius: "6px",
            fontSize: "12px",
            cursor: "pointer",
            transition: "background-color 0.3s"
          }}>
          ❌
        </button>
          ):(
            <>
            <input
              type="file"
              accept="image/*"
              id="hiddenFileInput"
              onChange={handleImage}
              style={{ display: 'none' }}
            />
            <label
              htmlFor="hiddenFileInput"
              style={{
                backgroundColor: "#007fff",
                color: "white",
                padding: "10px 20px",
                borderRadius: "6px",
                fontSize: "14px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
            >
              Choose Image
            </label>
          </>
          )}
        </div>

        <button
          onClick={uploadImage}
          disabled={!imagePreview}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
            margin:"10px 4px",
            transition: "background-color 0.3s",
          }}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default App;
