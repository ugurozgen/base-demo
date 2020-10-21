import React, { useState, useEffect } from "react"
import axios from "axios";

const Comments = (props: { lang: any; }) => {
    let currentLang = props.lang;

    const initialValue = [
        { id: 0, body: "", postId: 0 }
    ];

    const [stateOptions, setStateValues] = useState(initialValue);

    useEffect(() => {
        axios.get(`http://api.valorant.local:3000/${currentLang}`)
            .then(response => {
                setStateValues(response.data.result);
            })
    }, []);

    let htmlImplement = () => {
        return stateOptions.map((item, index) => (
            <li key={index}>
                {item.body}
            </li>
        ))
    }

    return (
        <ul style={{ display: `flex`, flexDirection: `column`, margin: `0 0 20px 0` }}>
            <p style={{ fontWeight: `bold` }}>Yorumlar:</p>
            {htmlImplement()}
        </ul>
    );
}

export default Comments;