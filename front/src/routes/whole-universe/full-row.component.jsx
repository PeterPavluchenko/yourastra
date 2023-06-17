import "./whole-universe.scss";

const count = 149;

const FullRow = () => {
  return (
    <div className="full-row">
      {[...Array(count)].map((e, i) => (
        <div key={i} className="small-dot"></div>
      ))}
    </div>
  );
};

export default FullRow;
