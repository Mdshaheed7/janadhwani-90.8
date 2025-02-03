import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Top Greeting */}
      <Text style={styles.title}>Hello, there!</Text>

      {/* Instruction Section */}
      <View style={styles.instructionContainer}>
        <Text style={styles.subtitle}>Enter your mobile number</Text>
        <Text style={styles.description}>We will send you a verification code</Text>
      </View>

      {/* Mobile Number Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your mobile number"
        keyboardType="numeric"
        maxLength={10}
      />

      {/* Divider Section */}
      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.line} />
      </View>

      {/* Login via WhatsApp */}
      <TouchableOpacity style={styles.whatsappButton}>
        <Text style={styles.whatsappText}>Login via WhatsApp</Text>
      </TouchableOpacity>

      {/* Login via WhatsApp */}
      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.googleText}>Login as Guest</Text>
      </TouchableOpacity>

      {/* Continue Button at Bottom */}
      <View style={styles.bottomContainer}>
        // In LoginScreen.js, modify the continue button
      <TouchableOpacity 
        style={styles.continueButton}
        onPress={() => navigation.replace('MainApp')}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#264796',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginVertical: 20,
  },
  instructionContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 30,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ffffff',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#ffffff',
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  whatsappText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  googleButton: {
    backgroundColor: '#00000000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  googleText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  bottomContainer: {
    marginTop: 'auto',
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: '#bcbcbc',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  continueText: {
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default LoginScreen;

