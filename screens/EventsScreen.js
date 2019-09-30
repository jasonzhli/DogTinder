import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
// import firebase from 'firebase';
import dummyData from '../dummyData';
import Constants from 'expo-constants';

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
          <ListItem
            // roundAvatar
            title={item.name}
            subtitle={item.local_date}
            avatar={{uri: 'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fbeachbumsrealty.com%2Fwp-content%2Fuploads%2F2014%2F08%2FVenice-real-estate-agency-event-for-homeless-pets-dogs-walking-in-Strut-Your-Mutt-event-Beach-Bums-Realty.jpg&f=1&nofb=1' } }
            containerStyle={{ borderBottomWidth: 0 }}
          />)
       } keyExtractor={item => item.id}
        ItemSeparatorComponent={renderSeparator} 
        ListHeaderComponent={renderHeader} 
      />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});

export default EventsScreen;

