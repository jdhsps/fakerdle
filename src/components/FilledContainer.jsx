const FilledContainer = (validity, i, t) => (
  <div
    className={`flip container ${validity[i]}`}
    style={{ animationDelay: `${i * 0.2}s` }}
    key={i}
  >
    {t}
  </div>
);

export default FilledContainer;