import React from 'react';
import { connect } from 'redux-bundler-react';
import classnames from 'classnames';

class BasicTableRow extends React.Component {
  render(){
    const { payload, isEven} = this.props;
    if(!payload) return null;

    const rowClass = classnames({
        "table-secondary": isEven,
        "table-primary": !isEven,
    })
    const vals = Object.values(payload).map((val,i)=>{
        return{
            value: val
        }
    })
    return (
        <tr className={rowClass}>
            {
                vals.map((h,i) =>{
                    return(
                        <td key={i + "_val"} style={{fontSize:'12px'}}>
                            {h.value}
                        </td>
                    )
                })
            }
        </tr>
    )
  }
}

export default connect(
  BasicTableRow
  );