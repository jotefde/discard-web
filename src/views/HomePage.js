import React, {useEffect, useState} from 'react';
import TextField from 'components/organisms/TextField/TextField';

const HomePage = ({socket}) => {
    return <>
        <h1 className="test">TAKO</h1>
        <TextField roomId={1}/>
    </>
};

export default HomePage;
