import NavbarShopper from "../../../Components/Commons/NavbarShopper/NavbarShopper.jsx"

import "./Styles/Profile.css"

const Profile = () => {


    return (
        <div>
            <NavbarShopper/>
            <br/>
            <br/>
            <br/>

            <div className="card container cardUser">

                <h3><span className="material-symbols-outlined">
                    account_circle
                </span>user.name</h3>
            </div>


            <br/>
            <br/>
            <br/>


            <div className="card container cardItems ">
                <ul>
                    <li className="itemlist"><span className="material-symbols-outlined">account_circle</span>
                        <a href="PagesShopper/Profile" className="itemData ">Mis datos</a>
                    </li>

                    <li className="itemlist"><span className="material-symbols-outlined">verified_user</span>
                        <a href="PagesShopper/Profile" className="itemData ">Seguridad</a>
                    </li>

                    <li className="itemlist">
                        <span className="material-symbols-outlined">privacy_tip</span>
                        <a href="PagesShopper/Profile" className="itemData ">Privacidad</a>
                    </li>
                </ul>
            </div>


        </div>
    )
}

export default Profile