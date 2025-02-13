import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Color } from '../../core/constants/StyleCommon';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const RegisterScreen = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [_data, _setData] = useState<any>({});
    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>(null);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigation = useNavigation<any>();

    const dataProfile = _data;
    const setDataProfile = (data: any) => {
        Object.assign(dataProfile, { ...data });
        _setData({ ...dataProfile });
    };

    const isValidData = () => {
        let allRequestOK = true;

        setValidate({ ...validate });

        Object.values(validate).forEach((it: any) => {
            if (it.isError === true) {
                allRequestOK = false;
            }
        });

        return allRequestOK;
    };

    const secondInputRef = useRef<TextInput>(null);

    const handleSubmitFirstInput = () => {
        secondInputRef.current?.focus();
    };

    const onSignUpAsync = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password.');
            return;
        }
        setLoading(true);
        try {
            // Đăng ký người dùng bằng email và mật khẩu
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            Alert.alert('Success', `User ${userCredential.user.email} created successfully!`);
            navigation.navigate("LoginScreen")
            setLoading(false);
            await firestore().collection('users').doc(userCredential.user.uid).set({
                name: name,
                email: email,
                phone: phone,
                password: password,
                createdAt: firestore.FieldValue.serverTimestamp(),
            });
        } catch (error: any) {
            console.error(error);
            setLoading(false);
            let errorMessage = 'An error occurred. Please try again.';
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('This email is already in use.');
            } else if (error.code === 'auth/invalid-email') {
                Alert.alert('Invalid email address.');
            } else if (error.code === 'auth/weak-password') {
                Alert.alert('Password should be at least 6 characters.');
            }
        }
    }

    return (
        <View style={styles.container}>
            {/* Logo */}
            {/* <View style={styles.logoContainer}>
                <Image source={require('../../assets/images/logo.png')} />
            </View> */}

            {/* Title */}
            <Text style={styles.title}>Create your account</Text>

            {/* Email Input */}
            <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#aaa"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                placeholder="Phone"
                placeholderTextColor="#aaa"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />

            {/* Password Input */}
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {/* Remember Me and Forgot Password */}
            {/* <View style={styles.row}>
                <TouchableOpacity
                    style={styles.rememberMeContainer}
                    onPress={() => setRememberMe(!rememberMe)}
                >
                    <View style={[styles.checkbox, rememberMe && styles.checkboxSelected]} />
                    <Text style={styles.signUpText}>
                        I understood the?{' '}
                        <Text style={styles.signUpLink}> terms & policy</Text>
                    </Text>
                </TouchableOpacity>

            </View> */}

            {/* Sign In Button */}
            <TouchableOpacity style={styles.signInButton} onPress={onSignUpAsync}>
                <Text style={styles.signInButtonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* Social Sign In */}
            {/* <Text style={styles.orText}>or sign in with</Text>
            <View style={styles.socialContainer}>
                <TouchableOpacity style={styles.socialButton}>
                    <Icon name="logo-google" size={24} color="#DB4437" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Icon name="logo-apple" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Icon name="logo-facebook" size={24} color="#4267B2" />
                </TouchableOpacity>
            </View> */}

            {/* Sign Up */}
            <TouchableOpacity
                onPress={() => navigation.navigate("LoginScreen")}>
                <Text style={styles.signUpText}>
                    Don’t have an account?{' '}
                    <Text style={styles.signUpLink}>Log In</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        paddingHorizontal: 16,
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        marginBottom: 12,
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 18,
        height: 18,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginRight: 8,
        backgroundColor: '#fff',
    },
    checkboxSelected: {
        backgroundColor: '#4A90E2',
        borderColor: '#4A90E2',
    },
    rememberMeText: {
        fontSize: 14,
        color: '#555',
    },
    forgotPassword: {
        fontSize: 14,
        color: '#FF6F61',
    },
    signInButton: {
        backgroundColor: Color.darkBlueBackground,
        borderRadius: 90,
        paddingVertical: 12,
        alignItems: 'center',
        marginBottom: 20,
    },
    signInButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    orText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#aaa',
        marginBottom: 20,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    socialButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    signUpText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#555',
    },
    signUpLink: {
        color: '#85C850',
        fontWeight: 'bold',
    },
});


export default RegisterScreen;
