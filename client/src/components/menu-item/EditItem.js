import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createItem } from '../../actions/menuActions';
import { getGroups } from '../../actions/groupActions';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import isEmpty from '../../validation/is-empty';

class EditItem extends Component {
  constructor() {
    super();
    this.state = {
      code: '',
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

    if (nextProps.menu.item) {
      console.log('Here');
      const menuitem = nextProps.menu.item;

      // If null, make empty
      menuitem.code = !isEmpty(menuitem.code) ? menuitem.code : '';
      menuitem.name = !isEmpty(menuitem.name) ? menuitem.name : '';
      menuitem.description = !isEmpty(menuitem.description)
        ? menuitem.description
        : '';
      menuitem.group = !isEmpty(menuitem.group) ? menuitem.group : '';
      menuitem.unit = !isEmpty(menuitem.unit) ? menuitem.unit : '';
      menuitem.price = !isEmpty(menuitem.price) ? menuitem.price : '0';
      menuitem.discount = !isEmpty(menuitem.discount) ? menuitem.discount : '0';

      // Set component field
      this.setState({
        code: menuitem.code,
        name: menuitem.name,
        description: menuitem.description,
        group: menuitem.group,
        unit: menuitem.unit,
        price: menuitem.price,
        discount: menuitem.discount
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newItem = {
      code: this.state.code,
      name: this.state.name,
      description: this.state.description,
      group: this.state.group,
      price: String(this.state.price),
      discount: String(this.state.discount)
    };

    // console.log(newItem);

    this.props.createItem(newItem, this.props.history);
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
        if (group.grouptype === 'menugroup') {
          options.push(option);
        }
      });
    }

    return (
      <div className="createitem">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Item</h1>
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

EditItem.propTypes = {
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
  withRouter(EditItem)
);
