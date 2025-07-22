import { MoveLeft, MoveRight } from "lucide-react";
import type { SearchFormType } from "../../types/SearchFormType";
import "./SearchResults.css";

type SearchResultsProps = {
  searchData: any;
  searchQuery: SearchFormType;
  goBack: () => void;
};

function SearchResults({
  searchData,
  searchQuery,
  goBack,
}: SearchResultsProps) {
  console.log(searchData);
  return (
    <>
      <div className="results-header">
        <h1>College Predictions</h1>
        <div className="search-summary">
          <button className="back-button" onClick={goBack}>
            <MoveLeft style={{ scale: 0.75 }} /> Back to Search
          </button>
          <div className="search-info">
            <p>Showing results for:</p>
            <div className="tags">
              <span className="tag">Round {searchQuery.round}</span>
              <span className="tag">{searchQuery.category}</span>
              <span className="tag">{searchQuery.quota}</span>
              <span className="tag">{searchQuery.branch}</span>
              <span className="tag">Rank: {searchQuery.rank}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="results-container">
        <div className="table-wrapper">
          <table className="results-table">
            <thead>
              <tr>
                <th>College</th>
                <th>Program</th>
                <th>Category</th>
                <th>Opening Rank</th>
                <th>Closing Rank</th>
                <th>Probability</th>
              </tr>
            </thead>
            <tbody>
              {searchData.map((result: any) => {
                const closingRank = Number(
                  result.document.fields.cr.integerValue
                );
                const probabilityFactor =
                  closingRank / Number(searchQuery.rank);

                let probabilityClass = "verylow";
                let probabilityText = "Very Low Probability";

                if (probabilityFactor > 0.9 && probabilityFactor < 1) {
                  probabilityClass = "low";
                  probabilityText = "Low Probability";
                } else if (probabilityFactor > 1 && probabilityFactor < 1.1) {
                  probabilityClass = "moderate";
                  probabilityText = "Moderate Probability";
                } else if (probabilityFactor > 1.1 && probabilityFactor < 1.2) {
                  probabilityClass = "high";
                  probabilityText = "High Probability";
                } else if (probabilityFactor > 1.2) {
                  probabilityClass = "veryhigh";
                  probabilityText = "Very High Probability";
                }

                console.log(result);
                return (
                  <tr>
                    <td data-label="College">
                      {result.document.fields.name.stringValue || "N/A"}
                    </td>
                    <td data-label="Program">
                      {result.document.fields.branch.stringValue || "N/A"}
                    </td>
                    <td data-label="Category">
                      {result.document.fields.category.stringValue || "N/A"}
                    </td>
                    <td data-label="Opening Rank">
                      {result.document.fields.or.integerValue || "N/A"}
                    </td>
                    <td data-label="Closing Rank">
                      {result.document.fields.cr.integerValue || "N/A"}
                    </td>
                    <td>
                      <span className={`probability ${probabilityClass}`}>
                        {probabilityText}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="pagination">
        <div className="left">
          <button className="back-button">
            <MoveLeft style={{ scale: 0.75 }} /> Previous
          </button>
        </div>
        <div className="right">
          <button className="back-button">
            Next <MoveRight style={{ scale: 0.75 }} />
          </button>
        </div>
      </div>
    </>
  );
}

export default SearchResults;
