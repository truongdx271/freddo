import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import {
  getTables,
  activeTable,
  deleteTable
} from '../../actions/tableActions';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

class Table extends Component {
  onDeleteClick(id) {
    this.props.deleteTable(id);
    // console.log(id);
  }

  componentDidMount() {
    this.props.getTables();
  }

  buttonFormatter(cell, row, rowIndex) {
    return (
      <div className="m-auto text-center">
        <Link to="/edit-table">
          <RaisedButton label="Edit" primary={true} />
        </Link>{' '}
        <RaisedButton
          label="DELETE"
          secondary={true}
          onClick={() => {
            if (window.confirm('Are you sure you wish to delete this table?'))
              this.onDeleteClick(row._id);
          }}
        />
      </div>
    );
  }

  render() {
    const { tables, loading } = this.props.table;

    const columns = [
      {
        dataField: '_id',
        text: 'id',
        hidden: true
      },
      {
        dataField: 'name',
        headerClasses: 'text-center',
        text: 'Table Name',
        filter: textFilter()
      },
      {
        dataField: 'section',
        text: 'Section',
        headerClasses: 'text-center'
      },
      {
        dataField: 'action',
        headerClasses: 'text-center',
        text: 'Action',
        formatter: this.buttonFormatter.bind(this)
      }
    ];

    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        this.props.activeTable(row);
      }
    };

    let tableTable;
    if (tables === null || loading) {
      tableTable = <Spinner />;
    } else {
      tableTable = (
        <BootstrapTable
          keyField="_id"
          data={tables}
          striped
          columns={columns}
          pagination={paginationFactory()}
          rowEvents={rowEvents}
          filter={filterFactory()}
          // rowClasses="align-middle"
        />
      );
    }

    return (
      <div className="container">
        <div className="row mb-3">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Table</h1>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-4">
            <Link to="/create-table">
              <RaisedButton label="Create New" backgroundColor="#448AFF" />
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">{tableTable}</div>
        </div>
      </div>
    );
  }
}

Table.propTypes = {
  getTables: PropTypes.func.isRequired,
  deleteTable: PropTypes.func.isRequired,
  activeTable: PropTypes.func.isRequired,
  table: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  table: state.table
});

export default connect(mapStateToProps, {
  getTables,
  activeTable,
  deleteTable
})(Table);
