import "./Instruction.css";
function Instructions() {
  return (
    <section className="instructions">
      <h2>How to Use the College Predictor</h2>
      <p>
        Our college predictor tool helps you find most suitable engineering
        colleges where you have a good chance of admission based on your JEE
        Main rank.
      </p>
      <ol>
        <li>
          <span>Select the counseling round</span> you're interested in
        </li>
        <li>
          <span>Choose your category</span> (General, OBC-NCL, SC, ST, EWS)
        </li>
        <li>
          <span>Select your quota</span> (All India, Home State, Other State)
        </li>
        <li>
          <span>Filter by programs</span> you're interested in or view all
          programs
        </li>
        <li>
          <span>Enter your JEE Main CRL rank</span>
        </li>
        <li>Click "Search Colleges" to view your results</li>
      </ol>
    </section>
  );
}

export default Instructions;
