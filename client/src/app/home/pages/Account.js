import React, { useState, useContext, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { AuthContext } from '../../../context/auth';
import md5 from 'js-md5';

import LoadingDots from '../../shared/components/LoadingDots';

/*
--https://www.reddit.com/r/mongodb/comments/6t4wfn/is_storing_images_in_a_mongodb_database_really/
--Cloudinary or s3 from Amazon?  Research options and discuss with David

? Or use cloudinary? or some other third-party service to convert to link free service to store images.  
* Need to figure out how to turn picture into a binary data to store via gql.
? use GridFS for images?  https://docs.mongodb.com/manual/core/gridfs/#when-to-use-gridfs

mutation register($UInput: UserInput!){
  register(input: $UInput){
    _id
    username
    firstName
    lastName
    email
    phone
    mobile
  }
}

{
  "UInput": {
    "username": "Gabe",
    "firstName": "Gabriel",
    "lastName": "Codes",
    "email": "gcodes@gmail.com",
    "password": "gcodes1234",
    "confirmPassword": "gcodes1234"    
  }
}
*/
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


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11
//???????????????????????????????????????????????????????????????????????????????
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//##################################################################################
//********************************************************************************** */

// Or default populate user page info from local storage, until query returns with more detailed results.

//********************************************************************************** */
//##################################################################################
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//???????????????????????????????????????????????????????????????????????????????
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11


function Account(){
  const userContextID = useContext(AuthContext).user._id;
  const userContextEmail = useContext(AuthContext).user.email.toLowerCase();
  const md5Email = md5(userContextEmail);
  // const md5Email = md5('gceipper@gmail.com');

  const gravatarURL = `https://www.gravatar.com/avatar/`;
//Need to add conditional logic to only use if status === 200
  useEffect( ()=>{
    fetch(`${gravatarURL}${md5Email}?s=400&d=404`)
      // .then(response=> response.json())
      .then(data=> console.log(data))  
  })

    const { loading, error, data } = useQuery(queryUser, {
        variables: {
            userID: userContextID
        }
    });
    let userData;
    console.log(loading, ` loading True?`);
    if(loading){
        userData = <LoadingDots/>
    }
    if(data){
        userData = (
          <>
            <img src={`https://www.gravatar.com/avatar/${md5Email}?d=404`} alt={`${data.user.firstName} ${data.user.lastName} avatar`} />
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