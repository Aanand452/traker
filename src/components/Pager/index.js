import React from 'react';
import {
    ButtonGroup,
    Button
} from '@salesforce/design-system-react';


const Pager = () => (
    <ButtonGroup>
        <Button label="Prev" />
        <Button label="1" inverse />
        <Button label="2" />
        <Button label="3" inverse />
        <Button label="4" inverse />
        <Button label="Next" />
    </ButtonGroup>
);

export default Pager;