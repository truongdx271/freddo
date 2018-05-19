import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createGroup, getGroups } from '../../actions/groupActions';
import TextFieldGroup from '../common/TextFieldGroup';
import isEmpty from '../../validation/is-empty';

class EditGroup extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      grouptype: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getGroups();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.group.group) {
      const group = nextProps.group.group;

      // If null, make empty
      group.name = !isEmpty(group.name) ? group.name : '';
      group.description = !isEmpty(group.description) ? group.description : '';
      group.grouptype = !isEmpty(group.grouptype) ? group.grouptype : '';

      // Set component field
      this.setState({
        name: group.name,
        description: group.description,
        grouptype: group.grouptype
      });
    }
  }
  setGroup(e) {
    console.log(e.target.value);
    this.setState({ grouptype: e.target.value });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newGroup = {
      name: this.state.name,
      description: this.state.description,
      grouptype: this.state.grouptype
    };

    this.props.createGroup(newGroup, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="editgroup">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Group</h1>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                />
                <div className="form-group" onChange={this.setGroup.bind(this)}>
                  <label className="radio-inline">
                    <input
                      type="radio"
                      name="import"
                      value="importgroup"
                      checked={this.state.grouptype === 'importgroup'}
                    />{' '}
                    IMPORT
                  </label>
                  {'  '}
                  <label className="radio-inline">
                    <input
                      type="radio"
                      name="import"
                      value="menugroup"
                      checked={this.state.grouptype === 'menugroup'}
                    />{' '}
                    MENU
                  </label>
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditGroup.propTypes = {
  createGroup: PropTypes.func.isRequired,
  getGroups: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: state.group,
  errors: state.errors
});

export default connect(mapStateToProps, { createGroup, getGroups })(
  withRouter(EditGroup)
);
