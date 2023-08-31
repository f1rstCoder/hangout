import React, { useState } from 'react'
import '../assets/styles/Slider.css'
import NavigateButton from './ui/Buttons/NavigateButton';
import { ChevronLeft, ChevronRight } from '../assets/icons/PostsIcons';

const Slider = ({ mediaFiles }) => {
  const [current, setCurrent] = useState(0);
  const length = mediaFiles.length;

  const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1);

  const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1);


  return (
    <div className="mediaParentDiv">
      <div className="media">
        {mediaFiles.map((media, index) => {
          if (index === current) {
            return (
              <img src={media} alt="" className='slide' key={index} />
            )
          }
        })}
      </div>
      {length > 1 &&
        <div className="navBtnDiv">
          <NavigateButton
            navigateButtonText={<ChevronLeft />}
            handleClickFunction={prevSlide}
            disablingCondition={current - 1 === -1}
          />
          <div className="imgNum">{current + 1} | {length}</div>
          <NavigateButton
            navigateButtonText={<ChevronRight />}
            handleClickFunction={nextSlide}
            disablingCondition={current + 1 === length}
          />
        </div>
      }
    </div>
  )
}

export default Slider
