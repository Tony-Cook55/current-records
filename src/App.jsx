

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

    // IF THERES NO LOCAL STORAGE ADD THIS    DELETE COMMENTS TO RESTORE THE SEED DATA



    // ^^^^^^^^^^^^^^^ LOCAL STORAGE ^^^^^^^^^^^^^^^
        // Every after time past the very first load it will load whats out of local storage to pull our previously saved data
        if(localStorage){              // parses a string into a javascript method (READ operation)
          const recordsLocalStorage = JSON.parse(localStorage.getItem('records'));
          if(recordsLocalStorage){ // if local storage has data in it, it will put that into saveStudents 
            saveRecords(recordsLocalStorage);
          } 
          else{  // when not using localStorage (the first time) it will do our seeded data array
            saveRecords(records);
          }
    
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
      console.log("Changes Have Been Saved To Local Storage!");
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
        console.log("The Name You Entered Is Invalid. Please Enter a Artists Name.");
        console.log("NEW!!!");
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
  const records = [   // an array with javascript objects // DO THIS CHARACTER INSTEAD (⠀⠀⠀⠀⠀⠀⠀⠀⠀)  // INVISIBLE CHARACTER --> (ㅤ) <-- inside 



    // ~~~~~~~~~~ AL MARTINO ~~~~~~~~~~~~~~~  (⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀)
    {     
      id: nanoid(),    // this gives every new record a unique id per each record 
      recordsName: "Best of Al Martino",
      image: require("./pictures/al_martino/AL_MARTINO_best_of_al_martino.jpg"),
      artistsFirstName: "Al",
      artistsLastName: "Martino",
      musicGenre: "60's Pop"
    },
    {     
      id: nanoid(),
      recordsName: "Jean ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      image: require("./pictures/al_martino/AL_MARTINO_jean.jpg"),
      artistsFirstName: "Al",
      artistsLastName: "Martino",
      musicGenre: "70's Pop"
    }, 
    {     
      id: nanoid(),
      recordsName: "I Love More and More Everyday",
      image: require("./pictures/al_martino/AL_MARTINO_i_love_more_and_more_every_day.jpg"),
      artistsFirstName: "Al",
      artistsLastName: "Martino",
      musicGenre: "60's Pop"
    }, 
    {     
      id: nanoid(),
      recordsName: "Living a Lie ⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      image: require("./pictures/al_martino/AL_MARTINO_living_a_lie.jpg"),
      artistsFirstName: "Al",
      artistsLastName: "Martino",
      musicGenre: "Jazz"
    }, 
    {     
      id: nanoid(),
      recordsName: "My Cherie ⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      image: require("./pictures/al_martino/AL_MARTINO_my_cherie.jpg"),
      artistsFirstName: "Al",
      artistsLastName: "Martino",
      musicGenre: "Folk Rock"
    }, 
    {     
      id: nanoid(),
      recordsName: "Painted, Tainted Rose",
      image: require("./pictures/al_martino/AL_MARTINO_painted_tainted_rose.jpg"),
      artistsFirstName: "Al",
      artistsLastName: "Martino",
      musicGenre: "60's Pop"
    }, 
    {     
      id: nanoid(),
      recordsName: "Somebody Else Is Taking My Place",
      image: require("./pictures/al_martino/AL_MARTINO_somebody_else_is_taking_my_place.jpg"),
      artistsFirstName: "Al",
      artistsLastName: "Martino",
      musicGenre: "60's Pop"
    }, 
    {     
      id: nanoid(),
      recordsName: "Spanish Eyes ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      image: require("./pictures/al_martino/AL_MARTINO_spanish_eyes.jpg"),
      artistsFirstName: "Al",
      artistsLastName: "Martino",
      musicGenre: "60's Pop"
    }, 
    {     
      id: nanoid(),
      recordsName: "The Romantic World Of Al Martino",
      image: require("./pictures/al_martino/AL_MARTINO_the_romantic_world.jpg"),
      artistsFirstName: "Al",
      artistsLastName: "Martino",
      musicGenre: "60's Pop"
    }, 
    // ~~~~~~~~~~ AL MARTINO ~~~~~~~~~~~~~~~ 



    // ~~~~~~~~~~ ANDY WILLIAMS ~~~~~~~~~~~~~~~  (⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀)
    {
      id: nanoid(),
      recordsName: "Warm and Willing",
      image: require("./pictures/andy_williams/ANDY_WILLIAMS_warm_and_willing.jpg"),
      artistsFirstName: "Andy",
      artistsLastName: "Williams",
      musicGenre: "Jazz"
    },
    {
      id: nanoid(),
      recordsName: "To You Sweetheart",
      image: require("./pictures/andy_williams/ANDY_WILLIAMS_to_you_sweetheart,_aloha.jpg"),
      artistsFirstName: "Andy",
      artistsLastName: "Williams",
      musicGenre: "Jazz"
    },
    {
      id: nanoid(),
      recordsName: "Days of Wine and Roses",
      image: require("./pictures/andy_williams/ANDY_WILLIAMS_days_of_wine_and_roses.jpg"),
      artistsFirstName: "Andy",
      artistsLastName: "Williams",
      musicGenre: "60's Pop"
    },
    // ~~~~~~~~~~ ANDY WILLIAMS ~~~~~~~~~~~~~~~



    // ~~~~~~~~~~ BARRY GIBB ~~~~~~~~~~~~~~~  (⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀)
    {
      id: nanoid(),
      recordsName: "Streisand Guilty",
      image: require("./pictures/barry_Gibb/BARRY_GIBB_guilty.jpg"),
      artistsFirstName: "Barbra",
      artistsLastName: "Streisand",
      musicGenre: "Funk"
    },
    // ~~~~~~~~~~ BARRY GIBB ~~~~~~~~~~~~~~~



    // ~~~~~~~~~~ BARRY MANILOW ~~~~~~~~~~~~~~~  (⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀)
    {
      id: nanoid(),
      recordsName: "Barry Manilow I",
      image: require("./pictures/barry_manilow/BARRY_MANILOW_I.jpg"),
      artistsFirstName: "Barry",
      artistsLastName: "Manilow",
      musicGenre: "Funk"
    },
    {
      id: nanoid(),
      recordsName: "Barry's Greatest Hits",
      image: require("./pictures/barry_manilow/BARRY_MANILOW_greatest_hits.jpg"),
      artistsFirstName: "Barry",
      artistsLastName: "Manilow",
      musicGenre: "70's Rock"
    },
    {
      id: nanoid(),
      recordsName: "Greatest Hits Vol 2",
      image: require("./pictures/barry_manilow/BARRY_MANILOW_greatest_hits_vol_2.jpg"),
      artistsFirstName: "Barry",
      artistsLastName: "Manilow",
      musicGenre: "80's Pop"
    },
    {
      id: nanoid(),
      recordsName: "Barry Live In Britain",
      image: require("./pictures/barry_manilow/BARRY_MANILOW_live_in_britain.jpg"),
      artistsFirstName: "Barry",
      artistsLastName: "Manilow",
      musicGenre: "80's Rock"
    },
    {
      id: nanoid(),
      recordsName: "This One's For You",
      image: require("./pictures/barry_manilow/BARRY_MANILOW_this_ones_for_you.jpg"),
      artistsFirstName: "Barry",
      artistsLastName: "Manilow",
      musicGenre: "70's Pop"
    },
    // ~~~~~~~~~~ BARRY MANILOW ~~~~~~~~~~~~~~~ 



    // ~~~~~~~~~~ BEE GEES ~~~~~~~~~~~~~~~  (⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀)
    {
      id: nanoid(),
      recordsName: "Spirits Having Flown",
      image: require("./pictures/bee_Gees/BEE_GEES_spirits_having_flown.jpg"),
      artistsFirstName: "Bee",
      artistsLastName: "Gees",
      musicGenre: "Disco"
    },
    {
      id: nanoid(),                    // THIS IS AN INVISIBLE CHARACTER (ㅤ)its scummy and bad code but I can't make all pics align
      recordsName: "The Bee Gees 1st ⠀⠀⠀⠀",
      image: require("./pictures/bee_Gees/BEE_GEES_bee_gees_1st.jpg"),
      artistsFirstName: "Bee",
      artistsLastName: "Gees",
      musicGenre: "Psychedelic Rock"
    },
    {
      id: nanoid(),
      recordsName: "Bee Gees Mr. Natural",
      image: require("./pictures/bee_Gees/BEE_GEES_mr._natural.jpg"),
      artistsFirstName: "Bee",
      artistsLastName: "Gees",
      musicGenre: "Rock"
    },
    // ~~~~~~~~~~ BEE GEES ~~~~~~~~~~~~~~~ 



    // ~~~~~~~~~~ BEST OF ARTISTS ~~~~~~~~~~~~~~~  (⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀)
    {
      id: nanoid(),
      recordsName: "Great Hits of the 60's",
      image: require("./pictures/Best_of_Artists/BEST_OF_ARTISTS_20_great_stars.jpg"),
      artistsFirstName: "Best of",
      artistsLastName: "Artist",
      musicGenre: "60's Jazz"
    },
    {
      id: nanoid(),
      recordsName: "Greatest Hits Of The 50s & 60s",
      image: require("./pictures/Best_of_Artists/BEST_OF_ARTISTS_greatest_hits_of_the_50s_60s.jpg"),
      artistsFirstName: "Best of",
      artistsLastName: "Artist",
      musicGenre: "50's - 60's Rock"
    },
    {
      id: nanoid(),
      recordsName: "Remember How Great...? ",
      image: require("./pictures/Best_of_Artists/BEST_OF_ARTISTS_remember_how_great.jpg"),
      artistsFirstName: "Best of",
      artistsLastName: "Artist",
      musicGenre: "Jazz"
    },
    {
      id: nanoid(),
      recordsName: "Superstars Of The 70's",
      image: require("./pictures/Best_of_Artists/BEST_OF_ARTISTS_superstars_of_the_70's.jpg"),
      artistsFirstName: "Best of",
      artistsLastName: "Artist",
      musicGenre: "Rock"
    },
    // ~~~~~~~~~~ BEST OF ARTISTS ~~~~~~~~~~~~~~~ 



    // ~~~~~~~~~~ BOBBY DARIN ~~~~~~~~~~~~~~~  (⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀)
    {
      id: nanoid(),
      recordsName: "Mack the Knife ⠀⠀⠀⠀⠀⠀⠀⠀",
      image: require("./pictures/Bobby_Darin/BOBBY_DARIN_mack_the_knife.jpg"),
      artistsFirstName: "Bobby",
      artistsLastName: "Darin",
      musicGenre: "Rock"
    },
    // ~~~~~~~~~~ BOBBY DARIN ~~~~~~~~~~~~~~~ 



    // ~~~~~~~~~~ BOZ SCAGGS ~~~~~~~~~~~~~~~  (⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀)
    {
      id: nanoid(),
      recordsName: "Silk Degrees ⠀⠀⠀⠀⠀⠀⠀⠀",
      image: require("./pictures/Boz_Scaggs/BOZ_SCAGGS_silk_degrees.jpg"),
      artistsFirstName: "Boz",
      artistsLastName: "Scaggs",
      musicGenre: "70's Soul"
    },
    // ~~~~~~~~~~ BOZ SCAGGS ~~~~~~~~~~~~~~~ 



    // ~~~~~~~~~~ DEAN MARTIN ~~~~~~~~~~~~~~~  (⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀)
    {
      id: nanoid(),
      recordsName: "Gentle On my Mind",
      image: require("./pictures/Dean_Martin/DEAN_MARTIN_gentle_on_my_mind.jpg"),
      artistsFirstName: "Dean",
      artistsLastName: "Martin",
      musicGenre: "Jazz"
    },
    {
      id: nanoid(),
      recordsName: "Italian Love Songs",
      image: require("./pictures/Dean_Martin/DEAN_MARTIN_italian_love_songs.jpg"),
      artistsFirstName: "Dean",
      artistsLastName: "Martin",
      musicGenre: "60's Pop"
    },
    {
      id: nanoid(),
      recordsName: "You Can't Love 'Em All",
      image: require("./pictures/Dean_Martin/DEAN_MARTIN_you_cant_love_'em_all.jpg"),
      artistsFirstName: "Dean",
      artistsLastName: "Martin",
      musicGenre: "Jazz"
      //       <img src={process.env.PUBLIC_URL + "/pictures/backgrounds/records/vinyl-black.png"} className="RecordSpin" alt="" />

    },
    // ~~~~~~~~~~ DEAN MARTIN ~~~~~~~~~~~~~~~ 



    // ~~~~~~~~~~ ED AMES ~~~~~~~~~~~~~~~  (⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀)
    {
      id: nanoid(),
      recordsName: "My Cup Runneth Over",
      image: require("./pictures/Ed_Ames/ED_AMES_my_cup_runneth_over.jpg"),
      artistsFirstName: "Ed",
      artistsLastName: "Ames",
      musicGenre: "70's Pop"
    },
    {
      id: nanoid(),
      recordsName: "Try to Remember",
      image: require("./pictures/Ed_Ames/ED_AMES_try_to_remember.jpg"),
      artistsFirstName: "Ed",
      artistsLastName: "Ames",
      musicGenre: "70's Pop"
    },
    // ~~~~~~~~~~ ED AMES ~~~~~~~~~~~~~~~ 



    // ~~~~~~~~~~ ENGLEBERT HUMPERDINCK ~~~~~~~~~~~~~~~  (⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀)
    {
      id: nanoid(),
      recordsName: "After the Lovin' ⠀⠀⠀⠀",
      image: require("./pictures/Englebert_Humperdinck/ENGELBERT_HUMPERDINCK_after_the_lovin'.jpg"),
      artistsFirstName: "Engelbert",
      artistsLastName: "Humperdinck",
      musicGenre: "70's Rock"
    },
    {
      id: nanoid(),
      recordsName: "Another Time, Another Place",
      image: require("./pictures/Englebert_Humperdinck/ENGELBERT_HUMPERDINCK_another_time_another_place.jpg"),
      artistsFirstName: "Engelbert",
      artistsLastName: "Humperdinck",
      musicGenre: "70's Pop"
    },
    {
      id: nanoid(),
      recordsName: "Engelbert Humperdinck",
      image: require("./pictures/Englebert_Humperdinck/ENGELBERT_HUMPERDINCK_engelbert_humperdinck.jpg"),
      artistsFirstName: "Engelbert",
      artistsLastName: "Humperdinck",
      musicGenre: "60's Pop"
    },
    {
      id: nanoid(),
      recordsName: "His Greatest Hits",
      image: require("./pictures/Englebert_Humperdinck/ENGELBERT_HUMPERDINCK_greatest_hits.jpg"),
      artistsFirstName: "Engelbert",
      artistsLastName: "Humperdinck",
      musicGenre: "70's Pop"
    },
    {
      id: nanoid(),
      recordsName: "In Time ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      image: require("./pictures/Englebert_Humperdinck/ENGELBERT_HUMPERDINCK_in_time.jpg"),
      artistsFirstName: "Engelbert",
      artistsLastName: "Humperdinck",
      musicGenre: "70's Pop"
    },
    {
      id: nanoid(),
      recordsName: "Release Me ⠀⠀⠀⠀⠀⠀⠀⠀",
      image: require("./pictures/Englebert_Humperdinck/ENGELBERT_HUMPERDINCK_release_me.jpg"),
      artistsFirstName: "Engelbert",
      artistsLastName: "Humperdinck",
      musicGenre: "60's Pop"
    },
    {
      id: nanoid(),
      recordsName: "Sweetheart ⠀⠀⠀⠀⠀⠀⠀⠀",
      image: require("./pictures/Englebert_Humperdinck/ENGELBERT_HUMPERDINCK_sweetheart.jpg"),
      artistsFirstName: "Engelbert",
      artistsLastName: "Humperdinck",
      musicGenre: "70's Pop"
    },
    {
      id: nanoid(),
      recordsName: "The Last Waltz ⠀⠀⠀⠀⠀⠀⠀⠀",
      image: require("./pictures/Englebert_Humperdinck/ENGELBERT_HUMPERDINCK_the_last_waltz.jpg"),
      artistsFirstName: "Engelbert",
      artistsLastName: "Humperdinck",
      musicGenre: "60's Pop"
    },
    {
      id: nanoid(),
      recordsName: "We Made It Happen",
      image: require("./pictures/Englebert_Humperdinck/ENGELBERT_HUMPERDINCK_we_made_it_happen.jpg"),
      artistsFirstName: "Engelbert",
      artistsLastName: "Humperdinck",
      musicGenre: "70's Pop"
    },
    // ~~~~~~~~~~ ENGLEBERT HUMPERDINCK ~~~~~~~~~~~~~~~ 



    // ~~~~~~~~~~ FRANK SINATRA ~~~~~~~~~~~~~~~  (⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀)
    {     
      id: nanoid(),    // this gives every new record a unique id per each record 
      recordsName: "A Man and His Music",
      image: require("./pictures/frank_sinatra/FRANK_SINATRA_a_man_and_his_music.jpg"),
      artistsFirstName: "Frank",
      artistsLastName: "Sinatra",
      musicGenre: "Jazz"
    }, 
    {
      id: nanoid(),                 // INVISIBLE CHARACTER --> (ㅤ) <-- inside 
      recordsName: "Sinatra Sinatra ⠀⠀⠀⠀",
      image: require("./pictures/frank_sinatra/FRANK_SINATRA_sinatra_sinatra_a_collection_of_his_favorites.jpg"),
      artistsFirstName: "Frank",
      artistsLastName: "Sinatra",
      musicGenre: "Jazz"
    },
    {
      id: nanoid(),
      recordsName: "She Shot Me Down",
      image: require("./pictures/frank_sinatra/FRANK_SINATRA_she_shot_me_down.jpg"),
      artistsFirstName: "Frank",
      artistsLastName: "Sinatra",
      musicGenre: "Jazz"
    }, 
    // ~~~~~~~~~~ FRANK SINATRA ~~~~~~~~~~~~~~~ 



    // ~~~~~~~~~~ HERB ALPERT ~~~~~~~~~~~~~~~  (⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀)
    {
      id: nanoid(),
      recordsName: "Whipped Cream ⠀⠀⠀⠀⠀⠀⠀",
      image: require("./pictures/Herb_Alpert/HERB_ALPERT_ whipped_cream_&_other_delights.jpg"),
      artistsFirstName: "Herb",
      artistsLastName: "Alpert",
      musicGenre: "Jazz"
    },
    // ~~~~~~~~~~ HERB ALPERT ~~~~~~~~~~~~~~~ 




      // ~~~~~~~~~~ INK SPOTS ~~~~~~~~~~~~~~~  (⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀)
      {
        id: nanoid(),
        recordsName: "The Sensational Ink Spots",
        image: require("./pictures/Ink_Spots/INK_SPOTS_the_sensational_ink_spots.jpg"),
        artistsFirstName: "Ink",
        artistsLastName: "Spots",
        musicGenre: "60's Jazz"
      },
      // ~~~~~~~~~~ INK SPOTS ~~~~~~~~~~~~~~~ 



    // ~~~~~~~~~~ JACK JONES ~~~~~~~~~~~~~~~  (⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀)
    {
      id: nanoid(),
      recordsName: "A Time For Us ⠀⠀⠀⠀⠀⠀⠀⠀",
      image: require("./pictures/Jack_Jones/JACK_JONES_a_time_for_us.jpg"),
      artistsFirstName: "Jack",
      artistsLastName: "Jones",
      musicGenre: "70's Pop"
    },
    {
      id: nanoid(),
      recordsName: "Jack Jones' Greatest Hits",
      image: require("./pictures/Jack_Jones/JACK_JONES_greatest_hits.jpg"),
      artistsFirstName: "Jack",
      artistsLastName: "Jones",
      musicGenre: "60's Jazz"
    },
    {
      id: nanoid(),
      recordsName: "Jack Jones Sings",
      image: require("./pictures/Jack_Jones/JACK_JONES_jack_jones_sings.jpg"),
      artistsFirstName: "Jack",
      artistsLastName: "Jones",
      musicGenre: "60's Pop"
    },
    {
      id: nanoid(),
      recordsName: "The Impossible Dream",
      image: require("./pictures/Jack_Jones/JACK_JONES_the_impossible_dream.jpg"),
      artistsFirstName: "Jack",
      artistsLastName: "Jones",
      musicGenre: "60's Pop"
    },
    // ~~~~~~~~~~ JACK JONES ~~~~~~~~~~~~~~~ 



    // ~~~~~~~~~~ JOHNNY MATHIS ~~~~~~~~~~~~~~~  (⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀)
    {
      id: nanoid(),
      recordsName: "Feelings ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      image: require("./pictures/Johnny_Mathis/JOHNNY_MATHIS_feelings.jpg"),
      artistsFirstName: "Johnny",
      artistsLastName: "Mathis",
      musicGenre: "70's Pop"
    },
    {
      id: nanoid(),
      recordsName: "Johnny's Greatest Hits",
      image: require("./pictures/Johnny_Mathis/JOHNNY_MATHIS_greatest_hits.jpg"),
      artistsFirstName: "Johnny",
      artistsLastName: "Mathis",
      musicGenre: "50's Pop"
    },
    {
      id: nanoid(),
      recordsName: "Heavenly ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      image: require("./pictures/Johnny_Mathis/JOHNNY_MATHIS_heavenly.jpg"),
      artistsFirstName: "Johnny",
      artistsLastName: "Mathis",
      musicGenre: "50's Pop"
    },
    {
      id: nanoid(),
      recordsName: "Love Is Blue ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      image: require("./pictures/Johnny_Mathis/JOHNNY_MATHIS_love_is_blue.jpg"),
      artistsFirstName: "Johnny",
      artistsLastName: "Mathis",
      musicGenre: "60's Jazz"
    },
    {
      id: nanoid(),
      recordsName: "Portrait Of Johnny",
      image: require("./pictures/Johnny_Mathis/JOHNNY_MATHIS_portrait_of_johnny.jpg"),
      artistsFirstName: "Johnny",
      artistsLastName: "Mathis",
      musicGenre: "60's Pop"
    },
    {
      id: nanoid(),
      recordsName: "The First Time Ever",
      image: require("./pictures/Johnny_Mathis/JOHNNY_MATHIS_the_first_time_ever.jpg"),
      artistsFirstName: "Johnny",
      artistsLastName: "Mathis",
      musicGenre: "70's Pop"
    },
    {
      id: nanoid(),
      recordsName: "The Sweetheart Tree",
      image: require("./pictures/Johnny_Mathis/JOHNNY_MATHIS_the_sweetheart_tree.jpg"),
      artistsFirstName: "Johnny",
      artistsLastName: "Mathis",
      musicGenre: "60's Jazz"
    },
    {
      id: nanoid(),
      recordsName: "The World Of Make Believe",
      image: require("./pictures/Johnny_Mathis/JOHNNY_MATHIS_the_wonderful_world_of_make_believe.jpg"),
      artistsFirstName: "Johnny",
      artistsLastName: "Mathis",
      musicGenre: "60's Pop"
    },
    {
      id: nanoid(),
      recordsName: "Those Were The Days",
      image: require("./pictures/Johnny_Mathis/JOHNNY_MATHIS_those_were_the_days.jpg"),
      artistsFirstName: "Johnny",
      artistsLastName: "Mathis",
      musicGenre: "60's Pop"
    },
    {
      id: nanoid(),
      recordsName: "Up,Up And Away ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      image: require("./pictures/Johnny_Mathis/JOHNNY_MATHIS_up,_up_and_away.jpg"),
      artistsFirstName: "Johnny",
      artistsLastName: "Mathis",
      musicGenre: "60's Pop"
    },
    // ~~~~~~~~~~ JOHNNY MATHIS ~~~~~~~~~~~~~~~ 



    // ~~~~~~~~~~ LOUIS ARMSTRONG ~~~~~~~~~~~~~~~  (⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀)
    {
      id: nanoid(),
      recordsName: "Louis Armstrong",
      image: require("./pictures/Louis_Armstrong/LOUIS_ARMSTRONG_louis_armstrong.jpg"),
      artistsFirstName: "Louis",
      artistsLastName: "Armstrong",
      musicGenre: "60's Jazz"
    },
    // ~~~~~~~~~~ LOUIS ARMSTRONG ~~~~~~~~~~~~~~~ 



    // ~~~~~~~~~~ MATT MONRO ~~~~~~~~~~~~~~~  (⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀)
    {
      id: nanoid(),
      recordsName: "This Is The Life! ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      image: require("./pictures/Matt_Monro/MATT_MONRO_this_is_the_life.jpg"),
      artistsFirstName: "Matt",
      artistsLastName: "Monro",
      musicGenre: "60's Pop"
    },
    // ~~~~~~~~~~ MATT MONRO ~~~~~~~~~~~~~~~ 



    // ~~~~~~~~~~ NEIL DIAMOND ~~~~~~~~~~~~~~~  (⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀)
    {
      id: nanoid(),
      recordsName: "Headed For The Future",
      image: require("./pictures/Neil_Diamond/NEIL_DIAMOND_headed_for_the_future.jpg"),
      artistsFirstName: "Neil",
      artistsLastName: "Diamond",
      musicGenre: "80's Rock"
    },
    {
      id: nanoid(),
      recordsName: "September Morn",
      image: require("./pictures/Neil_Diamond/NEIL_DIAMOND_september_morn.jpg"),
      artistsFirstName: "Neil",
      artistsLastName: "Diamond",
      musicGenre: "70's Soft Rock"
    },
    {
      id: nanoid(),
      recordsName: "The Jazz Singer ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      image: require("./pictures/Neil_Diamond/NEIL_DIAMOND_the_jazz_singer.jpg"),
      artistsFirstName: "Neil",
      artistsLastName: "Diamond",
      musicGenre: "80's Rock"
    },
    // ~~~~~~~~~~ NEIL DIAMOND ~~~~~~~~~~~~~~~ 



    // ~~~~~~~~~~ NEIL SEDAKA ~~~~~~~~~~~~~~~  (⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀)
    {
      id: nanoid(),
      recordsName: "Neil Sings His Greatest Hits",
      image: require("./pictures/Neil_Sedaka/NEIL_SEDAKA_ sings_his_greatest_hits.jpg"),
      artistsFirstName: "Neil",
      artistsLastName: "Sedaka",
      musicGenre: "70's Pop"
    },
    {
      id: nanoid(),
      recordsName: "Sedaka Live In Australia",
      image: require("./pictures/Neil_Sedaka/NEIL_SEDAKA_sedaka_live_in_australia.jpg"),
      artistsFirstName: "Neil",
      artistsLastName: "Sedaka",
      musicGenre: "70's Rock"
    },
    // ~~~~~~~~~~ NEIL SEDAKA ~~~~~~~~~~~~~~~ 



    // ~~~~~~~~~~ ORLEANS ~~~~~~~~~~~~~~~ (⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀)
    {
      id: nanoid(),
      recordsName: "Let There Be Music",
      image: require("./pictures/Orleans/ORLEANS_let_there_be_music.jpg"),
      artistsFirstName: "Orleans",
      artistsLastName: "",
      musicGenre: "70's Rock"
    },
    // ~~~~~~~~~~ ORLEANS ~~~~~~~~~~~~~~~ 



    // ~~~~~~~~~~ PAUL ANKA ~~~~~~~~~~~~~~~  (⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀)
    {
      id: nanoid(),
      recordsName: "Anka ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      image: require("./pictures/Paul_Anka/PAUL_ANKA_anka.jpg"),
      artistsFirstName: "Paul",
      artistsLastName: "Anka",
      musicGenre: "70's Pop"
    },
    {
      id: nanoid(),
      recordsName: "Feelings ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      image: require("./pictures/Paul_Anka/PAUL_ANKA_feelings.jpg"),
      artistsFirstName: "Paul",
      artistsLastName: "Anka",
      musicGenre: "70's Pop"
    },
    {
      id: nanoid(),
      recordsName: "Times Of Your Life",
      image: require("./pictures/Paul_Anka/PAUL_ANKA_times_of_your_life.jpg"),
      artistsFirstName: "Paul",
      artistsLastName: "Anka",
      musicGenre: "70's Pop"
    },
    // ~~~~~~~~~~ PAUL ANKA ~~~~~~~~~~~~~~~ 



    // ~~~~~~~~~~ PERRY COMO ~~~~~~~~~~~~~~~  (⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀)
    {
      id: nanoid(),
      recordsName: "By Request ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      image: require("./pictures/Perry_Como/PERRY_COMO_by_request.jpg"),
      artistsFirstName: "Perry",
      artistsLastName: "Como",
      musicGenre: "60's Pop"
    },
    {
      id: nanoid(),
      recordsName: "Dream Along With Me",
      image: require("./pictures/Perry_Como/PERRY_COMO_dream_along_with_me.jpg"),
      artistsFirstName: "Perry",
      artistsLastName: "Como",
      musicGenre: "50's Pop"
    },
    {
      id: nanoid(),
      recordsName: "It's Impossible ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      image: require("./pictures/Perry_Como/PERRY_COMO_it's_impossible.jpg"),
      artistsFirstName: "Perry",
      artistsLastName: "Como",
      musicGenre: "70's Pop"
    },
    {
      id: nanoid(),
      recordsName: "Just For You ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      image: require("./pictures/Perry_Como/PERRY_COMO_just_for_you.jpg"),
      artistsFirstName: "Perry",
      artistsLastName: "Como",
      musicGenre: "70's Jazz"
    },
    {
      id: nanoid(),
      recordsName: "Just Out Of Reach",
      image: require("./pictures/Perry_Como/PERRY_COMO_just_out_of_reach.jpg"),
      artistsFirstName: "Perry",
      artistsLastName: "Como",
      musicGenre: "70's Pop"
    },
    {
      id: nanoid(),
      recordsName: "We Get Letters ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      image: require("./pictures/Perry_Como/PERRY_COMO_we_get_letters.jpg"),
      artistsFirstName: "Perry",
      artistsLastName: "Como",
      musicGenre: "50's Jazz"
    },
    {
      id: nanoid(),
      recordsName: "The End Of The Day",
      image: require("./pictures/Perry_Como/PERRY_COMO_when_you_come_to_the_end_of_the_day.jpg"),
      artistsFirstName: "Perry",
      artistsLastName: "Como",
      musicGenre: "50's Pop"
    },
    {
      id: nanoid(),
      recordsName: "Where You're Concerned",
      image: require("./pictures/Perry_Como/PERRY_COMO_where_you're_concerned.jpg"),
      artistsFirstName: "Perry",
      artistsLastName: "Como",
      musicGenre: "70's Jazz"
    },
    // ~~~~~~~~~~ PERRY COMO ~~~~~~~~~~~~~~~ 



    // ~~~~~~~~~~ ROBERTA FLACK ~~~~~~~~~~~~~~~  (⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀)
    {
      id: nanoid(),
      recordsName: "Killing Me Softly",
      image: require("./pictures/Roberta_Flack/ROBERTA_FLACK_killing_me_softly.jpg"),
      artistsFirstName: "Roberta",
      artistsLastName: "Flack",
      musicGenre: "70's Funk"
    },
    // ~~~~~~~~~~ ROBERTA FLACK ~~~~~~~~~~~~~~~ 



    // ~~~~~~~~~~ SAMMY DAVIS JR. ~~~~~~~~~~~~~~~  (⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀)
    {
      id: nanoid(),
      recordsName: "The Great Sammy Davis",
      image: require("./pictures/Sammy_Davis_Jr/SAMMY_DAVIS_JR_the_great_sammy_davis_jr.jpg"),
      artistsFirstName: "Sammy",
      artistsLastName: "Davis Jr.",
      musicGenre: "60's Pop"
    },
    // ~~~~~~~~~~ SAMMY DAVIS JR. ~~~~~~~~~~~~~~~ 



    // ~~~~~~~~~~ TEDDY PENDERGRASS ~~~~~~~~~~~~~~~  (⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀)
    {
      id: nanoid(),
      recordsName: " Life Is A Song Worth Singing",
      image: require("./pictures/Teddy_Pendergrass/TEDDY_PENDERGRASS_life_is_a_song_worth_singing.jpg"),
      artistsFirstName: "Teddy",
      artistsLastName: "Pendergrass",
      musicGenre: "70's Soul"
    },
    // ~~~~~~~~~~ TEDDY PENDERGRASS ~~~~~~~~~~~~~~~ 



    // ~~~~~~~~~~ TOM JONES ~~~~~~~~~~~~~~~  (⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀)
    {
      id: nanoid(),
      recordsName: " Live In Las Vegas ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      image: require("./pictures/Tom_Jones/TOM_JONES_live_in_las_vegas.jpg"),
      artistsFirstName: "Tom",
      artistsLastName: "Jones",
      musicGenre: "60's Rock"
    },
    // ~~~~~~~~~~ TOM JONES ~~~~~~~~~~~~~~~ 



    // ~~~~~~~~~~ VIC DAMONE ~~~~~~~~~~~~~~~  (⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀)
    {
      id: nanoid(),
      recordsName: "Angela Mia ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      image: require("./pictures/Vic_Damone/VIC_DAMONE_angela_mia.jpg"),
      artistsFirstName: "Vic",
      artistsLastName: "Damone",
      musicGenre: "50's Pop"
    },
    {
      id: nanoid(),
      recordsName: "Basin Street East",
      image: require("./pictures/Vic_Damone/VIC_DAMONE_the_liveliest_at_basin_street_east.jpg"),
      artistsFirstName: "Vic",
      artistsLastName: "Damone",
      musicGenre: "60's Jazz"
    },
    // ~~~~~~~~~~ VIC DAMONE ~~~~~~~~~~~~~~~ 



    // ~~~~~~~~~~ WAYNE NEWTON ~~~~~~~~~~~~~~~  (⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀)
    {
      id: nanoid(),
      recordsName: "Wayne Newton Sings Hit Songs",
      image: require("./pictures/Wayne_Newton/WAYNE_NEWTON_sings_hit_songs.jpg"),
      artistsFirstName: "Wayne",
      artistsLastName: "Newton",
      musicGenre: "60's Jazz"
    },
    // ~~~~~~~~~~ WAYNE NEWTON ~~~~~~~~~~~~~~~  




  ];//--- ARRAY WITH record INFORMATION  ---













  // RETURNS THIS AS AN OUTPUT ON THE SCREEN
  return (       



    <React.Fragment>    {/* God forbid you add some html without this or it screams IDK why? */}



      {/* THIS IS HERE TO ALLOW US TO JUMP TO THE TOP OF THE PAGE WITH ANCHORS*/}
      <div id="back_to_top"></div>
      {/* THIS IS HERE TO ALLOW US TO JUMP TO THE TOP OF THE PAGE WITH ANCHORS*/}



{/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! NAVBAR !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
    <nav className="navbar navbar-expand-lg   checkeredBackgroundPic   turnToAtomicAgeFont    sticky-top" >
          <div className="container-fluid">


            {/* GIANT Search For records Text in Navbar */}
            <a className="navbar-brand  add3dTextShadow  turnToAtomicAgeFont" href="#0"><h1>Search For Records</h1></a>



              <div className="form-row container     justify-content-center">


                <div className="d-flex  align-items-center    ">
                  {/* HOLDS THE SEARCH BY FIRST AND LAST NAME TEXTBOX AND SEARCH BUTTON */}



                    {/* xxxxxxxxxx ERROR MESSAGE xxxxxxxxxx */}
                      <div className="row  flex-row-reverse">
                        <div className="text-center   turnToAtomicAgeFont   ">
                          {error && <p className="errorNAV">{error}</p>}
                        </div>
                      </div>
                    {/* xxxxxxxxxx ERROR MESSAGE xxxxxxxxxx */}



                    <div className="col ">
                        <div className="input-group   justify-content-center     turnToAtomicAgeFont"> {/*get rid of this to span whole screen --> form-control-inline */}
                          
                          {/* SEARCH BY NAME TEXTBOX */}
                          <input type="text" className="form-control" id="enterNameTXT" 
                                onChange={evt => setKeywords(evt.currentTarget.value)} value={keywords} 
                                placeholder="Enter Artists Name" aria-label="Recipient's username" 
                                aria-describedby="button-addon2"  >
                          </input>
                          {/* SEARCH BY NAME TEXTBOX */}


                            
                          {/* SEARCH BY NAME BUTTON */}
                          <div className="input-group-append">
                            <button type="button" id="searchNameBTN" className=" btn   " onClick={searchrecords} >
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


        {/* Current Records Text */}
        <h1 className="currentRecordsText    turnToAtomicAgeFont">
          Cur<span className="flickerAnimationSHORT">r</span>ent 
          <span className="flickerAnimationLONG"> R</span>ecor<span className="flickerAnimationSHORT">d</span><span className="">s</span>
        </h1>
        {/* Current Records Text */}




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
            <img src={require("./pictures/backgrounds/records/vinyl-black.png")} className="RecordSpin" alt="" />
            {/* RECORD SPINNING PIC */}

          </header>  
        </div>
{/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ TEXT AND PIC AT THE TOP @@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}









          {/*<!-- !!!!!!!!!!!!!!!!!!!!!!!!! DOWN TO BOTTOM ANCHOR TAGS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->*/}
          <div className=" text-center    turnToAtomicAgeFont       find-records" >
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
                {error && <p className=" errorBIG  turnToAtomicAgeFont">{error}</p>}
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

                      <h5 className="modal-title  add3dTextShadow" id="addAnyRecordHeader">Add Any Record!</h5> 
                      
                      <a className="needHelpFinding  " href="https://www.discogs.com/" target="blank">Search Records!</a>

              <button type="button" className="close  xCloseBTN" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            {/* This is the main Add New Record                             blackANDwhiteTextShadow */}
            <h3 className="addRecordText text-center    ">
              <span className="flickerAnimationLONG">A</span>dd 
              N<span className="flickerAnimationSHORT">e</span>w 
              Re<span className="flickerAnimationLONG">c</span>ord
            </h3>

            {/*This is the directions to add a new record */}
            {/* <p className="text-center addingDirections  blackANDwhiteTextShadow">Simply Fill Out All Fields Below To Have Your Recorded Added To The List</p> */}

          {/* MAIN CONTENT OF MODAL */}
            <div className="modal-body     text-center     blackANDwhiteTextShadow ">
                {/* This is an HTML element that will pass the property of addrecord=  to with the function {addrecord} to the Addrecord file */}
                <Addrecord   addrecord={addrecord}   /> {/* This will call in the Addrecord file and put whatever is being returned Here */}
            </div>
          {/* MAIN CONTENT OF MODAL */}


        {/* CLOSE BUTTON         */}
          <div className="modal-footer    justify-content-center">
            <button type="button" id="closeModalBTN" className="btn" data-dismiss="modal">Close</button>
          </div>
        {/* CLOSE BUTTON         */}

        </div>
      </div>
    </div>

</div>
{/* ++++++++++++++++++++++++++++++++++ ADD RECORDS MODAL +++++++++++++++++++++++++++++++++++ */}





    </React.Fragment>






  );
} // end of    function App() 


export default App;  // this is what displays the file onto chrome
