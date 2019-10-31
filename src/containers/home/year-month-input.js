import React from 'react';
import { connect } from 'redux-bundler-react';
class YearMonthInput extends React.Component{
    constructor(props){
        super(props)
        this.onblur = this.onblur.bind(this)
    }
    onblur(eventArgs){
        const { doSetYearMonth  } = this.props;
        doSetYearMonth(eventArgs.target.value)
        
    }
    render(){
        return (
            <div className="form-group">
              <label className="col-form-label" htmlFor="inputYearMonth">Please set the Year and Month (YYYY-MM)</label>
              <input type="text" className="form-control" placeholder="2013-01" id="inputYearMonth" onBlur={(e)=> this.onblur(e)}/>
            </div>
        )
    }
}

export default connect(
    'doSetYearMonth',
    YearMonthInput 
);