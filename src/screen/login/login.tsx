import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Color } from '../../core/constants/StyleCommon';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from 'react-native-google-signin';
import { Alert } from 'react-native';
import LoadingFullScreen from '../../infrastructure/components/controls/loading';

GoogleSignin.configure({
    webClientId:
        "156767076381-6tcvp09cpiao3kc9imhk9n21pml7b7fg.apps.googleusercontent.com",
    offlineAccess: true,
});

const LoginScreen = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [_data, _setData] = useState<any>({});
    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>(null);

    const [email, setEmail] = useState('doducquynh14022000@gmail.com');
    const [password, setPassword] = useState('quynhdo14');
    const [rememberMe, setRememberMe] = useState(false);
    const navigation = useNavigation<any>()

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

    function onAuthStateChanged(user: any) {
        if (user) {
            navigation.navigate('Home');
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);
    const onLoginGoogle = async () => {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const { idToken } = await GoogleSignin.signIn();

        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        setLoading(true);
        await auth().signInWithCredential(googleCredential)
            .then(() => {
                setLoading(false);
            }).catch(() => {
                setLoading(false);
            });
    }

    const onLoginAsync = async () => {
        navigation.navigate("BottomMenu")
        // setLoading(true);
        // try {
        //     await auth().signInWithEmailAndPassword(email, password).then(
        //         (res) => {
        //             navigation.navigate("BottomMenu")
        //             setLoading(false);
        //         });
        // } catch (error) {
        //     console.error(error);
        //     setLoading(false);
        //     Alert.alert('Error', 'Invalid email or password. Please try again.');
        // }
    }
    return (
        <View style={styles.container}>
            {/* Logo */}
            <View style={styles.logoContainer}>
                <Image source={require('../../assets/images/logo.png')} />
            </View>

            {/* Title */}
            <Text style={styles.title}>Sign in your account</Text>

            {/* Email Input */}
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
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
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.rememberMeContainer}
                    onPress={() => setRememberMe(!rememberMe)}
                >
                    <View style={[styles.checkbox, rememberMe && styles.checkboxSelected]} />
                    <Text style={styles.rememberMeText}>Remember Me</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.forgotPassword}>Forgot Password</Text>
                </TouchableOpacity>
            </View>

            {/* Sign In Button */}
            <TouchableOpacity style={styles.signInButton} onPress={onLoginAsync}>
                <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>

            {/* Social Sign In */}
            <Text style={styles.orText}>or sign in with</Text>
            <View style={styles.socialContainer}>
                <TouchableOpacity style={styles.socialButton} onPress={onLoginGoogle}>
                    <Icon name="logo-google" size={24} color="#DB4437" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Icon name="logo-apple" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Icon name="logo-facebook" size={24} color="#4267B2" />
                </TouchableOpacity>
            </View>

            {/* Sign Up */}
            <TouchableOpacity
                onPress={() => navigation.navigate("RegisterScreen")}>
                <Text style={styles.signUpText}>
                    Don’t have an account?{' '}
                    <Text style={styles.signUpLink}>Sign Up</Text>
                </Text>
            </TouchableOpacity>
            <LoadingFullScreen loading={loading} />
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


export default LoginScreen;
