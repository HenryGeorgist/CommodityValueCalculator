import React from 'react';
import { connect } from 'redux-bundler-react';
class HsNaicsInput extends React.Component{
    constructor(props){
        super(props)
        this.onblur = this.onblur.bind(this)
    }
    onblur(eventArgs){
        const { doSetNaicsCode, doSetHsCode, shouldUsePorts  } = this.props;

        //ports go with hs.
        if(shouldUsePorts){
            doSetHsCode(eventArgs.target.value);
        }else{
            doSetNaicsCode(eventArgs.target.value)
        }
        
    }
    render(){
        const { shouldUsePorts  } = this.props;
        var message = "Please provide your "
        if(shouldUsePorts){
            message += "HS code"
        }else{
            message += "NAICS code"
        }
        return (
            <div className="form-group">
              <label className="col-form-label" htmlFor="inputNAICS_HS">{message}</label>
              <input type="text" className="form-control" placeholder="code" id="inputNAICS_HS" onBlur={(e)=> this.onblur(e)}/>
            </div>
        )
    }
}

export default connect(
    'doSetNaicsCode',
    'doSetHsCode',
    'selectShouldUsePorts',
    HsNaicsInput
);