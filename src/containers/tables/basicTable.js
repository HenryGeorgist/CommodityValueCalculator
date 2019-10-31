import React from 'react';
import { connect } from 'redux-bundler-react';
import BasicTableHeader from './basicTableHeader'
import BasicTableRow from './basicTableRow'

class BasicTable extends React.Component {
  render(){
    const {exportOutput} = this.props;
    if(!exportOutput) return null;//<p>No data was recieved (response was null)</p>;
    if(exportOutput.length<=0) return <div className="container">No data was recieved (array had zero records)</div>;
    return (
      <div className="container">
        <table className="table table-hover">
          <BasicTableHeader/>
          <tbody>
            {
              exportOutput.map((data, i) =>{
                const n = Number(i);
                const isEven = (n === 0 || !!(n && !(n%2)))
                  return(
                    <BasicTableRow payload={data} key={i} isEven={isEven}/>
                  )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect(
  'selectExportOutput',
  BasicTable
  );