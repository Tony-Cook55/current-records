

import './App.css';


import 'bootstrap/dist/css/bootstrap.min.css';
import {nanoid} from 'nanoid';

                      // useEffect loads data 
import React, {useState, useEffect} from 'react'; // hook   


// added the 2 other folders to a new folder called Components So you must change the directory to ./Components/Addrecord   and  ./Components/Showrecords
import Addrecord from './Components/AddRecords'; // THIS ADDS THE Addrecord FILE THAT WE MADE IT IMPORTS IT HERE
import Showrecords from "./Components/ShowRecords";//  calls in the Showrecord File


import _ from "lodash"; // ADDS THE UNIQUE MAPPING USING LODASH


// FONT AWESOME IMPORTS 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'   
// Call in the chosen icon like this   <FontAwesomeIcon icon={faPlusCircle}/>
import { faSearch } from '@fortawesome/free-solid-svg-icons'   // gives you any Icon you want

//Icons used for the anchors allowing you to go up or down on page
import { faArrowDown,faArrowUp } from '@fortawesome/free-solid-svg-icons'


function App() {

  // SEED DATA (PRESET DATA ALREADY THERE)
  const [allRecords, setallRecords] = useState(null);    // const [variable, function ] = useState(null)



            // !!!!!!  SEARCHING /  FILTER   !!!!!!!
  // THIS WILL SHOW SEARCHED RESULTS IN A SEPARATE ARRAY
  const [searchResults, setSearchResults] = useState(null); // this is a filtered version of allRecords
  const [keywords, setKeywords] = useState("");
  const [recordsName, setrecordsName] =useState("");
            // !!!!!!  SEARCHING /  FILTER   !!!!!!!


  // xxxxxxxxxx ERROR MESSAGE xxxxxxxxxx
    const [error, setError] = useState("");
  // xxxxxxxxxx ERROR MESSAGE xxxxxxxxxx


  // THIS IS LOADING THE INFORMATION TO THE PAGE RIGHT AWAY
  useEffect( () => {




    // IF THERES NO LOCAL STORAGE ADD THIS    DELETE COMMENTS TO RESTORE THE SEED DATA
    //saveRecords(records);   // DELETE ME DELETE ME DELETE ME NEEDED TO RESET BACK TO SEED DATA



    // ^^^^^^^^^^^^^^^ LOCAL STORAGE ^^^^^^^^^^^^^^^
        // Every after time past the very first load it will load whats out of local storage to pull our previously saved data
        if(localStorage){              // parses a string into a javascript method (READ operation)
          const recordsLocalStorage = JSON.parse(localStorage.getItem('records'));
    
          if(recordsLocalStorage){ // if local storage has data in it, it will put that into saveStudents 
            saveRecords(recordsLocalStorage);
          }
    
        }
        else{  // when not using localStorage (the first time) it will do our seeded data array
          saveRecords(records);
        }
    // ^^^^^^^^^^^^^^^ LOCAL STORAGE ^^^^^^^^^^^^^^^


  }, []);
  // THIS IS LOADING THE INFORMATION TO THE PAGE RIGHT AWAY


  // This will set search results to be and have all of the items inside the initial records array
  const saveRecords = (records) => {
    setallRecords(records);
    setSearchResults(records);


    // ^^^^^^^^^^^^^^^ LOCAL STORAGE ^^^^^^^^^^^^^^^
    // if localStorage is found on browser it will save it in local storage
    if(localStorage){       //puts something into the localStorage      // convert this javascript object into a string
      localStorage.setItem('records',JSON.stringify(records));
      console.log('Change has been saved to local storage                                                                Here is a Rat eating cheese -->  ᘛ⁐̤ᕐᐷ🧀');
    }
    // ^^^^^^^^^^^^^^^ LOCAL STORAGE ^^^^^^^^^^^^^^^

  }


  // takes 1 input which is newRecord and adds the newRecord     
  const addrecord = (newRecord) => {
    /* copy of all records with the inclusion of the newRecord at the end*/
    const updatedrecords = [...allRecords, newRecord];

    saveRecords(updatedrecords);
  }


  // THIS PREFORMS THE SEARCH ONCE searchrecords button is clicked
  const searchrecords = () => {
    let keywordsArray = [];  // empty array for new keywords

    if(keywords){   // if keywords exist set the new array to the said keywords and set them toLowerCase()
      keywordsArray = keywords.toLowerCase().split(" ")// when a keyword has a space in it make a new one
    }



    if(recordsName){ // if there is a recordsName it will push that recordsName as a string into the array that displays them on select box
      keywordsArray.push(recordsName.toString());
    }


    /* IF THE BUTTON IS CLICKED AND NOTHING IS IN THERE IT WILL RESET ERROR SO ITS NOT ALWAYS THERE DESPITE GETTING RID OF BAD TEXT */
    setError("");  



// NAME SEARCH IF STATEMENT 
    if(keywordsArray.length > 0){
      // .filter() this will loop through all objects of allRecords and if true will return record if not will do nothing
      const searchResults = allRecords.filter(record => {
        for(const songName of keywordsArray){
          try{
            if( record.artistsFirstName.toLowerCase().includes(songName) 
              || 
              record.artistsLastName.toLowerCase().includes(songName)
              ||
              record.recordsName === songName)   // DO THIS TO SEARCH BY A NUMBER LIKE DATE -->  record.recordsName === parseInt(word))
              {

                // xxxxxxxxxx ERROR MESSAGE xxxxxxxxxx
                //THIS SETS OUR ERROR MESSAGE TO NOTHING DUE TO SEARCH BEING CORRECT 
                  setError("");  
                // xxxxxxxxxx ERROR MESSAGE xxxxxxxxxx

                return true;
              }
          }
          catch{
            return false;
          }
          
        }// end of for statement
        //return false;
      });  // end of const searchResults 


      // xxxxxxxxxx ERROR MESSAGE xxxxxxxxxx
      // IF THE SEARCH RESULT IS WRONG AND DOSE'NT MATCH WE SET setError TO OUR MESSAGE
      if (searchResults.length === 0) {
        setError("Please Enter a Correct Name");
      }
      // xxxxxxxxxx ERROR MESSAGE xxxxxxxxxx



        setSearchResults(searchResults);

    } // end of keywords.length > 0
    else{
      setSearchResults(allRecords);
    }

  } // end of searchrecords() function



  // This deletes the records
  const deleterecords = (recordToDelete) => {
    // Going to filter out the records   loop through each record and filter out and return true if the id != the recordToDelete and were going to keep the rest that don't match the button click
    // new array of records where we filter out the records by id and if the id matches the button click then the recordToDelete Fires and deletes it?
    const updatedrecordsArray = allRecords.filter(record => record.id !== recordToDelete.id);
    saveRecords(updatedrecordsArray);
  } // end of deleterecords


  // UPDATE records 
  const updaterecord = (updatedrecords) => {   // our updated record is getting passed back here for us to save 
    //console.table(updatedrecords);         // if the ids match then update the new values with new data from Showrecords.jsx code and if they don't match do : record that will just show normal record info
    const updatedrecordsArray = allRecords.map(record => record.id === updatedrecords.id ? {...record, ...updatedrecords } : record);
    saveRecords(updatedrecordsArray);
  }
  // UPDATE records 













  //--- ARRAY WITH record INFORMATION  ---   SEED DATA - PRESET DATA
  const records = [   // an array with javascript objects

    // ~~~~~~~~~~ FRANK SINATRA ~~~~~~~~~~~~~~~ 
    {     
      id: nanoid(),    // this gives every new record a unique id per each record 
      recordsName: "A Man and His Music",
      image: "pictures/frank_sinatra/FRANK_SINATRA_a_man_and_his_music.jpg",
      artistsFirstName: "Frank",
      artistsLastName: "Sinatra",
      musicGenre: "Jazz"
    }, 
    {
      id: nanoid(),
      recordsName: "Sinatra Sinatra",
      image: "pictures/frank_sinatra/FRANK_SINATRA_sinatra_sinatra_a_collection_of_his_favorites.jpg",
      artistsFirstName: "Frank",
      artistsLastName: "Sinatra",
      musicGenre: "Jazz"
    },
    {
      id: nanoid(),
      recordsName: "She Shot Me Down",
      image: "pictures/frank_sinatra/FRANK_SINATRA_she_shot_me_down.jpg",
      artistsFirstName: "Frank",
      artistsLastName: "Sinatra",
      musicGenre: "Jazz"
    }, 
    // ~~~~~~~~~~ FRANK SINATRA ~~~~~~~~~~~~~~~ 


    // ~~~~~~~~~~ ANDY WILLIAMS ~~~~~~~~~~~~~~~ 
    {
      id: nanoid(),
      recordsName: "Warm and Willing",
      image: "pictures/andy_williams/ANDY_WILLIAMS_warm_and_willing.jpg",
      artistsFirstName: "Andy",
      artistsLastName: "Williams",
      musicGenre: "Jazz"
    },
    {
      id: nanoid(),
      recordsName: "To You Sweetheart",
      image: "pictures/andy_williams/ANDY_WILLIAMS_to_you_sweetheart,_aloha.jpg",
      artistsFirstName: "Andy",
      artistsLastName: "Williams",
      musicGenre: "Jazz"
    },
    {
      id: nanoid(),
      recordsName: "Days of Wine and Roses",
      image: "pictures/andy_williams/ANDY_WILLIAMS_days_of_wine_and_roses.jpg",
      artistsFirstName: "Andy",
      artistsLastName: "Williams",
      musicGenre: "60's Pop"
    },
    // ~~~~~~~~~~ ANDY WILLIAMS ~~~~~~~~~~~~~~~


    // ~~~~~~~~~~ BEE GEES ~~~~~~~~~~~~~~~ 
    {
      id: nanoid(),
      recordsName: "Spirits Having Flown",
      image: "pictures/bee_Gees/BEE_GEES_spirits_having_flown.jpg",
      artistsFirstName: "Bee",
      artistsLastName: "Gees",
      musicGenre: "Disco"
    },
    {
      id: nanoid(),
      recordsName: "The Bee Gees 1st",
      image: "pictures/bee_Gees/BEE_GEES_bee_gees_1st.jpg",
      artistsFirstName: "Bee",
      artistsLastName: "Gees",
      musicGenre: "Psychedelic Rock"
    },
    {
      id: nanoid(),
      recordsName: "Bee Gees Mr. Natural",
      image: "pictures/bee_Gees/BEE_GEES_mr._natural.jpg",
      artistsFirstName: "Bee",
      artistsLastName: "Gees",
      musicGenre: "Rock"
    },
    // ~~~~~~~~~~ BEE GEES ~~~~~~~~~~~~~~~ 


    // ~~~~~~~~~~ DEAN MARTIN ~~~~~~~~~~~~~~~ 
    {
      id: nanoid(),
      recordsName: "Gentle On my Mind",
      image: "pictures/Dean_Martin/DEAN_MARTIN_gentle_on_my_mind.jpg",
      artistsFirstName: "Dean",
      artistsLastName: "Martin",
      musicGenre: "Jazz"
    },
    {
      id: nanoid(),
      recordsName: "Italian Love Songs",
      image: "pictures/Dean_Martin/DEAN_MARTIN_italian_love_songs.jpg",
      artistsFirstName: "Dean",
      artistsLastName: "Martin",
      musicGenre: "60's Pop"
    },
    {
      id: nanoid(),
      recordsName: "You Can't Love 'Em All",
      image: "pictures/Dean_Martin/DEAN_MARTIN_you_cant_love_'em_all.jpg",
      artistsFirstName: "Dean",
      artistsLastName: "Martin",
      musicGenre: "Jazz"
    },
    // ~~~~~~~~~~ DEAN MARTIN ~~~~~~~~~~~~~~~ 
  ];
  //--- ARRAY WITH record INFORMATION  ---













  // RETURNS THIS AS AN OUTPUT ON THE SCREEN
  return (       



    <React.Fragment>    {/* God forbid you add some html without this or it screams IDK why? */}



      {/* THIS IS HERE TO ALLOW US TO JUMP TO THE TOP OF THE PAGE WITH ANCHORS*/}
      <div id="back_to_top"></div>
      {/* THIS IS HERE TO ALLOW US TO JUMP TO THE TOP OF THE PAGE WITH ANCHORS*/}



{/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! NAVBAR !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
    <nav className="navbar navbar-expand-lg     turnToAtomicAgeFont    sticky-top" >
          <div className="container-fluid">

            <a className="navbar-brand    turnToAtomicAgeNeonFont" href="#0"><h1>Search For Records</h1></a>



              <div className="form-row container     justify-content-center">


                <div className="d-flex  align-items-center    ">
                  {/* HOLDS THE SEARCH BY FIRST AND LAST NAME TEXTBOX AND SEARCH BUTTON */}



                    {/* xxxxxxxxxx CALLS IN ERROR MESSAGE xxxxxxxxxx */}
                      <div className="row  flex-row-reverse">
                        <div className="text-center">
                          {error && <p className="errorNAV ">{error}</p>}
                        </div>
                      </div>
                    {/* xxxxxxxxxx CALLS IN ERROR MESSAGE xxxxxxxxxx */}



                    <div className="col">
                        <div className="input-group   justify-content-center     turnToAtomicAgeFont"> {/*get rid of this to span whole screen --> form-control-inline */}
                          
                          {/* SEARCH BY NAME TEXTBOX */}
                          <input type="text" className="form-control" id="enterNameTXT" 
                                onChange={evt => setKeywords(evt.currentTarget.value)} value={keywords} 
                                placeholder="Enter Artists Name" aria-label="Recipient's username" 
                                aria-describedby="button-addon2" >
                          </input>
                          {/* SEARCH BY NAME TEXTBOX */}


                            
                          {/* SEARCH BY NAME BUTTON */}
                          <div className="input-group-append   turnToAtomicAgeFont">
                            <button type="button" id="searchNameBTN" className=" btn   btn-outline-secondary" onClick={searchrecords} >
                              <FontAwesomeIcon icon={faSearch}/>
                            </button>      
                          </div>
                          {/* SEARCH BY NAME BUTTON */}

                        </div>

                    </div>
                  {/* HOLDS THE SEARCH BY FIRST AND LAST NAME TEXTBOX AND SEARCH BUTTON */}







                  {/* HOLDS THE SEARCH BY RECORD NAME DROPDOWN */}
                    <div className="col">
                      {/* SEARCH BY RECORD NAME DROPDOWN */}
                        <select value={recordsName}  id="searchByRecordName"   onChange={evt => setrecordsName(evt.currentTarget.value)}   className='form-select    turnToAtomicAgeFont'             onClick={searchrecords}>
                                  <option value="">Select Records Name</option>
                                    {/* this will map and set every unique recordsName into an option to choose from in the select box */}
                                    {_(allRecords).map(records => records.recordsName).sort().uniq().map(recordNameSearch => <option key={recordNameSearch} value={recordNameSearch}>{recordNameSearch}</option>).value()   }
                        </select>
                      {/* SEARCH BY RECORD NAME DROPDOWN */}
                    </div>
                  {/* HOLDS THE SEARCH BY RECORD NAME DROPDOWN */}
                </div>
                
              </div>


          </div>


    </nav>
{/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! NAVBAR !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}


  {/* xxxxxxxxxx ERROR MESSAGE xxxxxxxxxx */}
{/*
  <div className="row">
    <div className="text-center">
      {error && <p className="error  turnToAtomicAgeFont">{error}</p>}
    </div>
  </div>
*/}
  {/* xxxxxxxxxx ERROR MESSAGE xxxxxxxxxx */}


{/* DIFFERENT CARD SEARCHES FOR NAME INPUT AND BUTTON */}

{/* SEARCH BY FIRST OR LAST NAME 
  <input type="text"   onChange={evt => setKeywords(evt.currentTarget.value)} value={keywords} 
            className='form-control searchByName  turnToAtomicAgeFont' placeholder='Enter a First or Last Name to Search'  >
    </input>
SEARCH BY FIRST OR LAST NAME */}

{/* BUTTON TO SUBMIT
<div className="col-md-4    mx-3    turnToAtomicAgeFont">
    <button type="button" id="searchNameBTN" className=" btn btn-secondary" onClick={searchrecords} >
      Search  Name &nbsp; <FontAwesomeIcon icon={faSearch}/>
    </button>
  </div>
BUTTON TO SUBMIT */}

{/*    SEARCH TEXTBOX AND BUTTON IN 1 ENTITY
  <div class="input-group   justify-content-center   turnToAtomicAgeFont">
    <input type="text" class="form-control-inline" onChange={evt => setKeywords(evt.currentTarget.value)} value={keywords}  placeholder="Enter a First or Last Name" aria-label="Recipient's username" aria-describedby="button-addon2" />
      <div class="input-group-append">
        <button type="button" id="searchNameBTN" className=" btn   btn-outline-secondary" onClick={searchrecords} >
          Search  Name &nbsp; <FontAwesomeIcon icon={faSearch}/>
        </button>      
      </div>
  </div>
*/}

{/* DIFFERENT CARD SEARCHES FOR NAME INPUT AND BUTTON */}









{/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ THIS HOLDS THE ShowRecord Call In ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}



{/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ TEXT AND PIC AT THE TOP @@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
    <div className="container">
                        {/*  css className found in App.css  */}
      <div className='row    allRecords   text-center'>


        <h1 className="currentRecordsText    turnToAtomicAgeFont">Cur<span className="flickerAnimation">r</span>ent Recor<span className="flickerAnimation">d</span><span className="brokenLetter">s</span></h1>


        {/*Scamming React and using their spinning logo code on a record*/}
        <div className="App">
          <header className="App-header">

            {/* RECORD PLAYER PIC */}
                                   {/*THIS all sets this image below the other image */}
            {/*
            <div className="card-img-overlay card-inverse">
              <img className="recordPlayer" src={"pictures/backgrounds/birds_eye_view_of_a_record_player-removebg-preview.png"} alt="Record Player"/>
            </div>
            */}
            {/* RECORD PLAYER PIC */}

            {/* RECORD SPINNING PIC */}
            <img src={"pictures/backgrounds/records/vinyl-black.png"} className="RecordSpin" alt="" />
            {/* RECORD SPINNING PIC */}

          </header>  
        </div>
{/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ TEXT AND PIC AT THE TOP @@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}













          {/*<!-- !!!!!!!!!!!!!!!!!!!!!!!!! DOWN TO BOTTOM ANCHOR TAGS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->*/}
          <div className=" text-center    turnToAtomicAgeFont        find-records" >
              {/*<!-- This sends the user to the back_to_top id. Its set to the top h1-->*/}
              <div className="col">
                <h2 className="anchor_link_TOP">
                  <a className="anchor_link" href="#down_to_bottom" >Down To Bottom  <br/> <FontAwesomeIcon icon={faArrowDown}/> </a>
                </h2>
              </div>
            </div>
          {/*<!-- !!!!!!!!!!!!!!!!!!!!!!!!! DOWN TO BOTTOM ANCHOR TAGS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->*/}










            {/* xxxxxxxxxx ERROR MESSAGE xxxxxxxxxx */}
            <div className="row">
              <div className="text-center">
                {error && <p className=" errorBIG    turnToAtomicAgeFont">{error}</p>}
              </div>
            </div>
            {/* xxxxxxxxxx ERROR MESSAGE xxxxxxxxxx */}










{/* ############################################### CALLS IN SHOW RECORD ##################################*/}
            {/*   if there are records in the array and theres data it will .map all of the info   */}
            {searchResults && searchResults.map((record) => // if you use map you need a key for each item
              (  //  col-lg-4 == makes large and fit 3 cards ber row        //  mx-auto == sets all cards to center if uneven
                <div className='containerForCard    col-lg-4        mx-auto'    key={record.id}> {/* adds a unique key to every list of records on the parent element*/}
                  
                  {/* This calls in the Showrecords Container and displays all the cards we put in Showrecord*/}
                  <Showrecords record={record}      deleterecords={deleterecords}     updaterecord={updaterecord}/> 
                  {/* deleterecords={deleterecords}   will call the function in and delete the specific card we want    */}
                  {/* updaterecord={updaterecord}     will call the updaterecord function and */}
                
                </div>
              )
            )}
{/* ############################################### CALLS IN SHOW RECORD ##################################*/}

      </div> {/* end of        <div className='row    allRecords   text-center'> */}

    </div> {/* end of       <div className="container"> */}

{/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ THIS HOLDS THE ShowRecord Call In ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}





    {/*<!-- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! BACK TO TOP ANCHOR TAGS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->*/}
      <div className=" text-center    turnToAtomicAgeFont       find-records">
        {/*<!-- This sends the user to the back_to_top id. Its set to the top h1-->*/}
        <div className="col">
          <h2 className="anchor_links_BOTTOM">
            <a className="anchor_link  py-5" href="#back_to_top" id="down_to_bottom"> <FontAwesomeIcon icon={faArrowUp}/> <br/> Back To Top</a>
          </h2>
        </div>
      </div>
    {/*<!-- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! BACK TO TOP ANCHOR TAGS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->*/}














{/* ++++++++++++++++++++++++++++++++++ ADD RECORDS MODAL +++++++++++++++++++++++++++++++++++ */}
<div className="modal-container  text-end   fixed-bottom  turnToAtomicAgeFont"> {/*      fixed-bottom     */}

    {/* Button trigger modal */}
    <button type="button" id="modal-button" className=" btn     " data-backdrop="false" data-toggle="modal" data-target="#addRecordFormModal">
      Add Record
    </button>
    {/* Button trigger modal */}

    {/* <!-- Modal --> */}
    <div className="modal fade        justify-content-center" id="addRecordFormModal" tabIndex="-1" role="dialog" aria-labelledby="addRecordFormModal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered   modal-lg" role="document">
        <div className="modal-content">
            <div className="modal-header">

                      <h5 className="modal-title" id="addAnyRecordHeader">Add Any Record!</h5> 
                      
                      <a className="needHelpFinding  " href="https://www.discogs.com/" target="blank">Need Help Finding a Record?</a>

              <button type="button" className="close  xCloseBTN" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <h3 className="addRecordText text-center">Add New Record</h3>
            <p className="text-center addingDirections">Simply Fill Out All Fields Below To Have Your Recorded Added To The List</p>

          {/* MAIN CONTENT OF MODAL */}
            <div className="modal-body     text-center      ">
                {/* This is an HTML element that will pass the property of addrecord=  to with the function {addrecord} to the Addrecord file */}
                <Addrecord   addrecord={addrecord}   /> {/* This will call in the Addrecord file and put whatever is being returned Here */}
            </div>
          {/* MAIN CONTENT OF MODAL */}


        {/* CLOSE BUTTON         */}
          <div className="modal-footer    justify-content-center">
            <button type="button" id="closeModalBTN" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>


        </div>
      </div>
    </div>

</div>
{/* ++++++++++++++++++++++++++++++++++ ADD RECORDS MODAL +++++++++++++++++++++++++++++++++++ */}





    </React.Fragment>






  );
} // end of    function App() 


export default App;  // this is what displays the file onto chrome
