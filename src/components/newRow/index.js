import React, { useState } from 'react';
import CreateNewRow from '../CreateNewRow';
import {
  Button
} from '@salesforce/design-system-react';
import {
  SfdcFlexCenter,
  Sfdch1NewRow
} from './styles';

const newRow = () => {
  const [row, setRow] = useState({})

  const getFormData = (data) => {
    setRow({row: data})
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
              <Button label="Cancel" />
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
              })} />
            </div>
          </div>
        </section>
      </SfdcFlexCenter>
    )
}

export default newRow