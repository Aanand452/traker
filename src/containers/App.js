import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import ComponentHeader from '../containers/ComponentHeader';
import FilteredProductList from '../containers/FilteredProductList';
import ProductsFilterBar from '../containers/ProductsFilterBar';
import PricelistUpload from '../containers/PricelistUpload';
import NotFoundPage from '../containers/NotFoundPage';
import Auth from '../containers/Auth';
import { toggleSettingsMenu } from '../actions';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { css } from 'glamor';

/**
 * App Container:
 * Handles the app routing and double checks
 * authentication (for showing Devs auth component)
 */

const appStyle = css({
  '@media(max-width: 767px)': {
    marginLeft: '0',
    marginRight: '0',
    paddingRight: '0',
    paddingLeft: '0',
    marginTop: '78px',
    minWidth: '357px',
    height: '100%'
  },
  minHeight: '300px',
  minWidth: '1145px',
  marginTop: '70px'
});

const listStyle = css({
  '@media(max-width: 767px)': {
    height: '100%'
  }
});

function List() {
  return (
    <div className={`${listStyle}`}>
      <ComponentHeader />
      <div
        style={{ minHeight: '300px' }}
        className={`slds-text-color_default slds-panel
        slds-p-horizontal_large slds-p-top_xx-small slds-p-bottom_medium
        slds-m-vertical_medium slds-m-horizontal_xx-large ${appStyle}`}
      >
        <ProductsFilterBar />
        <FilteredProductList />
      </div>
    </div>
  );
}

function App({closeSettingsMenu, user}) {
  if (user) {
    return (
      <Router>
        <div className="app" onClick={closeSettingsMenu}>
          <Header />
          <Switch>
            <Route exact path="/" component={List} />
            <Route exact path="/home" component={List} />
            <Route exact path="/upload" component={PricelistUpload} />
            <Route exact path="*" component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    );
  } else {
    return <Auth />;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeSettingsMenu() {
      dispatch(toggleSettingsMenu(false));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
