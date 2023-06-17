import { Link } from "react-router-dom";
import {
  YearsContainer,
  YearsWrapper,
  OneYearPastCircle,
  ThisYearCircleWrapper,
  ThisYearCircle,
  OneYearFutureCircle
} from "./life-in-years.styles";

const LifeInYears = () => {
  const yearOfBirth = 1997;

  const rangeOfYears = (start, end) =>
    Array(end - start + 1)
      .fill(start)
      .map((year, index) => year + index);

  const myYears = rangeOfYears(yearOfBirth, yearOfBirth + 79);

  const currentYear = new Date().getFullYear();

  return (
    <YearsContainer>
      <h1>80 years</h1>
      <YearsWrapper>
        {myYears.map((year, i) => {
          if (year < currentYear) return <OneYearPastCircle key={i} />;
          else if (year === currentYear)
            return (
              <ThisYearCircleWrapper>
                <Link to="/this-year" state={{ year: year }}>
                  <ThisYearCircle />
                </Link>
              </ThisYearCircleWrapper>
            );
          else return <OneYearFutureCircle key={i} />;
        })}
      </YearsWrapper>
    </YearsContainer>
  );
};

export default LifeInYears;
