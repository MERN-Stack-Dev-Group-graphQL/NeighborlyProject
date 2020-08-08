import React, { useState, useEffect } from 'react';
import { BsHeartFill } from 'react-icons/bs';
import styled from 'styled-components';

let databaseLikes = 0;

const getLikes = () => {
  return new Promise((res) => {
    setTimeout(() => {
      res(databaseLikes);
    }, 500);
  });
};

const addLikes = (likes) => {
  console.log('Send Network Request');
  return new Promise((res) => {
    setTimeout(() => {
      databaseLikes += likes;
      res(databaseLikes);
    }, 500);
  });
};

function LikesButton() {
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [queueLikes, setQueueLikes] = useState(0);

  useEffect(() => {
    getLikes().then((likes) => {
      setLoading(false);
      setLikes(likes);
    });
  }, []);

  useEffect(() => {
    if (queueLikes > 0) {
      const timeout = setTimeout(() => {
        addLikes(queueLikes).then((likes) => {
          setLikes(likes);
          setQueueLikes(0);
        });
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [queueLikes]);

  function like() {
    setQueueLikes(queueLikes + 1);
  }

  return (
    <LikeButton>
      <button className='btn' onClick={like}>
        <BsHeartFill />
      </button>
      <div className='label'>{loading ? 'Loading...' : `${(likes + queueLikes).toLocaleString()} likes`}</div>
    </LikeButton>
  );
}

const LikeButton = styled.div`
  display: flex;
  align-items: center;
  margin-right: 6px;

  .btn {
    font-weight: 400;
    border-radius: 0.28571429rem 0 0 0.28571429rem;
    box-shadow: 0 0 0 1px var(--color-secondary) inset !important;
    color: var(--color-secondary) !important;
    height: 36px;
    width: 50px;

    &:hover {
      background: var(--color-secondary);

      svg {
        fill: var(--color-light);
      }
    }
  }

  .label {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0.5833em 0.833em;
    margin: 0 0 0 -2px;
    font-size: 0.875rem;
    color: var(--color-secondary);
    border-color: var(--color-secondary);
    border: 1px solid var(--color-secondary);
    border-radius: 0.28571429rem;
    transition: background 0.1s ease;

    &::before {
      position: absolute;
      content: '';
      z-index: 2;
      width: 0.6666em;
      height: 0.6666em;
      background: #ffffff;
      transition: background 0.1s ease;
      border-width: 0 0 1px 1px;
      border-style: solid;
      border-color: inherit;
      transform: translateX(-50%) translateY(-50%) rotate(45deg);
      bottom: auto;
      right: auto;
      top: 50%;
      left: -1px;
      margin-top: -1px;
    }
  }
`;

export default LikesButton;
