import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button, SocialIcon } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
renderLastSlide(index) {
  if (index === this.props.data.length - 1) {
    return (
      <View style={{ width: 250, marginTop: 25 }}>
        <SocialIcon
          title='Sign In With Facebook'
          button
          type='facebook'
          // iconSize={50}
          // buttonStyle={styles.faceBookButtonStyle}
          onPress={this.props.onComplete}
        />
      </View>

      // <Button
      // title="Onwards!"
      // raised
      // buttonStyle={styles.buttonStyle}
      // onPress={this.props.onComplete}
      // // no () because called in future, not when rendered
      // />

    );
  }
}

  renderSlides() {
    return this.props.data.map((slide, index) => {
      return (
        <View
        key={slide.text}
        style={[styles.slideStyle, { backgroundColor: slide.color }]}
        >
          <Text style={styles.textStyle}>{slide.text}</Text>

        {this.renderLastSlide(index)}
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView
        horizontal
        style={{ flex: 1 }}
        pagingEnabled
      >
      {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center'
  },
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: SCREEN_WIDTH
  },
  buttonStyle: {
    backgroundColor: '#0288D1',
    marginTop: 20,
    borderRadius: 5
  },
  facebookButtonStyle: {
    fontSize: 10
  }
};

export default Slides;
