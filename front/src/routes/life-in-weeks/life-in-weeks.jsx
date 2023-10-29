import { Link } from "react-router-dom";
import {
  WeeksContainer,
  WeeksWrapper,
  OneWeekPastCircle,
  ThisWeekCircleWrapper,
  ThisWeekCircle,
  OneWeekFutureCircle,
} from "./life-in-weeks.styles";

const LifeInWeeks = () => {
  const birthDate = new Date("1997-08-26");
  const currentDate = new Date();
  const totalWeeks = 4174;

  const weeksSinceBirth = Math.floor(
    (currentDate - birthDate) / (7 * 24 * 60 * 60 * 1000)
  );

  const generateWeeks = () => {
    let weeks = [];
    for (let i = 0; i < totalWeeks; i++) {
      weeks.push(i);
    }
    return weeks;
  };

  let myWeeks = generateWeeks();

  return (
    <WeeksContainer>
      <h1>4174 weeks</h1>
      <WeeksWrapper>
        {myWeeks.map((week, i) => {
          if (i < weeksSinceBirth)
            return <OneWeekPastCircle key={i} />;
          else if (i === weeksSinceBirth)
            return (
              <ThisWeekCircleWrapper key={i}>
                <Link to="/this-week">
                  <ThisWeekCircle />
                </Link>
              </ThisWeekCircleWrapper>
            );
          else return <OneWeekFutureCircle key={i} />;
        })}
      </WeeksWrapper>
    </WeeksContainer>
  );
};

export default LifeInWeeks;
