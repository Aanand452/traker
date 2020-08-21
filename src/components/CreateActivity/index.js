import React, { Component } from 'react';
import moment from 'moment';
import {
  IconSettings,
  Combobox,
  Input,
  Datepicker,
  Button
} from '@salesforce/design-system-react';

import { FormContainer } from './styles';

class CreateActivity extends Component {
  state = {
    row: {
      format: [],
      region: [],
      tactic: [],
      program: [],
      title: "",
      abstract: "",
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      asset: "",
      campaignId: "",
      kpi: []
    },
    regions: [],
    programs: [],
    tactics: [],
    formats: [],
    error: {},
    KPIKey: "",
    KPIValue: "",
    editKey: "",
    editValue: ""
  };

  componentDidMount() {
    this.checkTactic();
    this.checkRegion();
    this.checkProgram();
    this.checkFormat();
    this.props.getFormData(this.state.row);
  };

  async checkRegion() {
    try {
      let response = await fetch('/assets/data/region.json');
      let { result } = await response.json();
      let regions = result.map(el => el.label);
      this.setState({ regions, row: {...this.state.row, region: this.checkDataModel(this.createModelData(regions), this.props.regionSelection) }});
    } catch(err) {
      // TODO
      // A correct error response
      console.log(err)
    }
  }

  async checkProgram() {
    try {
      let response = await fetch('/assets/data/program.json');
      let { result } = await response.json();
      let programs = result.map(el => el.label);
      this.setState({ programs, row: {...this.state.row, program: this.checkDataModel(this.createModelData(programs), this.props.programSelection) } });
    } catch(err) {
      // TODO
      // A correct error response
      console.log(err)
    }
  }

  async checkTactic() {
    try {
      let response = await fetch('/assets/data/tactic.json');
      let { result } = await response.json();
      let tactics = result.map(el => el.label);
      this.setState({ tactics, row: {...this.state.row, tactic: this.checkDataModel(this.createModelData(tactics), this.props.tacticSelection) } });
    } catch(err) {
      // TODO
      // A correct error response
      console.log(err)
    }
  }

  async populateTactic(selection) {
    let response = await fetch('/assets/data/format.json');
    let { result } = await response.json();
    return result.filter(el => el.tactic === selection[0].label);
  }

  async checkFormat() {
    try {
      let response = await fetch('/assets/data/format.json');
      let { result } = await response.json();
      let formats = result.filter(el => el.tactic === this.state.row.tactic[0].label).map(e => e.label);
      this.setState({ formats, row: {...this.state.row, format: this.checkDataModel(this.createModelData(formats), this.props.formatSelection) } });
    } catch(err) {
      // TODO
      // A correct error response
      console.log(err)
    }
  }

  checkDataModel(model, modelSelection) {
    let selection = model.filter(el => el.label === modelSelection)
    return selection.length ? selection : [model[0]] 
  };

  createModelData(modelData) {
    const modelResult = modelData.map((el, index) => {
      const elementJson = {}
      elementJson.label = el
      elementJson.id = index.toString();
      return elementJson
    });
    return modelResult
  };

  handleChange = async (value, data) => {
    let newRow = {};
    
    if(value === "tactic") {
      let format = await this.populateTactic(data);
      newRow = {...this.state.row, tactic: data, format};
    } else {
      newRow = {...this.state.row, [value]: data};
    }

    this.validations(value, data);
    this.setState({row: newRow})
    this.props.getFormData(newRow);
  };

  validations = (input, data) => {
    let errors = {...this.state.error};
    const inputs = ["campaignId", "program", "title", "format", "region", "tactic", "abstract"];

    if (input) {
      if(inputs.includes(input) && !data) {
        errors = {...errors, [input]: `Enter ${input === "abstract" ? "an" : "a"} ${input}`};
      } else {
        delete errors[input];
      }
    } else {
      inputs.forEach((input) => {
        if(this.state.row[input]) {
          delete errors[input];
        } else {
          errors = {...errors, [input]: `Enter ${input === "abstract" ? "an" : "a"} ${input}`};
        }
      })
    }

    this.setState({error: errors});
    return errors;
  };

