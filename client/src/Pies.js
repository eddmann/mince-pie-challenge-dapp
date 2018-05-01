import React, { Component } from 'react';
import { Card, Loader } from 'semantic-ui-react';

import Pie from './Pie';

import './Pies.css';

export default class Pies extends Component {
  state = {
    isLoading: true,
    pies: [],
  };

  componentDidMount() {
    this.props.registerAddedEvent(this.onAdded);
    this.props.registerRatedEvent(this.onRated);
    this.fetchPies(this.props.account);
  }

  componentWillReceiveProps({ account }) {
    if (account !== this.props.account) {
      this.fetchPies(account);
    }
  }

  fetchPies = account => {
    this.setState({ isLoading: true }, () => {
      this.props.onFetch(account).then(pies => {
        this.setState({ pies, isLoading: false });
      });
    });
  };

  onAdded = pie => {
    this.setState({ pies: [...this.state.pies, pie] });
  };

  onRated = ({ id, totalRatings, avgRating }) => {
    this.setState(({ pies }) => ({
      pies: pies.map(pie => (pie.id === id ? { ...pie, isRatable: false, totalRatings, avgRating } : pie)),
    }));
  };

  handleRating = id => (e, { rating }) => {
    this.props.onRating(this.props.account, id, rating);
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div className="Pies">
          <Loader active inline="centered" />
        </div>
      );
    }

    if (this.state.pies.length === 0) {
      return <div className="Pies">No pies found...</div>;
    }

    return (
      <div className="Pies">
        <Card.Group itemsPerRow={4} doubling>
          {this.state.pies.map(pie => (
            <Pie
              key={`pie-${pie.id}`}
              photoHash={pie.photoHash}
              name={pie.name}
              rating={pie.avgRating}
              onRating={pie.isRatable && this.handleRating(pie.id)}
            />
          ))}
        </Card.Group>
      </div>
    );
  }
}
