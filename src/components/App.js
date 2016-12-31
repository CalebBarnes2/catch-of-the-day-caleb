import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  constructor() {
    super();

    this.addFish = this.addFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);

    // getinitialState
    this.state = {
      fishes: {},
      order: {}
    };
  }

  componentWillMount() {
    // this runs right before the <app> is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`
    , {
      context: this,
      state: 'fishes'
    });

    // check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if(localStorageRef) {
      //update our app comonent's order state
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
  }


  addFish(fish) {
    // update our state
    // ... is a spread. it will take every item from our object and spread it into this object ;;takes a copy;;
    const fishes = {...this.state.fishes};
    // add in our new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // this.state.fishes.fish1 = fish;
    // set state -> fishes: fishes or just fishes
    this.setState({ fishes })
  }

  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }

  removeFish(key) {
    const fishes = {...this.state.fishes};
    // need to use = null instead of 'delete' because we using firebase
    fishes[key] = null;
    this.setState({fishes});
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder(key) {
    // take a copy of our state
    const order = {...this.state.order};
    // update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1;
    //update our state
    this.setState({ order });
  }

  removeFromOrder(key) {
    // take a copy of our state
    const order = {...this.state.order};
    // we can use 'delete' here because it is using localStorage instead of firebase
    delete order[key];
    this.setState({ order });
  }

  render() {
    return (
        <div className="app-wrapper">
            <div className="menu">
              <Header tagline="store tagline"/>
              <ul className="list-of-fishes">
                {
                  Object
                    .keys(this.state.fishes)
                    .map(key => <Fish key={key}
                      index={key}
                      details={this.state.fishes[key]}
                      addToOrder={this.addToOrder}/>)
                }
              </ul>
            </div>
            <div className="order-wrapper">
              <Order
                fishes={this.state.fishes}
                order={this.state.order}
                params={this.props.params}
                removeFromOrder={this.removeFromOrder}
              />
              <Inventory
                addFish={this.addFish}
                removeFish={this.removeFish}
                loadSamples={this.loadSamples}
                fishes={this.state.fishes}
                updateFish={this.updateFish}
                />
            </div>
        </div>
    )
  }
}

export default App;
