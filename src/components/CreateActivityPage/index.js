import React, { useState } from 'react';
import CreateActivity from '../CreateActivity';
import {
  IconSettings,
  Panel,
  Button,
  ProgressBar
} from '@salesforce/design-system-react';
import {
  SfdcFlexPaddingTop,
  Sfdch1NewRow
} from './styles';
import { useHistory  } from 'react-router-dom'

const CreateActivityPage = () => {
  const history = useHistory();
  const [row, setRow] = useState({})

  const getFormData = (data) => {
    setRow({data})
  }

  const table = e => {
    e.preventDefault();
    history.push('/my-view')
  }

  const onSubmit = e =>{
    e.preventDefault();
    history.push({
      pathname: '/my-view',
      newRow:{
        id: 10000,
        theme: row.data.theme[0] && row.data.theme[0].label,
        program: row.data.program[0] && row.data.program[0].label,
        format: row.data.format[0] && row.data.format[0].label,
        persona: row.data.persona[0] && row.data.persona[0].label,
        region: row.data.region[0] && row.data.region[0].label,
        title: row.data.title,
        abstract: row.data.abstract,
        startDate: row.data.startDate,
        endDate: row.data.endDate,
        results: row.data.results,
        asset: row.data.asset
      }
    })
    
  }

    return (
      <SfdcFlexPaddingTop>
        <section className="slds-grid slds-wrap">
          <div className="slds-col slds-size_1-of-1">
            <IconSettings iconPath="/assets/icons">
              <Panel>
                <div className="slds-grid slds-wrap slds-p-around_medium slds_full-width">
                  <div className="slds-col slds-size_12-of-12">
                    <Sfdch1NewRow>Create new activity</Sfdch1NewRow>
                    <CreateActivity
                        customRowClass = {"slds-m-bottom_large slds-col slds-size_1-of-2"}
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

export default CreateActivityPage