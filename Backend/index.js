import express from "express";
import mysql from "mysql2";
import cors from "cors"
const app = express()
//import execFile from 'node:child_process'
import { execFile }  from 'node:child_process';
let querydata

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"20422042",
    database:"Voters" 
})

app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.json("Hello from the backend.")
})
// connection check
app.get("/check", (req,res)=>{
    const q = "SELECT * FROM Registry"
    db.query(q,(err, data) =>{
        if(err) { 
            return res.json(err)
        }else{
        //console.log(data)
        return res.json(data)
        
    }

    })
})

//read the voter id to see if they voted
app.post("/verify", (req,res)=>{
    const q = "SELECT * FROM Registry WHERE Voted = 0 AND VoterID = (?)"
    const value = req.body.voterID // the voterid

    db.query(q, [value] ,(err,data) => {
        if (err) return res.json(err);
        console.log(data)
        querydata = data;
        return res.json(data)    
        
    })
    console.log("Yes!")
    console.log(value)
    
})

app.post("/record", (req,res)=>{
    const q = "UPDATE Registry SET Voted = 1 WHERE VoterID = (?)"
    const value = req.body.voterID // the voterid

    db.query(q, [value] ,(err,data) => {
        if (err) return res.json(err);
        console.log(data)
        querydata = data;
        return res.json(data)    
        
    })
    console.log("Voter Status Reflected.")
    console.log(value)
    
})

// send the result of /verify
app.get("/redirect", (req,res)=>{
    res.json(querydata)

})

app.get("/save", (req,res) =>{

    const child = execFile('node',['/Users/iankaremi/Documents/VS CODE/Vote-Full/IPFS/index.js'],(error,stdout,stderr) =>{
        if(error){
          console.error('stderr',stderr);
          throw error;
        }
        
        console.log('stdout',stdout);
        return res.json("Data Saved.");
      })

})

app.listen(8800, ()=>{
    console.log("Successful connection to server.");  
})