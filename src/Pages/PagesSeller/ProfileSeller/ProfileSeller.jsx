
import NavbarSeller from "../../../Components/Commons/NavbarSeller/NavbarSeller"
import React, { useState, useEffect } from 'react';

import "./Styles/ProfileSeller.css"

const ProfileSeller = () => {
  

  return (
<div>
<NavbarSeller/>
<br />
    SELLER
<br />
<br />

<div className="card container cardUser">

<h3><span class="material-symbols-outlined">
account_circle
</span>user.name</h3>
</div>


<br />
<br />
<br />


<div className="card container cardItems ">
<ul>
    <li className="itemlist"><span class="material-symbols-outlined">account_circle</span>
    <a href="PagesSeller/ProfileSeller" className="itemData  ">Mis datos</a>
    </li>

    <li className="itemlist"> <span class="material-symbols-outlined">verified_user</span>
    <a href="PagesSeller/ProfileSeller" className="itemData ">Seguridad</a>
    </li>

    <li className="itemlist">
    <span class="material-symbols-outlined">privacy_tip</span>
    <a href="PagesSeller/ProfileSeller" className="itemData ">Privacidad</a>
    </li>
</ul>
</div>







</div>
  )
}

export default ProfileSeller