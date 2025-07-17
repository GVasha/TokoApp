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

const SignUpScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
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
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (validateForm()) {
      Alert.alert('Success', 'Account created successfully!');
      // Here you would typically call your registration API
      navigation.navigate('SignIn');
    }
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
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          
          <View style={styles.logoContainer}>
            <Ionicons name="person-add-outline" size={40} color="#000000" />
          </View>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join us and get started</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <View style={styles.nameRow}>
            <CustomInput
              label="First Name"
              value={firstName}
              onChangeText={setFirstName}
              icon="person-outline"
              error={errors.firstName}
              style={[styles.nameInput, { marginRight: 8 }]}
            />
            <CustomInput
              label="Last Name"
              value={lastName}
              onChangeText={setLastName}
              icon="person-outline"
              error={errors.lastName}
              style={[styles.nameInput, { marginLeft: 8 }]}
            />
          </View>

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

          <CustomInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            icon="checkmark-circle-outline"
            error={errors.confirmPassword}
          />

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By creating an account, you agree to our{' '}
              <Text style={styles.termsLink}>Terms of Service</Text>
              {' '}and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </View>

          <CustomButton
            title="Create Account"
            onPress={handleSignUp}
            variant="primary"
            style={styles.signUpButton}
          />

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.divider} />
          </View>

          <CustomButton
            title="Continue with Google"
            onPress={() => Alert.alert('Google Sign Up', 'Google sign up pressed')}
            variant="outline"
          />

          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.signInLink}>Sign In</Text>
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
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: -width * 0.35,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
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
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.85,
    marginBottom: 8,
  },
  nameInput: {
    width: (width * 0.85 - 16) / 2,
  },
  termsContainer: {
    width: width * 0.85,
    marginVertical: 20,
  },
  termsText: {
    color: '#666666',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    fontWeight: '400',
  },
  termsLink: {
    color: '#000000',
    fontWeight: '500',
  },
  signUpButton: {
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
  signInContainer: {
    flexDirection: 'row',
    marginTop: 40,
  },
  signInText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: '400',
  },
  signInLink: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SignUpScreen; 