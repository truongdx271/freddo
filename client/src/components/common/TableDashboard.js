import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { completeOrder, getQueueOrders } from '../../actions/orderActions';
import { updateEmptyTable, getTables } from '../../actions/tableActions';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import InvoiceGrid from './InvoiceGrid';
// import tableImg from './../../img/1200px-A_small_cup_of_coffee.JPG';
import emptyImg from './../../img/empty_new.png';
import awaitImg from './../../img/qing_new.png';
import servedImg from './../../img/served_new.png';
import requestedImg from './../../img/request_new.png';
import Paper from 'material-ui/Paper';

import { invoiceComplete } from '../../api';

class TableDashboard extends Component {
  state = {
    open: false,
    completed: false,
    currentTable: {},
    currentOrder: {}
  };

  handleOpen = table => {
    const { orders } = this.props;
    let order = orders.find(item => item.table._id === table._id);
    this.setState({ open: true, currentTable: table, currentOrder: order });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleComplete = () => {
    //alert('Completed invoice!!!');
    let data = this.state.currentOrder.listitems;
    let totalData = 0;
    data.forEach(item => {
      totalData += item.quantity * item.price * (100 - item.discount) / 100;
    });

    // order data to update
    const newResult = {
      amount: totalData,
      total: totalData
    };

    // new table for update
    const updateTable = {
      _id: this.state.currentTable._id,
      name: this.state.currentTable.name,
      section: this.state.currentTable.section,
      status: '0'
    };

    //Update action
    this.props.completeOrder(newResult, this.state.currentOrder._id);
    this.props.updateEmptyTable(updateTable);
    // this.props.getTables();
    this.props.getQueueOrders();

    this.props.refresh();

    invoiceComplete(updateTable);
    // this.setState({ open: false });
    alert('Completed!!!!');
  };

  render() {
    let tableListContent;
    const { tables } = this.props;
    // const { orders } = this.props;

    if (tables) {
      tableListContent = (
        <Paper zDepth={2}>
          <GridList cols={4}>
            {tables.map(table => (
              <GridTile
                title={table.name}
                // subtitle={table.section}
                titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                key={table._id}
                actionIcon={
                  table.status !== '0' ? (
                    <IconButton onClick={() => this.handleOpen(table)}>
                      <ZoomIn color="white" />
                    </IconButton>
                  ) : null
                }
              >
                <img
                  src={
                    table.status === '0'
                      ? emptyImg
                      : table.status === '1'
                        ? awaitImg
                        : table.status === '2'
                          ? servedImg
                          : requestedImg
                  }
                  alt=""
                />
              </GridTile>
            ))}
          </GridList>
        </Paper>
      );
    } else {
      tableListContent = null;
    }

    const actions = [
      <FlatButton
        label="Complete"
        secondary={true}
        onClick={this.handleComplete}
      />,
      <FlatButton label="Close" primary={true} onClick={this.handleClose} />
    ];

    return (
      <div>
        {tableListContent}
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <InvoiceGrid order={this.state.currentOrder} />
        </Dialog>
      </div>
    );
  }
}

TableDashboard.propTypes = {
  completeOrder: PropTypes.func.isRequired,
  updateEmptyTable: PropTypes.func.isRequired,
  getQueueOrders: PropTypes.func.isRequired,
  getTables: PropTypes.func.isRequired,
  tables: PropTypes.array.isRequired,
  orders: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  completeOrder,
  updateEmptyTable,
  getTables,
  getQueueOrders
})(TableDashboard);
