import { Link } from "react-router-dom";

import {
  MonthsContainer,
  MonthsWrapper,
  OneMonthPastCircle,
  ThisMonthCircleWrapper,
  ThisMonthCircle,
  OneMonthFutureCircle,
} from "./life-in-months.styles";

const LifeInMonths = () => {
  const birthDate = new Date("1997-08-26");
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const generateMonths = (startYear, startMonth, numMonths) => {
    let months = [];
    for (let i = 0; i < numMonths; i++) {
      let month = ((startMonth + i - 1) % 12) + 1;
      let year = startYear + Math.floor((startMonth + i - 1) / 12);
      months.push({ year, month });
    }
    return months;
  };

  let myMonths = generateMonths(
    birthDate.getFullYear(),
    birthDate.getMonth() + 1,
    960
  );

  return (
    <MonthsContainer>
      <h1>960 months</h1>
      <MonthsWrapper>
        {myMonths.map((month, i) => {
          if (
            month.year < currentYear ||
            (month.year === currentYear && month.month < currentMonth)
          )
            return <OneMonthPastCircle key={i} />;
          else if (month.year === currentYear && month.month === currentMonth)
            return (
              <ThisMonthCircleWrapper key={i}>
                <Link
                  to="/this-month"
                  state={{ month: month.month, year: month.year }}
                >
                  <ThisMonthCircle />
                </Link>
              </ThisMonthCircleWrapper>
            );
          else return <OneMonthFutureCircle key={i} />;
        })}
      </MonthsWrapper>
    </MonthsContainer>
  );
};

export default LifeInMonths;
