import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';

class OrderQueue extends Component {
  render() {
    const { orders } = this.props.order;
    let orderQueueContent;

    if (orders) {
      <GridList cols={1}>{orders.map()}</GridList>;
    } else {
      orderQueueContent = null;
    }

    return <div />;
  }
}

OrderQueue.propTypes = {
  order: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  order: state.order
});

export default connect(mapStateToProps, null)(OrderQueue);
