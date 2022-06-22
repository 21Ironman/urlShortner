import React,{useState} from "react";
import Axios from "axios"; 

const shortId = require('shortid'); // Library for creating unique ID
const beforeImg = require('./assests/images/hulk_before.png');
const afterImg = require('./assests/images/hulk_after.png');

function App() {

  const [link , setLink] = useState("");  // for storing url input by user
  const [allLink , setAllLink] = useState([]); // for storing db response 
  const [imgSrc , setImgSrc] = useState(beforeImg); // image src
  const [copyBtnTxt , setCopyBtnTxt] = useState("Copy Link"); //Copy Button text

  // Function for generating short url

  const shortUrl = () => {
      const sendLink = {
        furl: link,
        ukey: shortId.generate() // Generating unique ID
      }
      Axios.post('http://localhost:9000/saveurl', sendLink).then(() => {
        console.log("Added Successfully");
        setLink("http://localhost:9000/u?k=" + sendLink.ukey); //updating input field with generated short url
        setImgSrc(afterImg)
      })
    }

  // Function for retrieving all url data from db

  const getUrl = () => {
    Axios.get("http://localhost:9000/all").then((response) => {
        setAllLink(response.data); // capture info from db [Show All Url]
    })
  }

  // Function for copying url in clipboard

  const copyUrl = () => {
    navigator.clipboard.writeText(link);
    setCopyBtnTxt("Copied");
  }

  // return Statement

  return (
    <center>
      <div className="container mt-5">
        <h1 className="fw-bold text-info">URL Shortner</h1>

        <img src={imgSrc} alt="" className="mt-3 img" height={200}/>
        
        <br />

            <input 
            onChange={(e) => {setLink(e.target.value)}} 
            type="text"
            value={ link } 
            style={{width: 300}}
            placeholder="Enter any link.." 
            required 
            className="mt-2 form-controls"/>

          <br />

        <button className="mt-2 btn-sm btn-info" onClick={ shortUrl }>Short</button>

         <button className="btn-sm btn-success ms-4" onClick={ copyUrl }> {copyBtnTxt} </button> 
        
        <br />
        <button className="mt-3 btn-sm btn-secondary" onClick={ getUrl }>Show All Saved Link</button>
      <br />

        {/* Parsing And showing data retreived from DB */}

        <table className="table mt-5 table-danger table-bordered">
            <thead>
              <tr>
                <th scope="col">Short ID</th>
                <th scope="col">Redirect Link</th>
                <th scope="col">Clicks</th>
              </tr>
            </thead>

      {allLink.map((value, key) => {
        return(
          // <div className="border border-secondary mt-4">
          //   <p className="text-warning">{value.fullurl}</p>
          //   <p className="text-light">Key : {value.shorturl}</p>
          //   <p className="text-info">Clicks : {value.clicks}</p>
          // </div>
          
            <tbody>
              <tr>
                <th scope="row">{ value.shorturl }</th>
                <td>{ value.fullurl }</td>
                <td>{ value.clicks }</td>
              </tr>
            </tbody>
        )
      })}
        </table>
      </div>
    </center>
  );
}

export default App;
