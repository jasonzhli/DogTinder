import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
// import { Avatar } from 'react-native-elements';
import { RNS3 } from 'react-native-aws3';


const ProfileScreen = (props) => {
  // console.log(JSON.stringify(firebase.auth()));

  const [image, setImage] = useState(null);

  const userID = firebase.auth().currentUser.uid;

  const upload = (uri, user) => {
    const file = {
      uri: uri,
      name: "temp4.jpg",
      type: "image/jpeg"
    };
    const options = {
      keyPrefix: `images/${user}/`,
      bucket: "dog-bucket-dt",
      region: "us-east-1",
      accessKey: "AKIARGLCQX7FJLSJUIHH",
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
            // .update({ dog_pictures: [response.body.postResponse.location]})
            // .child("dog_pictures")
            .push(response.body.postResponse.location);
          // a.setValue(response.body.postResponse.location)
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
  
  // commentRef = pollRef.child("comments").push();
  // commentRef.setValue(comment);

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }
  
  useEffect(() => {
    getPermissionAsync()
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      upload(result.uri, userID);
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 25, paddingBottom: 20}}>{firebase.auth().currentUser.displayName}
      </Text>
      <Image style={{ width: 100, height: 100, borderRadius: 50}}
        rounded
        source={{
          uri:
            firebase.auth().currentUser.photoURL,
        }}
      />
      <Button
        title="Pick an image from camera roll"
        onPress={pickImage}
      />
      <Button
        title="test"
        onPress={() => console.log(image)}
      />
      {image &&
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Sign out" onPress={() => firebase.auth().signOut()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default ProfileScreen;