  addKPI = () => {
    const newRow = {...this.state.row};
    newRow.kpi = [...newRow.kpi, {key: this.state.KPIKey, value: this.state.KPIValue}];
    this.setState({
      row: newRow,
      KPIKey: "",
      KPIValue: ""
    });
  };

  deleteKPI = (id) => {
    const newRow = {...this.state.row};
    newRow.kpi = newRow.kpi.filter((el, index) => id !== index)
    this.setState({row: newRow});
  };

  editKPI = (id) => {
    const newRow = {...this.state.row};
    newRow.kpi[id] = {key: this.state.editKey, value: this.state.editValue};

    this.setState({
      row: newRow,
      editKey: "",
      editValue: ""
    });
  };

  setEditKPI = (id) => {
    const newRow = {...this.state.row};
    newRow.kpi[id].edit = true;

    this.setState({
      row: newRow,
      editKey: newRow.kpi[id].key,
      editValue: newRow.kpi[id].value
    });
  };

  cancelEdit = () => {
    const newRow = {...this.state.row};
    newRow.kpi = newRow.kpi.map(el => ({key: el.key, value: el.value}));
    
    this.setState({row: newRow});
  };

  validateSubmit = (e) => {
    e.preventDefault();
    const errors = this.validations();

    if (Object.keys(errors).length === 0) {
      this.props.getFormData(this.state.row);
      return this.props.handleSubmit(e);
    }
    
    return false;
  };

