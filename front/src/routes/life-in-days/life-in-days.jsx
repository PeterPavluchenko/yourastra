import { Link } from "react-router-dom";
import {
  DaysContainer,
  DaysWrapper,
  OneDayPastCircle,
  ThisDayCircleWrapper,
  ThisDayCircle,
  OneDayFutureCircle,
} from "./life-in-days.styles";

const LifeInDays = () => {
  const birthDate = new Date("1997-08-26");
  const endOfLifeDate = new Date(birthDate);
  endOfLifeDate.setFullYear(birthDate.getFullYear() + 80); // 80 years from birth
  const currentDate = new Date();

  const daysSinceBirth = Math.floor(
    (currentDate - birthDate) / (24 * 60 * 60 * 1000)
  );

  const totalDays = Math.floor(
    (endOfLifeDate - birthDate) / (24 * 60 * 60 * 1000)
  );

  const generateDays = () => {
    let days = [];
    for (let i = 0; i < totalDays; i++) {
      days.push(i);
    }
    return days;
  };

  let myDays = generateDays();

  return (
    <DaysContainer>
      <h1>{totalDays} days</h1>
      <DaysWrapper>
        {myDays.map((day, i) => {
          if (i < daysSinceBirth)
            return <OneDayPastCircle key={i} />;
          else if (i === daysSinceBirth)
            return (
              <ThisDayCircleWrapper key={i}>
                <Link to="/this-day">
                  <ThisDayCircle />
                </Link>
              </ThisDayCircleWrapper>
            );
          else return <OneDayFutureCircle key={i} />;
        })}
      </DaysWrapper>
    </DaysContainer>
  );
};

export default LifeInDays;
