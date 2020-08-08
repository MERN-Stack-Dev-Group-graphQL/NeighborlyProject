import React, { Fragment, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_TOOLS_QUERY } from '../../../util/graphql';
import ToolCard from './tools/ToolCard';
import Carousel from 'react-bootstrap/Carousel';
// Assets
import videoOne from '../../../assets/videos/video1.mp4';
import videoTwo from '../../../assets/videos/video2.mp4';
// Styles
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Avatar from '../../temp/Avatar';

function Home() {
  const { loading, data } = useQuery(FETCH_TOOLS_QUERY);
  // console.log('Home', data);

  const onClickHandler = (event) => event.preventDefault();

  const [avatar, setAvatar] = useState({
    styles: {
      position: 'absolute',
      height: '75px',
      width: '75px',
      transform: 'translate(-35px, -45px)',
    },
    url: 'https://randomuser.me/api/portraits/men/1.jpg',
  });

  return (
    <Fragment>
      <CarouselWrapper>
        <div className='page-header__title'>
          <h1>Rent amazing tools shared and cared for by your neighbors.</h1>
          <div className='cta-wrapper'>
            <Link to='/tools' className='btn btn-outline-primary btn-lg carousel-cta'>
              Explore Tools
            </Link>
            <Link to='/dashboard/add-tool' className='btn btn-outline-primary btn-lg carousel-cta'>
              List Tools
            </Link>
          </div>
        </div>
        <Carousel fade={true}>
          <Carousel.Item>
            <video className='page-header__bg-video' poster='true' playsInline autoPlay muted loop>
              <source src={videoOne} type='video/mp4' />
            </video>
          </Carousel.Item>
          <Carousel.Item>
            <video className='page-header__bg-video' poster='true' playsInline autoPlay muted loop>
              <source src={videoTwo} type='video/mp4' />
            </video>
          </Carousel.Item>
        </Carousel>
      </CarouselWrapper>
      <CategoryWrapper>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='page-title my-5'>
                {/* <Avatar avatar={avatar} /> */}
                <h1>Featured Categories</h1>
              </div>
              <ul className='nav nav-category-wrapper justify-content-center mb-4'>
                <li className='nav-item'>
                  <a className='nav-link active' href='/' onClick={onClickHandler}>
                    All
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='/' onClick={onClickHandler}>
                    Power Tools
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='/' onClick={onClickHandler}>
                    Handheld Tools
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='/' onClick={onClickHandler}>
                    Safety Gears
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='/' onClick={onClickHandler}>
                    Health & Wellness
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='/' onClick={onClickHandler}>
                    Carpentry
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='/' onClick={onClickHandler}>
                    Engineering
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='row'>
            {loading ? (
              <h1>Loading tools...</h1>
            ) : (
              data.getTools.edges && data.getTools.edges.map((tool) => <ToolCard tool={tool} key={tool._id} />)
            )}
          </div>
        </div>
      </CategoryWrapper>
    </Fragment>
  );
}

export default Home;

const CarouselWrapper = styled.div`
  position: relative;

  &::before {
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0, transparent), to(#000));
    background: linear-gradient(180deg, transparent 0.75, #000);
    background: linear-gradient(180deg, rgb(23, 162, 184), #12244d);
    height: 100%;
    width: 100%;
    bottom: 0;
    content: '';
    display: block;
    position: absolute;
    opacity: 0.75;
    -webkit-transition: opacity ease-in-out 0.5s;
    transition: opacity ease-in-out 0.5s;
    z-index: 2;
  }

  .carousel-item {
    height: 60vh;
    min-height: 480px;
  }

  .carousel-item img {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 600px;
  }

  .carousel-caption {
    bottom: 50%;
    transform: translateY(50%);
  }

  .carousel-control-prev,
  .carousel-control-next {
    z-index: 3;
  }

  .page-header__title {
    position: absolute;
    color: #fff;
    text-align: center;
    right: 15%;
    bottom: 50%;
    left: 15%;
    transform: translateY(50%);
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10;

    h1 {
      font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
      font-size: 3rem;
      font-weight: 700;
      line-height: 1.15;
      letter-spacing: -1px;
      text-transform: uppercase;
      max-width: 720px;
      width: 100%;
    }
  }

  .carousel-cta {
    height: 60px;
    line-height: 60px;
    padding: 0 2rem;
    margin: 2rem 1rem;
    color: var(--color-light);
    border-color: var(--color-light);

    &:hover {
      border-color: var(--color-primary);
    }
  }

  .page-header__scroll-arrow {
    position: absolute;
    bottom: 4rem;
    left: 50%;
    z-index: 999;
    margin-left: -11px;
    display: block;
  }
`;

const CategoryWrapper = styled.div`
  .nav-category-wrapper {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);

    .nav-item {
      min-width: 80px;
      text-align: center;
    }

    .nav-link {
      padding: 1rem;
    }

    .active {
      border-bottom: 4px solid var(--color-primary);
    }
  }
`;
