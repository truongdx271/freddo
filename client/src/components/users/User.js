import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getUsers, activeUser, deleteUser } from '../../actions/userActions';
import { Link } from 'react-router-dom';

import RaisedButton from 'material-ui/RaisedButton';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

class User extends Component {
  onDeleteClick(id) {
    this.props.deleteUser(id);
  }

  componentDidMount() {
    this.props.getUsers();
  }

  buttonFormatter(cell, row, rowIndex) {
    return (
      <div className="m-auto text-center">
        {/* <Link to="/edit-user" className="btn btn-primary m-1">
          <i className="far fa-edit" />
        </Link> */}
        {/* <button
          className="btn btn-danger m-1"
          type="button"
          onClick={() => {
            if (window.confirm('Are you sure you wish to delete this user?'))
              this.onDeleteClick(row._id);
          }}
        >
          <i className="fas fa-eraser" />
        </button>{' '} */}
        <RaisedButton
          label="DELETE"
          secondary={true}
          onClick={() => {
            if (window.confirm('Are you sure you wish to delete this user?'))
              this.onDeleteClick(row._id);
          }}
        />
      </div>
    );
  }

  render() {
    const { users, loading } = this.props.user;

    const columns = [
      {
        dataField: '_id',
        text: 'id',
        hidden: true
      },
      {
        dataField: 'name',
        headerClasses: 'text-center',
        text: 'Name',
        filter: textFilter()
      },
      {
        dataField: 'email',
        text: 'Email',
        headerClasses: 'text-center',
        filter: textFilter()
      },
      {
        dataField: 'role',
        text: 'Role',
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
        this.props.activeUser(row);
      }
    };

    let userTable;
    if (users === null || loading) {
      userTable = <Spinner />;
    } else {
      let userArr = [];

      userArr = users.map(item => {
        const userObj = {};
        userObj._id = item._id;
        userObj.name = item.name;
        userObj.email = item.email;
        userObj.avatar = item.avatar;
        userObj.role = item.role.name;
        //userArr.push(userObj);
        return userObj;
      });

      userTable = (
        <BootstrapTable
          keyField="_id"
          data={userArr}
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
            <h1 className="display-4 text-center">USER</h1>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-4">
            <Link to="/create-user">
              <RaisedButton label="Create New" backgroundColor="#448AFF" />
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">{userTable}</div>
        </div>
      </div>
    );
  }
}

User.propTypes = {
  getUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  activeUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, {
  getUsers,
  activeUser,
  deleteUser
})(User);
