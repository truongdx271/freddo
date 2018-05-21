import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import {
  getGroups,
  activeGroup,
  deleteGroup
} from '../../actions/groupActions';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

class Group extends Component {
  onDeleteClick(id) {
    this.props.deleteGroup(id);
    // console.log(id);
  }

  componentDidMount() {
    this.props.getGroups();
  }

  buttonFormatter(cell, row, rowIndex) {
    return (
      <div className="m-auto text-center">
        {/* <Link to="/edit-group" className="btn btn-primary m-1">
          <i className="far fa-edit" />
        </Link>
        <button
          className="btn btn-danger m-1"
          type="button"
          onClick={() => {
            if (window.confirm('Are you sure you wish to delete this group?'))
              this.onDeleteClick(row._id);
          }}
        >
          <i className="fas fa-eraser" />
        </button>{' '} */}
        <Link to="/edit-group">
          <RaisedButton label="Edit" primary={true} />
        </Link>{' '}
        <RaisedButton
          label="DELETE"
          secondary={true}
          onClick={() => {
            if (window.confirm('Are you sure you wish to delete this group?'))
              this.onDeleteClick(row._id);
          }}
        />
      </div>
    );
  }

  render() {
    const { groups, loading } = this.props.group;

    const columns = [
      {
        dataField: '_id',
        text: 'id',
        hidden: true
      },
      {
        dataField: 'name',
        headerClasses: 'text-center',
        text: 'Group Name',
        filter: textFilter()
      },
      {
        dataField: 'description',
        text: 'Description',
        headerClasses: 'text-center'
      },
      {
        dataField: 'grouptype',
        headerClasses: 'text-center',
        text: 'Type'
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
        this.props.activeGroup(row);
      }
    };

    let grouptable;
    if (groups === null || loading) {
      grouptable = <Spinner />;
    } else {
      grouptable = (
        <BootstrapTable
          keyField="_id"
          data={groups}
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
            <h1 className="display-4 text-center">Group</h1>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-4">
            <Link to="/create-group">
              <RaisedButton label="Create New" backgroundColor="#448AFF" />
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">{grouptable}</div>
        </div>
      </div>
    );
  }
}

Group.propTypes = {
  getGroups: PropTypes.func.isRequired,
  deleteGroup: PropTypes.func.isRequired,
  activeGroup: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: state.group
});

export default connect(mapStateToProps, {
  getGroups,
  activeGroup,
  deleteGroup
})(Group);
