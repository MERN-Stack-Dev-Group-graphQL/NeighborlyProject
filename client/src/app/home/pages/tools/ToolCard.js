import React from 'react';
import moment from 'moment';
import Card from 'react-bootstrap/Card';
import LikesButton from '../../../shared/components/Buttons/LikesButton';
import CommentsButton from '../../../shared/components/Buttons/CommentsButton';
import avatar from '../../../../assets/img/avatars/avatar-default.png';
import styled from 'styled-components';
// Icons
import { BsBookmarkPlus } from 'react-icons/bs';
// import { Link } from 'react-router-dom';
import MoreDetailsButton from '../../../shared/components/Buttons/MoreDetailsButton';
import StarCount from '../../../shared/components/reviews/StarCount';

function ToolCard({ tool: { _id, title, description, createdAt, url, photo } }) {
  function bookmarkTool() {
    console.log('Bookmark tool button clicked!');
  }

  function CardImage(path) {
    if (path.url.length > 1) {
      return <img src={`http://localhost:4000${path.url}`} alt={title} className='card-img-top' />;
    }
    return <img src='http://localhost:4000/assets/img/default.jpg' alt={title} className='card-img-top' />;
  }

  const toolId = _id;
  const starCount = 4;
  const rateCount = 252;

  return (
    <CardWrapper className='col-md-4'>
      <Card className='mb-5'>
        <div className='card-image-wrapper'>
          <CardImage url={url} />
        </div>

        <Card.Body>
          <img src={avatar} alt='Avatar' className='card-avatar' />
          <Card.Title>{title}</Card.Title>
          <StarCount starCount={starCount} rateCount={rateCount} />
          {/* <Card.Text>{description}</Card.Text> */}
          <div className='card-action d-flex'>
            <small className='text-muted d-block'>Posted {moment(createdAt).fromNow(true)} ago</small>
            <div className=' bookmark-btn ml-auto' onClick={bookmarkTool}>
              <BsBookmarkPlus />
            </div>
          </div>
        </Card.Body>
        <Card.Footer className='d-flex align-items-center'>
          <LikesButton />
          <CommentsButton />
          <MoreDetailsButton toolId={toolId} />
        </Card.Footer>
      </Card>
    </CardWrapper>
  );
}

export default ToolCard;

const CardWrapper = styled.div`
  .card {
    min-height: 450px;
    border: none;
  }

  .card-image-wrapper {
    position: relative;

    &::after {
      content: '';
      display: block;
      height: 30%;
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      pointer-events: none;
      background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
      background-repeat: repeat-x;
    }
  }

  .card-body {
    display: flex;
    flex-direction: column;
  }

  .card-title {
    padding-right: 55px;
    margin-bottom: 0.5rem;
  }

  .card-avatar {
    position: absolute;
    height: 50px;
    width: 50px;
    transform: translateY(-85%);
    right: 1rem;
  }

  .card-action {
    display: flex;
    margin-top: auto;
    align-items: center;
  }

  .card-footer {
    background: #ffffff;
    padding: 0.75rem 1rem;
  }

  .like-btn,
  .comment-btn,
  .bookmark-btn {
    padding: 0 4px;
  }

  .bookmark-btn {
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: var(--color-light);
    background-color: var(--color-primary);
    border-radius: 15px;
  }
`;
