import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const question = "Which is your favorite programming language?";
  const options = ["JavaScript", "Python", "Java", "Go"];

  // Initial votes, can be empty or have default votes
  const [votes, setVotes] = useState([5, 3, 2, 1]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalVotes = votes.reduce((acc, curr) => acc + curr, 0);

  const handleOptionChange = (index) => {
    setSelectedOption(index);
  };

  const handleVote = () => {
    if (selectedOption === null) {
      alert("Please select an option before submitting!");
      return;
    }
    const updatedVotes = [...votes];
    updatedVotes[selectedOption]++;
    setVotes(updatedVotes);
    setIsSubmitted(true);
  };

  return (
    <div className="poll-widget">
      <h2>{question}</h2>

      {!isSubmitted ? (
        <div className="options">
          {options.map((option, index) => (
            <label key={index} className="option">
              <input
                type="radio"
                name="poll"
                value={index}
                onChange={() => handleOptionChange(index)}
              />
              {option}
            </label>
          ))}
          <button onClick={handleVote} className="submit-btn">
            Submit Vote
          </button>
        </div>
      ) : (
        <div className="results">
          {options.map((option, index) => {
            const percent = ((votes[index] / totalVotes) * 100).toFixed(1);
            return (
              <div key={index} className="result-item">
                <div className="result-title">
                  {option} - {percent}%
                </div>
                <div className="result-bar">
                  <div
                    className="bar-fill"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
          <div className="total-votes">Total Votes: {totalVotes}</div>
        </div>
      )}
    </div>
  );
}
