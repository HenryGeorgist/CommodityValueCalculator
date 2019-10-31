import React from 'react';
import { connect } from 'redux-bundler-react';
class CitysdkKeyInput extends React.Component{
    constructor(props){
        super(props)
        this.onblur = this.onblur.bind(this)
    }
    onblur(eventArgs){
        const { doSetCitysdkStatsKey} = this.props;
        console.log(eventArgs.target.value)
        doSetCitysdkStatsKey(eventArgs.target.value)
    }
    render(){
        return (
            <div className="form-group">
              <label className="col-form-label" htmlFor="inputDefault">Please provide a census stats api key</label>
              <input type="text" className="form-control" placeholder="API KEY" id="inputDefault" onBlur={(e)=> this.onblur(e)}/>
            </div>
        )
    }
}

export default connect(
    'doSetCitysdkStatsKey',
    CitysdkKeyInput
);