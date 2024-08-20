# College Predictor

This is a simple HTML-based college OR-CR reader with a personalized predictor based on your rank. The project's frontend uses simple HTML and Bootstrap. The backend is powered by Firebase Firestore, with data sourced from the official website's OR-CR page at [https://uptac.admissions.nic.in/](https://uptac.admissions.nic.in/).

The website data is current for 2024 and can be accessed live at [https://aktu.pages.dev/](https://aktu.pages.dev/).

To get started, ensure that you have a stable internet connection as the predictor fetches real-time data from the database. Simply enter your rank, and the predictor will provide a list of potential colleges you may qualify for based on historical data.

The probability algorithm determines the likelihood of gaining admission to a college based on your rank compared to the opening rank (OR) and closing rank (CR) from historical data. Here's a breakdown of how the algorithm works:

1. **Very High Probability**:
    - Condition: `rank/or < 0.8`
    - If your rank is 20% more than of the opening rank, the probability of admission is considered very high. The output is displayed in green.
2. **High Probability**:
    - Condition: `rank < or`
    - If your rank is less than the opening rank, but not significantly lower (i.e., not less than 80% of OR), the probability is high. The output is also displayed in green.
3. **Moderate Probability**:
    - Condition: `rank > or && rank < cr`
    - If your rank is between the opening rank and the closing rank, the probability of admission is moderate. The output is styled with a yellow color and a red text shadow.
4. **Low Probability**:
    - Condition: `rank/cr < 1.1`
    - If your rank is slightly above the closing rank (less than 10% higher), the probability is low. The output is displayed in red.
5. **Very Low Probability**:
    - Condition: `rank > cr`
    - If your rank is higher than the closing rank, the probability of admission is very low. The output is displayed in red.

This algorithm uses a series of conditional statements to categorize the probability of admission into five levels: very high, high, moderate, low, and very low, based on how your rank compares to historical data.

The College Predictor is an HTML-based tool that uses Firebase Firestore to predict college admissions based on rank. It analyzes real-time data from the official OR-CR page and categorizes admission probability into five levels: very high, high, moderate, low, and very low, depending on how a user's rank compares to historical opening and closing ranks. The predictor provides a personalized list of potential colleges and requires an internet connection to function.