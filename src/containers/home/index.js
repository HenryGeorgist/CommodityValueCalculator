import React from 'react';

import { connect } from 'redux-bundler-react';
import BasicTable from '../tables/basicTable';
import TogglePortsButton from './togglePortButton'
import PortDistrictSwitcher from './port-district-switcher'
import KeyInput from './citysdk-key-input'
import CodeInput from './hs-naics-input'
import YearMonthInput from './year-month-input'
class Home extends React.Component {
  render(){
    const {doSetFetchState} = this.props;
    
    return (
      <div className="container">
        <div className="card bg-light m-5">
          <div className="card-body">
            <h2>Welcome to Value Calculator</h2>
            <br/>
            <KeyInput/>
          </div>
        </div>
        <div className="container">
          <div className="container-fluid mt-3">
            <div className="float-left">
              <TogglePortsButton btnText="Ports" toolTip="Select by Ports"/>
              <TogglePortsButton btnText="Districts" toolTip="Select by Districts"/>
            </div>
          </div>
          <div className="container-fluid mt-3 float-left">
            <CodeInput/>
          </div>
          <div className="container-fluid mt-3 float-left">
            <PortDistrictSwitcher/>
          </div>
          <div className="container-fluid mt-3 float-left">
            <YearMonthInput/>
          </div>


          <div className="container-fluid mt-3 float-left">
            <button className="btn btn-info" onClick={()=>{ doSetFetchState(true)}}>
              Create Report
            </button>
          </div>
        </div>
        <div className="container">
          <BasicTable/>
        </div>
      </div>
    )
  }
}

export default connect(
  'doSetFetchState',
  Home
  );