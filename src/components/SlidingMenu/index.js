import React, { Component,} from "react";
import { withRouter } from 'react-router-dom';
import { Button} from "@salesforce/design-system-react";
import { slide as Menu } from 'react-burger-menu'

class SlidingMenu extends Component {

    render() {
        return (
            <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } 
                isOpen={ this.props.isMenuOpen}
                width={ '280px' }>

                    <Button>Krishna</Button>

            </Menu>
        )
    }

}

export default withRouter(SlidingMenu);