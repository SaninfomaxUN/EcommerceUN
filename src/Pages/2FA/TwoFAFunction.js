import axios from "axios";

export const doVerification2FA = async (formData) => {
    console.log(process.env.REACT_APP_API)
    await axios.post(process.env.REACT_APP_API+'/send2FA', formData)
        .then(
            /*function (res){
                console.log(res.data)
                console.log("dentrooo")
            }*/
        )
        .catch(err => console.log(err));

};