import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createTable, getTables } from '../../actions/tableActions';
import TextFieldGroup from '../common/TextFieldGroup';
import isEmpty from '../../validation/is-empty';

class EditTable extends Component {
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

  componentDidMount() {
    this.props.getTables();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.table.table) {
      const table = nextProps.table.table;

      // If null, make empty
      table.name = !isEmpty(table.name) ? table.name : '';
      table.section = !isEmpty(table.section) ? table.section : '';

      // Set component field
      this.setState({
        name: table.name,
        section: table.section
      });
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
      <div className="edittable">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Table</h1>
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

EditTable.propTypes = {
  createTable: PropTypes.func.isRequired,
  getTables: PropTypes.func.isRequired,
  table: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  table: state.table,
  errors: state.errors
});

export default connect(mapStateToProps, { createTable, getTables })(
  withRouter(EditTable)
);
