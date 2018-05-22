import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createImportItem } from '../../actions/importActions';
import { getGroups } from '../../actions/groupActions';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';

class CreateImportItem extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      price: '',
      quantity: '',
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

    const newImportItem = {
      name: this.state.name,
      description: this.state.description,
      group: this.state.group,
      unit: this.state.unit,
      price: this.state.price,
      quantity: this.state.quantity
    };

    this.props.createImportItem(newImportItem, this.props.history);
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
        if (group.grouptype === 'importgroup') {
          groupOptions.push(option);
        }
      });
    }

    // Select options for unit
    // let unitOptions = [
    //   { label: '*Select Unit for menu-item', value: 0 },
    //   { label: 'Ly', value: 'Ly' },
    //   { label: 'Cốc', value: 'Cốc' },
    //   { label: 'Tách', value: 'Tách' },
    //   { label: 'Gói', value: 'Gói' },
    //   { label: 'Hộp', value: 'Hộp' },
    //   { label: 'Chiếc', value: 'Chiếc' }
    // ];

    return (
      <div className="createitem">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Import-Item</h1>
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
                {/* <SelectListGroup
                  placeholder="Unit"
                  name="unit"
                  value={this.state.unit}
                  onChange={this.onChange}
                  options={unitOptions}
                  error={errors.status}
                /> */}
                <TextFieldGroup
                  placeholder="Unit"
                  name="unit"
                  value={this.state.unit}
                  onChange={this.onChange}
                  error={errors.unit}
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
                  placeholder="Quantity"
                  name="quantity"
                  value={this.state.quantity}
                  onChange={this.onChange}
                  error={errors.quantity}
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

CreateImportItem.propTypes = {
  createImportItem: PropTypes.func.isRequired,
  getGroups: PropTypes.func.isRequired,
  import: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: state.group,
  import: state.menu,
  errors: state.errors
});

export default connect(mapStateToProps, { createImportItem, getGroups })(
  withRouter(CreateImportItem)
);
