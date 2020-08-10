import React, { useState } from 'react';
import CreateNewRow from '../CreateNewRow';
import {
  Button
} from '@salesforce/design-system-react';
import {
  SfdcFlexCenter,
  Sfdch1NewRow
} from './styles';
import { useHistory  } from 'react-router-dom'
import NavBar from '../NavBar';

const newRow = () => {
  const history = useHistory();
  const [row, setRow] = useState({})

  const getFormData = (data) => {
    console.log(data)
    setRow({row: data})
  }

  const table = e => {
    e.preventDefault();
    history.push('/table')
  }

  const onSubmit = e =>{
    e.preventDefault();
    history.push({
      pathname: '/table',
      newRow:{
        id: 10000,
        theme: row.theme[0] && row.theme[0].label,
        program: row.program[0] && row.program[0].label,
        format: row.format[0] && row.format[0].label,
        persona: row.persona[0] && row.persona[0].label,
        region: row.region[0] && row.region[0].label,
        title: row.title,
        abstract: row.abstract,
        startDate: row.startDate,
        endDate: row.endDate,
        results: row.results,
        asset: row.asset
      }
    })
    
  }

    return (
      <section>
        <NavBar />
        <SfdcFlexCenter>
          <section class="slds-grid slds-wrap">
            <div className="slds-grid slds-wrap slds-p-around_medium slds_full-width">
              <div className="slds-col slds-size_12-of-12">
                <Sfdch1NewRow>Create new row</Sfdch1NewRow>
                <CreateNewRow
                    getFormData = {getFormData}
                />
                <Button label="Cancel" onClick={e => table(e)}/>
                <Button label="Save" variant="brand" onClick={e => onSubmit(e)} />
              </div>
            </div>
          </section>
        </SfdcFlexCenter>
      </section>
    )
}

export default newRow