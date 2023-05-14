import axios from "axios";

export const doVerification2FA = (formData) => {
    axios.post('http://localhost:5000/api/send2FA', formData)
        .then(
            /*function (res){
                console.log(res.data)
                console.log("dentrooo")
            }*/
        )
        .catch(err => console.log(err));

};