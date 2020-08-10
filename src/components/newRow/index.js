import React, { useState } from 'react';
import CreateNewRow from '../CreateNewRow';
import {
  IconSettings,
  Panel,
  Button
} from '@salesforce/design-system-react';
import {
  SfdcFlexPaddingTop,
  Sfdch1NewRow
} from './styles';
import { useHistory  } from 'react-router-dom'

const newRow = () => {
  const history = useHistory();
  const [row, setRow] = useState({})

  const getFormData = (data) => {
    console.log(data)
    setRow({row: data})
  }

  const table = e => {
    e.preventDefault();
    history.push('/my-report')
  }

  const onSubmit = e =>{
    e.preventDefault();
    history.push({
      pathname: '/my-report',
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
      <SfdcFlexPaddingTop>
        <section className="slds-grid slds-wrap">
          <div className="slds-col slds-size_1-of-2">
            <IconSettings iconPath="/assets/icons">
              <Panel>
                <div className="slds-grid slds-wrap slds-p-around_medium slds_full-width">
                  <div className="slds-col slds-size_12-of-12">
                    <Sfdch1NewRow>Create new row</Sfdch1NewRow>
                    <CreateNewRow
                        getFormData = {getFormData}
                        abstract = {'"To help infuse our Salesforce community with joy and inspiration, today we launched our #FeelGoodFridays series across our social channels. 🙌The aim of this series is to share how our community is keeping spirits high with positive vibes every week. Our first #FeelGoodFriday story is about one of our education Trailblazers, A Team Tuition. No doubt, many of us can relate to Hayden’s story of being stereotyped at school as a particular type of learner. Well, Hayden has turned this on its head with his business A Team Tuition."'}
                    />
                    <Button label="Cancel" onClick={e => table(e)}/>
                    <Button label="Save" variant="brand" onClick={e => table(e)} />
                  </div>
                </div>
              </Panel>
            </IconSettings>
          </div>
        </section>
      </SfdcFlexPaddingTop>
    )
}

export default newRow