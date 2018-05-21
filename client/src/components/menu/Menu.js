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
import RaisedButton from 'material-ui/RaisedButton';
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
      <div className="m-auto text-center">
        <Link to="/edit-item">
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
    const { menuitems, loading } = this.props.menu;

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
        headerStyle: { width: '20%' },
        filter: textFilter()
      },
      {
        dataField: 'description',
        text: 'Description',
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
        dataField: 'discount',
        headerClasses: 'text-center',
        text: 'Discount'
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
            <Link to="/create-item">
              <RaisedButton label="Create New" backgroundColor="#448AFF" />
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
