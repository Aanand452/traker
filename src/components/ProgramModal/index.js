import React, { Component } from 'react';
import { getAPIUrl } from '../../config/config';
import { getCookie } from '../../utils/cookie';

import {
  IconSettings,
  Modal,
  Button,
  Combobox,
  Input,
  Textarea,
  ToastContainer,
  Toast,
  comboboxFilterAndLimit
} from '@salesforce/design-system-react';

import BudgetInput from '../BudgetInput/BudgetInput'
import Prompt from '../Prompt';


class EditProgramModalComponent extends Component {

  state = {
    regions: [],
    lifecycleStages: [],
    apm1s: [],
    apm2s: [],
    industries: [],
    segments: [],
    personas: [],
    program: {

    },
    error: {},
    toast: {
      active: false
    },
    showLoader: false,
    isOpenedConfirmBox: false
  };

  componentDidMount() {
    this.setupAndFetch();
  }

  setupAndFetch = async () => {
    if(window.location.hostname === 'localhost') this.API_URL =  "http://localhost:3000/api/v1";
    else this.API_URL = await getAPIUrl();

    this.setProgramInState();
    this.getRegions();
    this.getLifecycles();
    this.getAPM1();
    this.getAPM2();
    this.getIndustry();
    this.getSegment();
    this.getPersona();
  }

  setProgramInState = () => {
    let { budget, customerMessage, metrics, name, parentCampaignId, owner, otherKpis } = this.props.program;
    this.setState({ program: { budget, customerMessage, metrics, name, parentCampaignId, owner, kpi: otherKpis } })
  }

  showError = err => {
    this.setState({
      toast: {
        active: true,
        variant: 'error',
        heading: 'Something went wrong, please try again.'
      }
    });
    console.error(err);
  };

  getRegions = async () => {
    try {
      let token = getCookie('token').replaceAll('"','');
      const config = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      const response = await fetch(`${this.API_URL}/region`, config);
      const { result } = await response.json();

      let regions = result.map(el => ({...el, id: el.region_id}))

      let regionId = regions.filter(el => el.label === this.props.program.targetRegion);
      let program = { ...this.state.program, regionId };

      if(response.status === 200) this.setState({ regions, program });
      else throw new Error(response);
    } catch (err) {
      this.showError(err);
    }
  }

  getLifecycles = async () => {
    try {
      let token = getCookie('token').replaceAll('"','');
      const config = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      const response = await fetch(`${this.API_URL}/lifecycle-stage`, config);
      const { result } = await response.json();
      const lifecycleStages = result.map(item => ({id: item.lifecycleStageId, label: item.name}));

      let lifecycleStageId = this.props.program.lifecycleStage;
      let program = { ...this.state.program, lifecycleStageId };

      if(response.status === 200) this.setState({ lifecycleStages, program });
      else throw new Error(response.info.status);
    } catch (err) {
      this.showError(err);
    }
  };

  getAPM1 = async () => {
    try {
      let token = getCookie('token').replaceAll('"','');
      const config = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      const response = await fetch(`${this.API_URL}/apm1`, config);
      const { result } = await response.json();
      const apm1s = result.map(item => ({id: item.apm1Id, label: item.name}));

      let apm1Id = this.props.program.apm1;
      let program = { ...this.state.program, apm1Id };

      if(response.status === 200) this.setState({ apm1s, program });
      else throw new Error(response);
    } catch (err) {
      this.showError(err);
    }
  };

  getAPM2 = async () => {
    try {
      let token = getCookie('token').replaceAll('"','');
      const config = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      const response = await fetch(`${this.API_URL}/apm2`, config);
      const { result } = await response.json();
      const apm2s = result.map(item => ({id: item.apm2Id, label: item.name}));

      let apm2Id = this.props.program.apm2;
      let program = { ...this.state.program, apm2Id };

      if(response.status === 200) this.setState({ apm2s, program });
      else throw new Error(response.info.status);
    } catch (err) {
      this.showError(err);
    }
  };

  getIndustry = async () => {
    try {
      let token = getCookie('token').replaceAll('"','');
      const config = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      const response = await fetch(`${this.API_URL}/industry`, config);
      const { result } = await response.json();
      const industries = result.map(item => ({id: item.industryId, label: item.name}));

      let industryId = this.props.program.industry;
      let program = { ...this.state.program, industryId };


      if(response.status === 200) this.setState({ industries, program });
      else throw new Error(response);
    } catch (err) {
      this.showError(err);
    }
  };

  getSegment = async () => {
    try {
      let token = getCookie('token').replaceAll('"','');
      const config = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      const response = await fetch(`${this.API_URL}/segment`, config);
      const { result } = await response.json();
      const segments = result.map(item => ({id: item.segmentId, label: item.name}));

      let segmentId = this.props.program.segment;
      let program = { ...this.state.program, segmentId };

      if(response.status === 200) this.setState({ segments, program });
      else throw new Error(response);
    } catch (err) {
      this.showError(err);
    }
  };

