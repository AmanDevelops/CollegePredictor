import { useState } from "react";
import "./App.css";
import Hero from "./components/Hero/Hero";
import Instructions from "./components/Instructions/Instructions";
import NoResult from "./components/NoResult/NoResult";
import SearchForm from "./components/SearchForm/SearchForm";
import Navbar from "./layout/Navbar";
import type { SearchFormType } from "./types/SearchFormType";

function App() {
  const [isSearched, setisSearched] = useState<boolean>(false);
  const [searchValue, setsearchValue] = useState<SearchFormType>({
    round: 1,
    category: "Select Category",
    quota: "Home State",
    branch: "allprograms",
    rank: "",
  });

  const handleSearch = async (searchValueInput: SearchFormType) => {
    if (!searchValueInput) {
      return;
    }

    setsearchValue(searchValueInput);

    const filters = [
      {
        fieldFilter: {
          field: { fieldPath: "round" },
          op: "EQUAL",
          value: { stringValue: searchValue.round.toString() },
        },
      },
      {
        fieldFilter: {
          field: { fieldPath: "category" },
          op: "EQUAL",
          value: { stringValue: searchValue.category },
        },
      },
      {
        fieldFilter: {
          field: { fieldPath: "quota" },
          op: "EQUAL",
          value: { stringValue: searchValue.quota },
        },
      },
      {
        fieldFilter: {
          field: { fieldPath: "cr" },
          op: "GREATER_THAN",
          value: {
            integerValue: Math.floor(Number(searchValue.rank) * 0.8),
          },
        },
      },
    ];

    if (searchValue.branch === "All Programs") {
      filters.push({
        fieldFilter: {
          field: { fieldPath: "branch" },
          op: "EQUAL",
          value: { stringValue: searchValue?.branch },
        },
      });
    }

    console.log(filters);

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
            offset: 0,
          },
        }),
      }
    );

    const data = await response.json();
    console.log(data);

    if (data) {
      setisSearched(true);
    }
  };

  const goBack = () => {
    setisSearched(false);
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="container">
          {!isSearched ? (
            <>
              <Hero />
              <SearchForm
                handleSearch={handleSearch}
                searchValue={searchValue}
              />
              <Instructions />
            </>
          ) : (
            <NoResult goBack={goBack} />
          )}
        </div>
      </main>
    </>
  );
}

export default App;
