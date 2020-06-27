import React from 'react';
import moment from 'moment';
import Card from 'react-bootstrap/Card';
import LikesButton from '../../../shared/components/Buttons/LikesButton';
import CommentsButton from '../../../shared/components/Buttons/CommentsButton';
import avatar from '../../../../assets/img/avatars/avatar-default.png';
import styled from 'styled-components';
// Icons
import { BsBookmarkPlus } from 'react-icons/bs';
import { Link } from 'react-router-dom';

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

  return (
    <CardWrapper className='col-md-4'>
      <Card className='card mb-5'>
        <CardImage url={url} />

        <Card.Body>
          <img src={avatar} alt='Avatar' className='card-avatar' />
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <div className='card-action d-flex'>
            <small className='text-muted d-block'>{moment(createdAt).fromNow(true)}</small>
            <Link to={`/tool-detail/${_id}`} className='ml-auto mr-2'>
              More Details
            </Link>
            <div className=' bookmark-btn' onClick={bookmarkTool}>
              <BsBookmarkPlus />
            </div>
          </div>
        </Card.Body>
        <Card.Footer className='d-flex align-items-center'>
          <LikesButton />
          <CommentsButton />
        </Card.Footer>
      </Card>
    </CardWrapper>
  );
}

export default ToolCard;

const CardWrapper = styled.div`
  .card-title {
    padding-right: 55px;
  }

  .card-avatar {
    position: absolute;
    height: 50px;
    width: 50px;
    transform: translateY(-50%);
    right: 1rem;
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
