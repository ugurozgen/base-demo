import React, { Component } from "react";
import axios from "axios";

class Comments extends Component {
	constructor() {
		super();
		this.state = { data: [] };
	}

	componentDidMount() {
		axios.get(`http://api.valorant.local:3000/comments`)
			.then(response => this.setState({ data: response.data }));
	}

	render() {
		let { data } = this.state;
		let renderData = () => {
			if (!data.length) {
				return <p>Loading</p>
			} else {
				return data.map((item, index) => (
					<li key={index}>
						{item.body}: {item.id}
					</li>
				))
			}
		}
		return (
			<div>
				<p>Pellentesque justo arcu, iaculis accumsan metus ut, maximus venenatis lectus. Pellentesque mattis velit ac dui iaculis, consectetur condimentum nunc malesuada. </p>
				{renderData()}
				<p>Praesent elementum mauris leo, et dictum quam commodo maximus. Pellentesque nunc lectus, semper sit amet nunc at, laoreet sodales augue. Pellentesque non tempus quam. Integer imperdiet risus vitae odio accumsan, ut faucibus diam cursus. Curabitur at dignissim tellus. Vestibulum sed blandit urna.</p>
			</div>
		);
	}
}

export default Comments;
