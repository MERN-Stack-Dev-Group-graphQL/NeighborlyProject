import React, { useState, useEffect } from 'react';
import { BsChatQuoteFill } from 'react-icons/bs';
import styled from 'styled-components';

let databaseComments = 0;

const getComments = () => {
  return new Promise((res) => {
    setTimeout(() => {
      res(databaseComments);
    }, 500);
  });
};

const addComments = (comments) => {
  console.log('Send Network Request for Comments');
  return new Promise((res) => {
    setTimeout(() => {
      databaseComments += comments;
      res(databaseComments);
    }, 500);
  });
};

function CommentsButton() {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState(0);
  const [queueComments, setQueueComments] = useState(0);

  useEffect(() => {
    getComments().then((comments) => {
      setLoading(false);
      setComments(comments);
    });
  }, []);

  useEffect(() => {
    if (queueComments > 0) {
      const timeout = setTimeout(() => {
        addComments(queueComments).then((comments) => {
          setComments(comments);
          setQueueComments(0);
        });
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [queueComments]);

  function comment() {
    setQueueComments(queueComments + 1);
  }

  return (
    <CommentButton>
      <button className='btn' onClick={comment}>
        <BsChatQuoteFill />
      </button>
      <div className='label'>{loading ? 'Loading...' : `${(comments + queueComments).toLocaleString()}`}</div>
    </CommentButton>
  );
}

const CommentButton = styled.div`
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
    line-height: 1;

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

export default CommentsButton;
