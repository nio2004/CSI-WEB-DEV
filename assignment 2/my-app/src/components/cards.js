import React, { Component } from "react";
import Card from "./Card";

function shuffleCards(cards) {
    const shuffledCards = [...cards];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
    return shuffledCards;
  }

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {id: 1, img:'https://static.vecteezy.com/system/resources/previews/013/451/828/original/illustration-of-eiffel-tower-cartoon-france-famous-landmark-historical-building-vector.jpg',stat: ''},
        {id: 1, img:'https://static.vecteezy.com/system/resources/previews/013/451/828/original/illustration-of-eiffel-tower-cartoon-france-famous-landmark-historical-building-vector.jpg',stat: ''},
        {id: 2, img:"https://img.freepik.com/premium-vector/big-ben-cartoon-icon-illustration-famous-building-traveling-icon-concept-isolated-flat-cartoon-style_138676-1711.jpg",stat: ''},
        {id: 2, img:'https://img.freepik.com/premium-vector/big-ben-cartoon-icon-illustration-famous-building-traveling-icon-concept-isolated-flat-cartoon-style_138676-1711.jpg',stat: ''},
        {id: 3, img:'https://img.freepik.com/premium-vector/taj-mahal-icon-flat-isolated-ilustration-vector-building-traveling-icon-india_199064-97.jpg?w=2000',stat: ''},
        {id: 3, img:'https://img.freepik.com/premium-vector/taj-mahal-icon-flat-isolated-ilustration-vector-building-traveling-icon-india_199064-97.jpg?w=2000',stat: ''},
        {id: 4, img:'https://img.freepik.com/premium-vector/great-pyramid-giza-illustrations-landmarks-concept-white-isolated-flat-cartoon-style_75802-170.jpg',stat: ''},
        {id: 4, img:'https://img.freepik.com/premium-vector/great-pyramid-giza-illustrations-landmarks-concept-white-isolated-flat-cartoon-style_75802-170.jpg',stat: ''},
        {id: 5, img:'https://static.vecteezy.com/system/resources/previews/014/399/368/original/christ-the-redeemer-statue-cartoon-icon-illustration-famous-building-traveling-icon-concept-isolated-premium-flat-cartoon-style-vector.jpg',stat: ''},
        {id: 5, img:'https://static.vecteezy.com/system/resources/previews/014/399/368/original/christ-the-redeemer-statue-cartoon-icon-illustration-famous-building-traveling-icon-concept-isolated-premium-flat-cartoon-style-vector.jpg',stat: ''},
        {id: 6, img:'https://img.freepik.com/premium-vector/ancient-rome-landmark-italian-culture-symbol-colosseum-icon-isolated-white-background_80590-12869.jpg',stat: ''},
        {id: 6, img:'https://img.freepik.com/premium-vector/ancient-rome-landmark-italian-culture-symbol-colosseum-icon-isolated-white-background_80590-12869.jpg',stat: ''},
        {id: 7, img:'https://img.freepik.com/premium-vector/cartoon-great-wall-china_961307-1451.jpg?w=2000',stat: ''},
        {id: 7, img:'https://img.freepik.com/premium-vector/cartoon-great-wall-china_961307-1451.jpg?w=2000',stat: ''},
        {id: 8, img:'https://img.freepik.com/premium-vector/cartoon-petra-jordan_961307-1460.jpg?w=2000',stat: ''},
        {id: 8, img:'https://img.freepik.com/premium-vector/cartoon-petra-jordan_961307-1460.jpg?w=2000',stat: ''},
      ],
      prev: -1,
    };
  }

  check = (current) => {
    const { items, prev } = this.state;

    if (items[current].id === items[prev].id) {
      const updatedItems = [...items];
      updatedItems[current].stat = "correct";
      updatedItems[prev].stat = "correct";
      this.setState({ items: updatedItems, prev: -1 });
    } else {
      const updatedItems = [...items];
      updatedItems[current].stat = "wrong";
      updatedItems[prev].stat = "wrong";
      this.setState({ items: updatedItems });
      setTimeout(() => {
        updatedItems[current].stat = "";
        updatedItems[prev].stat = "";
        this.setState({ items: updatedItems, prev: -1 });
      }, 1000);
    }
  };

  handleClick = (id) => {
    const { prev, items } = this.state;

    if (prev === -1) {
      const updatedItems = [...items];
      updatedItems[id].stat = "active";
      this.setState({ items: updatedItems, prev: id });
    } else {
      this.check(id);
    }
  };

  shuffleCards = () => {
    const { items } = this.state;
    const shuffledItems = shuffleCards(items);
    this.setState({ items: shuffledItems });
  };

  componentDidMount() {
    this.shuffleCards();
  }
  
  
  render() {
    const { items } = this.state;

    return (
      <div className="container">
        {items.map((item, index) => (
          <Card key={index} item={item} id={index} handleClick={this.handleClick} />
        ))}
      </div>
    );
  }
}

export default Cards;
