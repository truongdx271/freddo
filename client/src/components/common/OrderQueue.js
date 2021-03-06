import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GridList, GridTile } from 'material-ui/GridList';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import moment from 'moment';
import Coffee from 'material-ui/svg-icons/places/free-breakfast';
import { updateEmptyTable, getTables } from '../../actions/tableActions';
import {
  getFalseOrders,
  updateOrder,
  getQueueOrders
} from '../../actions/orderActions';

import { leaveQueue } from '../../api';

class OrderQueue extends Component {
  state = {
    open: false,
    currentOrder: {},
    currentTable: {}
  };

  handleOpen = order => {
    const { tables } = this.props;
    let table = tables.find(item => item._id === order.table._id);
    this.setState({ open: true, currentOrder: order, currentTable: table });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleComplete = () => {
    let data = { ...this.state.currentOrder };
    let tableO = { ...this.state.currentTable };
    let listitems = [];
    data.listitems.forEach(item => {
      item.status = true;
      listitems.push(item);
    });
    data.listitems = listitems;

    const orderUpdate = {
      id: data._id,
      amount: data.amount.toString(),
      billdate: data.billdate.toString(),
      custpaid: data.custpaid.toString(),
      discount: data.discount.toString(),
      payback: data.payback.toString(),
      status: data.status,
      total: data.total.toString(),
      table: data.table._id,
      user: data.user._id,
      listitems: JSON.stringify(listitems)
    };

    const tableUpdate = {
      _id: tableO._id,
      name: tableO.name,
      section: tableO.section,
      status: '2'
    };

    // update this order
    this.props.updateOrder(orderUpdate);
    // update this table
    this.props.updateEmptyTable(tableUpdate);
    // get all order
    this.props.getFalseOrders();
    this.props.getQueueOrders();
    // get all table
    this.props.getTables();

    this.props.refresh();

    // push socket to server
    // console.log(data);
    // console.log(tableUpdate);
    // console.log(orderUpdate);
    leaveQueue(data);

    this.setState({ open: false });
  };

  render() {
    const styles = {
      gridList: {
        height: 540,
        overflowY: 'auto'
      }
    };

    const { orders } = this.props;
    let orderQueueContent;

    if (orders) {
      orderQueueContent = (
        <Paper zDepth={2}>
          <GridList cols={1} cellHeight="auto" style={styles.gridList}>
            {orders.map(order => (
              <GridTile key={order._id}>
                <RaisedButton
                  icon={<Coffee />}
                  label={order.table.name.split(' ')[1]}
                  primary={true}
                  fullWidth={true}
                  onClick={() => this.handleOpen(order)}
                />
                <List>
                  {order.listitems.map(
                    item =>
                      !item.status ? (
                        <ListItem
                          key={item._id}
                          primaryText={`${item.name} x${item.quantity}`}
                          secondaryText={moment(item.createAt).fromNow()}
                        />
                      ) : null
                  )}
                </List>
              </GridTile>
            ))}
          </GridList>
        </Paper>
      );
    } else {
      orderQueueContent = null;
    }

    const actions = [
      <FlatButton label="Yes" secondary={true} onClick={this.handleComplete} />,
      <FlatButton label="No" primary={true} onClick={this.handleClose} />
    ];

    return (
      <div>
        {orderQueueContent}
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <h2 className="text-center">Everything ready for serve?</h2>
        </Dialog>
      </div>
    );
  }
}

OrderQueue.propTypes = {
  orders: PropTypes.array.isRequired,
  tables: PropTypes.array.isRequired,
  getFalseOrders: PropTypes.func.isRequired,
  updateOrder: PropTypes.func.isRequired,
  updateEmptyTable: PropTypes.func.isRequired,
  getTables: PropTypes.func.isRequired,
  getQueueOrders: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  getFalseOrders,
  updateOrder,
  updateEmptyTable,
  getTables,
  getQueueOrders
})(OrderQueue);
