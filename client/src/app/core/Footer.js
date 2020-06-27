import React from 'react';
import styled from 'styled-components';
import brandLogo from '../../assets/img/brand/brand-logo-light.svg';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='footer-content'>
              <div className='footer-category-wrapper'>
                <h4 className='heading-4'>Categories</h4>
                <ul>
                  <li>Power Tools</li>
                  <li>Handheld Tools</li>
                  <li>Safety Gears</li>
                  <li>Health & Wellness</li>
                  <li>Carpentry</li>
                  <li>Engineering</li>
                  <li>Photography</li>
                </ul>
              </div>
              <div className='footer-contact-wrapper'>
                <h4 className='heading-4'>Contact</h4>
                <ul>
                  <li>(646) 622-8635</li>
                  <li>info@neighborly.com</li>
                  <li>
                    Center City, Philadelphia
                    <br />
                    PA 19082, USA
                  </li>
                </ul>
              </div>
              <div className='footer-information-wrapper'>
                <h4 className='heading-4'>Information</h4>
                <ul>
                  <li>How does it work?</li>
                  <li>FAQs</li>
                  <li>Terms of Use</li>
                  <li>Privacy & Legal</li>
                  <li>Press</li>
                  <li>Careers</li>
                  <li>Contact Us</li>
                </ul>
              </div>
              <div className='footer-brand-wrapper'>
                <img src={brandLogo} className='footer-brand' alt='Brand' />
                <p className='lead'>We connect families to community-based services and resources.</p>
                <hr />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
            <p className='text-center foot-note'>
              Copyright &copy; 2020 - {currentYear} Neighborly Tool Rental Application. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </FooterWrapper>
  );
}

export default Footer;

const FooterWrapper = styled.div`
  position: relative;
  color: #ffffff;
  background: var(--color-secondary-dark);
  padding: 7rem 1rem 3rem 1rem;
  border-radius: 0;
  margin-top: auto;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 67%;
    z-index: 1;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 300vw 400vw;
    border-color: transparent transparent rgba(255, 255, 255, 0.05) transparent;
  }

  .footer-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .footer-category-wrapper,
    .footer-contact-wrapper,
    .footer-information-wrapper {
      padding: 1rem;

      ul {
        margin: 0;
        padding: 0;

        li {
          list-style: none;
          font-weight: 300;
          font-weight: var(--app-font-weight-300);
          line-height: 1.8;
        }
      }
    }

    .footer-category-wrapper {
    }

    .footer-contact-wrapper {
    }

    .footer-information-wrapper {
    }

    .footer-brand-wrapper {
      position: relative;
      padding: 1rem;
      max-width: 360px;
      z-index: 2;

      .footer-brand {
        max-width: 320px;
        margin-bottom: 2rem;
      }

      hr {
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }

      p {
        color: #ffffff;
        font-size: 1rem;
      }
    }
  }

  .foot-note {
    color: #ffffff;
    margin-top: 3rem;
  }
`;
