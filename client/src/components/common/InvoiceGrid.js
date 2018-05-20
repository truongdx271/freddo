import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import PropTypes from 'prop-types';
import moment from 'moment';

class InvoiceGrid extends Component {
  state = {
    amount: 0,
    discount: 0,
    total: 0,
    billdate: Date.now
  };

  formatCurrency(x) {
    return x.toLocaleString('vn-VI');
  }

  componentDidMount() {
    const { order } = this.props;
    let data = order.listitems;
    let totalData = 0;
    data.forEach(item => {
      totalData += item.quantity * item.price * (100 - item.discount) / 100;
    });
    this.setState({ total: totalData });
  }

  render() {
    const { order } = this.props;
    let orderHeader;
    let orderContent;
    let orderFooter;
    if (order) {
      let data = order.listitems;
      orderContent = (
        <Table style={{ tableLayout: 'auto' }}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Quantity</TableHeaderColumn>
              <TableHeaderColumn>Price</TableHeaderColumn>
              <TableHeaderColumn>Discount {`(%)`}</TableHeaderColumn>
              <TableHeaderColumn>Total</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {data.map((item, index) => (
              <TableRow key={item._id}>
                <TableRowColumn>{index + 1}</TableRowColumn>
                <TableRowColumn>{item.name}</TableRowColumn>
                <TableRowColumn>{item.quantity}</TableRowColumn>
                <TableRowColumn>
                  {this.formatCurrency(item.price)} đ
                </TableRowColumn>
                <TableRowColumn>{item.discount}</TableRowColumn>
                <TableRowColumn>
                  {this.formatCurrency(
                    item.quantity * item.price * (100 - item.discount) / 100
                  )}{' '}
                  đ
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
      orderHeader = (
        <div>
          <h1 className="text-center m-2">INVOICE</h1>
          <p>
            <i className="fas fa-coffee" /> {order.table.name}
          </p>
          <p>
            <i className="fas fa-user" /> {order.user.name}
          </p>
          <p>
            <i className="far fa-clock" />{' '}
            {moment().format('MMMM Do YYYY, h:mm:ss a')}
          </p>
        </div>
      );
      orderFooter = (
        <div>
          <h2 className="text-right">
            TOTAL: {this.formatCurrency(this.state.total)} đ
          </h2>
        </div>
      );
    } else {
      orderContent = null;
      orderHeader = null;
      orderFooter = null;
    }

    return (
      <div className="container">
        {orderHeader}
        {orderContent}
        {orderFooter}
      </div>
    );
  }
}

InvoiceGrid.propTypes = {
  order: PropTypes.object.isRequired
};

export default InvoiceGrid;
