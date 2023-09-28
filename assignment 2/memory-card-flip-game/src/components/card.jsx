import React, { Component } from "react";
import "./card.css";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false,
    };
  }

  flipCard = () => {
    this.setState(
      (prevState) => ({
        isFlipped: !prevState.isFlipped,
      }),
      () => {
        setTimeout(() => {
          this.setState({ isFlipped: false });
          this.props.onCardClick();
        }, 3000);
      }
    );
  };

  render() {
    const { className, flipCount } = this.props;
    const { isFlipped } = this.state;

    return (
      <div
        className={`card ${className}-${isFlipped ? "flipped" : ""}`}
        onClick={this.flipCard}
      >
        <p>Flip Count: {flipCount}</p>
      </div>
    );
  }
}

export default Card;
