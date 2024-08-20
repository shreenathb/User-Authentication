import React, { useContext } from 'react'
import { LoginContext } from '../contexts/LoginContext'

export default function Logout() {
    const {loginState, setloginState} = useContext(LoginContext)
    const onClickHandler = async (event) => {
        const response = await fetch("http://127.0.0.1:5000/logout")

        if (response.status === 200){
            console.log("successfuly logged out")
            setloginState(false)
        }else{
            console.log("couldn't log out")
        }
    }
  return (
    <div>
      <button type="button" onClick={onClickHandler} class="btn btn-dark">Logout</button>
    </div>
  )
}
