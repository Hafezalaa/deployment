import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import axios from 'axios'

function Verify() {
    const {vtoken, uid} = useParams();
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        const verify = async()=>{
            try {
                const res = await axios(`http://localhost:5000/users/verify/${vtoken}/${uid}`);
                setIsVerified(res.statusText === "OK" ? true : false);

            } catch (error) {
                console.log(error.message)
            }
        }
        
        verify();
    }, []);

  return (
    <div>
        {isVerified && <Navigate to="/login" replace={true} />}
    </div>
  )
}

export default Verify