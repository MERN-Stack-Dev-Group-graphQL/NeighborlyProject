import React, { useState, useContext, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { AuthContext } from '../../../context/auth';
import md5 from 'js-md5';
import defaultImage from '../../../assets/img/avatars/ernie.jpg';

import LoadingDots from '../../shared/components/LoadingDots';


const queryUser = gql`
  query user($userID: ID!){
    user(_id: $userID){
      _id
      avatar
      username
      firstName
      lastName
      email
      phone
      mobile
      locationId
      locationDetails
      role
      createdAt
      updatedAt
    }
  }
`

function Account(){
  const userContextID = useContext(AuthContext).user._id;
  const userContextEmail = useContext(AuthContext).user.email.toLowerCase();
  const md5Email = md5(userContextEmail); //To currently test the conditional logic here change md5Email to an email address associated with a valid wordpress.com account
  const gravatarURL = `https://www.gravatar.com/avatar/`;

  const [account, setAccount] = useState({
    avatar: defaultImage
  });

  useEffect( ()=>{
    const asynchronous = async function(){

      const myResponse = await fetch(`${gravatarURL}${md5Email}?s=400&d=404`)
      if(myResponse.status === 200) setAccount({...account, avatar: myResponse.url })
    }
    asynchronous();
  }, [])

    const { loading, error, data } = useQuery(queryUser, {
        variables: {
            userID: userContextID
        }
    });
    let userData;
    
    if(loading){
      userData = <LoadingDots/>
    }
    
    if(data){
      console.log(data)
        userData = (
          <>
            <img 
              src={ account.avatar }
              alt={`${data.user.firstName} ${data.user.lastName} avatar`} 
              style={{width: `${75}px`, height: `${75}px`}}/>
            <p>First Name: {data.user.firstName}</p>
            <p>Last Name: {data.user.lastName}</p>
            <p>User Name: {data.user.username}</p>
            <p>Email: {data.user.email}</p>
            <p>Phone: {data.user.phone}</p>
            <p>Cell: {data.user.mobile}</p>
            <p>Role: {data.user.role}</p>
          </>
        )
    }
    if(error) userData = <h4>Sorry, there was an error loading your profile</h4>

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1>User Profile</h1>
            {userData}
          </div>
        </div>
      </div>

    )
}

export default Account;