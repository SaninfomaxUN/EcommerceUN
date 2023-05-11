import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'



const ProtectedRoute = ({allowed, children, redirecTo="/Home"}) => {



if(!allowed){
    return <Navigate to={redirecTo}/>
}

return children ? children :<Outlet/>
}

export default ProtectedRoute