import React, { Component } from 'react';
import {
    IconSettings,
    Modal,
    Button
} from '@salesforce/design-system-react';
import CreateNewRow from '../CreateNewRow';

class ModalComponent extends Component {

    state = {
        row: {}
    };

    getFormData = (data) => {
        this.setState({row: data})
    }

	render() {
        
		return (
            <IconSettings iconPath="/assets/icons">
                <Modal
                    isOpen={this.props.isOpen}
                    footer={[
                        <Button label="Cancel" onClick={this.props.toggleOpen} />,
                        <Button label="Save" variant="brand" onClick={() => this.props.onSubmit({
                            id: this.props.data.id,
                            theme: this.state.row.theme[0] && this.state.row.theme[0].label,
                            program: this.state.row.program[0] && this.state.row.program[0].label,
                            format: this.state.row.format[0] && this.state.row.format[0].label,
                            persona: this.state.row.persona[0] && this.state.row.persona[0].label,
                            region: this.state.row.region[0] && this.state.row.region[0].label,
                            title: this.state.row.title,
                            abstract: this.state.row.abstract,
                            startDate: this.state.row.startDate,
                            endDate: this.state.row.endDate,
                            results: this.state.row.results,
                            asset: this.state.row.asset
                        })} />,
                    ]}
                    onRequestClose={this.props.toggleOpen}
                    heading={this.props.title}
                    ariaHideApp={false}
                >
                    <section className="slds-p-around_large">
                        <CreateNewRow
                            themeSelection = {this.props.data.theme}
                            programSelection = {this.props.data.program}
                            formatSelection = {this.props.data.format}
                            personaSelection = {this.props.data.persona}
                            regionSelection = {this.props.data.region}
                            title = {this.props.data.title}
                            abstract = {this.props.data.abstract}
                            startDate = {this.props.data.startDate}
                            endDate = {this.props.data.endDate}
                            results = {this.props.data.results}
                            asset = {this.props.data.asset}
                            getFormData = {this.getFormData}
                        />
                    </section>
                </Modal>
            </IconSettings>
		);
	}
};

export default ModalComponent;