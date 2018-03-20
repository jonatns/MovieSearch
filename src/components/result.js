import React from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';

const renderResult = (result) => {
  return (
    <View>
      <Image
        source={{ uri: result.imageUri }}
        style={styles.resultImage}
      />
      <Text style={styles.resulTitle}>
        {result.title}
      </Text>
    </View>
  );
};

const renderNoResult = () => {
  return (
    <View>
      <Text style={{ fontSize: 26 ,fontFamily: 'Courier' }}>No movie found :(</Text>
    </View>
  );
};

const Result = ({ showResult, hideResult, result }) => {
  return (
    <Modal
      isVisible={showResult}
      backdropColor="#81C784"
      backdropOpacity={1}
    >
      <View style={styles.constainer}>
        {result.title !== '' && result.title !== ''
        ? renderResult(result)
        : renderNoResult()
        }
        <TouchableWithoutFeedback
          onPress={hideResult}
        >
          <View style={{ marginTop: 20, borderColor: 'black', borderWidth: 1, borderRadius: 5, width: 100, height: 50, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 26 ,fontFamily: 'Courier' }}>Okay!</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

const styles = {
  constainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  resultImage: {
    width: 200,
    height: 200,
  },
  resultTitle: {
    fontSize: 18
  }
};

export default Result;
