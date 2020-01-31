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
      result2: "",
      genders: {
        'dance pop': "https://www.youtube.com/embed/-zYz0OhqzXM",
        "neo mellow": "https://www.youtube.com/embed/Yk9G7OyKwLM",
        "detroit hip hop": "https://www.youtube.com/embed/pq-zgi_RnY4",
        "pop": "https://www.youtube.com/embed/SlPhMPnQ58k",
        "canadian pop": "https://www.youtube.com/embed/q0hyYWKXF0Q",
        "hip pop": "https://www.youtube.com/embed/aIHF7u9Wwiw",
        "barbadian pop": "https://www.youtube.com/embed/9qaVcyYkDg4",
        "atl hip hop": "https://www.youtube.com/embed/5YGSVLhWo6A",
        "australian pop": "https://www.youtube.com/embed/q0hyYWKXF0Q",
        "indie pop": "https://www.youtube.com/embed/bpOSxM0rNPM",
        "art pop": "https://www.youtube.com/embed/JNJv-Ebi67I",
        "colombian pop": "https://www.youtube.com/embed/tbneQDc2H3I",
        "big room": "https://www.youtube.com/embed/nFjTcJT2dTw",
        "british soul": "https://www.youtube.com/embed/-nwdjQmc_N8",
        "chicago rap": "https://www.youtube.com/embed/YWyHZNBz6FE",
        "acoustic pop": "https://www.youtube.com/embed/uzgp65UnPxA",
        "permanent wave": "https://www.youtube.com/embed/7vQEucBgxGQ",
        "boy band": "https://www.youtube.com/embed/4fndeDfaWCg",
        "baroque pop": "https://www.youtube.com/embed/kZj-o42szuk",
        "celtic rock": "https://www.youtube.com/embed/Vj41xZHA5Eg",
        "electro": "https://www.youtube.com/embed/HhjHYkPQ8F0",
        "complextro": "https://www.youtube.com/embed/jp_pClmkqUo",
        "canadian hip hop": "https://www.youtube.com/embed/SN6jcMruHfA",
        "alaska indie": "https://www.youtube.com/embed/hIE2eNDmV5s",
        "folk-pop": "https://www.youtube.com/embed/OruY8u7Rhx8",
        "metropopolis": "https://www.youtube.com/embed/VJJhexFlJB0",
        "australian hip hop": "https://www.youtube.com/embed/aB16fJpoj-I",
        "electropop": "https://www.youtube.com/embed/qrO4YZeyl0I",
        "australian dance": "https://www.youtube.com/embed/m2vi6sfE8Ik",
        "candy pop": "https://www.youtube.com/embed/vjI1QTjfyYE",
        "hollywood": "https://www.youtube.com/embed/wpfqHdRoGPA",
        "canadian contemporary r&b": "https://www.youtube.com/embed/bnVUHWCynig",
        "irish singer-songwriter": "https://www.youtube.com/embed/eHQG6-DojVw",
        "tropical house": "https://www.youtube.com/embed/yFLtfaJwyfw",
        "belgian edm": "https://www.youtube.com/embed/bWPOLL_Rr8U",
        "french indie pop": "https://www.youtube.com/embed/eyk-Sliy8RU",
        "latin": "https://www.youtube.com/embed/OSUxrSe5GbI",
        "canadian latin": "https://www.youtube.com/embed/L86gQQBYSc4",
        "edm": "https://www.youtube.com/embed/gCYcHz2k5x0",
        "downtempo": "https://www.youtube.com/embed/iVTqxdEXFkA",
        "brostep": "https://www.youtube.com/embed/OF6fSgOFhvQ",
        "moroccan pop": "https://www.youtube.com/embed/ZvvcQrmbggw",
        "escape room": "https://www.youtube.com/embed/aW3-E3My-kc",
        "alternative r&b": "https://www.youtube.com/embed/X0t8zeEiqEY",
        "electronic trap": "https://www.youtube.com/embed/rpJtWTtxbCA",
        "danish pop": "https://www.youtube.com/embed/_xAjt64AoD0"
      },
      youtubeUrl: ""
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
      }).catch((err) => {
        this.setState({
          result: "Api error",
          isLoading: false
        })
      })
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
        console.log('testing', this.state.genders["dance pop"][0])
        Object.keys(this.state.genders).map((item, index) => {
          // console.log('item ->', item)
          // console.log('resp ->', response.result)
          let item2 = `'${item}'`
          if (response.result === item2) {
            console.log('resp ->', response.result, "item ->", item)
            this.setState({
              youtubeUrl: this.state.genders[item]
            })
            console.log('url', this.state.genders[item])
          }
        })
        this.setState({
          result2: `Gender: ${response.result}`,
          isLoading: false
        });


      }).catch((err) => {
        console.log('err ->', err)
        this.setState({
          result2: "Api error",
          isLoading: false
        })
      })
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
              <Container>
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
                    (
                      <div>
                        <Row>
                          <Col className="result-container">
                            <h5 id="result">{result2}</h5>
                          </Col>
                        </Row>
                        <div style={{ alignItems: 'center' }}>
                          <iframe style={{ marginTop: '2%', marginLeft: '8%' }} width="600" height="200" src={this.state.youtubeUrl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                      </div>)
                  }

                </div>
              </Container>
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