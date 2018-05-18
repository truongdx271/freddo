import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h3 className="lead text-center"> TABLE </h3>{' '}
              <div className="row mt-3">
                <div className="col-md-3">
                  <div className="card text-white text-center bg-success mb-3">
                    <div className="card-header">
                      <h4>1</h4>
                    </div>
                    <div className="card-body">
                      <p className="card-text">Serving</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card text-white text-center bg-danger mb-3">
                    <div className="card-header">
                      <h4>2</h4>
                    </div>
                    <div className="card-body">
                      <p className="card-text">Empty</p>
                    </div>
                  </div>
                </div>{' '}
                <div className="col-md-3">
                  <div className="card text-white text-center bg-danger mb-3">
                    <div className="card-header">
                      <h4>3</h4>
                    </div>
                    <div className="card-body">
                      <p className="card-text">Empty</p>
                    </div>
                  </div>
                </div>{' '}
                <div className="col-md-3">
                  <div className="card text-white text-center bg-success mb-3">
                    <div className="card-header">
                      <h4>4</h4>
                    </div>
                    <div className="card-body">
                      <p className="card-text">Serving</p>
                    </div>
                  </div>
                </div>{' '}
              </div>
              <div className="row mt-3">
                <div className="col-md-3">
                  <div className="card text-white text-center bg-danger mb-3">
                    <div className="card-header">
                      <h4>5</h4>
                    </div>
                    <div className="card-body">
                      <p className="card-text">Empty</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card text-white text-center bg-success mb-3">
                    <div className="card-header">
                      <h4>6</h4>
                    </div>
                    <div className="card-body">
                      <p className="card-text">Serving</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card text-white text-center bg-danger mb-3">
                    <div className="card-header">
                      <h4>7</h4>
                    </div>
                    <div className="card-body">
                      <p className="card-text">Empty</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card text-white text-center bg-danger mb-3">
                    <div className="card-header">
                      <h4>8</h4>
                    </div>
                    <div className="card-body">
                      <p className="card-text">Empty</p>
                    </div>
                  </div>
                </div>{' '}
              </div>
              <div className="row mt-3">
                <div className="col-md-3">
                  <div className="card text-white text-center bg-danger mb-3">
                    <div className="card-header">
                      <h4>9</h4>
                    </div>
                    <div className="card-body">
                      <p className="card-text">Empty</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card text-white text-center bg-danger mb-3">
                    <div className="card-header">
                      <h4>10</h4>
                    </div>
                    <div className="card-body">
                      <p className="card-text">Empty</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card text-white text-center bg-success mb-3">
                    <div className="card-header">
                      <h4>11</h4>
                    </div>
                    <div className="card-body">
                      <p className="card-text">Serving</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card text-white text-center bg-danger mb-3">
                    <div className="card-header">
                      <h4>12</h4>
                    </div>
                    <div className="card-body">
                      <p className="card-text">Empty</p>
                    </div>
                  </div>
                </div>{' '}
              </div>
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

export default Home;
