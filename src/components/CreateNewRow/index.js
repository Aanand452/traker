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

  const themeModel = themes.map((el, index)=>{
    const elementJson = {}
    elementJson.label = el
    elementJson.id = index.toString();
    return elementJson
  })

  const programModel = programs.map((el, index)=>{
    const elementJson = {}
    elementJson.label = el
    elementJson.id = index.toString();
    return elementJson
  })

  const formatModel = formats.map((el, index)=>{
    const elementJson = {}
    elementJson.label = el
    elementJson.id = index.toString();
    return elementJson
  })

  const personaModel = personas.map((el, index)=>{
    const elementJson = {}
    elementJson.label = el
    elementJson.id = index.toString();
    return elementJson
  })

  const regionModel = regions.map((el, index)=>{
    const elementJson = {}
    elementJson.label = el
    elementJson.id = index.toString();
    return elementJson
  })

  const checkDataModel = (model, modelSelection) => {
    let selection = model.filter(el => el.label === modelSelection)
    return selection.length ? selection : [model[0]] 
  }

  const [row, setRow] = useState({
    theme: checkDataModel(themeModel, themeSelection),
    program: checkDataModel(programModel, programSelection),
    format: checkDataModel(formatModel, formatSelection),
    persona: checkDataModel(personaModel, personaSelection),
    region: checkDataModel(regionModel, regionSelection),
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
          <div className="slds-admin-view">
            <form >
              <IconSettings iconPath="assets/icons">
                <Combobox
                  id="theme"
                  events={{
                    onSelect: (event, data) => {data.selection.length ? handleCHange("theme", data.selection) : null}
                  }}
                  labels={{
                    label: 'Theme'
                  }}
                  name="theme"
                  options={themeModel}
                  selection={row.theme}
                  value={"theme"}
                  variant="readonly"
                />
              </IconSettings>
              <IconSettings iconPath="assets/icons">
                <Combobox
                  id="program"
                  events={{
                    onSelect: (event, data) => {data.selection.length ? handleCHange("program", data.selection) : null}
                  }}
                  labels={{
                    label: 'Program'
                  }}
                  name="program"
                  options={programModel}
                  selection={row.program}
                  value={"program"}
                  variant="readonly"
                />
              </IconSettings>
              <Input onChange={(event, data) => {handleCHange("title", data.value)}} defaultValue={row.title} id="title" label="Title"/>
              <IconSettings iconPath="assets/icons">
                <Combobox
                  id="format"
                  events={{
                    onSelect: (event, data) => {data.selection.length ? handleCHange("format", data.selection) : null}
                  }}
                  labels={{
                    label: 'Format'
                  }}
                  name="format"
                  options={formatModel}
                  selection={row.format}
                  value={"format"}
                  variant="readonly"
                />
              </IconSettings>
              <IconSettings iconPath="assets/icons">
                <Combobox
                  id="persona"
                  events={{
                    onSelect: (event, data) => {data.selection.length ? handleCHange("persona", data.selection) : null}
                  }}
                  labels={{
                    label: 'Persona'
                  }}
                  name="persona"
                  options={personaModel}
                  selection={row.persona}
                  value={"persona"}
                  variant="readonly"
                />
              </IconSettings>
              <Input onChange={(event, data) => {handleCHange("abstract", data.value)}} defaultValue={row.abstract} id="abstract" label="Abstract"/>
              <IconSettings iconPath="assets/icons">
                <Combobox
                  id="region"
                  events={{
                    onSelect: (event, data) => {data.selection.length ? handleCHange("region", data.selection) : null}
                  }}
                  labels={{
                    label: 'Region'
                  }}
                  name="region"
                  options={regionModel}
                  selection={row.region}
                  value={"region"}
                  variant="readonly"
                />
              </IconSettings>
              <IconSettings iconPath="assets/icons">
              <Datepicker
                id="startDate"
                labels={{
                  label: 'Start Date',
                }}
                triggerClassName="slds-form-element__create-row"
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
              </IconSettings>
              <IconSettings iconPath="assets/icons">
              <Datepicker
                id="endDate"
                labels={{
                  label: 'Start Date',
                }}
                triggerClassName="slds-form-element__create-row"
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
              </IconSettings>
              <Input onChange={(event, data) => {handleCHange("results", data.value)}} defaultValue={row.results} id="results" label="Result"/>
              <Input onChange={(event, data) => {handleCHange("asset", data.value)}} defaultValue={row.asset} id="asset" label="Asset"/>
            </form>
          </div>
    )
}

export default CreateNewRow;