  getPersona = async () => {
    try {
      let token = getCookie('token').replaceAll('"','');
      const config = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      const response = await fetch(`${this.API_URL}/persona`, config);
      const { result } = await response.json();
      const personas = result.map(item => ({id: item.personaId, label: item.name}));

      let personaId = this.props.program.persona;
      let program = { ...this.state.program, personaId };

      if(response.status === 200) this.setState({ personas, program });
      else throw new Error(response);
    } catch (err) {
      this.showError(err);
    }
  };

  validations = (input, data) => {
    let errors = {...this.state.error};
    const inputs = [
      "owner",
      "name",
      "budget",
      "metrics",
      "customerMessage",
      "regionId",
      "apm1Id",
      "industryId",
      "segmentId",
      "personaId"
    ];

    if (input) {
      if(inputs.includes(input) && !data) {
        errors = {...errors, [input]: "This field is required"};
      } else {
        delete errors[input];
      }
    } else {
      inputs.forEach((input) => {
        if(typeof this.state.program[input] === "number" && this.state.program[input] >= 0) {
          delete errors[input];
        } else if(this.state.program[input] && this.state.program[input].length > 0) {
          delete errors[input];
        } else {
          errors = {...errors, [input]: "This field is required"};
        }
      })
    }

    this.setState({error: errors});
    if(Object.keys(errors).length > 0) return false;

    return true;
  };

  handleChange = (value, data) => {
    let program = {...this.state.program, [value]: data};
    this.validations(value, data);
    this.setState({ program });
  };

  toggleConfirmBox = () => {
    this.setState({ isOpenedConfirmBox: !this.state.isOpenedConfirmBox });
  }

  onSubmit = async () => {

    let apm1Id = this.state.program.apm1Id.map(el => el.id);
    let industryId = this.state.program.industryId.map(el => el.id);
    let segmentId = this.state.program.segmentId.map(el => el.id);
    let personaId = this.state.program.personaId.map(el => el.id);

    try {
      let token = getCookie('token').replaceAll('"','');
      const userId = getCookie('userid').replaceAll('"','');
      let program = {
        userId,
        name: this.state.program.name,
        owner: this.state.program.owner,
        budget: Number(this.state.program.budget),
        metrics: Number(this.state.program.metrics),
        regionId: this.state.program.regionId[0].region_id,
        personaId,
        segmentId,
        apm1Id,
        industryId,
        customerMessage: this.state.program.customerMessage,
      }
      if(this.state.program.apm2Id.length) program.apm2Id = this.state.program.apm2Id.map(el => el.id);
      if(this.state.program.lifecycleStageId.length) program.lifecycleStageId = this.state.program.lifecycleStageId.map(el => el.id);
      if(this.state.program.kpi) program.otherKpis = this.state.program.kpi;

      const config = {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(program)
      }
      const response = await fetch(`${this.API_URL}/program/${this.props.program.programId}`, config);
      if(response.status === 200) {
        this.props.toggleOpen(false);
        this.props.onEdit();
      } else throw new Error(response);
    } catch (err) {
      this.showError(err);
    }
  }

