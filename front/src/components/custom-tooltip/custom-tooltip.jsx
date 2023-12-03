import React from 'react';
import './custom-tooltip.scss';

const CustomTooltip = React.forwardRef(({ content, position, isVisible }, ref) => {
  const style = {
    top: `${position.y}px`,
    left: `${position.x}px`,
  };

  if (isVisible !== undefined) {
    style.visibility = isVisible ? 'visible' : 'hidden';
  }

  return (
    <div ref={ref} className="custom-tooltip" style={style}>
      {content}
    </div>
  );
});

export default CustomTooltip;