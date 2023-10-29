import React from 'react';
import './custom-tooltip.scss'; 

const CustomTooltip = ({ content, position }) => {
  const style = {
    top: `${position.y}px`,
    left: `${position.x}px`,
  };

  return (
    <div className="custom-tooltip" style={style}>
      {content}
    </div>
  );
};

export default CustomTooltip;
