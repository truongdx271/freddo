import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createImportItem } from '../../actions/importActions';
import { getGroups } from '../../actions/groupActions';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import isEmpty from '../../validation/is-empty';

class EditImportItem extends Component {
  constructor() {
    super();
    this.state = {
      code: '',
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

    if (nextProps.import.item) {
      console.log('Here');
      const importitem = nextProps.import.item;

      // If null, make empty
      importitem.code = !isEmpty(importitem.code) ? importitem.code : '';
      importitem.name = !isEmpty(importitem.name) ? importitem.name : '';
      importitem.description = !isEmpty(importitem.description)
        ? importitem.description
        : '';
      importitem.group = !isEmpty(importitem.group) ? importitem.group : '';
      importitem.unit = !isEmpty(importitem.unit) ? importitem.unit : '';
      importitem.price = !isEmpty(importitem.price) ? importitem.price : '0';
      importitem.quantity = !isEmpty(importitem.quantity)
        ? importitem.quantity
        : '0';

      // Set component field
      this.setState({
        code: importitem.code,
        name: importitem.name,
        description: importitem.description,
        group: importitem.group,
        unit: importitem.unit,
        price: importitem.price,
        quantity: importitem.quantity
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newImportItem = {
      code: this.state.code,
      name: this.state.name,
      description: this.state.description,
      group: this.state.group,
      price: String(this.state.price),
      quantity: String(this.state.quantity)
    };

    // console.log(newItem);

    this.props.createImportItem(newImportItem, this.props.history);
  }

  render() {
    const { errors } = this.state;
    const { groups, loading } = this.props.group;

    // Select options for group
    let options;
    if (groups === null || loading) {
      options = [{ label: '*Select group for menu-item', value: 0 }];
    } else {
      options = [{ label: '*Select group for menu-item', value: 0 }];
      groups.forEach(group => {
        let option = { label: group.name, value: group._id };
        if (group.grouptype === 'importgroup') {
          options.push(option);
        }
      });
    }

    return (
      <div className="createitem">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Import-item</h1>
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
                  options={options}
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

EditImportItem.propTypes = {
  createImportItem: PropTypes.func.isRequired,
  getGroups: PropTypes.func.isRequired,
  import: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: state.group,
  import: state.import,
  errors: state.errors
});

export default connect(mapStateToProps, { createImportItem, getGroups })(
  withRouter(EditImportItem)
);
