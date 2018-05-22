import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import {
  getImportitems,
  activeImportItem,
  deleteImportItem
} from '../../actions/importActions';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

class Import extends Component {
  onDeleteClick(id) {
    this.props.deleteImportItem(id);
    // console.log(id);
  }

  componentDidMount() {
    this.props.getImportitems();
  }

  buttonFormatter(cell, row, rowIndex) {
    return (
      <div className="m-auto text-center">
        <Link to="/edit-importitem">
          <RaisedButton label="Edit" primary={true} />
        </Link>{' '}
        <RaisedButton
          label="DELETE"
          secondary={true}
          onClick={() => {
            if (window.confirm('Are you sure you wish to delete this item?'))
              this.onDeleteClick(row._id);
          }}
        />
      </div>
    );
  }

  render() {
    const { importitems, loading } = this.props.import;

    const columns = [
      {
        dataField: 'code',
        text: 'Product code',
        headerClasses: 'text-center',
        headerStyle: { width: '18%' },
        filter: textFilter()
      },
      {
        dataField: 'name',
        text: 'Product Name',
        headerClasses: 'text-center',
        headerStyle: { width: '18%' },
        filter: textFilter()
      },
      {
        dataField: 'description',
        text: 'Description',
        headerStyle: { width: '18%' },
        headerClasses: 'text-center'
        // filter: textFilter()
      },
      {
        dataField: 'unit',
        text: 'Unit',
        headerClasses: 'text-center'
        // filter: textFilter()
      },
      {
        dataField: 'price',
        text: 'Price',
        headerClasses: 'text-center'
        // filter: textFilter()
      },
      {
        dataField: 'quantity',
        headerClasses: 'text-center',
        text: 'Quantity'
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
        let importitem = {};
        importitem.code = row.code;
        importitem.date = row.date;
        importitem.description = row.description;
        importitem.quantity = String(row.quantity);
        importitem.price = String(row.price);
        importitem.name = row.name;
        importitem.unit = row.unit;
        importitem._v = row._v;
        importitem._id = row._id;
        importitem.group = row.group._id;

        this.props.activeImportItem(importitem);
      }
    };

    let importitemtable;
    if (importitems === null || loading) {
      importitemtable = <Spinner />;
    } else {
      importitemtable = (
        <BootstrapTable
          keyField="code"
          data={importitems}
          striped
          columns={columns}
          pagination={paginationFactory()}
          rowEvents={rowEvents}
          filter={filterFactory()}
        />
      );
    }

    return (
      <div className="container">
        <div className="row mb-3">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Import Menu</h1>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-4">
            <Link to="/create-importitem">
              <RaisedButton label="Create New" backgroundColor="#448AFF" />
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">{importitemtable}</div>
        </div>
      </div>
    );
  }
}

Import.propTypes = {
  activeImportItem: PropTypes.func.isRequired,
  getImportitems: PropTypes.func.isRequired,
  deleteImportItem: PropTypes.func.isRequired,
  import: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  import: state.import
});

export default connect(mapStateToProps, {
  getImportitems,
  activeImportItem,
  deleteImportItem
})(Import);
