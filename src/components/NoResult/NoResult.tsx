import "./NoResult.css";

function NoResult({ goBack }: { goBack: () => void }) {
  return (
    <div className="no-results">
      <div className="no-results-content">
        <h2>No Colleges Found</h2>
        <p>
          No results right now, but your college journey is just getting
          started. A few filter changes might help!
        </p>
        <ul>
          <li>Try a different category</li>
          <li>Expand your program selection</li>
          <li>Check other quotas</li>
          <li>Look at different rounds</li>
        </ul>
        <button className="back-button"  onClick={goBack}>
          ← Modify Search
        </button>
      </div>
    </div>
  );
}

export default NoResult;
