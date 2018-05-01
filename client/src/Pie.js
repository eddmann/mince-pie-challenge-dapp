import React, { Component } from 'react';
import { Card, Image, Rating } from 'semantic-ui-react';

import DummyImage from './DummyImage.png';

export default class Pie extends Component {
  state = {
    hasPhotoLoaded: false,
  };

  handlePhotoLoaded = () => {
    this.setState({ hasPhotoLoaded: true });
  };

  render() {
    const { id, name, photoHash, onRating, rating } = this.props;

    return (
      <Card key={`pie-${id}`} fluid>
        {!this.state.hasPhotoLoaded && <Image src={DummyImage} style={{ objectFit: 'cover', height: 240 }} />}
        <Image
          style={{ display: this.state.hasPhotoLoaded ? 'block' : 'none', objectFit: 'cover', height: 240 }}
          src={`https://gateway.ipfs.io/ipfs/${photoHash}`}
          onLoad={this.handlePhotoLoaded}
        />
        <Card.Content>
          <Card.Header content={name} />
          <Card.Description>
            <Rating disabled={!onRating} onRate={onRating || undefined} rating={rating} maxRating={5} />
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}
