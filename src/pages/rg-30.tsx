import React from "react";
import Infinity from "../components/infinity";
import LoadMore from "../components/loadmore";

let style = {
	display: 'grid',
	gridTemplateColumns: '1fr 1fr',
	gridRowGap: '132px',
	gridColumnGap: '132px'
};

const Rg30 = () => (
	<div style={style}>
		<div>
			<Infinity />
		</div>
		<div>
			<LoadMore />
		</div>
	</div>
);

export default Rg30;
