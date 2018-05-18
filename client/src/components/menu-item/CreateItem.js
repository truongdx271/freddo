import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createItem } from '../../actions/menuActions';
import { getGroups } from '../../actions/groupActions';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';

class CreateItem extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      price: '',
      discount: '',
      group: '',
      unit: '',
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
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newItem = {
      name: this.state.name,
      description: this.state.description,
      group: this.state.group,
      unit: this.state.unit,
      price: this.state.price,
      discount: this.state.discount
    };

    this.props.createItem(newItem, this.props.history);
  }

  render() {
    const { errors } = this.state;
    const { groups, loading } = this.props.group;

    // Select options for group
    let groupOptions;
    if (groups === null || loading) {
      groupOptions = [{ label: '*Select group for menu-item', value: 0 }];
    } else {
      groupOptions = [{ label: '*Select group for menu-item', value: 0 }];
      groups.forEach(group => {
        let option = { label: group.name, value: group._id };
        groupOptions.push(option);
      });
    }

    // Select options for unit
    let unitOptions = [
      { label: '*Select Unit for menu-item', value: 0 },
      { label: 'Ly', value: 'Ly' },
      { label: 'Cốc', value: 'Cốc' },
      { label: 'Tách', value: 'Tách' },
      { label: 'Gói', value: 'Gói' },
      { label: 'Hộp', value: 'Hộp' },
      { label: 'Chiếc', value: 'Chiếc' }
    ];

    return (
      <div className="createitem">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Menu-Item</h1>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <SelectListGroup
                  placeholder="Group"
                  name="group"
                  value={this.state.group}
                  onChange={this.onChange}
                  options={groupOptions}
                  error={errors.status}
                />
                <SelectListGroup
                  placeholder="Unit"
                  name="unit"
                  value={this.state.unit}
                  onChange={this.onChange}
                  options={unitOptions}
                  error={errors.status}
                />
                <TextFieldGroup
                  placeholder="Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                />
                <TextFieldGroup
                  placeholder="Price"
                  name="price"
                  value={this.state.price}
                  onChange={this.onChange}
                  error={errors.price}
                />
                <TextFieldGroup
                  placeholder="Discount"
                  name="discount"
                  value={this.state.discount}
                  onChange={this.onChange}
                  error={errors.discount}
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

CreateItem.propTypes = {
  createItem: PropTypes.func.isRequired,
  getGroups: PropTypes.func.isRequired,
  menu: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: state.group,
  menu: state.menu,
  errors: state.errors
});

export default connect(mapStateToProps, { createItem, getGroups })(
  withRouter(CreateItem)
);
