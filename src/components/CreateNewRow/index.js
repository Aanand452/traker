import React, { useState, useEffect } from 'react';
import moment from 'moment';

import {
  IconSettings,
  Combobox,
  Input,
  Datepicker,
} from '@salesforce/design-system-react';

import { themes, programs, formats, personas, regions } from '../../utils/data';

const CreateNewRow = ({
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
  getFormData
}) => {

  const createModelData = (modelData) => {
    const modelResult = modelData.map((el, index)=>{
      const elementJson = {}
      elementJson.label = el
      elementJson.id = index.toString();
      return elementJson
    })
    return modelResult
  }

  const checkDataModel = (model, modelSelection) => {
    let selection = model.filter(el => el.label === modelSelection)
    return selection.length ? selection : [model[0]] 
  }

  const [row, setRow] = useState({
    theme: checkDataModel(createModelData(themes), themeSelection),
    program: checkDataModel(createModelData(programs), programSelection),
    format: checkDataModel(createModelData(formats), formatSelection),
    persona: checkDataModel(createModelData(personas), personaSelection),
    region: checkDataModel(createModelData(regions), regionSelection),
    title: title,
    abstract: abstract,
    startDate: startDate,
    endDate: endDate,
    results: results,
    asset: asset
  });

  useEffect(() => {
    getFormData(row);
  }, []);

  const handleCHange = (value, data) => {
    setRow({...row, [value]: data})
    getFormData({...row, [value]: data});
  }

  

    return (
      <IconSettings iconPath="assets/icons">
        <div className="slds-admin-view">
          <form >
            <div className="slds-m-bottom_large">
                <Combobox
                  id="theme"
                  events={{
                    onSelect: (event, data) => {data.selection.length ? handleCHange("theme", data.selection) : null}
                  }}
                  labels={{
                    label: 'Theme'
                  }}
                  name="theme"
                  options={createModelData(themes)}
                  selection={row.theme}
                  value={"theme"}
                  variant="readonly"
                />
            </div>
            <div className="slds-m-bottom_large">
                <Combobox
                  id="program"
                  events={{
                    onSelect: (event, data) => {data.selection.length ? handleCHange("program", data.selection) : null}
                  }}
                  labels={{
                    label: 'Program'
                  }}
                  name="program"
                  options={createModelData(programs)}
                  selection={row.program}
                  value={"program"}
                  variant="readonly"
                />
            </div>
            <div className="slds-m-bottom_large">
              <Input placeholder="Enter title" onChange={(event, data) => {handleCHange("title", data.value)}} defaultValue={row.title} id="title" label="Title"/>
            </div>
            <div className="slds-m-bottom_large">
                <Combobox
                  id="format"
                  events={{
                    onSelect: (event, data) => {data.selection.length ? handleCHange("format", data.selection) : null}
                  }}
                  labels={{
                    label: 'Format'
                  }}
                  name="format"
                  options={createModelData(formats)}
                  selection={row.format}
                  value={"format"}
                  variant="readonly"
                />
            </div>
            <div className="slds-m-bottom_large">
                <Combobox
                  id="persona"
                  events={{
                    onSelect: (event, data) => {data.selection.length ? handleCHange("persona", data.selection) : null}
                  }}
                  labels={{
                    label: 'Persona'
                  }}
                  name="persona"
                  options={createModelData(personas)}
                  selection={row.persona}
                  value={"persona"}
                  variant="readonly"
                />
            </div>
            <div className="slds-m-bottom_large">
              <Input onChange={(event, data) => {handleCHange("abstract", data.value)}} defaultValue={row.abstract} id="abstract" label="Abstract"/>
            </div>
            <div className="slds-m-bottom_large">
                <Combobox
                  id="region"
                  events={{
                    onSelect: (event, data) => {data.selection.length ? handleCHange("region", data.selection) : null}
                  }}
                  labels={{
                    label: 'Region'
                  }}
                  name="region"
                  options={createModelData(regions)}
                  selection={row.region}
                  value={"region"}
                  variant="readonly"
                />
            </div>
            <div className="slds-m-bottom_large">
              <Datepicker
                id="startDate"
                labels={{
                  label: 'Start Date',
                }}
                triggerClassName="slds-col slds-size_1-of-2"
                onChange={(event, data) => {
                  console.log(event.target)
                  console.log(data)
                  setRow({...row, ["startDate"]: data.formattedDate})
                  getFormData({...row, ["startDate"]: data.formattedDate});
                }}
                onCalendarFocus={(event, data) => {
                  
                }}
                formatter={(date) => {
                  return date ? moment(date).format('MM/DD/YYYY') : '';
                }}
                parser={(dateString) => {
                  return moment(dateString, 'MM-DD-YYYY').toDate();
                }}
                value={row.startDate}
              />
              <Datepicker
                id="endDate"
                labels={{
                  label: 'Start Date',
                }}
                triggerClassName="slds-col slds-size_1-of-2"
                onChange={(event, data) => {
                  console.log(event.target)
                  console.log(data)
                  setRow({...row, ["endDate"]: data.formattedDate})
                  getFormData({...row, ["endDate"]: data.formattedDate});
                }}
                onCalendarFocus={(event, data) => {
                  
                }}
                formatter={(date) => {
                  return date ? moment(date).format('MM/DD/YYYY') : '';
                }}
                parser={(dateString) => {
                  return moment(dateString, 'MM-DD-YYYY').toDate();
                }}
                value={row.endDate}
              />
            </div>
            <div className="slds-m-bottom_large">
              <Input placeholder="Enter results" onChange={(event, data) => {handleCHange("results", data.value)}} defaultValue={row.results} id="results" label="Result"/>
            </div>
            <div className="slds-m-bottom_large">
              <Input placeholder="Enter assets" onChange={(event, data) => {handleCHange("asset", data.value)}} defaultValue={row.asset} id="asset" label="Asset"/>
            </div>
          </form>
        </div>
      </IconSettings>
    )
}

export default CreateNewRow;