import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button, Icon } from 'react-native-elements';
import * as actions from '../actions';
import Swipe from '../components/Swipe';

//state.jobs.results
class DeckScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Jobs',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="description" size={30} color={tintColor} />;
    }
  }
  renderCard(job) {
    const initialRegion = {
      // longitude: job.longitude,
      // latitude: job.latitude,
      longitude: -122.025984,
      latitude: 36.974995,
      // each job no longer has a lat and lng so just hard code
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };

    return (
      <Card title={job.jobtitle}>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            //user will not be able to scroll map; just view only
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android' ? true : false}
            // render as image or live component; for performance
            initialRegion={initialRegion}
          >
          </MapView>
        </View>

        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
        <Text>
          {job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}
        </Text>
      </Card>
    );
  }

  renderNoMoreCards = () => {
    // this is called by Swipe not deckscreen so need to bind to Swipe
    // can do bind(this) on call or do arrow function like above
    return (
      <Card title="No More Jobs">
      <Button
        title="Back to Map Search"
        large
        icon={{ name: 'my-location' }}
        backgroundColor="#03A0F4"
        onPress={() => this.props.navigation.navigate('map')}
      />
      </Card>
    );
  }

  render() {
    return (
      <View style={{ marginTop: 30 }}>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={job => this.props.likeJob(job)}
          keyProp='jobkey'
        />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 10,
      marginTop: 10

  }
};

function mapStateToProps({ jobs }) {
  return { jobs: jobs.results };
}

export default connect(mapStateToProps, actions)(DeckScreen);
