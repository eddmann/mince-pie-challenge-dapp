import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

export default class AddPie extends Component {
  state = {
    name: '',
    photo: undefined,
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handlePhotoChange = e => {
    this.setState({ photo: e.target.files[0] });
  };

  handleClick = e => {
    const { name, photo } = this.state;

    if (name && photo) {
      this.props.onAdd(this.props.account, name, photo);
      this.setState({ name: '', photo: undefined });
    }
  };

  render() {
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Input label="Name" type="text" onChange={this.handleNameChange} value={this.state.name} />
          <Form.Input label="Photo" type="file" onChange={this.handlePhotoChange} />
        </Form.Group>
        <Button onClick={this.handleClick}>Add</Button>
      </Form>
    );
  }
}
