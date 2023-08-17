
import React, {useState} from "react";
import { nanoid } from "nanoid";


// FONT AWESOME IMPORTS 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
// Call in the chosen icon like this   <FontAwesomeIcon icon={faPlusCircle}/>
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';   // gives you any Icon you want


// Calls in the css file named Addrecord.css
import './AddRecords.css';




function Addrecord(props){ // calling the <Addrecord   addrecord={addrecord}/> from the App.js file with  props



  // const [variable, function ] = useState(null)
  const[artistsFirstName, setartistsFirstName] = useState("");   // useState is how you change the values of items
  const[artistsLastName, setartistsLastName] = useState("");
  const[musicGenre, setmusicGenre] = useState("");
  const[selectedFile, setSelectedFile] = useState();
  const[recordsName, setrecordsName] = useState("");




  // xxxxxxxxxx ERROR MESSAGE xxxxxxxxxx
    const [error, setError] = useState("");
  // xxxxxxxxxx ERROR MESSAGE xxxxxxxxxx




  // This will fire once the Add New record button is clicked  
  const addStudentClick = () =>{

    if (selectedFile && selectedFile instanceof Blob) {
      const newRecord = { 
        "id": nanoid(), "artistsFirstName":artistsFirstName, "artistsLastName":artistsLastName, 
        "musicGenre":musicGenre, "image":URL.createObjectURL(selectedFile), 
        "recordsName": recordsName  // DO THIS TO ENTER ONLY A NUMBER "recordsName": parseInt(recordsName)
      };

      // uses the newRecord variable that was passed from App.js using the props and calling the addrecord() function
      props.addrecord(newRecord);


        // xxxxxxxxxx ERROR MESSAGE xxxxxxxxxx
        //THIS SETS OUR ERROR MESSAGE TO NOTHING DUE TO SEARCH BEING CORRECT 
        setError("");  
        // xxxxxxxxxx ERROR MESSAGE xxxxxxxxxx
    }
    else{  // if no image is chosen then this will show   lets just hope people follow directions and add info
      // xxxxxxxxxx ERROR MESSAGE xxxxxxxxxx
      // IF THE SEARCH RESULT IS WRONG AND DOSE'NT MATCH WE SET setError TO OUR MESSAGE
        setError("Please Enter Information For All Fields ");
      // xxxxxxxxxx ERROR MESSAGE xxxxxxxxxx
    }
  }




  
  // This will fire and choose and place the selected image 
  const imageUpdate = (event) => {
    setSelectedFile(event.target.files[0]); 
  }









  return(                           
    <div className="row   formsContainer    justify-content-center">

      {/* FILE UPLOAD BUTTON */}
      <div className=" row text-center">
        <label htmlFor="fileUpload" className="form-label  fileUploadLabel  labelsForTXTs">Records Album Cover</label>
          <input type="file" name="fileUpload"  className="chooseFileInput "    onChange={imageUpdate}    ></input>

      
      </div>
      {/* FILE UPLOAD BUTTON */}


      {/* Records Name TEXTBOX */}
      <div className="row">
          <label htmlFor="txtrecordsName" className="form-label   labelsForTXTs">Records Name</label>
            {/* coding an event for the onChange that will set the artistsLastName variable to the textbox value */}    {/* maxLength="16" */}
            <input type="text"     onChange={(evt) => setrecordsName(evt.currentTarget.value)} value={recordsName}        
                    id="txtrecordsName" className="form-control"   placeholder="Enter Records Name"                  >
            </input>
        </div>
      {/* Records Name TEXTBOX */}


      {/* FIRST NAME TEXTBOX */}
      <div className="row">
        <label htmlFor="txtartistsFirstName" className="form-label   labelsForTXTs">First Name</label>
          {/* coding an event for the onChange that will set the artistsFirstName variable to the textbox value */}
          <input type="text"  onChange={(evt) => setartistsFirstName(evt.currentTarget.value)} value={artistsFirstName}  
                  id="txtartistsFirstName" className="form-control"   placeholder="Enter Artists First Name"         >
          </input>
      </div>
      {/* FIRST NAME TEXTBOX */}


      {/* LAST NAME TEXTBOX */}
      <div className="row">
        <label htmlFor="txtartistsLastName" className="form-label   labelsForTXTs">Last Name</label>
          {/* coding an event for the onChange that will set the artistsLastName variable to the textbox value */}
          <input type="text"     onChange={(evt) => setartistsLastName(evt.currentTarget.value)} value={artistsLastName}  
                  id="txtartistsLastName" className="form-control"   placeholder="Enter Artists Last Name"            >
          </input>
      </div>
      {/* LAST NAME TEXTBOX */}


      {/* musicGenre TEXTBOX */}
      <div className="row">
        <label htmlFor="txtmusicGenre" className="form-label  labelsForTXTs">Music Genre</label>
          {/* coding an event for the onChange that will set the artistsLastName variable to the textbox value */}
          <input type="musicGenre"     onChange={(evt) => setmusicGenre(evt.currentTarget.value)} value={musicGenre}  
                  id="txtmusicGenre" className="form-control"   placeholder="Enter Music Genre"                             >  
          </input>                                                              
      </div>
      {/* musicGenre TEXTBOX */}



      {/* SUBMIT BUTTON */}
      <div className="row">                                                                                                {/* data-dismiss="modal" == THIS WILL CLOSE THE MODAL ONCE CLICKED GET RID OF THIS AND READD THE CLOSE BUTTON IF YOU DON'T LIKE IT*/}
        <button type="button"    onClick={addStudentClick}     id="addNewRecordBTN" className="btn btn-success btn-lg"              >
            Add New Record &nbsp;<FontAwesomeIcon icon={faPlusCircle}/>
        </button>
      </div>
      {/* SUBMIT BUTTON */}




                {/* xxxxxxxxxx ERROR MESSAGE xxxxxxxxxx */}
                <div className="text-center">
                          {error && <p className="error  turnToDiscoFont">{error}</p>}
                        </div>
                {/* xxxxxxxxxx ERROR MESSAGE xxxxxxxxxx */}




    </div>




  ) // end of return 



} // end of Addrecord()


export default Addrecord;


