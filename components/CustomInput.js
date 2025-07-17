import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet, 
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const CustomInput = ({ 
  label, 
  value, 
  onChangeText, 
  secureTextEntry, 
  keyboardType, 
  error,
  icon,
  style,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View style={[styles.container, style]}>
      <View style={[
        styles.inputContainer,
        isFocused && styles.inputContainerFocused,
        error && styles.inputContainerError
      ]}>
        {icon && (
          <Ionicons 
            name={icon} 
            size={20} 
            color={isFocused ? '#000000' : '#666666'} 
            style={styles.icon}
          />
        )}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={label}
          placeholderTextColor="#999999"
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons 
              name={showPassword ? 'eye-off' : 'eye'} 
              size={20} 
              color="#666666" 
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: width * 0.85,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 50,
  },
  inputContainerFocused: {
    borderColor: '#000000',
  },
  inputContainerError: {
    borderColor: '#FF0000',
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
  },
  eyeIcon: {
    padding: 4,
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 16,
  },
});

export default CustomInput; 