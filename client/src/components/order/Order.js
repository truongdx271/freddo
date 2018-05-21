import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getTrueOrders } from '../../actions/orderActions';

import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import InvoiceGrid from '../common/InvoiceGrid';
import Dialog from 'material-ui/Dialog';
import moment from 'moment';

class Order extends Component {
  state = {
    open: false,
    currentOrder: {}
  };

  formatCurrency(x) {
    return x.toLocaleString('vn-VI');
  }

  handleOpen(id) {
    const { all } = this.props.order;
    let order = all.find(item => item._id === id);
    this.setState({ open: true, currentOrder: order });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.props.getTrueOrders();
  }

  buttonFormatter(cell, row, rowIndex) {
    return (
      <div className="m-auto text-center">
        <RaisedButton
          label="View"
          primary={true}
          onClick={() => {
            this.handleOpen(row._id);
          }}
        />
      </div>
    );
  }

  render() {
    const { all, loading } = this.props.order;

    const columns = [
      {
        dataField: '_id',
        text: 'id'
      },
      {
        dataField: 'table',
        headerClasses: 'text-center',
        headerStyle: { width: '10%' },
        text: 'Table',
        filter: textFilter()
      },
      {
        dataField: 'user',
        text: 'User',
        headerClasses: 'text-center',
        headerStyle: { width: '20%' },
        filter: textFilter()
      },
      {
        dataField: 'billdate',
        text: 'Date',
        headerClasses: 'text-center'
      },
      {
        dataField: 'total',
        text: 'Total',
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
        // this.props.activeUser(row);
        console.log(row);
      }
    };

    let orderTable;
    if (all === null || loading) {
      orderTable = <Spinner />;
    } else {
      let orderArr = [];

      orderArr = all.map(item => {
        const userObj = {};
        userObj._id = item._id;
        userObj.user = item.user.name;
        userObj.table = item.table.name;
        userObj.billdate = moment(item.billdate).format('DD/MM/YYYY hh:mm');
        userObj.total = this.formatCurrency(item.total);
        return userObj;
      });

      orderTable = (
        <BootstrapTable
          keyField="_id"
          data={orderArr}
          striped
          columns={columns}
          pagination={paginationFactory()}
          rowEvents={rowEvents}
          filter={filterFactory()}
        />
      );
    }

    const actions = [
      <FlatButton label="Close" primary={true} onClick={this.handleClose} />
    ];

    return (
      <div className="container">
        <div className="row mb-3">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">COMPLETED ORDER</h1>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-4" />
        </div>
        <div className="row">
          <div className="col-md-12">{orderTable}</div>
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            <InvoiceGrid order={this.state.currentOrder} />
          </Dialog>
        </div>
      </div>
    );
  }
}

Order.propTypes = {
  getTrueOrders: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  order: state.order
});

export default connect(mapStateToProps, {
  getTrueOrders
})(Order);
