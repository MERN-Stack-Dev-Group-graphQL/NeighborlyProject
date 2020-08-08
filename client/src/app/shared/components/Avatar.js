import React from 'react';
import styled from 'styled-components';

const Avatar = ({ avatar }) => {
  return (
    <AvatarContainer>
      <img src={avatar.url} alt='Avatar' className='avatar' style={{ ...avatar.styles }} />
    </AvatarContainer>
  );
};

const AvatarContainer = styled.div`
  .avatar {
    border-radius: 50px;
    border: 3px solid #ffffff;
  }
`;

export default Avatar;
