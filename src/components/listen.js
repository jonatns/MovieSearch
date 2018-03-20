import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import * as Progress from 'react-native-progress';

const Listen = ({ listen, searching }) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={listen}
        disabled={searching}
      >
        <View style={styles.listenBtn}>
          {
            searching
            ? <Progress.Bar animated indeterminate width={100} height={20} color="white" />
            : <Text style={styles.listenBtnText}>Listen</Text>
          }
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = {
  constainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listenBtn: {
    height: 120,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00897B',
    borderRadius: 75,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5
  },
  listenBtnText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Courier'
  }
};

export default Listen;
