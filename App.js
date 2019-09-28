import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';

import Header from './components/Header';

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);
  const [helloText, setText] = useState('Hey Michael how are you doing?');

  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  }

  const addGoalHandler = () => {
    setCourseGoals(currentGoals => [...currentGoals, enteredGoal]);
  }

  const changeText = () => {
    setText('That\'s good to hear. I\'m doing well too!')
  }

  return (
    <View style={styles.screen}>
      <Header title="Dog Tinder"></Header>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  input: { width: 200, borderColor: 'black', borderWidth: 0.5, padding: 15 },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