  render() {
    return (
      <IconSettings iconPath="assets/icons">
        <FormContainer>
          <form className="slds-grid slds-wrap" onSubmit={e => this.validateSubmit(e)}>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
              <Input
                placeholder="Enter Campaign Id"
                label="Campaign Id"
                onChange={(event, data) => this.handleChange("campaignId", data.value)}
                defaultValue={this.state.row.campaignId}
                id="campaignId"
                maxLength="18"
                minLength="18"
                errorText={this.state.error.campaignId}
              />
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
              <Combobox
                id="program"
                events={{onSelect: (event, data) => data.selection.length && this.handleChange("program", data.selection)}}
                labels={{label: 'Program'}}
                name="program"
                options={this.createModelData(this.state.programs)}
                selection={this.state.row.program}
                value="program"
                variant="readonly"
                errorText={this.state.error.program}
                
              />
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
              <Combobox
                id="tactic"
                events={{onSelect: (event, data) => data.selection.length && this.handleChange("tactic", data.selection)}}
                labels={{label: 'Tactic'}}
                name="tactic"
                options={this.createModelData(this.state.tactics)}
                selection={this.state.row.tactic}
                value="tactic"  
                variant="readonly"
                errorText={this.state.error.tactic}
                
              />
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
              <Combobox
                id="format"
                events={{onSelect: (event, data) => data.selection.length && this.handleChange("format", data.selection)}}
                labels={{label: 'Format'}}
                name="format"
                options={this.createModelData(this.state.formats)}
                selection={this.state.row.format}
                value="format"  
                variant="readonly"
                errorText={this.state.error.format}
                
              />
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
              <Input
                placeholder="Enter title"
                onChange={(event, data) => this.handleChange("title", data.value)}
                defaultValue={this.state.row.title}
                id="title"
                label="Title"
                errorText={this.state.error.title}
                
              />
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
              <Input onChange={(event, data) => this.handleChange("abstract", data.value)} defaultValue={this.state.row.abstract} placeholder="Enter abstract" id="abstract" label="Abstract" errorText={this.state.error.abstract}/>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
              <Combobox
                id="region"
                events={{onSelect: (event, data) => data.selection.length && this.handleChange("region", data.selection)}}
                labels={{label: 'Region'}}
                name="region"
                options={this.createModelData(this.state.regions)}
                selection={this.state.row.region}
                value="region"
                variant="readonly"
                errorText={this.state.error.region}
              />
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
              <Datepicker
                id="startDate"
                labels={{label: 'Start Date'}}
                triggerClassName="slds-col slds-size_1-of-2"
                onChange={(event, data) => this.handleChange("startDate", data.formattedDate)}
                formatter={(date) => date ? moment(date).format('MM/DD/YYYY') : ''}
                parser={(dateString) => moment(dateString, 'MM-DD-YYYY').toDate()}
                value={this.state.row.startDate}
              />
              <Datepicker
                id="endDate"
                labels={{label: 'End Date'}}
                triggerClassName="slds-col slds-size_1-of-2"
                onChange={(event, data) => this.handleChange("endDate", data.formattedDate)}
                formatter={(date) => date ? moment(date).format('MM/DD/YYYY') : ''}
                parser={(dateString) => moment(dateString, 'MM-DD-YYYY').toDate()}
                value={this.state.row.endDate}
              />
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
              <Input placeholder="Enter assets" onChange={(event, data) => this.handleChange("asset", data.value)} defaultValue={this.state.row.asset} id="asset" label="Asset"/>
            </div>
            {this.state.row.kpi && this.state.row.kpi.map((el, index) => (
              <div key={index} className="slds-grid slds-m-bottom_large slds-col slds-size_1-of-2">
                <div className="slds-col slds-size_2-of-5">
                  <Input
                    placeholder="Enter KPI key"
                    label="KPI key"
                    value={el.edit ? this.state.editKey : el.key}
                    id={`KPIKey${index}`}
                    readOnly={!el.edit}
                    onChange={(event, data) => this.setState({editKey: data.value})}
                  />
                </div>
                <div className="slds-col slds-size_2-of-5">
                  <Input
                    placeholder="Enter KPI value"
                    label="KPI Value"
                    value={el.edit ? this.state.editValue : el.value}
                    id={`KPIValue${index}`}
                    readOnly={!el.edit}
                    onChange={(event, data) => this.setState({editValue: data.value})}
                  />
                </div>
                <div className="slds-col slds-size_1-of-5">
                  <Button 
                    onClick={el.edit ? () => this.editKPI(index) : () => this.setEditKPI(index)}
                    className="vertical-center"
                    label={el.edit ? "Save" : "Edit"}
                    variant="brand"
                  />
                  <Button 
                    onClick={el.edit ? this.cancelEdit : () => this.deleteKPI(index)}
                    className="vertical-center"
                    label={el.edit ? "Cancel" : "Delete"}
                    variant="destructive"
                  />
                </div>
              </div>
            ))}
            <div className="slds-grid slds-m-bottom_large slds-col slds-size_1-of-2">
              <div className="slds-col slds-size_2-of-5">
                <Input
                  placeholder="Enter KPI key"
                  label="KPI Key"
                  onChange={(event, data) => this.setState({KPIKey: data.value})}
                  value={this.state.KPIKey}
                  id="KPIKey"
                />
              </div>
              <div className="slds-col slds-size_2-of-5">
                <Input
                  placeholder="Enter KPI value"
                  label="KPI Value"
                  onChange={(event, data) => this.setState({KPIValue: data.value})}
                  value={this.state.KPIValue}
                  id="KPIValue"
                />
              </div>
              <div className="slds-col slds-size_1-of-5">
                <Button onClick={this.addKPI} className="slds-button_stretch vertical-center" label="Add" disabled={!this.state.KPIKey || !this.state.KPIValue} variant="brand" />  
              </div>
            </div>
            <div className="slds-col slds-size_1-of-1">
              <Button label="Cancel" />
              <Button label="Save" variant="brand" type="submit" />
            </div>
          </form>
        </FormContainer>
      </IconSettings>
    )
  };
};

export default CreateActivity;