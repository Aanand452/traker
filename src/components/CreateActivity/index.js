import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  IconSettings,
  Combobox,
  Input,
  Datepicker,
  Button
} from '@salesforce/design-system-react';

import { themes, programs, formats, personas, regions } from '../../utils/data';
import { FormContainer } from './styles';

const CreateActivity = ({
  themeSelection,
  programSelection,
  formatSelection,
  personaSelection,
  regionSelection,
  title,
  abstract,
  startDate,
  endDate,
  results,
  asset,
  getFormData,
  campaignId,
  kpi,
  handleSubmit
}) => {

  const createModelData = (modelData) => {
    const modelResult = modelData.map((el, index)=>{
      const elementJson = {}
      elementJson.label = el
      elementJson.id = index.toString();
      return elementJson
    })
    return modelResult
  };

  const checkDataModel = (model, modelSelection) => {
    let selection = model.filter(el => el.label === modelSelection)
    return selection.length ? selection : [model[0]] 
  };

  const [row, setRow] = useState({
    theme: checkDataModel(createModelData(themes), themeSelection),
    program: checkDataModel(createModelData(programs), programSelection),
    format: checkDataModel(createModelData(formats), formatSelection),
    persona: checkDataModel(createModelData(personas), personaSelection),
    region: checkDataModel(createModelData(regions), regionSelection),
    title,
    abstract,
    startDate,
    endDate,
    results,
    asset,
    campaignId,
    kpi: []
  });
  const [error, setError] = useState({});
  const [KPIKey, setKPIKey] = useState("");
  const [KPIValue, setKPIValue] = useState("");
  const [editKey, setEditKey] = useState("");
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    getFormData(row);
  }, []);

  const handleChange = (value, data) => {
    validations(value, data);
    setRow({...row, [value]: data})
    getFormData({...row, [value]: data});
  };

  const validations = (input, data) => {
    const Errors = {...error};
    const inputs = ["theme", "program", "title", "format", "persona", "region"];

    if(inputs.includes(input) && !data) {
      setError({...Errors, [input]: `Enter a ${input}`})
    } else {
      setError(delete Errors[input]);
    }
  };

  const addKPI = () => {
    const newRow = {...row};
    newRow.kpi = [...newRow.kpi, {key: KPIKey, value: KPIValue}];
    setRow(newRow);
    setKPIKey("");
    setKPIValue("");
  }

  const deleteKPI = id => {
    const newRow = {...row};
    newRow.kpi = newRow.kpi.filter((el, index) => id !== index)
    setRow(newRow);
  }

  const editKPI = id => {
    const newRow = {...row};
    newRow.kpi[id] = {key: editKey, value: editValue};

    setRow(newRow);
    setEditKey("");
    setEditValue("");
  }

  const setEditKPI = id => {
    const newRow = {...row};
    newRow.kpi[id].edit = true;

    setEditKey(newRow.kpi[id].key);
    setEditValue(newRow.kpi[id].value);
    setRow(newRow);
  }

  const cancelEdit = () => {
    const newRow = {...row};
    newRow.kpi = newRow.kpi.map(el => ({key: el.key, value: el.value}));
    
    setRow(newRow);
  }


  return (
    <IconSettings iconPath="assets/icons">
      <FormContainer>
        <form onSubmit={handleSubmit} className="slds-grid slds-wrap">
          <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
            <Input
              placeholder="Enter Campaign Id"
              label="Campaign Id"
              onChange={(event, data) => handleChange("campaignId", data.value)}
              defaultValue={row.campaignId}
              id="campaignId"
            />
          </div>
          <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
            <Combobox
              id="theme"
              events={{onSelect: (event, data) => data.selection.length && handleChange("theme", data.selection)}}
              labels={{label: 'Theme'}}
              name="theme"
              options={createModelData(themes)}
              selection={row.theme}
              value="theme"
              variant="readonly"
              errorText={error.theme}
              required
            />
          </div>
          <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
            <Combobox
              id="program"
              events={{onSelect: (event, data) => data.selection.length && handleChange("program", data.selection)}}
              labels={{label: 'Program'}}
              name="program"
              options={createModelData(programs)}
              selection={row.program}
              value="program"
              variant="readonly"
              errorText={error.program}
              required
            />
          </div>
          <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
            <Input
              placeholder="Enter title"
              onChange={(event, data) => handleChange("title", data.value)}
              defaultValue={row.title}
              id="title"
              label="Title"
              errorText={error.title}
            />
          </div>
          <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
            <Combobox
              id="format"
              events={{onSelect: (event, data) => data.selection.length && handleChange("format", data.selection)}}
              labels={{label: 'Format'}}
              name="format"
              options={createModelData(formats)}
              selection={row.format}
              value="format"  
              variant="readonly"
              errorText={error.format}
              required
            />
          </div>
          <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
            <Combobox
              id="persona"
              events={{onSelect: (event, data) => data.selection.length && handleChange("persona", data.selection)}}
              labels={{label: 'Persona'}}
              name="persona"
              options={createModelData(personas)}
              selection={row.persona}
              value={"persona"}
              variant="readonly"
              errorText={error.persona}
              required
            />
          </div>
          <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
            <Input onChange={(event, data) => handleChange("abstract", data.value)} defaultValue={row.abstract} id="abstract" label="Abstract"/>
          </div>
          <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
            <Combobox
              id="region"
              events={{onSelect: (event, data) => data.selection.length && handleChange("region", data.selection)}}
              labels={{label: 'Region'}}
              name="region"
              options={createModelData(regions)}
              selection={row.region}
              value="region"
              variant="readonly"
              errorText={error.region}
              required
            />
          </div>
          <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
            <Datepicker
              id="startDate"
              labels={{label: 'Start Date'}}
              triggerClassName="slds-col slds-size_1-of-2"
              onChange={(event, data) => handleChange("startDate", data.formattedDate)}
              formatter={(date) => date ? moment(date).format('MM/DD/YYYY') : ''}
              parser={(dateString) => moment(dateString, 'MM-DD-YYYY').toDate()}
              value={row.startDate}
            />
            <Datepicker
              id="endDate"
              labels={{label: 'End Date'}}
              triggerClassName="slds-col slds-size_1-of-2"
              onChange={(event, data) => handleChange("endDate", data.formattedDate)}
              formatter={(date) => date ? moment(date).format('MM/DD/YYYY') : ''}
              parser={(dateString) => moment(dateString, 'MM-DD-YYYY').toDate()}
              value={row.endDate}
            />
          </div>
          <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
            <Input placeholder="Enter results" onChange={(event, data) => handleChange("results", data.value)} defaultValue={row.results} id="results" label="Result"/>
          </div>
          <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
            <Input placeholder="Enter assets" onChange={(event, data) => handleChange("asset", data.value)} defaultValue={row.asset} id="asset" label="Asset"/>
          </div>
          {row.kpi && row.kpi.map((el, index) => (
            <div key={index} className="slds-grid slds-m-bottom_large slds-col slds-size_1-of-2">
              <div className="slds-col slds-size_2-of-5">
                <Input
                  placeholder="Enter KPI key"
                  label="KPI key"
                  value={el.edit ? editKey : el.key}
                  id={`KPIKey${index}`}
                  readOnly={!el.edit}
                  onChange={(event, data) => setEditKey(data.value)}
                />
              </div>
              <div className="slds-col slds-size_2-of-5">
                <Input
                  placeholder="Enter KPI value"
                  label="KPI Value"
                  value={el.edit ? editValue : el.value}
                  id={`KPIValue${index}`}
                  readOnly={!el.edit}
                  onChange={(event, data) => setEditValue(data.value)}
                />
              </div>
              <div className="slds-col slds-size_1-of-5">
                <Button 
                  onClick={el.edit ? () => editKPI(index) : () => setEditKPI(index)}
                  className="vertical-center"
                  label={el.edit ? "Save" : "Edit"}
                  variant="brand"
                />
                <Button 
                  onClick={el.edit ? cancelEdit : () => deleteKPI(index)}
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
                onChange={(event, data) => setKPIKey(data.value)}
                value={KPIKey}
                id="KPIKey"
              />
            </div>
            <div className="slds-col slds-size_2-of-5">
              <Input
                placeholder="Enter KPI value"
                label="KPI Value"
                onChange={(event, data) => setKPIValue(data.value)}
                value={KPIValue}
                id="KPIValue"
              />
            </div>
            <div className="slds-col slds-size_1-of-5">
              <Button onClick={addKPI} className="slds-button_stretch vertical-center" label="Add" disabled={!KPIKey || !KPIValue} variant="brand" />  
            </div>
          </div>
          <div className="slds-col slds-size_1-of-1">
            <Button label="Cancel" />
            <Button label="Save" variant="brand" onClick={handleSubmit} />
          </div>
        </form>
      </FormContainer>
    </IconSettings>
  )
};

export default CreateActivity;