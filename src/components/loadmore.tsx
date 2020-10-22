import React, { Component } from "react";
import axios from "axios";

let style = {
	box: {
		textAlign: 'center',
		height: 320,
		border: "1px solid red",
		padding: 32
	},
	loadmore: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr 1fr',
		gridRowGap: '32px',
		gridColumnGap: '32px'
	}
};

class LoadMore extends Component {

	state = {
		data: [],
		page: 1,
		size: 3,
		visible: true,
		loading: false
	};

	moreData = () => {
		this.setState({ loading: true });
		this.state.page = this.state.page + 1;
		axios.get(`http://api.valorant.local:3000/posts?page=${this.state.page}?size=${this.state.size}`)
			.then(response => {
				setTimeout(() => {
					this.setState({ data: this.state.data.concat(response.data) });
					if (this.state.page > 3) this.setState({ visible: false });
					this.setState({ loading: false });
				}, 1000);
			});
	};

	componentDidMount() {
		axios.get(`http://api.valorant.local:3000/posts?page=${this.state.page}?size=${this.state.size}`)
			.then(response => this.setState({ data: response.data }));
	}

	render() {
		return (
			<div>
				<div style={style.loadmore}>
					{this.state.data.map((item, index) => (
						<div style={style.box} key={index}>
							{item.title} - #{index + 1}
						</div>
					))}
				</div>
				{this.state.loading && <p>Loading...</p>}
				{!this.state.loading && this.state.visible && <button onClick={this.moreData}>Load more</button>}
			</div>
		);
	}
}

export default LoadMore;