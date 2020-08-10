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

const newRow = () => {
  const history = useHistory();
  const [row, setRow] = useState({})

  const getFormData = (data) => {
    setRow({row: data})
  }

  const table = e => {
    e.preventDefault();
    history.push('/table')
  }

    return (
      <SfdcFlexCenter>
        <section class="slds-grid slds-wrap">
          <div className="slds-grid slds-wrap slds-p-around_medium slds_full-width">
            <div className="slds-col slds-size_12-of-12">
              <Sfdch1NewRow>Create new row</Sfdch1NewRow>
              <CreateNewRow
                  getFormData = {getFormData}
              />
              <Button label="Cancel" onClick={e => table(e)}/>
              <Button label="Save" variant="brand" onClick={e => table(e)} />
            </div>
          </div>
        </section>
      </SfdcFlexCenter>
    )
}

export default newRow