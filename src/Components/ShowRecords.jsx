
import React, { useState, useEffect } from "react";


// FONT AWESOME IMPORTS 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'   
// Call in the chosen icon like this   <FontAwesomeIcon icon={faWarning}/>
import { faTrashAlt, faPencilAlt} from '@fortawesome/free-solid-svg-icons'   // gives you any Icon you want



// Imports the css file for this page
import "./ShowRecords.css";



function Showrecord(props){

                                // By default you are not in edit mode thus why   useState(false)
  const[editMode, setEditMode] = useState(false);

  // This is what we need to allow users to update 
  const[artistsFirstName, setartistsFirstName] = useState("");  // we are populating the textbox when we call this value
  const[artistsLastName, setartistsLastName] = useState("");
  const[musicGenre, setmusicGenre] = useState("");
  const[recordsName, setrecordsName] = useState("");


  // THIS IS LOADING THE users data into the code right away and placing it in textbox's when we call it in
  useEffect( () => {   
    setartistsFirstName(props.record.artistsFirstName);
    setartistsLastName(props.record.artistsLastName);
    setmusicGenre(props.record.musicGenre);
    setrecordsName(props.record.recordsName);
  }, []);
  // THIS IS LOADING THE users data into the code right away and placing it in textbox's when we call it in



  // This sets all the new values inserted into the textbox's to their respected value
  const saveRecords = () => {
    setEditMode(false); // making it to when data is passed through it wont be in edit mode anymore
    const updatedrecord = {  artistsFirstName:artistsFirstName, artistsLastName:artistsLastName, musicGenre:musicGenre, 
                              recordsName:recordsName, id:props.record.id, image:props.record.image
                            }

    props.updaterecord(updatedrecord);
  }



  return(



  //  ````````````````````` OUTPUT FOR CARD AND CARD ITEMS `````````````````````````
  <div className='card        turnToAtomicAgeFont   '>
        {!editMode     // WHILE NOT IN EDIT MODE SHOW ORIGINAL RESULTS 
          && 
        <ul className='list-group list-group-flush  '>
          {/* className='list-group-item   ==   turns off the bullet points for the list items*/}
          
          {/* RECORD NAME */}
          <li className='list-group-item  opacityBackground text-center ' id="albumName">{props.record.recordsName}</li>     {/* calls the records recordsName */}
          {/* RECORD NAME */}

          {/* IMAGE  */}
          <span className="opacityBackground">
            <img src={props.record.image} alt="Record Cover" className='card-img-top mx-auto img-fluid' /> {/*calls each individual image without hardcoding it*/}
          </span>
          {/* IMAGE */}

          {/* FIRST NAME   &&   LAST NAME*/}                  {/* FIRST NAME */}                {/* LAST NAME */}                               
          <li className='list-group-item  firstNamelastName opacityBackground text-center'>{props.record.artistsFirstName}  {props.record.artistsLastName}</li> {/*  calls the records name  */}
          {/* FIRST NAME   &&   LAST NAME*/}                                                 

          {/* MUSIC GENRE */}
          <li className='list-group-item  musicGenre opacityBackground text-center'>{props.record.musicGenre}</li>     {/* calls the records musicGenre */}
          {/* MUSIC GENRE */}
          {/* ````````````````````` OUTPUT FOR CARD AND CARD ITEMS `````````````````````````  */}


          <span className="buttonsContainer opacityBackground">
            {/* EDIT BUTTON */}                                       {/* onClick will set the edit mode to true thus firing the if statement and make the inputs shown */}
              <button  type="button" className="editBTN  btn    btn-block     mt-auto"  onClick={() => setEditMode(true)}>
                Edit Record <FontAwesomeIcon icon={faPencilAlt}/>
              </button>
            {/* EDIT BUTTON */}


            {/* DELETE BUTTON */}
            {/* This will show a button that onClick will call the specific record they click on and that component will be sent to the deleterecords Function */}
            <button type="button" className="deleteBTN btn       btn-block    mt-auto" 
                onClick={() => props.deleterecords(props.record)}>
                  Delete Record <FontAwesomeIcon icon={faTrashAlt}/>
              </button>
            {/* DELETE BUTTON */}
          </span>

        </ul>
        }
        {editMode &&     // WHILE IN EDIT MODE ALLOW NEW USER INPUTS   !!!! EDIT MODE BELOW !!!!

        <ul className='list-group list-group-flush  opacityBackground  editMode'>

          <h3 className="editRecordText">Edit Record</h3>

          {/* recordNameSearch INPUT FOR EDIT MODE  */}
          <li className='list-group-item   text-center'>                                                                                           {/*  maxlength="16"   ==   This is to ensure none of the cards look different  */}
            <input type="text" value={recordsName} onChange={(evt) => setrecordsName(evt.currentTarget.value)} className="form-control"   placeholder="Edit Records Name"         />
          </li> 
          {/* recordNameSearch INPUT FOR EDIT MODE  */}

          {/* IMAGE  */}
                    <img src={props.record.image} alt="Record Cover" className='card-img-top recordImage mx-auto  img-fluid' /> {/*calls each individual image without hardcoding it*/}
          {/* IMAGE */}

          {/* FIRST NAME INPUT FOR EDIT MODE  */}
          <li className='list-group-item   text-center'>    {/* value={artistsFirstName} calls in the first from  from useEffect due to it loading the data on load */}   {/*  maxLength="16"   ==   This is to ensure none of the cards look different  */}
            <input type="text" value={artistsFirstName} onChange={(evt) => setartistsFirstName(evt.currentTarget.value)} className="form-control " placeholder="Edit Artists First Name"                          />
          </li> 
          {/* FIRST NAME INPUT FOR EDIT MODE  */}


          {/* LAST NAME INPUT FOR EDIT MODE  */}
          <li className='list-group-item   text-center'>                                                                                           {/*  maxLength="16"   ==   This is to ensure none of the cards look different  */}
            <input type="text" value={artistsLastName} onChange={(evt) => setartistsLastName(evt.currentTarget.value)} className="form-control"    placeholder="Edit Artists Last Name"/>
          </li> 
          {/* LAST NAME INPUT FOR EDIT MODE  */}


          {/* musicGenre INPUT FOR EDIT MODE  */}
          <li className='list-group-item   text-center'>                                                                                           {/*  maxLength="4"  This is to ensure none of the cards look different */}
            <input type="text" value={musicGenre} onChange={(evt) => setmusicGenre(evt.currentTarget.value)} className="form-control"      placeholder="Edit Records Genre"      />
          </li> 
          {/* musicGenre INPUT FOR EDIT MODE  */}





          {/* SAVE BUTTON */}
          {/* This will show a button that Once you are in edit mode that will save the results you inputted */}
          <span className="buttonsContainer opacityBackground">
            <li className='list-group-item' >
              <button id="btnSave" type="button" className="btn btn-secondary" 
                onClick={saveRecords}>  {/* onClick will fire the saveRecords function that will set all the values to the newly inputted values*/}
                  Save
              </button>
            </li>
          </span> 
          {/* SAVE BUTTON */}

        </ul>


        
        }
  </div>



  
)};



export default Showrecord;


