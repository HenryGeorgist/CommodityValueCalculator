import React from 'react';
import { connect } from 'redux-bundler-react';
import classnames from 'classnames';
class TogglePortButton extends React.Component{
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(){
        const { doSetUsePortState, shouldUsePorts} = this.props;
        doSetUsePortState(!shouldUsePorts)
    }
    render(){
        const {btnText, toolTip, shouldUsePorts} = this.props
        var active = false;
        if(btnText==="Ports"){
            active = shouldUsePorts
        }else{
            active = !shouldUsePorts
        }
        const btnClass = classnames({
            "btn": true,
            "btn-info": !active,
            "btn-warning": active,
            "mr-2": true
        })
        return (
            <button onClick={ this.handleClick } className={ btnClass} title= {toolTip}>
                {btnText}
            </button>
        )
    }
}

export default connect(
    'selectShouldUsePorts',
    'doSetUsePortState',
    TogglePortButton
);