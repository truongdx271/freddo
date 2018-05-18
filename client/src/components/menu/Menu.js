import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import {
  getMenuitems,
  activeItem,
  deleteItem
} from '../../actions/menuActions';
import { Link } from 'react-router-dom';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

class Menu extends Component {
  onDeleteClick(id) {
    this.props.deleteItem(id);
    // console.log(id);
  }

  componentDidMount() {
    this.props.getMenuitems();
  }

  buttonFormatter(cell, row, rowIndex) {
    return (
      <div className="pull-left">
        <Link to="/edit-item" className="btn btn-primary">
          <i className="far fa-edit" />
        </Link>
        <button
          className="btn btn-danger mt-1"
          type="button"
          onClick={() => {
            if (window.confirm('Are you sure you wish to delete this item?'))
              this.onDeleteClick(row._id);
          }}
        >
          <i className="fas fa-eraser" />
        </button>{' '}
      </div>
    );
  }

  render() {
    const { menuitems, loading } = this.props.menu;

    const columns = [
      {
        dataField: 'code',
        text: 'Product code',
        filter: textFilter()
      },
      {
        dataField: 'name',
        text: 'Product Name',
        filter: textFilter()
      },
      {
        dataField: 'description',
        text: 'Description',
        filter: textFilter()
      },
      {
        dataField: 'price',
        text: 'Price',
        filter: textFilter()
      },
      {
        dataField: 'discount',
        text: 'Discount'
      },
      {
        dataField: 'action',
        text: 'Action',
        formatter: this.buttonFormatter.bind(this)
      }
    ];

    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        let menuitem = {};
        menuitem.code = row.code;
        menuitem.date = row.date;
        menuitem.description = row.description;
        menuitem.discount = String(row.discount);
        menuitem.price = String(row.price);
        menuitem.name = row.name;
        menuitem.unit = row.unit;
        menuitem._v = row._v;
        menuitem._id = row._id;
        menuitem.group = row.group._id;

        this.props.activeItem(menuitem);
      }
    };

    let menutable;
    if (menuitems === null || loading) {
      menutable = <Spinner />;
    } else {
      menutable = (
        <BootstrapTable
          keyField="code"
          data={menuitems}
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
            <h1 className="display-4 text-center">Menu</h1>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-4">
            <Link to="/create-item" className="btn btn-success">
              Create New
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">{menutable}</div>
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  activeItem: PropTypes.func.isRequired,
  getMenuitems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  menu: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  menu: state.menu
});

export default connect(mapStateToProps, {
  getMenuitems,
  activeItem,
  deleteItem
})(Menu);
