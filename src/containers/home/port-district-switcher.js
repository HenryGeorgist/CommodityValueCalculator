import React from 'react';
import {connect} from 'redux-bundler-react';
import classnames from 'classnames';

class PortDistrictSwitcher extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            expanded: false
        }
        this.toggleExpanded = this.toggleExpanded.bind(this);
    }
    toggleExpanded(){
        this.setState({
            expanded: !this.state.expanded
        })
    }
    render(){
        const {expanded} = this.state;
        const {portOrDistrict, portList, districtList, shouldUsePorts, doSetPortOrDistrictCode} = this.props;
        const dropdownStyle = {
            position: 'absolute',
            top:0,
            left:0,
            transform: 'translate3d(0px, 35px, 0px'
        }
        const containerClass = classnames({
            "btn-group": true,
            "show" : expanded,
            "mr-2" : true
        })
        const dropdownClass = classnames({
            "dropdown-menu": true,
            "show" : expanded,
        })
        var listItems = null;
        var data = null;
        if(shouldUsePorts){
            listItems = portList;
        }else{
            listItems = districtList;
        }
        data = Object.keys(listItems).map((k,i)=>{
            return{
                code: k,
                name: listItems[k],
                value: k + ": " + listItems[k]
            }
        })
        return (

            <div className={containerClass} >
                <button type="button" className="btn btn-info dropdown-toggle" onClick={this.toggleExpanded}>
                    {portOrDistrict}
                </button>
                <div className={dropdownClass} style = { dropdownStyle}>
                {
                        data.map((item, i) => {
                            return (
                                <div
                                    key= {item.code}
                                    className= "dropdown-item"
                                    onClick={() =>{
                                        doSetPortOrDistrictCode(item.value);
                                        this.toggleExpanded();
                                    }}
                                    >
                                    {item.value}
                                    </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
export default connect(
    'selectPortOrDistrict',
    'selectShouldUsePorts',
    'selectPortList',
    'selectDistrictList',
    'doSetPortOrDistrictCode',
    PortDistrictSwitcher
)