import React, { useState, useEffect } from 'react';
import moment from 'moment';

import {
  IconSettings,
  Combobox,
  Input,
  Datepicker,
  Button
} from '@salesforce/design-system-react';

import { theme, program, format, persona, region } from '../../utils/data';

const Mandatory = () => {
  const [row, setRow] = useState({});
  const [selection, setSelection] = useState([]);

  const handleCHange = (value, data) => setRow({...row, [value]: data});

  const themeModel = theme.map((el, index)=>{
    el.label = el.text
    el.id = index.toString();
    return el
  })
  
  const programModel = program.map((el, index)=>{
    el.label = el.text
    el.id = index.toString();
    return el
  })

  const formatModel = format.map((el, index)=>{
    el.label = el.text
    el.id = index.toString();
    return el
  })

  const personaModel = persona.map((el, index)=>{
    el.label = el.text
    el.id = index.toString();
    return el
  })

  const regionModel = region.map((el, index)=>{
    el.label = el.text
    el.id = index.toString();
    return el
  })

    return (
      <section className="slds-grid slds-wrap background-white">
        <div className="slds-grid slds-wrap slds-p-around_medium slds_full-width">
          <div className="slds-col slds-size_12-of-12">
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
                <Input onChange={(event, data) => {handleCHange("title", data.value)}} defaultValue={row.title} id="title" label="Title" className="slds-form-element__create-row"/>
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
                <Input onChange={(event, data) => {handleCHange("abstract", data.value)}} id="abstract" label="Abstract" className="slds-form-element__create-row"/>
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
                    setRow({...row, ["startDate"]: data.date})
                  }}
                  onCalendarFocus={(event, data) => {
                    
                  }}
                  formatter={(date) => {
                    return date ? moment(date).format('YYYY/MM/DD') : '';
                  }}
                  parser={(dateString) => {
                    return moment(dateString, 'YYYY-MM-DD').toDate();
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
                    setRow({...row, ["endDate"]: data.date})
                  }}
                  onCalendarFocus={(event, data) => {
                    
                  }}
                  formatter={(date) => {
                    return date ? moment(date).format('YYYY/MM/DD') : '';
                  }}
                  parser={(dateString) => {
                    return moment(dateString, 'YYYY-MM-DD').toDate();
                  }}
                  value={row.endDate}
                />
                </IconSettings>
                <Input onChange={(event, data) => {handleCHange("result", data.value)}} id="result" label="Result" className="slds-form-element__create-row"/>
                <Input onChange={(event, data) => {handleCHange("asset", data.value)}} id="asset" label="Asset" className="slds-form-element__create-row"/>
                <Button label="Cancel" />
                <Button label="Create Row" variant="brand" />
              </form>
            </div>
          </div>
        </div>
      </section>
    )
}

export default Mandatory;