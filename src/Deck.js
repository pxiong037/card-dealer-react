import React, {Component} from 'react';
import axios from 'axios';
import Card from './Card';
import './Deck.css';
const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

class Deck extends Component{
	constructor(props){
		super(props);
		this.state = {
			deckId: '',
			remaining: 0,
			cards: []
		};
		
		this.handleClick = this.handleClick.bind(this);
	}
	
	async componentDidMount(){
		let response = await axios.get(`${API_BASE_URL}/new/shuffle`);
		let data = response.data;
		console.log(data);
		this.setState({
			deckId: data.deck_id,
			remaining: data.remaining
		});
	}
	
	async handleClick(){
		try {
			let response = await axios.get(`${API_BASE_URL}/${this.state.deckId}/draw/`);
			var data = response.data;
			if(!data.success){
				throw new Error("No cards remaining");
			}
			this.setState(st => ({
				remaining: data.remaining,
				cards: [...st.cards, data.cards[0]]
			}));
		} catch(err){
			alert(err);
		}
		
	}
	
	render(){
		let cards = 
			this.state.cards.map(card => (
				<Card imgUrl={card.images.png} alt={`${card.value} of ${card.suit}`} key={card.code}/>
			));
		return(
			<div className='Deck'>
				<h1 className='Deck-title'><span role="img" aria-label="diamond">♦️</span>Card Dealer: {this.state.remaining} cards remaining<span role="img" aria-label="diamond">♦️</span></h1>
				<h2 className='Deck-title subtitle'><span role="img" aria-label="diamond">♦️</span>A little demo made with React<span role="img" aria-label="diamond">♦️</span></h2>
				<button className='Deck-btn' onClick={this.handleClick}>Gimme A Card!</button>
				<div className="Deck-card-area">{cards}</div>
			</div>
		);
	}
}

export default Deck;