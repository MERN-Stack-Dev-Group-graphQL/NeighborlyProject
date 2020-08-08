import React from 'react';
import styled from 'styled-components';

const Avatar = ({ avatar }) => {
  console.log(avatar);

  return (
    <AvatarDefault>
      <img className='avatar--image' style={{ ...avatar.styles }} src={avatar.url} alt='avatar' />
    </AvatarDefault>
  );
};

const AvatarDefault = styled.div`
  .avatar--image {
    background-color: green;
    border-radius: 50%;
    border: 4px solid #ffffff;
  }
`;

export default Avatar;
