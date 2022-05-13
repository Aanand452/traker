import React, { Component } from 'react'

import {

    Input,
    Button,
} from "@salesforce/design-system-react";
import "./styles.css"

class Index extends Component {

    render() {
        return (

            <div className="new-user">


                <section className="user-body">

                    <section className="form-fields">


                        <div className="row-flex">
                            <Input id="row-input" label="Name" placeholder="Name" />
                            <Input id="row-input" label="UserName" placeholder="UserName" />
                            <Input id="row-input" label="Role" placeholder="Role" />
                        </div>


                    </section>

                </section>
            </div>


        )
    }
}

export default Index;
