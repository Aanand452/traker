import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import {
  Combobox,
  comboboxFilterAndLimit,
  Icon,
  Input,
  Datepicker,
  Button,
  Textarea,
  Toast,
  ToastContainer,
  IconSettings,
  Checkbox,
} from '@salesforce/design-system-react';

import { getCookie } from '../../../utils/cookie';
import { getAPIUrl } from '../../../config/config';

import { PillContianerStyled, InputIconStyled } from '../styles';

class Step2 extends Component {
  state = {
    formats: [],
    toast: {
      variant: 'error',
      heading: 'Something went wrong',
      duration: 5000,
      active: false,
      selection: [],
      inputValue: '',
      InputList: [],
    }
  };

  componentDidMount() {
    this.setupAndFetch();
  }

  addInput = () => {
    this.props.addAsset(this.props.row.asset);
    // this.state.InputList.push(<Input />)
  }

  setupAndFetch = async () => {
    if(window.location.hostname === 'localhost') this.API_URL =  "http://localhost:3000/api/v1";
    else this.API_URL = await getAPIUrl();
    // this.setState({selection: this.assetType[1]})
    this.getFormats();
  }

  async getFormats() {
    try {
      let token = getCookie('token').replaceAll('"','');
      const config = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      const request = await fetch(`${this.API_URL}/format`, config);

      if(request.status === 200) {
        let { result } = await request.json();
        let formats = result.map(item => ({...item, id: item.format_id, label: item.name}));
        this.setState({ formats });
      } else throw new Error(request);
    } catch (err) {
      this.setState({toast: {...this.state.toast, active: true}});
      console.error(err);
    }
  }

  checkEndDate = (date) => {
    const endDate = moment(this.props.row.endDate,'DD/MM/YYYY');
    if(!date) return;
    return endDate.isBefore(date.date)
  }

  checkStartDate = (date) => {
    const starDate = moment(this.props.row.startDate,'DD/MM/YYYY');
    if(!date) return;
    return starDate.isAfter(date.date)
  }

  assetType = [
    {id:'1', label:'Home Page', subTitle: 'Home Page', type: 'topic', icon: (
			<Icon
				assistiveText={{ label: 'Asset' }}
				category="utility"
				name='topic'
			/>
		),}, {id:'2', label:'Registration Form', subTitle: 'Registration Form', type: 'topic', icon: (
			<Icon
				assistiveText={{ label: 'Asset' }}
				category="utility"
				name='topic'
			/>
		),}, {id: '3', label:'Login Page', subTitle: 'Login Page', type: 'topic', icon: (
			<Icon
				assistiveText={{ label: 'Asset' }}
				category="utility"
				name='topic'
			/>
		),}
  ]

