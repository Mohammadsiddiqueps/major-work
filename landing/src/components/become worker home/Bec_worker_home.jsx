import React from 'react'
import { Link } from 'react-router-dom'
import { useMainUsername } from '../../context/Authcontext'

const Bec_worker_home = () => {
  const {mainUsername,setMainUsername}=useMainUsername()
  return (
    <div>Bec_worker_home
              <Link to={'/worker_home'}><button id='become-worker'>Become worker</button></Link>
<h1>{mainUsername.username}</h1>
<h1>{mainUsername.id}</h1>
<h1>{mainUsername.dob}</h1>
<h1>{mainUsername.gender}</h1>
<h1>{mainUsername.email}</h1>

    </div>
  )
}

export default Bec_worker_home 