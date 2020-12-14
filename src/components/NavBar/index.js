import React, {Component} from 'react';
import {
  Icon,
  IconSettings,
  AppLauncher,
  GlobalNavigationBar,
  GlobalNavigationBarRegion,
  ProgressBar,
  ScopedNotification,
  GlobalHeaderProfile,
  GlobalHeader,
  Popover
} from '@salesforce/design-system-react';

import { NavContainer } from './styles';
import NavigationBarLink from './NavigationBarLink';
import { withRouter } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import { setCookie } from '../../utils/cookie';

const HeaderProfileCustomContent = (props) => (
  <div id="header-profile-custom-popover-content">
    <div className="slds-m-around_medium">
      <div className="slds-tile slds-tile_board slds-m-horizontal_small">
        <div className="slds-tile__detail">
          <p className="slds-truncate">
            <a onClick={props.onClick}>
              Log Out Tracker
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
);
HeaderProfileCustomContent.displayName = 'HeaderProfileCustomContent';


class NavBar extends Component{
  state = {
    tableauUrl: '/',
    progress:{active:false, percentage: 0},
    notification:{active:false, message:'', type: '', icon: '' }
  };

  onClickLogout = e => {
    e.preventDefault();

    localStorage.removeItem('userId');
    setCookie('userid', null, 0);
    setCookie('token', null, 0);
    setCookie('role', null, 0);
    document.location.replace('/logout');
  }

  configUrls(data){
    this.setState({
      tableauUrl: data.tablaeu
    },
    ...this.state);
  }

  fileUpload = (e) => {
    this.setState({progress:{active: true}});
    console.log(e.target.files)
    let number = 0
    let interval = setInterval(() => {
      this.setState({progress:{active: true, percentage: number}});
      number += 1
      if(this.state.progress.percentage === 101) {
        this.setState({progress:{active: false, percentage: 0}});
        this.handleNotification(true, "CSV file Uploaded successfully", "success", "success");
        clearInterval(interval);
      }
    }, 20);
  }

  handleNotification = (active, message, type, icon) => {
    this.setState({notification:{active, message, type, icon}});
    setTimeout(() => {
      this.setState({notification:{active: false, message: '', type: '', icon: ''}});
    }, 4000);
  }

  async getConfig(){
    try{
      let response = await fetch('/config');
      let data = await response.json();
      response.status === 200 && this.configUrls(data);

    } catch(e) {
      console.error('ERROR: cannot get the url config: ', e);
    }
  }

  componentDidMount() {
    this.getConfig();
  }

  render(){
    return (
      <NavContainer>
        <IconSettings iconPath="/assets/icons">
          <GlobalHeader logoSrc='assets/images/logo.svg' >
            <GlobalHeaderProfile
              avatar='/images/avatar.png'
              userName={getCookie('userName').replaceAll('"','')}
              popover={
                <Popover
                  ariaLabelledby="nav-heading"
                  body={<HeaderProfileCustomContent onClick={this.onClickLogout} />}
                  id="header-profile-popover-id"
                />
            } />
          </GlobalHeader>
          {this.props.match.path !== "/home" && (
            <GlobalNavigationBar>
              <GlobalNavigationBarRegion region="primary">
                <AppLauncher triggerName="Activity Tracker">
                  Activity Tracker
                </AppLauncher>
              </GlobalNavigationBarRegion>
              <GlobalNavigationBarRegion region="secondary" navigation>
                <NavigationBarLink to="/home" title="Home" />
                <NavigationBarLink to="/my-activities" title="Activities" />
                {
                  getCookie('role').replaceAll('"','') === 'admin' && <NavigationBarLink to="/programs-view" title="Programs" />
                }
                {this.state.tableauUrl !== '/' && <NavigationBarLink title="Go to reports" href={this.state.tableauUrl}/>}

              </GlobalNavigationBarRegion>
            </GlobalNavigationBar>
          )}
          {this.state.progress.active && <ProgressBar color="success" className="progress-bar" value={this.state.progress.percentage ? this.state.progress.percentage : 0} />}
          {this.state.notification.active && <ScopedNotification
            icon={
              <Icon
                assistiveText={{
                  label: 'Success',
                }}
                category="utility"
                name={this.state.notification.icon}
                size="small"
                inverse={true}
              />
            }
            className={`slds-notification-bar slds-box slds-box_x-small slds-align_absolute-center progress-bar slds-box slds-theme_shade slds-theme_alert-texture slds-theme_${this.state.notification.type}`}
            >
            {this.state.notification.message}
          </ScopedNotification>}
        </IconSettings>
      </NavContainer>
    )
  }
}

export default withRouter(NavBar);
