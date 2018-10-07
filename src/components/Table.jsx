import React, {Component} from 'react';

class Table extends Component {
  constructor(props) {
    super(props);
    if(!this.props.fields) {
      this.props.fields = this.props.data.keys();
    }
    this.sortStates = {};
    this.props.fields.map(elm => this.sortStates[`th_${elm}`] = -1);
    this.state = this.sortStates;
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            {this.props.fields.map(
              (elm) => (
                <th key={elm} className="align-middle"
                  id={`th_${elm}`} 
                  title="Сортировать" 
                  style={{cursor: 'pointer'}} 
                  onClick={this.sortRow}>
                    {this.props.labels && this.props.labels[elm] || elm}
                    {this.state[`th_${elm}`] >= 0 &&
                      (this.state[`th_${elm}`] == 0 ? <i className="fas fa-caret-down pl-1"></i>: 
                        <i className="fas fa-caret-up pl-1"></i>)}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody onClick={this.onClickRow}>
          {this.props.data.map(
            (row, i) => (
              <tr className="table__row" key={row.id || `row_${i}`} id={`row_${i}`} title="Открыть">
                {this.props.fields.map(
                  (col) => (
                    <td key={col}>{row[col]}</td>
                  )
                )}
              </tr>
            )
          )}
        </tbody>
      </table>
    )
  }

  sortRow = event => {
    let key = event.target.id;
    let newOrder = (this.state[key]+1) % 2;
    let colName = key.split('_')[1];
    if(newOrder>=0) {
      this.props.data.sort(
        (a, b) => {
          if(a[colName]>b[colName]) {
            return newOrder?1:-1;
          }
          if(a[colName]<b[colName]) {
            return newOrder?-1:1;
          }
          return 0;
        }
      )
    }
    this.setState(Object.assign({}, this.sortStates, {[key]: newOrder}));
  }

  onClickRow = event => {
    if(this.props.onClickRow) {
      this.props && this.props.onClickRow(this.props.data[$(event.target).parent("tr")[0].id.split('_')[1]])
    }
  }
}

export default Table;