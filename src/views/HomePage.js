import React, {useEffect, useState} from 'react';
import TextField from 'components/organisms/TextField/TextField';

const HomePage = ({socket}) => {
    return <>
        <h1 className="test">Home</h1>
        <TextField socket={socket}/>
    </>
};

export default HomePage;
