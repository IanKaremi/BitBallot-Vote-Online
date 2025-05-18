const Moralis = require("moralis").default;
const fs = require("fs");
const path = require('path');
require("dotenv").config();

    
  const downloadsFolder = "/Users/iankaremi/Downloads/Votes";
  

  // Read the contents of the "Safari Downloads" folder
  const files = fs.readdirSync(downloadsFolder);
  
  // Filter out only files (exclude directories)
  const filesWithPath = files.filter(file => fs.statSync(path.join(downloadsFolder, file)).isFile());
  
  // Sort files by modification date in descending order
  const sortedFiles = filesWithPath.sort((a, b) => {
      return fs.statSync(path.join(downloadsFolder, b)).mtime.getTime() - fs.statSync(path.join(downloadsFolder, a)).mtime.getTime();
  });
  
  // Select the newest file
  const newestFile = sortedFiles[0];
  
  // Read the content of the newest file
  const content = fs.readFileSync(path.join(downloadsFolder, newestFile), { encoding: 'base64' });
  
  // Create the fileUploads array with the newest file
  const fileUploads = [
      {
          path: newestFile,
          content: content
      }
  ];

  
  //console.log(fileUploads);
  
  async function uploadToIpfs(){

    await Moralis.start({
        apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImE4ZTUzMDVlLTBmMWItNDIzZi1iYjU1LWRkY2QyZDNhZjM3MCIsIm9yZ0lkIjoiMzkzNjEwIiwidXNlcklkIjoiNDA0NDU0IiwidHlwZUlkIjoiYjRmYmFkNzItZjA2NS00ODY1LWFhOWQtNjdkOTE5NDMwZWE5IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTY1NzI4NTgsImV4cCI6NDg3MjMzMjg1OH0.MtTVWCwBMVjpqAupkUa9rXrxly7FRjC6bS09_FrIANg"
    })

    const res = await Moralis.EvmApi.ipfs.uploadFolder({
        abi: fileUploads
    })

    console.log(res.result)

}

uploadToIpfs();