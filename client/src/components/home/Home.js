import React, { Component } from 'react';
import TableDashboard from '../common/TableDashboard';
import OrderQueue from '../common/OrderQueue';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTables, activeTable } from '../../actions/tableActions';
import {
  getFalseOrders,
  activeOrder,
  getQueueOrders
} from '../../actions/orderActions';

import {
  iotest,
  invoiceUpdate,
  invoiceRequest,
  updateTable,
  onLeaveQueue,
  onInvoiceComplete
} from '../../api';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      refresh: false
    };

    // TEST SOCKET NEW
    // Test socket
    iotest(data => console.log(data));

    // Update table status after create an order
    invoiceUpdate(order => {
      console.log(order);
      this.props.getTables();
      this.props.getFalseOrders();
      this.props.getQueueOrders();
    });

    // Update table status after request to pay
    invoiceRequest(order => {
      console.log(order);
      this.props.getTables();
      // this.props.getFalseOrders());
    });

    // Update table when change table action
    updateTable(table => {
      console.log(table);
      this.props.getTables();
    });

    // update table when leaveQueue
    onLeaveQueue(order => {
      console.log(order);
      this.props.getTables();
    });

    //Update table when complete
    onInvoiceComplete(table => {
      console.log(table);
      this.props.getTables();
    });
  }

  componentDidMount() {
    this.props.getTables();
    this.props.getFalseOrders();
    this.props.getQueueOrders();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.table) {
      console.log(nextProps.table.tables);
    }
  }

  refreshTable = () => {
    this.setState({ refresh: !this.state.refresh });
  };

  render() {
    const { tables } = this.props.table;
    const { orders, queueOrders } = this.props.order;

    return (
      <div className="home">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <h3 className="lead text-center"> TABLE </h3>{' '}
              {/* TableListcontent here */}
              {tables !== null &&
                tables !== undefined &&
                orders !== null &&
                orders !== undefined && (
                  <TableDashboard
                    refresh={this.refreshTable}
                    tables={tables}
                    orders={orders}
                  />
                )}
            </div>
            <div className="col-lg-3">
              <h3 className="lead text-center"> ORDER QUEUE </h3>
              {tables !== null &&
                tables !== undefined &&
                queueOrders !== null &&
                queueOrders !== undefined && (
                  <OrderQueue
                    refresh={this.refreshTable}
                    tables={tables}
                    orders={queueOrders}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  getTables: PropTypes.func.isRequired,
  activeTable: PropTypes.func.isRequired,
  getFalseOrders: PropTypes.func.isRequired,
  getQueueOrders: PropTypes.func.isRequired,
  activeOrder: PropTypes.func.isRequired,
  table: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  table: state.table,
  order: state.order
});

export default connect(mapStateToProps, {
  getTables,
  activeTable,
  getFalseOrders,
  activeOrder,
  getQueueOrders
})(Home);
