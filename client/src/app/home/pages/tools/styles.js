import styled from 'styled-components';

export const SectionWrapper = styled.section`
  padding: 4rem 1rem;
  max-width: 1440px;
  margin: 0 auto;

  .review-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
  }

  .location-map-container {
    position: relative;
    margin-bottom: 3rem;

    .map-header {
      position: absolute;
      background: var(--color-primary);
      color: #fff;
      font-size: 1rem;
      top: 6px;
      left: 6px;
      height: 36px;
      line-height: 36px;
      padding: 0 1rem;
      margin: 0;
      border-radius: 18px;
      z-index: 2;
    }
  }

  #tool-detail {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-auto-rows: minmax(100px, auto);
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;

    grid-template-areas:
      'leftcol leftcol leftcol leftcol leftcol centercol centercol centercol centercol'
      'leftcol leftcol leftcol leftcol leftcol centercol centercol centercol centercol'
      'leftcol leftcol leftcol leftcol leftcol centercol centercol centercol centercol'
      'leftcol leftcol leftcol leftcol leftcol centercol centercol centercol centercol'
      'leftcol leftcol leftcol leftcol leftcol bottomcol bottomcol bottomcol bottomcol';

    #leftCol,
    #centerCol,
    #bottomCol {
      background: #fff;
      padding: 1rem;
    }

    #leftCol {
      grid-area: leftcol;
      padding: 0;

      .feature-image {
        position: relative;
        display: block;
        overflow: hidden;
        width: 100%;

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

      .price-wrapper {
        display: flex;
        position: relative;
        align-items: center;
        margin-bottom: 1rem;
        overflow: hidden;

        &::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 85%;
          z-index: 1;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 0 30vw 40vw;
          border-color: transparent transparent rgba(0, 0, 0, 0.05) transparent;
        }

        .price {
          font-size: 2.5rem;
          font-weight: bold;
          letter-spacing: -2px;
          margin-bottom: 0;
          margin-right: 1rem;
        }

        .per-unit {
          color: rgba(0, 0, 0, 0.5);
        }
      }

      .other-recommendations {
        .title {
          font-weight: 700;
        }

        .content {
        }
      }

      .other-details {
        span {
          display: inline-block;
          font-weight: 600;
          min-width: 80px;
        }
      }

      ul {
        padding-left: 1rem;
        margin-bottom: 2rem;
        list-style: none;

        li {
          margin-bottom: 10px;
        }

        .make,
        .model,
        .weight {
        }
      }

      .btn-primary {
        text-transform: uppercase;
      }
    }

    #centerCol {
      grid-area: centercol;

      .tool-header {
        position: relative;
        border-bottom: 1px solid #f2f2f2;
        padding-bottom: 1rem;

        &::after {
          content: '';
          height: 3px;
          background: var(--color-primary);
          width: 220px;
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

      .review-btn {
        font-size: 14px;
      }

      .tool-description {
        margin-bottom: 3rem;
      }

      .tool-footer {
        display: flex;
        margin-bottom: 1rem;

        .owner,
        .location {
          display: flex;
          align-items: center;
        }

        .owner {
          margin-right: 1rem;

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
          svg {
            color: var(--color-primary);
          }
        }
      }
    }

    #bottomCol {
      grid-area: bottomcol;

      .nav-tabs {
        .nav-link.active {
          border: none;
          border-bottom: 4px solid var(--color-primary);
        }
      }
    }
  }

  #recommendation-container {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-auto-rows: minmax(100px, auto);

    grid-template-areas:
      'recocol recocol recocol recocol recocol recocol recocol advertcol advertcol'
      'recocol recocol recocol recocol recocol recocol recocol advertcol advertcol';

    .recommendation-wrapper {
      grid-area: recocol;
      display: flex;

      .recommended-item {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #ffffff;
        min-height: 100px;
        width: 25%;
        margin: 4px;
      }
    }

    .advertisment {
      grid-area: advertcol;

      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      background-color: var(--color-secondary-dark);
      min-height: 100px;
      width: 100%;
      margin: 4px;
    }
  }

  .tab-pane {
    padding: 1rem;
  }
`;
