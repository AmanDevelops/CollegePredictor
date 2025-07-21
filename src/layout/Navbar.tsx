import "./Navbar.css";

function Navbar() {
  return (
    <header>
      <script async defer src="https://buttons.github.io/buttons.js"></script>
      <div className="container header-content">
        <div className="logo">
          <span>
            UPTAC College Predictor <span className="year">2024</span>
          </span>
        </div>
        <nav>
          <a href="/" className="nav-link">
            Home
          </a>
          <div className="follow-btn">
            <a
              className="github-button follow-btn"
              href="https://github.com/amandevelops"
              data-color-scheme="no-preference: light; light: light; dark: light;"
              data-size="large"
              aria-label="Follow @amandevelops on GitHub"
            >
              Follow @amandevelops
            </a>
          </div>
          <a
            className="github-button star-button"
            href="https://github.com/amandevelops/CollegePredictor"
            data-color-scheme="no-preference: light; light: light; dark: light;"
            data-icon="octicon-star"
            data-size="large"
            aria-label="Star amandevelops/CollegePredictor on GitHub"
          >
            Star This Repo
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
