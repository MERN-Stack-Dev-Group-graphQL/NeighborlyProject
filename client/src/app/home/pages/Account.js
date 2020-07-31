import React, { useState, useContext, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { AuthContext } from '../../../context/auth';
import md5 from 'js-md5';
import defaultImage from '../../../assets/img/avatars/ernie.jpg';

import LoadingDots from '../../shared/components/LoadingDots/LoadingDots';


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
//To test the gravatar image change this to an email address associated with a wordpress.com account
  const md5Email = md5(userContextEmail);
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
      const { firstName, lastName, username, email, phone, mobile, role } = data.user;

        userData = (
          <>
            <img 
              src={ account.avatar }
              alt={`${firstName} ${lastName} avatar`} 
              style={{width: `${75}px`, height: `${75}px`}}/>
            <p>First Name: {firstName}</p>
            <p>Last Name: {lastName}</p>
            <p>User Name: {username}</p>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
            <p>Cell: {mobile}</p>
            <p>Role: {role}</p>
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