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
				return <p>Loaiding</p>
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
				<p>asdkşaksld</p>
				{renderData()}
				<p>aaaaaaaaaaaaaaaaaaaaa</p>
			</div>
		);
	}
}

export default Comments;