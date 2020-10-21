import React from "react";
import iconPlay from "../../images/icon-play.png"
import iconVideo from "../../images/icon-video.png"
import iconTag from "../../images/icon-tag.png"
import iconStar from "../../images/icon-star.png"
import iconPreview from "../../images/icon-preview.png"

export default function banner() {
  return (
    <section className="home-banner">
      <div className="home-banner__content content-wrapper">
        <div className="home-banner__text-content">
          <span className="home-banner__small-text">CONTENT CREATION</span>
          <h1 className="home-banner__title">CREATE & EARN REWARDS!</h1>
          <p className="home-banner__text">Submit your own content to receive Rewars!</p>
        </div>

        <a href="#" className="home-banner__watch">
          <div className="home-banner__watch__icon">
            <img src={iconPlay} />
          </div>
          <span>WATCH OUR VIDEO</span>
        </a>

        <div className="home-banner__steps">
          <h6 className="home-banner__steps__title">SUBMISSION STEPS</h6>

          <div className="home-banner__steps__content">

            <div className="home-banner__steps__item">
              <div className="home-banner__steps__icon">
                <img src={iconVideo} />
              </div>
              <div className="home-banner__steps__text">
                <span className="home-banner__steps__key">STEP 1</span>
                <span className="home-banner__steps__val">CONTENT TYPE</span>
              </div>
            </div>

            <div className="home-banner__steps__line"></div>

            <div className="home-banner__steps__item">
              <div className="home-banner__steps__icon">
                <img src={iconTag} />
              </div>
              <div className="home-banner__steps__text">
                <span className="home-banner__steps__key">STEP 2</span>
                <span className="home-banner__steps__val">SUBMISSION DETAILS</span>
              </div>
            </div>

            <div className="home-banner__steps__line"></div>

            <div className="home-banner__steps__item">
              <div className="home-banner__steps__icon">
                <img src={iconStar} />
              </div>
              <div className="home-banner__steps__text">
                <span className="home-banner__steps__key">STEP 3</span>
                <span className="home-banner__steps__val">POTENTIAL REWARD</span>
              </div>
            </div>

            <div className="home-banner__steps__line"></div>

            <div className="home-banner__steps__item">
              <div className="home-banner__steps__icon">
                <img src={iconPreview} />
              </div>
              <div className="home-banner__steps__text">
                <span className="home-banner__steps__key">STEP 3</span>
                <span className="home-banner__steps__val">PREVIEW & SUBMIT</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="home-banner__shape"></div>
    </section>
  );
}
