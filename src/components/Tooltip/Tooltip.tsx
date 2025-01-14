import './Tooltip.css'
import React, { FC } from 'react'

const Tooltip: FC<{ text: string; tooltip: string }> = ({text, tooltip}) => {
  return (
    <span className="tooltip__text" aria-describedby="tooltip-span">{text}
      <span id="tooltip-span" className="tooltip__span">
        {tooltip}
      </span>
    </span>
  );
};

export default Tooltip
