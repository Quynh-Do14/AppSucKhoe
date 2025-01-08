import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LoadingFullScreen from '../../infrastructure/components/controls/loading'
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useRecoilValue } from 'recoil';
import { ProfileState } from '../../core/atoms/profile/profileState';
import db from '../../core/config/firebase.config';

const UpdateProfile = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const navigation = useNavigation<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const userProfile = useRecoilValue(ProfileState).data;
    const [profile, setProfile] = useState<any>({});
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const querySnapshot = await db.collection("users").where("email", "==", userProfile.email).get();
            const profileData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setLoading(false);
            setProfile(profileData[0]);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    const updateUserDataInFirestore = async () => {
        const user = auth().currentUser;
        setLoading
        if (user) {
            try {
                await firestore()
                    .collection('users')
                    .doc(user.uid) // Dùng UID của người dùng làm ID của document
                    .update({
                        name: name,
                        phone: phone,
                    }); // Cập nhật dữ liệu mới
                Alert.alert("Update Profile Successfully")
            } catch (error) {
                Alert.alert("Update Profile Fail")
            }
        } else {
            Alert.alert("Update Profile Fail")
        }
    };

    useEffect(() => {
        if (profile) {
            setName(String(profile?.name));
            setEmail(String(profile?.email));
            setPhone(String(profile?.phone));
        }
        else {
            setName("");
            setEmail("");
            setPhone("");
        }
    }, [profile])

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.containerContent}>
                    {/* Header Section */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={styles.backArrow}>{`<`}</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Profile</Text>
                        <View style={styles.successIcon} />
                    </View>

                    {/* Input Fields */}
                    <View style={styles.inputContainer}>
                        <View style={styles.inputBox}>
                            <Text style={styles.labelStyle}>
                                Email
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor="#aaa"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                editable={false}
                            />
                        </View>

                        <View style={styles.inputBox}>
                            <Text style={styles.labelStyle}>
                                Name
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Name"
                                placeholderTextColor="#aaa"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        <View style={styles.inputBox}>
                            <Text style={styles.labelStyle}>
                                Phone
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Phone"
                                placeholderTextColor="#aaa"
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                            />
                        </View>

                    </View>

                    {/* Next Button */}
                    <TouchableOpacity style={styles.nextButton} onPress={updateUserDataInFirestore}>
                        <Text style={styles.nextButtonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <LoadingFullScreen loading={loading} />
        </View>
    )
}

export default UpdateProfile

const styles = StyleSheet.create({
    container: {
        paddingTop: 12,
        height: "100%"
    },
    containerContent: {
        flexDirection: "column",
        gap: 20,
        paddingHorizontal: 12,
        paddingVertical: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    backArrow: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#555",
    },
    headerTitle: {
        flex: 1,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    successIcon: {
        width: 20,
        height: 20,
        backgroundColor: "green",
        borderRadius: 10,
    },
    inputContainer: {
        marginBottom: 30,
    },
    labelStyle: {
        color: "#2e2f2b",
        fontFamily: "Roboto Regular",
        fontWeight: "600",
        fontSize: 11,
    },
    inputBox: {
        borderWidth: 1,
        borderColor: "#e1e1e1",
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 4,
        marginBottom: 15,
    },
    input: {
        fontSize: 12,
        color: "#333",
    },
    picker: {
        height: 40,
        color: "#333",
    },
    nextButton: {
        backgroundColor: "#007bff",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    nextButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    inputTime: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: "#e1e1e1",
        borderRadius: 5,
        alignItems: 'flex-start',
    },
    inputText: {
        fontSize: 16,
        color: '#333',
    },
});