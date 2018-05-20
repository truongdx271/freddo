import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GridList, GridTile } from 'material-ui/GridList';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import moment from 'moment';

class OrderQueue extends Component {
  render() {
    // moment.locale('vi-VN');
    const { orders } = this.props;
    let orderQueueContent;

    if (orders) {
      orderQueueContent = (
        <Paper zDepth={2}>
          <GridList cols={1} cellHeight="auto">
            {orders.map(order => (
              <GridTile>
                <RaisedButton
                  label={order.table.name.split(' ')[1]}
                  primary={true}
                  fullWidth={true}
                />
                <List>
                  {order.listitems.map(item => (
                    <ListItem
                      primaryText={item.name}
                      secondaryText={
                        // moment().unix() - moment.utc(item.createAt).unix()
                        moment(item.createAt).fromNow()
                      }
                    />
                  ))}
                </List>
              </GridTile>
            ))}
          </GridList>
        </Paper>
      );
    } else {
      orderQueueContent = null;
    }

    return <div>{orderQueueContent}</div>;
  }
}

OrderQueue.propTypes = {
  orders: PropTypes.array.isRequired
};

export default OrderQueue;
