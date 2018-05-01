import React, { Component } from 'react';
import { Container, Menu, Dropdown, Divider } from 'semantic-ui-react';

import Pies from './Pies';
import AddPie from './AddPie';

import './App.css';

export default class App extends Component {
  state = {
    account: this.props.accounts[0],
  };

  handleAccountChange = (e, { value }) => {
    this.setState({ account: value });
  };

  render() {
    return (
      <Container className="App">
        <Menu stackable>
          <Menu.Item header>Mince Pie Challenge Dapp</Menu.Item>
          <Menu.Menu position="right">
            <Dropdown
              onChange={this.handleAccountChange}
              value={this.state.account}
              item
              options={this.props.accounts.map(account => ({ key: account, text: account, value: account }))}
            />
          </Menu.Menu>
        </Menu>
        <Pies
          account={this.state.account}
          onFetch={this.props.fetchPies}
          onRating={this.props.ratePie}
          registerAddedEvent={this.props.registerPieAddedEvent}
          registerRatedEvent={this.props.registerPieRatedEvent}
        />
        <Divider horizontal>Add Pie</Divider>
        <AddPie account={this.state.account} onAdd={this.props.addPie} />
      </Container>
    );
  }
}
