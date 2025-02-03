import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('MainApp'); // Navigate to the main app after 1 second
    }, 2000);
    return () => clearTimeout(timer); // Clear the timer on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://svym.goonjan.com/file.htm?id=15&filename=SVYM_Logo_Black9.png&owner=organization&type=logo',
        }}
        style={styles.logo}
      />
      <Text style={styles.title}>ಜನಧ್ವನಿ</Text>
      <Text style={styles.tagline}>An Initiative by SVYM</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#264796', // Match this to your app's theme
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginVertical: 10,
  },
  tagline: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 5,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
