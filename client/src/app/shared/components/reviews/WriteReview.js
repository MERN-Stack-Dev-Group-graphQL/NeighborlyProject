import React from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import StarRating from './StarRating';

const WriteReview = () => {
  return (
    <WriteReviewWrapper>
      <Form>
        <Form.Control type='text' name='fullname' id='fullname' placeholder='Enter your name' />
        <StarRating totalStars={5} />
        <Form.Control type='text' name='email' id='email' placeholder='john.doe@example.com' />
        <Form.Control type='text' name='title' id='title' placeholder='Give your review a title' />
        <Form.Group controlId='reviewTextArea'>
          <Form.Label>How was your overall experience?</Form.Label>
          <Form.Control as='textarea' rows='3' />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit Review
        </Button>
      </Form>
    </WriteReviewWrapper>
  );
};

export default WriteReview;

const WriteReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;

  .star-rating {
    margin-bottom: 10px;
  }

  .form-control {
    margin-bottom: 10px;
  }
`;
