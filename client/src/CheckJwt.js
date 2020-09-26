const CheckJwt = (jwt) => {
    fetch("http://localhost:8080/users-api/user/check-jwt", {
      method: 'post',
      headers: {
          'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
          jwt: jwt,
          date: null,
          valid: true
      })
    })
    .then(res => res.json())
    .then(res => {
       // calculations based off of milliseconds
      // const jwtTimeInMilli = res;
      // const currentTimeInMilli = new Date().getTime();
      // const timeLeft = jwtTimeInMilli - currentTimeInMilli;
      // if(timeLeft/60000 < 0){
      //     localStorage.clear();
      //     alert("You've been signed out.");
      //     window.location.reload();
      // }
      if(!res.valid){
        console.log("expired jwt")
        localStorage.clear();
        alert("You've been signed out.")
        window.location.reload();
      }
    })
    .catch(err => {
      console.log("Error in checkJwt ", err);
    })
};

export default CheckJwt;