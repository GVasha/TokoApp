import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const { width, height } = Dimensions.get('window');

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = () => {
    if (validateForm()) {
      Alert.alert('Success', 'Sign in successful!');
      // Here you would typically call your authentication API
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset link sent to your email!');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" />
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="restaurant-outline" size={40} color="#000000" />
          </View>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <CustomInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            icon="mail-outline"
            error={errors.email}
            autoCapitalize="none"
          />

          <CustomInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            icon="lock-closed-outline"
            error={errors.password}
          />

          <TouchableOpacity 
            style={styles.forgotPasswordContainer}
            onPress={handleForgotPassword}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <CustomButton
            title="Sign In"
            onPress={handleSignIn}
            variant="primary"
            style={styles.signInButton}
          />

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.divider} />
          </View>

          <CustomButton
            title="Continue with Google"
            onPress={() => Alert.alert('Google Sign In', 'Google sign in pressed')}
            variant="outline"
          />

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    fontWeight: '400',
  },
  formContainer: {
    alignItems: 'center',
    width: '100%',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginRight: width * 0.075,
    marginBottom: 30,
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '500',
  },
  signInButton: {
    marginBottom: 20,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
    width: width * 0.85,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    color: '#666666',
    paddingHorizontal: 20,
    fontSize: 14,
    fontWeight: '400',
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 40,
  },
  signUpText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: '400',
  },
  signUpLink: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SignInScreen; 