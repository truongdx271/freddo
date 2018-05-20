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

class Home extends Component {
  constructor() {
    super();
    this.state = {
      tableArr: []
    };
  }

  componentDidMount() {
    this.props.getTables();
    this.props.getFalseOrders();
    this.props.getQueueOrders();
  }

  render() {
    const { tables } = this.props.table;
    const { orders, queueOrders } = this.props.order;

    return (
      <div className="home">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h3 className="lead text-center"> TABLE </h3>{' '}
              {/* TableListcontent here */}
              {tables !== null &&
                tables !== undefined &&
                orders !== null &&
                orders !== undefined && (
                  <TableDashboard tables={tables} orders={orders} />
                )}
            </div>
            <div className="col-lg-4">
              <h3 className="lead text-center"> ORDER QUEUE </h3>
              {tables !== null &&
                tables !== undefined &&
                queueOrders !== null &&
                queueOrders !== undefined && (
                  <OrderQueue tables={tables} orders={queueOrders} />
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
