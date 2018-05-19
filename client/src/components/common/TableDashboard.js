import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import InvoiceGrid from './InvoiceGrid';
import tableImg from './../../img/1200px-A_small_cup_of_coffee.JPG';
import emptyImg from './../../img/empty.png';
import awaitImg from './../../img/await.png';
import servedImg from './../../img/served.png';

class TableDashboard extends Component {
  state = {
    open: false,
    currentTable: '',
    currentOrder: {}
  };

  handleOpen = table => {
    const { orders } = this.props;
    let order = orders.find(item => item.table === table);
    this.setState({ open: true, currentTable: table, currentOrder: order });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    let tableListContent;
    const { tables } = this.props;
    const { orders } = this.props;

    if (tables) {
      tableListContent = (
        <GridList cols={3}>
          {tables.map(table => (
            <GridTile
              title={table.name}
              key={table._id}
              actionIcon={
                table.status === '2' || table.status === '1' ? (
                  <IconButton onClick={() => this.handleOpen(table._id)}>
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
                      : servedImg
                }
                alt=""
              />
            </GridTile>
          ))}
        </GridList>
      );
    } else {
      tableListContent = null;
    }

    const actions = [
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
          {/* <img src={tableImg} alt="" style={{ width: '100%' }} /> */}
          <InvoiceGrid order={this.state.currentOrder} />
        </Dialog>
      </div>
    );
  }
}

TableDashboard.propTypes = {
  tables: PropTypes.array.isRequired,
  orders: PropTypes.array.isRequired
};

export default TableDashboard;
