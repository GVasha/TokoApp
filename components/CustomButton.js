import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  Dimensions 
} from 'react-native';

const { width } = Dimensions.get('window');

const CustomButton = ({ title, onPress, style, textStyle, variant = 'primary' }) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      activeOpacity={0.8}
      style={[
        styles.button,
        variant === 'primary' && styles.primaryButton,
        variant === 'secondary' && styles.secondaryButton,
        variant === 'outline' && styles.outlineButton,
        style
      ]}
    >
      <Text style={[
        styles.buttonText, 
        variant === 'primary' && styles.primaryButtonText,
        variant === 'secondary' && styles.secondaryButtonText,
        variant === 'outline' && styles.outlineButtonText,
        textStyle
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: width * 0.85,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  primaryButton: {
    backgroundColor: '#000000',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000000',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000000',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#000000',
  },
  outlineButtonText: {
    color: '#000000',
  },
});

export default CustomButton; 