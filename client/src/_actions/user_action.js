import axios from "axios";

export  function loginUser(dataTosubmit){

    const request = axios.post('/api/users/login',body)
        .then(response => {
            response.data
        })
    return {

    }
}