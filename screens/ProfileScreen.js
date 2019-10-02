import React, { useState, useEffect } from 'react';
import { Animated, View, Text, StyleSheet, Image, Dimensions, Button, ScrollView, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { RNS3 } from 'react-native-aws3';
import { Icon } from 'react-native-elements';

const deviceWidth = Dimensions.get('window').width


const ProfileScreen = (props) => {
  // console.log(JSON.stringify(firebase.database()));
  
  const [images, setImages] = useState(null);

  const userID = firebase.auth().currentUser.uid;

  const animVal = new Animated.Value(0)

  const updatePhotos = () => {
    setImages(null);
    var ref = firebase.database().ref('/users/' + userID + '/dog_pictures');
    ref.on("value", function (snapshot) {
      var array = [];
      for (var key in snapshot.val()) {
        array.push({ source: { uri: snapshot.val()[key] } });
      }
      setImages(array);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }

  const upload = (uri, user) => {
    const file = {
      uri: uri,
      name: `${JSON.stringify(Date.now())}.jpg`,
      type: "image/jpeg"
    };
    const options = {
      keyPrefix: `images/${user}/`,
      bucket: "dog-bucket-dt",
      region: "us-east-1",
      accessKey: "AKIARGLCQX7FH42PZTGP",
      secretKey: "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",
      successActionStatus: 201
    };
    return RNS3.put(file, options)
      .then(response => {
        console.log(response);
        if (response.status !== 201)
          throw new Error("Failed to upload image to S3");
        else {
          firebase
            .database()
            .ref('/users/' + userID + '/dog_pictures')
            .push(response.body.postResponse.location);
          console.log(
            "Successfully uploaded image to s3. s3 bucket url: ",
            response.body.postResponse.location
          );
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }
 
  useEffect(() => {
    getPermissionAsync();
    updatePhotos();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      upload(result.uri, userID)
        .then(() => updatePhotos());
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between'}} >
        <Icon
          raised
          name='user'
          type='font-awesome'
          color='red'
          size={'20'}
          onPress={() => firebase.auth().signOut()}
        />
        <Text style={{fontSize: 30, justifyContent: 'center', alignItems: 'center'}}>{firebase.auth().currentUser.displayName}
        </Text>
        <View>
          <Icon
            raised
            name='image'
            type='font-awesome'
            color='#517fa4'
            size={'20'}
            onPress = {pickImage}
          />
        </View>
      </View>

      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around'}}>
        <View>
          <Text style={{paddingTop: 20}} >Matches{"\n"}</Text>
          <Text style={styles.bigText}>{" "}9</Text>
        </View>
        <Image style={{ width: 100, height: 100, borderRadius: 50}}
          rounded
          source={{
            uri:
              firebase.auth().currentUser.photoURL,
          }}
        />
        <View>
          <Text style={{ paddingTop: 20 }} >Friends{"\n"}</Text>
          <Text style={styles.bigText}>{" "}6</Text>
        </View>
      </View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 6, alignItems: 'flex-start'}}>Maximus, Age 2</Text>
      <Text style={{ fontSize: 16, paddingBottom: 8, paddingLeft: 8, paddingRight: 8 }}>
        My name is Max! I love to play outdoors and am extremely energetic.
        I am looking for dog friends to play with. I get along with big dogs best!
      </Text>

      {images ? (<ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={10}
        pagingEnabled
        onScroll={
          Animated.event(
            [{ nativeEvent: { contentOffset: { x: animVal } } }]
          )
        }
      >

        {images.map((image, i)=> {
          return (
            <Image
              key={`image${i}`}
              source={{ uri: image.source.uri }}
              style={{ width: deviceWidth }}
            />
          )
        })}

      </ScrollView>) : <ActivityIndicator/>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 43,
    flex: 1,
    alignItems: 'center',
  },
  bigText: { 
    fontSize: 40,
    alignItems: 'center', 
    justifyContent: 'center',
    color: '#FF9800',
    fontWeight: 'bold'
  },
});

export default ProfileScreen;