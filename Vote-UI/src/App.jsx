
import './App.css'
import spearimage from './assets/spear.jpeg'
import leafimage from './assets/green-leaf-icon-10.png'
import sunimage from './assets/sunrise-pngrepo-com.png'
import user from './assets/user.png'
import { saveAs } from 'file-saver';
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


function App() {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const navigate = useNavigate()

  const ID = localStorage.getItem("voterID");

  useEffect(() => {
    // This function will run when the component mounts

    const ID2 = localStorage.getItem("voterID");
    console.log(ID2)
    if (ID2) {
      // Value exists in local storage
      console.log('Value found in local storage:', ID2);
      // You can set the value to the component state if needed
    } else {
      // Value does not exist in local storage
      console.log('No value found in local storage');
      navigate("/error");
    }
  }, [navigate]); 

  function saveData(a,b){
    saveAs(a,b)
  }

  const handleSubmit =  event =>{
    event.preventDefault();
  

    
    const form = event.target;
    const formData = new FormData(form);
    const formJSON = Object.fromEntries(formData.entries());
    console.log(formJSON);
  

    let fullVote = Object.assign({}, formJSON, {  pollingStation: 'Example1',
    county:'Nairobi',
    constituency:'Embakasi',
    ward:'Savannah', 
    voterID:ID})
 
   
    let filename = `file-${Date.now()}.json`
    var blob = new Blob( [JSON.stringify(fullVote)], {type: "text/plain;charset=utf8"})


      saveData(blob,filename)
      console.log("Write Complete");
      console.log(fullVote)
      

      saveIPFS();
      record();
      localStorage.removeItem("voterID")
      alert("Your vote has been recorded successfully.")
      sleep(1000).then(()=>{navigate("/")});
      //navigate("/")
    

   
  }
  const record  = async () => {
  try{
    const res = await axios.post("http://localhost:8800/record", { voterID : ID})
    // on successful vote, we send an update command to alter the record to reflect a vote.
    console.log(res)
   
   
  }catch(err){
    console.log(err)

  }
}

const saveIPFS  = async () => {
  try{
    //running the save to IPFS file
    const res2 = await axios.get("http://localhost:8800/save")
    console.log(res2)
  
   
   
  }catch(err){
    console.log(err)

  }
}



  return (
    <>
      <div className="container text-center maindiv shadow-lg  p-3 mb-5 rounded">
        
        <div className="text-start border-bottom border-5">
          <header className="display-3 fst-italic">BitBallot</header>
        </div>

        <div className="col ">
      
          <h1>Governor Election Test</h1>
          <h2>Please cast your ballot.</h2>
        
        <form onSubmit={handleSubmit}>
        
      
          <table className="table table-bordered table-striped table-primary table-hover" >
          <thead>
          <tr>
              <th scope="col">Candidate Name</th>
              <th scope="col">Candidiate Photo</th>
              <th scope="col">Party Name</th>
              <th scope="col">Party Symbol</th>
              <th scope="col">Selection</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th scope="row">Maa Phisi</th>
              <td><img src={user} className='img-thumbnail' /></td>
              <td>Lengo la Wote</td>
              <td><img src={spearimage} className='img-thumbnail' /></td>
              <td><input  required type="radio" name='Candidate' value= "Maa Phisi" ></input></td>
            </tr>
            <tr>
              <th scope="row">Peter Siasa</th>
              <td><img src={user} className='img-thumbnail' /></td>
              <td>Afrika Kwanza Party</td>
              <td><img src={sunimage} className='img-thumbnail' /></td>
              <td><input required type="radio" name='Candidate' value= "Peter Siasa"></input></td>
            </tr>
            <tr>
              <th scope="row">Van Jee</th>
              <td><img src={user} className='img-thumbnail' /></td>
              <td>Green Party</td>
              <td><img src={leafimage} className='img-thumbnail' /></td>
              <td><input required type="radio" name='Candidate' value= "Van Jee" ></input></td>
            </tr>
            </tbody>
          </table>
        
          
          <input type = "submit"value = "Submit"></input>
        </form>
        </div>
       
      </div>
    </>
  )
}

export default App
