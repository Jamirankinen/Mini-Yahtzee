import React from 'react';
import { Text, View } from 'react-native';
import styles from '../components/styles/style';

export default Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.title}>
        Author: Jami Rankinen
      </Text>
    </View>
  )
}