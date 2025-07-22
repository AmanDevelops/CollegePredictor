import { useState } from "react";
import type { SearchFormType } from "../../types/SearchFormType";
import "./SearchForm.css";

const categoryValues: string[] = [
  "OPEN",
  "OPEN(TF)",
  "OPEN(GIRL)",
  "SC",
  "BC(AF)",
  "BC",
  "EWS(OPEN)",
  "OPEN(AF)",
  "EWS(GL)",
  "BC(Girl)",
  "SC(AF)",
  "OPEN(PH)",
  "SC(Girl)",
  "ST",
  "ST(Girl)",
  "SC(PH)",
  "EWS(AF)",
  "BC(PH)",
  "EWS(PH)",
  "OPEN(FF)",
  "BC(FF)",
];

const fwBranches: string[] = [
  "Computer Science and Engineering (FW)",
  "Computer Science And Engineering(Artificial Intelligence & Machine Learning) (FW)",
  "Electronics and Communication Engineering (FW)",
  "Information Technology (FW)",
  "Computer Science And Engineering(Data Science) (FW)",
  "Computer Science & Engineering (Cyber Security) (FW)",
  "Computer Science And Engineering(Internet Of Things) (FW)",
  "Artificial Inelligence (AI) And Data Science (FW)",
  "Mechanical Engineering (FW)",
  "Computer Science and Engineering (Artificial Intelligence) (FW)",
  "Computer Science Information Technology (FW)",
  "Electrical Engineering (FW)",
  "Electronics Engineering (FW)",
  "Civil Engineering (FW)",
  "Computer Science (FW)",
  "Computer Science And Design (FW)",
  "Computer Science (Hindi) (FW)",
  "Computer Science And Business System (FW)",
  "Electrical & Electronics Engineering (FW)",
  "Artificial Intelligence And Machine Learning (FW)",
  "Computer Science and Engineering(Self Finance) (FW)",
  "Chemical Engineering (FW)",
  "Industrial Production Engineering (FW)",
  "Instrumentation and Control Engineering (FW)",
  "Electronics and Communication (Advanced Communication Technology) (FW)",
  "Electronics Engineering (VLSI Design and Technology) (FW)",
  "Electronic And Computer Engineering (FW)",
  "Plastic Engineering (FW)",
  "Electrical & Computer Engg. (FW)",
];

const nonFwBranches: string[] = [
  "Electronics and Communication Engineering",
  "Computer Science and Engineering",
  "Electronics & Instrumentation Engineering",
  "Electrical Engineering",
  "Information Technology",
  "Renewable Engineering",
  "Mechanical Engineering",
  "Computer Science And Engineering(Artificial Intelligence & Machine Learning)",
  "Computer Science and Engineering (Data Science)",
  "Civil Engineering",
  "Textile Chemistry",
  "Textile Engineering",
  "Textile Technology",
  "Man Made Fibre Technology",
  "Computer Science And Engineering(Internet Of Things)",
  "Computer Science & Engineering (Cyber Security)",
  "Computer Science and Engineering (Artificial Intelligence)",
  "Electrical & Electronics Engineering",
  "Computer Science And Design",
  "Artificial Inelligence (AI) And Data Science",
  "Bio Medical Engineering",
  "Artificial Intelligence And Machine Learning",
  "Computer Science Information Technology",
  "Electronics Engineering",
  "Mining Engineering",
  "Food Technology",
  "Chemical Engineering",
  "Computer Science",
  "Electronic And Computer Engineering",
  "Computer Science (Hindi)",
  "M Tech (Integrated) Computer Science and Engineering",
  "Electronics Engineering (VLSI Design and Technology)",
  "Computer Science and Engineering (Collaboration & Twining Program)",
  "Computer Science And Engineering(Artificial Intelligence & Machine Learning)(Collaboration & Twining Program)",
  "Information Technology (Collaboration & Twining Program)",
  "Computer Science and Engineering (Artificial Intelligence)(Collaboration & Twining Program)",
  "Computer Science And Business System",
  "Computer Engineering And Information Technology",
  "Data Sciences",
  "Cyber Security",
  "Electronics and Telecommunication Engineering",
  "Computer Science & Engineering (Artificial Intelligence)",
  "Computer Science & Engineering (Artificial Intelligence & data Science)",
  "Automotion & Robotics",
  "Electrical & Computer Engg.",
  "Computer Engineering",
  "Bioinformatics",
  "Automobile Engineering",
  "Electronics and Communication (Advanced Communication Technology)",
  "Computer Science and Engineering(Self Finance)",
  "Instrumentation and Control Engineering",
  "Industrial Production Engineering",
  "Handloom & Textile Technology",
  "Carpet & Textile Technology",
  "Aeronautical Engineering",
  "Computer Science & Engineering (AI & Finance Managemnet)",
  "Manufacturing Technology",
  "Plastic Engineering",
  "Food Engineering & technology",
];

const quotaValues: string[] = ["Home State", "All India"];

type SearchFormProps = {
  handleSearch: (searchValue: SearchFormType) => void;
  searchValue: SearchFormType;
};

function SearchForm({ handleSearch, searchValue }: SearchFormProps) {
  const [formData, setformData] = useState<SearchFormType>(searchValue);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData) handleSearch(formData);
  };

  return (
    <section className="predictor-form">
      <div className="form-header">
        <h2>UPTAC B.Tech. JEE College Predictor</h2>
      </div>

      <form onSubmit={handleFormSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="round">Select Round</label>
            <select
              onChange={(e) =>
                setformData((prev) => ({
                  ...prev,
                  round: Number(e.target.value),
                }))
              }
              value={formData.round}
              required
            >
              {Array.from({ length: 4 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Round {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="category">Select Category</label>
            <select
              onChange={(e) =>
                setformData((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
              value={formData.category}
              required
            >
              {categoryValues.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="quota">Select Quota</label>
            <select
              onChange={(e) =>
                setformData((prev) => ({
                  ...prev,
                  quota: e.target.value,
                }))
              }
              value={formData.quota}
              required
            >
              {quotaValues.map((quotaValue) => (
                <option key={quotaValue} value={quotaValue}>
                  {quotaValue}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="branch">Programs</label>
            <select
              onChange={(e) =>
                setformData((prev) => ({
                  ...prev,
                  branch: e.target.value,
                }))
              }
              value={formData.branch}
              required
            >
              <option value="All Programs">All Programs</option>

              {(formData.category === "OPEN(TF)"
                ? fwBranches
                : nonFwBranches
              ).map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="rank">Mains CRL Rank</label>
          <input
            type="number"
            placeholder="Enter your JEE Mains rank"
            value={formData.rank}
            onChange={(e) =>
              setformData((prev) => ({
                ...prev,
                rank:
                  Number(e.target.value) <= 0 ? "" : Number(e.target.value),
              }))
            }
            required
          />
        </div>

        <button type="submit" className="search-button">
          Search Colleges
        </button>
      </form>
    </section>
  );
}

export default SearchForm;
