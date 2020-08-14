import React, {useState} from 'react';
import {
  Icon,
  IconSettings,
  AppLauncher,
  Popover,
  GlobalHeader,
  GlobalHeaderButton,
  GlobalHeaderProfile,
  GlobalNavigationBar,
  GlobalNavigationBarRegion,
  ProgressBar,
  ScopedNotification,
  GlobalNavigationBarDropdown
  
} from '@salesforce/design-system-react';

import { NavContainer } from './styles';
import NavigationBarLink from './NavigationBarLink';
import { useHistory  } from 'react-router-dom';

const HeaderProfileCustomContent = (props) => (
  <div id="header-profile-custom-popover-content">
    <div className="slds-m-around_medium">
      <div className="slds-tile slds-tile_board slds-m-horizontal_small">
        <p className="tile__title slds-text-heading_small">User Name</p>
        <div className="slds-tile__detail">
            <p className="slds-truncate">
            <a
              className="slds-m-right_medium"
              href="javascript:void(0)"
              onClick={props.onClick}
            >
              Settings
            </a>
            <a href="javascript:void(0)" onClick={props.onClick}>
              Log Out
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
);
HeaderProfileCustomContent.displayName = 'HeaderProfileCustomContent';

const NavBar = () => {
  const history = useHistory();

  let [progress, setProgress] = useState({active: false, percentage: 0});
  let [notification, setNotification] = useState({active: false, message: '', type: '', icon: ''});

  const toHome = e => {
    e.preventDefault();
    history.push('/home')
  }

  const fileUpload = (e) => {
    setProgress({active: true});
    console.log(e.target.files)
    let interval = setInterval(() => {
      setProgress({active: true, percentage: progress.percentage++});
      if(progress.percentage === 101) {
        setProgress({active: false, percentage: 0});
        handleNotification(true, "CSV file Uploaded successfully", "success", "success");
        clearInterval(interval);
      }
    }, 20);
  }

  const handleNotification = (active, message, type, icon) => {
    setNotification({active, message, type, icon});
    setInterval(() => {
      setNotification({active: false, message: '', type: '', icon: ''});
    }, 5000);
  }

  return (
  <NavContainer>
    <IconSettings iconPath="/assets/icons">
      <GlobalHeader
        logoSrc='assets/images/logo.svg'
      >
        <GlobalHeaderButton onClick={toHome}>
          <Icon
            assistiveText={{ label: 'Add Registry' }}
            category="utility"
            name="add"
            size="x-small"
          />
        </GlobalHeaderButton>
        <GlobalHeaderButton>
          <label className="slds_cursor-pointer" htmlFor="uploadCSV" id="file-selector-secondary-label">
            <Icon
              assistiveText={{ label: 'Upload CSV' }}
              category="utility"
              name="upload"
              size="x-small"
              style={{cursor:'pointer'}}
            />
          </label>
          <input
            type="file"
            accept=".csv"
            id="uploadCSV"
            onChange={fileUpload}
            className="slds-file-selector__input slds-assistive-text" 
            aria-labelledby="file-selector-secondary-label"
          />
        </GlobalHeaderButton> 
        {/*<GlobalHeaderButton>
          <Icon
            assistiveText={{ label: 'Error' }}
            category="utility"
            name="error"
            size="x-small"
          />
        </GlobalHeaderButton>
        */}
        <GlobalHeaderProfile 
          popover={
            <Popover
              body={<HeaderProfileCustomContent />}
              id="header-profile-popover-id"
            />
        } />
      </GlobalHeader>
      <GlobalNavigationBar>
        <GlobalNavigationBarRegion region="primary">
          <AppLauncher
            triggerName="SARA"
          />
        </GlobalNavigationBarRegion>
        <GlobalNavigationBarRegion region="secondary" navigation>
          <NavigationBarLink to="/home" title="Home" />
          <NavigationBarLink to="/my-view" title="My view" />
          <NavigationBarLink to="/team-view" title="Team view" />
          
        </GlobalNavigationBarRegion>
      </GlobalNavigationBar>
      {progress.active && <ProgressBar color="success" className="progress-bar" value={progress.percentage ? progress.percentage : 0} />}
      {notification.active && <ScopedNotification
        icon={
          <Icon
            assistiveText={{
              label: 'Success',
            }}
            category="utility"
            name={notification.icon}
            size="small"
            inverse={true}
          />
        }
        className={`slds-notification-bar slds-box slds-box_x-small slds-align_absolute-center progress-bar slds-box slds-theme_shade slds-theme_alert-texture slds-theme_${notification.type}`}
				>
          {notification.message}
				</ScopedNotification>}
    </IconSettings>
  </NavContainer>
)};

export default NavBar;