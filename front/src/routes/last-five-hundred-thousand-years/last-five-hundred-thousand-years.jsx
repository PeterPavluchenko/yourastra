import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
  CenturiesContainer,
  CenturiesWrapper,
  OneCenturyPastCircle,
  ThisCenturyCircleWrapper,
  ThisCenturyCircle,
  OneCenturyFutureCircle,
} from "./last-five-hundred-thousand-years.styles";

const LastFiveHundredThousandYears = () => {
  const [isFirstTwoThousandHovered, setIsFirstTwoThousandHovered] = useState(false);
  const [isBetweenTwoAndFourPointFiveThousandHovered, setIsBetweenTwoAndFourPointFiveThousandHovered] = useState(false);
  const [isBetweenFourPointFiveAndFourPointEightEightThousandHovered, setIsBetweenFourPointFiveAndFourPointEightEightThousandHovered] = useState(false);
  const [isBetweenFourPointEightEightAndFourPointNineEightThousandHovered, setIsBetweenFourPointEightEightAndFourPointNineEightThousandHovered] = useState(false);
  const [isBetweenFourPointNineEightAndFiveThousandHovered, setIsBetweenFourPointNineEightAndFiveThousandHovered] = useState(false);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentCentury = Math.floor(currentYear / 100);
  const totalPastCenturies = 5000;
  const futureCenturies = 130; 
  const totalCenturies = totalPastCenturies + futureCenturies;

  const generateCenturies = () => {
    let centuries = [];
    for (let i = 0; i < totalCenturies; i++) {
      centuries.push(i);
    }
    return centuries;
  };

  let myCenturies = generateCenturies();

  const handleMouseOver = (i) => {
    if (i < 2000) {
      setIsFirstTwoThousandHovered(true);
    }
    if (i >= 2000 && i < 4500) {
      setIsBetweenTwoAndFourPointFiveThousandHovered(true);
    }
    if (i >= 4500 && i < 4880) {
      setIsBetweenFourPointFiveAndFourPointEightEightThousandHovered(true);
    }
    if (i >= 4880 && i < 4980) {
      setIsBetweenFourPointEightEightAndFourPointNineEightThousandHovered(true);
    }
    if (i >= 4980 && i < 5000) {
      setIsBetweenFourPointNineEightAndFiveThousandHovered(true);
    }
  };

  const handleMouseOut = () => {
    setIsFirstTwoThousandHovered(false);
    setIsBetweenTwoAndFourPointFiveThousandHovered(false);
    setIsBetweenFourPointFiveAndFourPointEightEightThousandHovered(false);
    setIsBetweenFourPointEightEightAndFourPointNineEightThousandHovered(false);
    setIsBetweenFourPointNineEightAndFiveThousandHovered(false);
  };

  return (
    <CenturiesContainer>
      <h1>5,000 centuries</h1>
      <CenturiesWrapper>
        {myCenturies.map((century, i) => {
          const relativeCentury = currentCentury - totalPastCenturies + i;
          if (relativeCentury < currentCentury)
            return (
              <OneCenturyPastCircle 
                key={i}
                isHighlighted={isFirstTwoThousandHovered && i < 5000}
                isLighter={isBetweenTwoAndFourPointFiveThousandHovered && i >= 2000 && i < 5000}
                isEvenLighter={isBetweenFourPointFiveAndFourPointEightEightThousandHovered && i >= 4500 && i < 5000}
                isAlmostLightest={isBetweenFourPointEightEightAndFourPointNineEightThousandHovered && i >= 4880 && i < 5000}
                isLightest={isBetweenFourPointNineEightAndFiveThousandHovered && i >= 4980 && i < 5000}
                onMouseOver={() => handleMouseOver(i)}
                onMouseOut={handleMouseOut}
              />
            );
          else if (relativeCentury === currentCentury)
            return (
              <ThisCenturyCircleWrapper key={i}>
                <Link to="/this-century">
                  <ThisCenturyCircle />
                </Link>
              </ThisCenturyCircleWrapper>
            );
          else return <OneCenturyFutureCircle key={i} />;
        })}
      </CenturiesWrapper>
    </CenturiesContainer>
  );
};

export default LastFiveHundredThousandYears;
