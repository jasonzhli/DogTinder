import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';
import firebase from 'firebase';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const Dogs = [
  { id: "1", uri: 'https://dog-bucket-dt.s3.amazonaws.com/images/Screen+Shot+2019-09-30+at+10.15.01+PM.png'},
  { id: "2", uri: 'https://dog-bucket-dt.s3.amazonaws.com/images/Screen+Shot+2019-09-30+at+10.15.41+PM.png' },
  { id: "3", uri: 'https://dog-bucket-dt.s3.amazonaws.com/images/img_3475.jpg' },
  { id: "4", uri: 'https://dog-bucket-dt.s3.amazonaws.com/images/Screen+Shot+2019-09-30+at+10.15.55+PM.png' },
  { id: "5", uri: 'https://dog-bucket-dt.s3.amazonaws.com/images/Screen+Shot+2019-09-30+at+10.16.04+PM.png' },
  { id: "6", uri: 'https://dog-bucket-dt.s3.amazonaws.com/images/Screen+Shot+2019-09-30+at+10.16.14+PM.png' },
]

class UserScreen extends React.Component {
  constructor() {
    super();
    this.position = new Animated.ValueXY();
    this.state = {
      currentIndex: 0
    };
    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    });
    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
      ]
    };

  }

  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        } else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start()
        }
      } 
    })
  }

  render() {
    return Dogs.map((item, i) => {
      if (i < this.state.currentIndex) {
        return null;
      } else if (i == this.state.currentIndex) {
        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={i}
            style={
              [this.rotateAndTranslate,
                {
                  height: SCREEN_HEIGHT - 140,
                  width: SCREEN_WIDTH,
                  padding: 10,
                  position: 'absolute'
                }
              ]
            }>
            <Image
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: "cover",
                borderRadius: 20
              }}
              source={{ uri: item.uri }}
            />
          </Animated.View>
        );
      } else {
        return (
          <Animated.View
            key={i}
            style={{
              height: SCREEN_HEIGHT - 140,
              width: SCREEN_WIDTH,
              padding: 10,
              position: "absolute"
            }}
          >
            <Image
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: "cover",
                borderRadius: 20
              }}
              source={{uri: item.uri}}
            />
          </Animated.View>
        );
      }
    }).reverse();
  }

}

// const UserScreen = props => {

//   let position = new Animated.ValueXY();

//   let PanResponder = PanResponder.create({
//     onStartShouldSetPanResponder: (evt, gestureState) => true,
//     onPanResponderMove: (evt, gestureState) => {
//       position.setValue({ x: gestureState.dx, y: gestureState.dy });
//     },
//     onPanResponderRelease: (evt, gestureState) => {
//     }
//   })

//   useEffect(() => {

//   }, [])

//   return Dogs.map((item, i) => {
//     return (
//       <Animated.View
//         key={i}
//         style={{
//           height: SCREEN_HEIGHT - 140,
//           width: SCREEN_WIDTH,
//           padding: 10,
//           position:'absolute'
//         }}
//       >
//         <Image
//           style={{
//             flex: 1,
//             height: null,
//             width: null,
//             resizeMode: "cover",
//             borderRadius: 20
//           }}
//           source={{uri: item.uri}}
//         />
//       </Animated.View>
//     );
//   });
// };

const styles = StyleSheet.create({});

export default UserScreen;

