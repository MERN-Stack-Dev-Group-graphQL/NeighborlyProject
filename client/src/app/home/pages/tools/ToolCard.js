import React from 'react';
import moment from 'moment';
import Card from 'react-bootstrap/Card';
import { BsBookmarkPlus, BsHeart, BsPlus } from 'react-icons/bs';
import MoreDetailsButton from '../../../shared/components/Buttons/MoreDetailsButton';
import StarCount from '../../../shared/components/reviews/StarCount';
import Avatar from '../../../shared/components/Avatar';
import styled from 'styled-components';

function ToolCard({ tool }) {
  function CardImage(path) {
    if (path.url.length > 1) {
      return <img src={`http://localhost:4000${path.url}`} alt={tool.title} className='card-img-top' />;
    }
    return <img src='http://localhost:4000/assets/img/default.jpg' alt={tool.title} className='card-img-top' />;
  }

  const toolId = tool._id;
  const starCount = 4;
  const rateCount = 252;
  const avatar = {
    styles: {
      position: 'absolute',
      height: '50px',
      width: '50px',
      borderRadius: '25px',
      transform: ['translateY(-85%)'],
      right: '1rem',
    },
    url: 'https://randomuser.me/api/portraits/men/1.jpg',
  };

  if (tool) {
  }

  return (
    <CardWrapper className='col-md-4'>
      <Card className='mb-5'>
        <div className='card-image-wrapper'>
          <CardImage url={tool.url} />

          <div className='actionBar'>
            <div className='like-tool' onClick={() => {}}>
              <BsHeart />
            </div>
            <div className='save-tool' onClick={() => {}}>
              <BsBookmarkPlus />
            </div>
            <div className='add-to-cart' onClick={() => {}}>
              <BsPlus />
            </div>
          </div>
        </div>

        <Card.Body>
          <Avatar avatar={avatar} />
          <Card.Title>{tool.title}</Card.Title>
          <StarCount starCount={starCount} rateCount={rateCount} />
          {<small className='text-muted d-block'>Posted {moment(tool.createdAt).fromNow(true)} ago</small>}
        </Card.Body>
        <Card.Footer className='d-flex align-items-center'>
          <div className='price-wrapper'>
            <h2 className='price'>{tool.price}</h2>
            <div className='per-unit'>{`/ per ${tool.unitOfMeasure}`}</div>
          </div>
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

  .actionBar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: absolute;
    top: 10px;
    right: 10px;

    .like-tool,
    .save-tool,
    .add-to-cart {
      display: flex;
      text-align: center;
      color: var(--color-light);
      width: 40px;
      height: 40px;
      margin-left: 5px;
      border-radius: 20px;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.85);
      transition: 0.2s ease-in;

      &:hover {
        background-color: var(--color-primary-light);
      }
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
    border-radius: 25px;
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

  .price-wrapper {
    display: flex;
    position: relative;
    align-items: center;
    overflow: hidden;

    .price {
      font-size: 2rem;
      font-weight: bold;
      letter-spacing: -2px;
      margin-bottom: 0;
      margin-right: 10px;
    }

    .per-unit {
      color: rgba(0, 0, 0, 0.5);
    }
  }
`;