  render() {
    return (
      <Fragment>
        {
          this.state.toast.active && (<IconSettings iconPath="/assets/icons">
            <ToastContainer>
              <Toast
                labels={{ heading: this.state.toast.heading }}
                variant={this.state.toast.variant}
                duration={this.state.toast.duration}
                onRequestClose={() => this.setState({toast: {active: false}})}
              />
            </ToastContainer>
          </IconSettings>)
        }
        <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
          <Input
            placeholder="Enter campaign id"
            label="Campaign Id"
            onChange={(event, data) => this.props.handleChange("campaignId", data.value)}
            value={this.props.row.campaignId}
            maxLength="18"
          />
        </div>
        <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
          <Combobox
            events={{onSelect: (event, data) => data.selection.length && this.props.handleChange("format", data.selection)}}
            labels={{label: 'Format'}}
            name="format"
            options={this.state.formats}
            selection={this.props.row.format}
            value="format"
            variant="readonly"
            errorText={this.props.error.format}
          />
        </div>
        <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-form-element">
          <label className="slds-form-element__label">
            <abbr className="slds-required" title="required">*</abbr>Title
          </label>
          <Input
            errorText={this.props.error.title}
            placeholder="Enter title"
            value={this.props.row.title}
            onChange={(event) => this.props.handleChange("title", event.target.value)}
          />
        </div>
        <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-form-element">
          <label className="slds-form-element__label">
            <abbr className="slds-required" title="required">*</abbr>Abstract
          </label>
          <Textarea
            errorText={this.props.error.abstract}
            placeholder="Enter abstract"
            value={this.props.row.abstract}
            onChange={(event) => this.props.handleChange("abstract", event.target.value)}
          />
        </div>
        <div className={`slds-col slds-size_1-of-4 slds-form-element ${this.props.error.startDate && "slds-has-error"}`}>
          <label className="slds-form-element__label">
            <abbr className="slds-required" title="required">*</abbr>Start date
          </label>
          <Datepicker
            triggerClassName="slds-col slds-size_1-of-1"
            onChange={(event, data) => this.props.handleChange("startDate", data.formattedDate)}
            formatter={(date) => date ? moment(date).format('DD/MM/YYYY') : ''}
            parser={(dateString) => moment(dateString, 'DD/MM/YYYY').toDate()}
            formattedValue={this.props.row.startDate}
            dateDisabled={this.checkEndDate}
          />
          {this.props.error.startDate && <div className="slds-form-element__help">{this.props.error.startDate}</div>}
        </div>
        <div className={`slds-col slds-size_1-of-4 slds-form-element ${this.props.error.endDate && "slds-has-error"}`}>
          <label className="slds-form-element__label">
            <abbr className="slds-required" title="required">*</abbr>End date
          </label>
          <Datepicker
            triggerClassName="slds-col slds-size_1-of-1"
            onChange={(event, data) => this.props.handleChange("endDate", data.formattedDate)}
            formatter={(date) => date ? moment(date).format('DD/MM/YYYY') : ''}
            parser={(dateString) => moment(dateString, 'DD/MM/YYYY').toDate()}
            formattedValue={this.props.row.endDate}
            dateDisabled={this.checkStartDate}
          />
          {this.props.error.endDate && <div className="slds-form-element__help">{this.props.error.endDate}</div>}
        </div>
        <div className={`slds-col slds-size_1-of-6 slds-form-element`} style={{width: '20%'}}>
          <Combobox
            events={{
              onChange: (event, { value }) => {
                this.setState({ inputValue: value });
              },
              onRequestRemoveSelectedOption: (event, data) => {
                this.setState({
                  inputValue: '',
                  selection: data.selection,
                });
              },
              onSubmit: (event, { value }) => {
                this.setState({
                  inputValue: '',
                  selection: [
                    ...this.state.selection,
                    {
                      label: value,
                      icon: (
                        <Icon
                          assistiveText={{ label: 'Account' }}
                          category="utility"
                          name="topic"
                        />
                      ),
                    },
                  ],
                });
              },
              onSelect: (event, data) => {
                this.props.handleChange("assetType", data.selection.label)
                this.setState({
                  inputValue: '',
                  selection: data.selection,
                });
              },
            }}
            labels={{
              label: 'Select Asset Type',
              placeholder: 'Asset Type',
            }}
            options={comboboxFilterAndLimit({
              inputValue: this.state.inputValue,
              options: this.assetType,
              selection: [],
            })}
            menuItemVisibleLength={5}
            selection={this.state.selection}
            value={
              this.state.selection
                ? ''
                : this.state.inputValue
            }
            variant="inline-listbox"
          />
        {
            !!this.props.assets.length && !!this.props.assetsType &&(
              <PillContianerStyled
                options={this.props.assets}
                onClickPill={(e, data) => {
                  this.props.editAsset(data.option.label);
                }}
                onRequestRemovePill={(e, data) => {
                  this.props.deleteAsset(data.option.label);
                }}
              />
            )
          }
        </div>
        <div className={`slds-col slds-size_1-of-6 slds-form-element`} style={{width: '27%'}}>
          <Input
            // iconRight={
            //   <InputIconStyled
            //     assistiveText={{
            //       icon: 'add',
            //     }}
            //     name="add"
            //     category="utility"
            //     onClick={() => {
            //       this.props.addAsset(this.props.row.asset);
            //     }}
            //     disabled={!!this.props.error.asset || !this.props.row.asset}
            //   />
            // }
            placeholder="Insert a valid URL here"
            onChange={(event, data) => this.props.handleChange("asset", data.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if(!!this.props.error.asset || !this.props.row.asset) {
                  return;
                }
                this.props.addAsset(this.props.row.asset);
              }
            }}
            value={this.props.row.asset}
            label="Asset"
            errorText={this.props.error.asset}
          />
        </div>
        <div className={`slds-col slds-size_1-of-6 slds-form-element`} style={{width: '3%', paddingTop: '28px'}}>
          <Button onClick={this.addInput}
            assistiveText={{ icon: 'Icon Bare Small' }}
						iconCategory="utility"
						iconName="add"
						iconSize="small"
						iconVariant={(!!this.props.error.asset || !this.props.row.asset || !this.props.assetType) ? "bare" : 'border-filled'}
            disabled={!!this.props.error.asset || !this.props.row.asset || !this.props.assetType }
						variant="icon"
            />
        </div>
        

        <div className="slds-m-bottom_large slds-col slds-size_1-of-1">
          <Checkbox
            assistiveText={{
              label: 'Default',
            }}
            id="customer-mkt"
            labels={{
              label: 'Customer marketing',
            }}
            onChange={e => {
              this.props.handleChange("customerMarketing", e.target.checked)
            }}
          />
        </div>
        <div className="slds-col slds-size_1-of-1">
          <Button label="Go back" onClick={() => this.props.handleStep(1)} />
          <Button label="Save" variant="brand" type="submit" />
        </div>
      </Fragment>
    )
  };
};

export default withRouter(Step2);
