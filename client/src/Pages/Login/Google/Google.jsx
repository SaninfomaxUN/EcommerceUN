import './Google.css';
import { useState, useEffect } from 'react';
import { gapi } from "gapi-script";
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';



function Google() {



  const navigate = useNavigate();
  const responseGoogle = (response) => {
    console.log(response);
    navigate('/DashShopper');
  }

  const clientID = "137799206714-4tal66trfaab62b463fh78toi0hbmpi7.apps.googleusercontent.com"
  const [user, setUser] = useState({});
  const [loggeIn, setLoggetInfo] = useState(false); 

  const onSuccess = (response) => {
    setUser(response.profileObj);
    document.getElementsByClassName("btn").hidden = true;
  }
  const onFailure = (response) => {
    console.log("Something went wrong");
  }
  const handleLogout  = () => {
    setUser({}); 
  }
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
      });
    }
    gapi.load("client:auth2", start);
  });

return (
    <div className="center">
   
        <GoogleLogin
          clientId={clientID}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          buttonText="Iniciar sesión con Google"
          cookiePolicy={"single_host_origin"}
        />
      <div className={user ? "profile" : "hidden"}>
        <h3>{user.name}</h3>
      </div>
    </div>
  );
}
export default Google;