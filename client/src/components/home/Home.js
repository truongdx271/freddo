import React, { Component } from 'react';
import TableDashboard from '../common/TableDashboard';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getTables, activeTable } from '../../actions/tableActions';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      tableArr: []
    };
  }

  componentDidMount() {
    this.props.getTables();
  }

  render() {
    const { tables, loading } = this.props.table;

    return (
      <div className="home">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h3 className="lead text-center"> TABLE </h3>{' '}
              {/* TableListcontent here */}
              {tables !== null &&
                tables !== undefined && <TableDashboard tables={tables} />}
            </div>
            <div className="col-lg-4">
              <h3 className="lead text-center"> ORDER QUEUE </h3>
              <div className="card">
                <button type="button" className="btn btn-primary">
                  <span className="badge badge-light">1</span>{' '}
                </button>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"> Cà phê đen </li>
                  <li className="list-group-item"> Bạc sửu </li>
                  <li className="list-group-item"> Cà phê nâu </li>
                </ul>
              </div>
              <div className="card">
                <button type="button" className="btn btn-primary">
                  <span className="badge badge-light">4</span>{' '}
                </button>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"> Trà đào bạc hà </li>
                  <li className="list-group-item"> Hồng trà </li>
                  <li className="list-group-item"> Trà Ô Long sữa </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  getTables: PropTypes.func.isRequired,
  activeTable: PropTypes.func.isRequired,
  table: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  table: state.table
});

export default connect(mapStateToProps, { getTables, activeTable })(Home);
