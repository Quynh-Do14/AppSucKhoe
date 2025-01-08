import React, { useEffect, useRef, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Color } from '../../core/constants/StyleCommon';
import LoadingFullScreen from '../../infrastructure/components/controls/loading';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const ForgetPassword = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [password, setPassword] = useState('');
    const navigation = useNavigation<any>();
    const changePassword = async () => {
        const user = auth().currentUser;
        setLoading(true);
        if (user) {
            try {
                await user.updatePassword(password)
                    .then(() => {
                        setLoading(false);
                        navigation.navigate('BottomMenu')
                    });
            } catch (error) {
                setLoading(false);
            }
        } else {
            console.log("Không có người dùng đăng nhập.");
        }
    };

    return (
        <View style={styles.container}>
            {/* Logo */}
            <View style={styles.logoContainer}>
                <Image source={require('../../assets/images/logo.png')} />
            </View>

            {/* Title */}
            <Text style={styles.title}>Change Password</Text>

            {/* Password Input */}
            <TextInput
                style={styles.input}
                placeholder='Password'
                placeholderTextColor='#aaa'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {/* Remember Me and Forgot Password */}
            {/* Sign In Button */}
            <TouchableOpacity style={styles.signInButton} onPress={changePassword}>
                <Text style={styles.signInButtonText}>Send</Text>
            </TouchableOpacity>

            {/* Social Sign In */}

            {/* Sign Up */}
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={styles.signUpText}>
                    <Text style={styles.signUpLink}>Back</Text>
                </Text>
            </TouchableOpacity>
            <LoadingFullScreen loading={loading} />
        </View>
    )
}

export default ForgetPassword

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
        borderWidth: 1,
        borderColor: '#e1e1e1',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        shadowRadius: 4,
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
})