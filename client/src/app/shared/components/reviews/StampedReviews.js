import React from 'react';
import StarCount from './StarCount';
import styled from 'styled-components';

const StampedReviews = () => {
  return (
    <StampedReviewsWrapper className='stamped-reviews'>
      <div className='stamped-review' id='stamped-review'>
        <div className='stamped-review-content'>
          <div className='stamped-review-ratings-date'>
            <div className='stamped-review-star-ratings'>
              <StarCount starCount={4} />
            </div>
            <div className='stamped-review-header'>
              <div className='created'>July 3, 2020 at 4:34 PM</div>
            </div>
          </div>
          <div className='stamped-review-body'>
            <h4 className='stamped-review-title'>No more searching</h4>
            <div className='stamped-review-author'>
              <div className='avatar'>
                <img src='http://localhost:4000/assets/img/avatar-default.png' alt='Review Author' />
              </div>
              <div className='name'>John Doe</div>
            </div>
            <div className='stamped-review-content'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste doloribus nesciunt doloremque ratione aliquid accusamus
              deserunt, animi veniam, quisquam ab temporibus dolor. Nesciunt repudiandae id obcaecati nihil dolore, ex ipsa!
            </div>
          </div>
        </div>
      </div>
    </StampedReviewsWrapper>
  );
};

export default StampedReviews;

const StampedReviewsWrapper = styled.div`
  .stamped-review {
    .stamped-review-content {
      .stamped-review-ratings-date {
        display: flex;
        align-items: center;

        .stamped-review-star-ratings {
        }

        .stamped-review-header {
          margin-left: auto;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.25);
        }
      }

      .stamped-review-body {
        .stamped-review-title {
        }

        .stamped-review-author {
          display: flex;
          align-items: center;

          .avatar {
            height: 40px;
            width: 40px;

            img {
              width: 100%;
            }
          }

          .name {
            margin-left: 10px;
          }
        }
      }
    }
  }
`;
