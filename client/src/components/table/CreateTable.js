import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createTable } from '../../actions/tableActions';
import TextFieldGroup from '../common/TextFieldGroup';

class CreateTable extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      section: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newTable = {
      name: this.state.name,
      section: this.state.section
    };

    this.props.createTable(newTable, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="createtable">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Table</h1>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="Section"
                  name="section"
                  value={this.state.section}
                  onChange={this.onChange}
                  error={errors.description}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateTable.propTypes = {
  createTable: PropTypes.func.isRequired,
  table: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  table: state.table,
  errors: state.errors
});

export default connect(mapStateToProps, { createTable })(
  withRouter(CreateTable)
);
