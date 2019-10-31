import React from 'react';
import { connect } from 'redux-bundler-react';

class BasicTableHeader extends React.Component {
  render(){
        const {exportOutput} = this.props;
        if(!exportOutput) return null;
        const vals = Object.keys(exportOutput[0]).map((key,i)=>{
            return{
                header: key
            }
        })
    return (

          <thead>
            <tr>
                {
                    vals.map((h,i) =>{
                        return(
                            <th key={i}>
                                {h.header}
                            </th>
                        )
                    })
                }
            </tr>
          </thead>
    )
  }
}

export default connect(
    'selectExportOutput',
  BasicTableHeader
  );