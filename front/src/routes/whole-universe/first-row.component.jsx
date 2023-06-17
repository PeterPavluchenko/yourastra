import "./whole-universe.scss";

const count = 75;

const FirstRow = () => {
  return (
    <div className="first-row">
      {[...Array(count)].map((e, i) => (
        <div className="small-dot" key={i}></div>
      ))}
    </div>
  );
};

export default FirstRow;
