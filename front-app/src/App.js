import React, { Component } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ButtonSpotify: true,
      ButtonCredit: true,
      isLoading: false,
      formData: {
        salary: 4500,
        age: 25,
        loan: 10000
      },
      result: "",
      formData2: {
        energy: 44,
        danceability: 20,
        liveness: 5,
        acousticness: 4
      },
      result2: ""
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({
      formData
    });
  }

  handlePredictClick = (event) => {
    const formData = this.state.formData;
    this.setState({ isLoading: true });
    fetch('http://localhost:5000/prediction/',
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          result: response.result,
          isLoading: false
        });
      });
  }

  handleCancelClick = (event) => {
    this.setState({ result: "" });
  }

  handleChangeSpotify = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData2 = this.state.formData2;
    formData2[name] = value;
    this.setState({
      formData2
    });
  }

  handlePredictSpotifyClick = (event) => {
    const formData2 = this.state.formData2;
    this.setState({ isLoading: true });
    fetch('http://localhost:5000/prediction/spotify/',
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData2)
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          result2: response.result,
          isLoading: false
        });
      });
  }

  handleCancelSpotifyClick = (event) => {
    this.setState({ result2: "" });
  }

  handleButtonSpotify = () => {
    this.setState({ ButtonSpotify: !this.state.ButtonSpotify, ButtonCredit: true })
  }

  handleButtonCredit = () => {
    this.setState({ ButtonCredit: !this.state.ButtonCredit, ButtonSpotify: true })
  }


  render() {
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;
    const formData2 = this.state.formData2;
    const result2 = this.state.result2;

    return (
      <Container>
        <div>
          <h2 className="title">APP MACHINE LEARNING BASIC</h2>
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Button
                  block
                  variant="success"
                  onClick={this.handleButtonSpotify}>
                  Gender ML APP
                </Button>
              </Form.Group>
              <Form.Group as={Col}>
                <Button
                  block
                  variant="info"
                  onClick={this.handleButtonCredit}>
                  Credit ML APP
                </Button>
              </Form.Group>
            </Form.Row>
          </Form>

          <Form.Row>
            {!this.state.ButtonSpotify ?
              <div className="content">
                <h4>Spotify Gender predict</h4>
                <Form>
                  <Form.Row>
                    <Form.Group as={Col}>
                      <Form.Label>Energy</Form.Label>
                      <Form.Control placeholder="Ex: 0-99" value={formData2.energy} onChange={this.handleChangeSpotify} name="energy" />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>Danceability</Form.Label>
                      <Form.Control
                        placeholder="Ex: 0-99"
                        value={formData2.danceability}
                        name="danceability"
                        onChange={this.handleChangeSpotify} />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col}>
                      <Form.Label>Liveness</Form.Label>
                      <Form.Control placeholder="Ex: 0-99" value={formData2.liveness} onChange={this.handleChangeSpotify} name="liveness" />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>Acousticness</Form.Label>
                      <Form.Control placeholder="Ex: 0-99" value={formData2.acousticness} onChange={this.handleChangeSpotify} name="acousticness" />
                    </Form.Group>
                  </Form.Row>
                  <Row>
                    <Col>
                      <Button
                        block
                        variant="success"
                        disabled={isLoading}
                        onClick={!isLoading ? this.handlePredictSpotifyClick : null}>
                        {isLoading ? 'Making prediction' : 'Predict'}
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        block
                        variant="danger"
                        disabled={isLoading}
                        onClick={this.handleCancelSpotifyClick}>
                        Reset prediction
                </Button>
                    </Col>
                  </Row>
                </Form>
                {result2 === "" ? null :
                  (<Row>
                    <Col className="result-container">
                      <h5 id="result">{result2}</h5>
                    </Col>
                  </Row>)
                }
              </div>
              : null}

            {!this.state.ButtonCredit ?
              <div className="content">
                <h4>Credit Data Predict (YES OR NO)</h4>
                <Form>
                  <Form.Row>
                    <Form.Group as={Col}>
                      <Form.Label>Salary</Form.Label>
                      <Form.Control placeholder="Ex: 4300" value={formData.salary} onChange={this.handleChange} name="salary" />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>Age</Form.Label>
                      <Form.Control
                        placeholder="Ex: 4300"
                        value={formData.age}
                        name="age"
                        onChange={this.handleChange} />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col}>
                      <Form.Label>Loan</Form.Label>
                      <Form.Control placeholder="Ex: 4300" value={formData.loan} onChange={this.handleChange} name="loan" />
                    </Form.Group>
                  </Form.Row>
                  <Row>
                    <Col>
                      <Button
                        block
                        variant="success"
                        disabled={isLoading}
                        onClick={!isLoading ? this.handlePredictClick : null}>
                        {isLoading ? 'Making prediction' : 'Predict'}
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        block
                        variant="danger"
                        disabled={isLoading}
                        onClick={this.handleCancelClick}>
                        Reset prediction
                </Button>
                    </Col>
                  </Row>
                </Form>
                {result === "" ? null :
                  (<Row>
                    <Col className="result-container">
                      <h5 id="result">{result}</h5>
                    </Col>
                  </Row>)
                }
              </div> : null}
          </Form.Row>
        </div>
      </Container>
    );
  }
}

export default App;