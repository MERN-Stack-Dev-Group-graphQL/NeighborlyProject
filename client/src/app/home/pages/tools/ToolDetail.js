import React from 'react';
import { TiShoppingCart } from 'react-icons/ti';
import { FaMapMarkerAlt } from 'react-icons/fa';
import styled from 'styled-components';
import ControlledTabs from '../../../shared/components/ControlledTabs';

const ToolDetail = (props) => {
  function ToolImage(path) {
    if (path.url.length > 1) {
      return <div style={{ backgroundImage: `url(http://localhost:4000${path.url})` }} className={`card-img-top ${path.className}`}></div>;
    }
    return (
      <div
        style={{ backgroundImage: `url(http://localhost:4000/assets/img/default.jpg)` }}
        className={`card-img-top ${path.className}`}
      ></div>
    );
  }

  return (
    <SectionWrapper className='container'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='page-header'>Tool Detail</div>
          <hr />
          <div id='tool-detail' className='mb-4'>
            <div id='leftCol'>
              <div className='feature-image'>
                <ToolImage url={props.url} className='tool-thumb' />
              </div>
            </div>
            <div id='centerCol' className='px-3'>
              <h3 className='tool-header'>{props.title}</h3>
              <div className='tool-sub-header'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, consequuntur.</div>
              <div className='tool-description'>{props.description}</div>
              <div className='tool-footer mt-auto'>
                <div className='owner mr-4'>
                  <span className='owner-avatar'>
                    <img src='http://localhost:4000/assets/img/avatar-default.png' alt='Owner Avatar' />
                  </span>
                  <span className='owner-name'>John Doe</span>
                </div>
                <div className='location'>
                  <FaMapMarkerAlt className='mr-1' /> <span>Pine Street, Center City</span>
                </div>
              </div>
            </div>
            <div id='rightCol'>
              <div className='price-wrapper'>
                <h2 className='price'>$40.00</h2>
              </div>
              <ul className='other-details'>
                <li className='make'>
                  <span>Make: </span>
                  {props.make}
                </li>
                <li className='model'>
                  <span>Model: </span>
                  {props.model}
                </li>
                <li className='weight'>
                  <span>Weight: </span>
                  {props.weight}
                </li>
              </ul>
              <button className='btn btn-primary'>
                <TiShoppingCart className='mb-1 mr-1' /> Add to Cart
              </button>
            </div>
          </div>
          <ControlledTabs />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ToolDetail;

const SectionWrapper = styled.section`
  padding: 4rem 1rem;

  #tool-detail {
    display: flex;

    #leftCol {
      .feature-image {
        position: relative;
        display: block;
        height: 440px;
        width: 100%;
        min-width: 400px;
        max-width: 480px;

        &::before {
          display: block;
          background: #000;
          content: '';
          width: 100%;
          padding-top: 69.75764%;
        }

        .tool-thumb {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-position: 50%;
          background-size: cover;
          transition: opacity 0.5s ease;
          opacity: 1;
        }
      }
    }

    #centerCol {
      display: flex;
      flex-direction: column;

      .tool-header {
        position: relative;
        border-bottom: 1px solid #f2f2f2;
        padding-bottom: 1rem;

        &::after {
          content: '';
          height: 3px;
          background: var(--color-primary);
          width: 100px;
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 1;
        }
      }

      .tool-sub-header {
        font-size: 1.3rem;
        margin-bottom: 1rem;
      }

      .tool-description {
      }

      .tool-footer {
        display: flex;

        .owner,
        .location {
          display: flex;
          align-items: center;
        }

        .owner {
          .owner-avatar {
            display: block;
            width: 30px;
            height: 30px;
            margin-right: 10px;
            border-radius: 15px;
            overflow: hidden;

            img {
              height: 100%;
              width: 100%;
            }
          }

          .owner-name {
          }
        }

        .location {
        }
      }
    }

    #rightCol {
      min-width: 220px;

      .price-wrapper {
        .price {
          font-weight: 700;
          position: relative;
          overflow: hidden;

          &::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 80%;
            z-index: 1;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 0 300vw 400vw;
            border-color: transparent transparent rgba(0, 0, 0, 0.05) transparent;
          }
        }
      }

      .other-details {
        span {
          display: inline-block;
          font-weight: bold;
          min-width: 80px;
        }
      }

      ul {
        padding-left: 1rem;
        list-style: none;

        .make,
        .model,
        .weight {
        }
      }

      .btn-primary {
        text-transform: uppercase;
      }
    }
  }

  .tab-pane {
    padding: 1rem;
  }
`;
