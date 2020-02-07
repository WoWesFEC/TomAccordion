import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      productId : 1,
      description : 'it slices, it dices, and it changes diapers better than a Ginsu knife',
      specs : ['you cannot afford anything better', 'but for the price it is not that bad', 'or at least there is worse out there']
    };
    this.getNewProductId = this.getNewProductId.bind(this);
  }

  componentDidMount() {
    axios.get('http://tomaccordion-env.ebgmq3pyez.us-east-2.elasticbeanstalk.com/items', {
      params : {
        ID : this.state.productId
      }
    })
    .then((result) => {
      this.setState({
        description : result.data[0].description || 'it slices, it dices, and it tastes better than a Ginsu knife',
        specs : result.data[0].specs.split('\n') || ['this is great', 'seriously', '+37 Javascript Syntax Errors']
      })
    })
    .catch(function(error) {
      console.log(error)
    });
    window.addEventListener('jordanAwesome', this.getNewProductId);
  }

  getNewProductId(e) {
    this.setState({productId : e.detail});
    axios.get('http://tomaccordion-env.ebgmq3pyez.us-east-2.elasticbeanstalk.com/items', {
      params : {
        ID : e.detail
      }
    })
    .then((result) => {
      this.setState({
        description : result.data[0].description || 'it slices, it dices, and it tastes better than a Ginsu knife',
        specs : result.data[0].specs.split('\n') || ['this is great', 'seriously', '+37 Javascript Syntax Errors']
      })
    })
    .catch(function(error) {
      console.log(error)
    });
  }

  render() {
    return (
      <div>
        <div className="tom-accordion-header"><h2>Product Information</h2></div>
      <div className="tom-accordion-wrapper">
        <div className="tom-panel-default">
          <div className="tom-panel-heading">
            <h4 className="tom-panel-title">
              <a data-toggle="collapse" className="tom-accordion-collapsed" data-parent="#accordion" href="#collapse1">Description</a>
            </h4>
          </div>
          <div id="collapse1">
            <div className="tom-panel-body">{this.state.description}</div>
          </div>
        </div>
        <div className="tom-panel-default">
          <div className="tom-panel-heading">
            <h4 className="tom-panel-title">
              <a data-toggle="collapse" className="tom-accordion-collapsed" data-parent="#accordion" href="#collapse2">Specifications</a>
            </h4>
          </div>
        <div id="collapse2" className="tom-accordion-collapse collapse">
          <div className="tom-panel-body">
            <ul>
              {this.state.specs.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="tom-panel-default">
        <div className="tom-panel-heading">
          <h4 className="tom-panel-title">
            <a data-toggle="collapse" className="tom-accordion-collapsed" data-parent="#accordion" href="#collapse3">Ratings &amp; Reviews</a>
          </h4>
        </div>
        <div id="collapse3" className="tom-accordion-collapse collapse">
          <div className="tom-panel-body">Everything we sell is awesome, and everybody recognizes it.</div>
        </div>
      </div>
      <div className="tom-panel-default">
        <div className="tom-panel-heading">
          <h4 className="tom-panel-title">
            <a data-toggle="collapse" className="tom-accordion-collapsed" data-parent="#accordion" href="#collapse4">Community Q &amp; A</a>
          </h4>
        </div>
        <div id="collapse4" className="tom-accordion-collapse collapse">
          <div className="tom-panel-body">LMGTFY.com is a great source for answers to your questions.</div>
        </div>
      </div>
    </div>
    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("tomaccordion"));