	render() {
		return (
      <IconSettings iconPath="/assets/icons">
        {this.state.toast.active && (
          <ToastContainer>
            <Toast
              labels={{heading: this.state.toast.heading}}
              variant={this.state.toast.variant}
              duration={5000}
              onRequestClose={() => this.setState({toast: {active: false}})}
            />
          </ToastContainer>
        )}
        <Modal
          isOpen={true}
          footer={[
            <Button key="cancelBtn" label="Cancel" onClick={() => this.props.toggleOpen(false)} />,
            <Button key="submitBtn" type="submit" label="Save" variant="brand" onClick={() => this.validations() && this.toggleConfirmBox()} />,
          ]}
          onRequestClose={() => this.props.toggleOpen(false)}
          heading={this.props.title}
          ariaHideApp={false}
        >
          <section className="slds-p-around_large">
            <div className="slds-form-element slds-m-bottom_large">
              <Input
                required
                placeholder="Enter owner name"
                label="Program Owner"
                onChange={(event, data) => this.handleChange("owner", data.value)}
                errorText={this.state.error.owner}
                value={this.state.program.owner}
              />
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <Input
                required
                placeholder="Enter name"
                label="Program Name"
                onChange={(event, data) => this.handleChange("name", data.value)}
                errorText={this.state.error.name}
                value={this.state.program.name}
              />
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <BudgetInput
                required
                label="Budget"
                onChange={(event, data) => this.handleChange("budget", data.value)}
                value={this.state.program.budget}
                errorText={this.state.error.budget}
              />
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <BudgetInput
                required
                label="MP target"
                onChange={(event, data) => this.handleChange("metrics", data.value)}
                value={this.state.program.metrics || ''}
                errorText={this.state.error.metrics}
              />
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <Combobox
                required
                events={{onSelect: (event, data) => data.selection.length && this.handleChange("regionId", data.selection)}}
                labels={{label: 'Target Region'}}
                name="regionId"
                options={this.state.regions}
                selection={this.state.program.regionId}
                value="region"
                variant="readonly"
                errorText={this.state.error.regionId}
              />
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <Combobox
                events={{
                  onRequestRemoveSelectedOption: (event, data) => {
                    this.setState({
                      program: { ...this.state.program, lifecycleStageId: data.selection }
                    });
                  },
                  onSelect: (event, data) => data.selection.length && this.handleChange("lifecycleStageId", data.selection)
                }}
                labels={{
                  label: 'Lifecycle Stage',
                  placeholder: 'Select an option',
                }}
                menuItemVisibleLength={5}
                multiple
                options={comboboxFilterAndLimit({
                  limit: this.state.lifecycleStages.length,
                  options: this.state.lifecycleStages,
                  selection: this.state.program.lifecycleStageId,
                })}
                selection={this.state.program.lifecycleStageId}
                name="lifecycleStage"
              />
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <Combobox
                required
                events={{
                  onRequestRemoveSelectedOption: (event, data) => {
                    this.setState({
                      program: { ...this.state.program, apm1Id: data.selection }
                    });
                  },
                  onSelect: (event, data) => data.selection.length && this.handleChange("apm1Id", data.selection)
                }}
                labels={{
                  label: 'APM1',
                  placeholder: 'Select an option',
                }}
                menuItemVisibleLength={5}
                multiple
                options={comboboxFilterAndLimit({
                  limit: this.state.apm1s.length,
                  options: this.state.apm1s,
                  selection: this.state.program.apm1Id,
                })}
                selection={this.state.program.apm1Id}
                name="apm1"
                errorText={this.state.error.apm1Id}
              />
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <Combobox
                events={{
                  onRequestRemoveSelectedOption: (event, data) => {
                    this.setState({
                      program: { ...this.state.program, apm2Id: data.selection }
                    });
                  },
                  onSelect: (event, data) => data.selection.length && this.handleChange("apm2Id", data.selection)
                }}
                labels={{
                  label: 'APM2',
                  placeholder: 'Select an option',
                }}
                menuItemVisibleLength={5}
                multiple
                options={comboboxFilterAndLimit({
                  limit: this.state.apm2s.length,
                  options: this.state.apm2s,
                  selection: this.state.program.apm2Id,
                })}
                selection={this.state.program.apm2Id}
                name="apm2"
              />
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <Combobox
                required
                events={{
                  onRequestRemoveSelectedOption: (event, data) => {
                    this.setState({
                      program: { ...this.state.program, industryId: data.selection }
                    });
                  },
                  onSelect: (event, data) => data.selection.length && this.handleChange("industryId", data.selection)
                }}
                labels={{
                  label: 'Industry',
                  placeholder: 'Select an option',
                }}
                menuItemVisibleLength={5}
                multiple
                options={comboboxFilterAndLimit({
                  limit: this.state.industries.length,
                  options: this.state.industries,
                  selection: this.state.program.industryId,
                })}
                selection={this.state.program.industryId}
                name="industry"
                errorText={this.state.error.industryId}
              />
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <Combobox
                required
                events={{
                  onRequestRemoveSelectedOption: (event, data) => {
                    this.setState({
                      program: { ...this.state.program, segmentId: data.selection }
                    });
                  },
                  onSelect: (event, data) => data.selection.length && this.handleChange("segmentId", data.selection)
                }}
                labels={{
                  label: 'Segment',
                  placeholder: 'Select an option',
                }}
                menuItemVisibleLength={5}
                multiple
                options={comboboxFilterAndLimit({
                  limit: this.state.segments.length,
                  options: this.state.segments,
                  selection: this.state.program.segmentId,
                })}
                selection={this.state.program.segmentId}
                name="segment"
                errorText={this.state.error.segmentId}
              />
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <Combobox
                required
                events={{
                  onRequestRemoveSelectedOption: (event, data) => {
                    this.setState({
                      program: { ...this.state.program, personaId: data.selection }
                    });
                  },
                  onSelect: (event, data) => data.selection.length && this.handleChange("personaId", data.selection)
                }}
                labels={{
                  label: 'Persona',
                  placeholder: 'Select an option',
                }}
                menuItemVisibleLength={5}
                multiple
                options={comboboxFilterAndLimit({
                  limit: this.state.personas.length,
                  options: this.state.personas,
                  selection: this.state.program.personaId
                })}
                selection={this.state.program.personaId}
                name="persona"
                errorText={this.state.error.personaId}
              />
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <Textarea
                required
                label="Customer Message"
                errorText={this.state.error.customerMessage}
                placeholder="Enter customer message"
                value={this.state.program.customerMessage || ''}
                onChange={(event, data) => this.handleChange("customerMessage", event.target.value)}
              />
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <Textarea
                label="Other KPI's"
                errorText={this.state.error.kpi}
                placeholder="Enter kpi's"
                value={this.state.program.kpi || ''}
                onChange={(event, data) => this.handleChange("kpi", event.target.value)}
              />
            </div>
          </section>
        </Modal>
        {this.state.isOpenedConfirmBox && <Prompt
          isOpen
          message="Are you sure you want to update this program?"
          onClose={this.toggleConfirmBox}
          onConfirm={this.onSubmit}
          mainButtonLabel="Update"
        />}
      </IconSettings>
		);
	}
};

export default EditProgramModalComponent;
