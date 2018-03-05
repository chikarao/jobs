import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
// platform only for android
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';


class ReviewScreen extends Component {
  // state = { color: 'red' };
// instance property in every instance
  // static navigationOptions = {
  //   title: 'Review Jobs',
  //   headerRight: (<Text>Go Right</Text>)
  //
  //   }
  // below is class level property does not have access to props
// so cannot use this.navigation.navigate
    static navigationOptions = props => {
       const { navigation } = props;
       const { navigate } = navigation;
       // navigate fucntion passed as props
       return {
           // headerTitle: 'Review Jobs',
           tabBarLabel: 'Review Jobs',
           tabBarIcon: ({ tintColor }) => {
             return <Icon name="favorite" size={30} color={tintColor} />;
           },
           headerRight: (
            <Button
              title="Settings"
              onPress={() => navigate('settings')}
              backgroundColor="rgba(0,0,0,0)"
              color="rgba(0, 122, 255, 1)"
            />
          ),
          style: {
            marginTop: Platform.OS === 'android' ? 24 : 0
          }
          //style obj for android; override for header
       };
   }
// class level property assigned to class not instance

renderLikedJobs() {
  return this.props.likedJobs.map(job => {
    const { company, formattedRelativeTime, url, jobtitle, jobkey } = job;
    // there is no longitude and latitude on the indeed api as of now 3/2018
    const initialRegion = {
      longitude: -122.025984,
      latitude: 36.974995,
      //ES6 syntax of latitude: latitude can be just latitude
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };

    return (
      <Card title={jobtitle} key={jobkey}>
        <View style={{ height: 200 }}>
        <MapView
          style={{ flex: 1 }}
          cacheEnabled={Platform.OS === 'android'}
          scrollEnabled={false}
          initialRegion={initialRegion}
        />
          <View style={styles.detailWrapper}>
            <Text style={styles.italics}>{company}</Text>
            <Text style={styles.italics}>{formattedRelativeTime}</Text>
          </View>
          <Button
            title="Apply Now!"
            backgroundColor="#03A9F4"
            onPress={() => Linking.openURL(url)}
          />
        </View>
      </Card>
    );
  });
}

  render() {
    return (
      <ScrollView>
        {this.renderLikedJobs()}
      </ScrollView>
    );
  }
}

const styles = {
  detailWrapper: {
    marginBottom: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  italics: {
    fontStyle: 'italic'
  }
};


function mapStateToProps(state) {
  return { likedJobs: state.likedJobs };
}

export default connect(mapStateToProps)(ReviewScreen);
