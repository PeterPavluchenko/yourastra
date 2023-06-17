import Header from "./universe-header.component";
import FirstRow from "./first-row.component";
import FullRow from "./full-row.component";
import LastRow from "./last-row.component";
import LastDots from "./last-dots.component";
import Prehistory from "./prehistory.component";
import History from "./history.component";
import "./whole-universe.scss";

const WholeUniverse = () => {
  const count = 184;
  return (
    <div>
      <Header />
      <FirstRow />
      {[...Array(count)].map((e, i) => (
        <FullRow key={i} />
      ))}
      <LastRow />
      <LastDots />
      <div>You are here</div>
      <Prehistory />
      <History />
    </div>
  );
};

export default WholeUniverse;
