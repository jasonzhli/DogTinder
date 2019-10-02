import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
// import firebase from 'firebase';
import dummyData from '../dummyData';
// import Constants from 'expo-constants';

const EventItem = (props) => {

  const onEventItemClick = ()  => {
    let details = props.details;
    props.navigation.navigate("EventDetailsScreen", {details: details})
  }

  return (
    <TouchableOpacity onPress={onEventItemClick}>
      <View style={styles.rowContainer}>
        <Image source={{ uri: props.thumbnail.uri }}
          style={styles.thumbnail}
          resizeMode="contain" />
        <View style={styles.rowText}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode={'tail'}>
            {props.title}
          </Text>
          <Text style={styles.author} numberOfLines={1} ellipsizeMode={'tail'}>
            {props.subtitle}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const EventsScreen = (props) => {

  const renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dummyData.events}
        renderItem={({ item }) => (
          // <ListItem
          <EventItem
            navigation={props.navigation}
            details={item}
            title={item.name}
            subtitle={item.local_date}
            thumbnail={{ uri: 'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fdavideby.mla.bcndpcaucus.ca%2Fwp-content%2Fuploads%2Fsites%2F14%2F2015%2F09%2Fdog-poster-big.jpg&f=1&nofb=1' } }
            containerStyle={{ borderBottomWidth: 0 }}
          />)
       } keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={renderSeparator} 
        ListHeaderComponent={renderHeader} 
      />
    </SafeAreaView>
  )
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: Constants.statusBarHeight,
//   },
//   item: {
//     backgroundColor: '#f9c2ff',
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 20,
//   },
// });

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    height: 100,
    padding: 10,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 4,
    shadowOffset: { width: 1, height: 1, },
    shadowColor: '#CCC',
    shadowOpacity: 1.0,
    shadowRadius: 1
  },
  title: {
    paddingLeft: 10,
    paddingTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#777'
  },
  author: {
    paddingLeft: 10,
    marginTop: 5,
    fontSize: 14,
    color: '#777'
  },
  thumbnail: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  rowText: {
    flex: 4,
    flexDirection: 'column'
  }
});

export default EventsScreen;

