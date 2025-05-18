/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios"

localStorage.clear();

function Root() {
  //const inputRef = useRef(null);
  const [id , setID] = useState("");
  const navigate = useNavigate()

  const handleChange = (e) => {
    setID(e.target.value);
  };

//here we check the voter id in the registry
  const handleSubmit = async event =>{
    event.preventDefault();
    //console.log(id)
    try{
      await axios.post("http://localhost:8800/verify", { voterID : id})
      
      //redirect to ballot page if conditions met
      redirect();


      
      console.log(id)
    }catch(err){
      console.log(err)

    }

    
  }

  
  

// just a connection test 
/*
  useEffect(()=>{
    const readAll = async ()=>{
      try{
        const res = await axios.get("http://localhost:8800/check")
        console.log(res)
        
      }catch(err){
        console.log(err)
      }
    }
    readAll()
  },[])

*/
let navigatePath = '';
  const redirect = async ()=>{
   
      try{
        const res2 = await axios.get("http://localhost:8800/redirect")
        console.log(res2)
        
          if (res2.data.length === 1 && res2.data[0].Voted === 0){
       
         
          console.log("success")
          localStorage.setItem("voterID", id )
         //navigatePath = "/ballot"
         navigate("/ballot")

              
        }else{
         
          navigatePath = "/error"
          navigate(navigatePath);
        }

      }catch(err){
        console.log(err)
    }
  }
 useEffect(() => {
    const TimerID = setTimeout(()=>navigate(navigatePath), 3000);
    return () => clearTimeout(TimerID)
   

  }, [navigatePath,navigate]);



 
  


  return (
      <>
        <div className="container text-center maindiv shadow-lg  p-3 mb-5 rounded">
          <div className="text-start border-bottom border-5">
            <header className="display-3 fst-italic">BitBallot</header>
          </div>
          <h1>Voter Identity Verification</h1>
          <p>Please enter your Voter ID Number. You will be redirected when the verifictaion is finished.</p>
          <form action="" method="post" >
              <input  type="text" name="voterid" value={id} onChange={(event)=> handleChange(event)} required></input><br/>
              <input type="submit" onClick={handleSubmit}></input>
          </form>

        </div>
      </>
    );
  } 
export default Root