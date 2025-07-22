import { CircleChevronDown, MoveLeft } from "lucide-react";
import { useState } from "react";
import type { SearchFormType } from "../../types/SearchFormType";
import "./SearchResults.css";

type SearchResultsProps = {
  searchData: any;
  searchQuery: SearchFormType;
  setSearchData: React.Dispatch<any>;
  goBack: () => void;
};

function SearchResults({
  searchData,
  searchQuery,
  setSearchData,
  goBack,
}: SearchResultsProps) {
  const [offset, setOffset] = useState<number>(0);
  const [isMore, setisMore] = useState<boolean>(searchData.length === 10);

  const filters = [
    {
      fieldFilter: {
        field: { fieldPath: "round" },
        op: "EQUAL",
        value: { stringValue: searchQuery.round.toString() },
      },
    },
    {
      fieldFilter: {
        field: { fieldPath: "category" },
        op: "EQUAL",
        value: { stringValue: searchQuery.category },
      },
    },
    {
      fieldFilter: {
        field: { fieldPath: "quota" },
        op: "EQUAL",
        value: { stringValue: searchQuery.quota },
      },
    },
    {
      fieldFilter: {
        field: { fieldPath: "cr" },
        op: "GREATER_THAN",
        value: {
          integerValue: Math.floor(Number(searchQuery.rank) * 0.8),
        },
      },
    },
  ];
  if (searchQuery.branch !== "All Programs") {
    filters.push({
      fieldFilter: {
        field: { fieldPath: "branch" },
        op: "EQUAL",
        value: { stringValue: searchQuery.branch },
      },
    });
  }

  const loadNext = async () => {
    const response = await fetch(
      "https://firestore.googleapis.com/v1/projects/uptac-2024/databases/(default)/documents:runQuery",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          structuredQuery: {
            from: [{ collectionId: "btech" }],
            where: {
              compositeFilter: {
                op: "AND",
                filters: filters,
              },
            },
            orderBy: [{ field: { fieldPath: "cr" }, direction: "ASCENDING" }],
            limit: 10,
            offset: offset + 10,
          },
        }),
      }
    );
    const data = await response.json();
    if (data.length < 10) {
      setisMore(false);
    }
    setSearchData((prev: any) => [...prev, ...data]);
    setOffset(offset + searchData.length);
  };

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
          <div className="legend">
            <h3>Probability Legend:</h3>
            <div className="legend-items">
              <div className="legend-item">
                <span className="probability-dot low"></span>
                <span>Low Probability</span>
              </div>
              <div className="legend-item">
                <span className="probability-dot moderate"></span>
                <span>Moderate Probability</span>
              </div>
              <div className="legend-item">
                <span className="probability-dot high"></span>
                <span>High Probability</span>
              </div>
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
              {searchData
                .filter((result: any) => result.document?.fields)
                .map((result: any) => {
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
                  } else if (
                    probabilityFactor > 1.1 &&
                    probabilityFactor < 1.2
                  ) {
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
        {isMore ? (
          <button className="back-button" onClick={loadNext} disabled={false}>
            <CircleChevronDown /> Load More
          </button>
        ) : (
          "That’s the end of the list—don’t worry, your future still looks bright."
        )}
      </div>
    </>
  );
}

export default SearchResults;
