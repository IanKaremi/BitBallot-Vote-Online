import { useNavigate } from "react-router-dom"

function Errorpage() {
  
  const navigate = useNavigate();
  const handleRedirect = () =>{
    navigate("/")
  }

  return (
      <>
        <div className="container text-center maindiv shadow-lg  p-3 mb-5 rounded">
          <div className="text-start border-bottom border-5">
            <header className="display-3 fst-italic">BitBallot</header>
          </div>
          <h1>Verification Failed</h1>
          <p>Voter is unregistered or ballot has already been cast.Please consult the polling officer for further assistance.</p>
          <button onClick={handleRedirect}>Return to Startpage</button>

        </div>
      </>
    );
  } 
export default Errorpage