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

class InvoiceGrid extends Component {
  render() {
    let orderContent;

    return <div />;
  }
}

InvoiceGrid.PropTypes = {
  order: PropTypes.object.isRequired
};

export default InvoiceGrid;
