import React, { Component } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

let style = {
	box: {
		textAlign: 'center',
		height: 320,
		border: "1px solid red",
		padding: 32
	},
	infinity: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr 1fr',
		gridRowGap: '32px',
		gridColumnGap: '32px'
	}
};

class Infinity extends Component {

	state = {
		data: [],
		page: 0
	};

	fetchMoreData = () => {
		this.state.page = this.state.page + 1;
		axios.get(`http://api.valorant.local:3000/comments`)
			.then(response => {
				setTimeout(() => {
					this.setState({ data: this.state.data.concat(response.data) });
				}, 1000);
			});
	};

	componentDidMount() {
		axios.get(`http://api.valorant.local:3000/comments`)
			.then(response => this.setState({ data: response.data }));
	}

	render() {
		return (
			<div>
				<InfiniteScroll
					style={style.infinity}
					dataLength={this.state.data.length}
					next={this.fetchMoreData}
					hasMore={true}
					loader={<h4>Loading...</h4>}
				>
					{this.state.data.map((item, index) => (
						<div style={style.box} key={index}>
							{item.body} - #{index + 1}
						</div>
					))}
				</InfiniteScroll>
			</div>
		);
	}
}

export default Infinity;