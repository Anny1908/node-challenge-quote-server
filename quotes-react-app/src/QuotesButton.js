import React from "react";

const QuotesButton = props => {
    return (
      <button className="btn btn-primary" onClick={props.clickMe}>
        Add
      </button>
    );
  };

  export default QuotesButton;