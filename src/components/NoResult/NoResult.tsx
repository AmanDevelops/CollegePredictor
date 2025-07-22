import "./NoResult.css";

function NoResult({ goBack }: { goBack: () => void }) {
  return (
    <div className="no-results">
      <div className="no-results-content">
        <h2>No Colleges Found</h2>
        <p>
          We couldn't find any colleges matching your search criteria. Try
          adjusting your filters:
        </p>
        <ul>
          <li>Try a different category</li>
          <li>Expand your program selection</li>
          <li>Check other quotas</li>
          <li>Look at different rounds</li>
        </ul>
        <button className="back-button" onClick={goBack}>
          ← Modify Search
        </button>
      </div>
    </div>
  );
}

export default NoResult;
