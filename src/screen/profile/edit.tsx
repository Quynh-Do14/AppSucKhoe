import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
} from "react-native";
import LoadingFullScreen from "../../infrastructure/components/controls/loading";
import db from "../../core/config/firebase.config";
import { useRecoilValue } from "recoil";
import { ProfileState } from "../../core/atoms/profile/profileState";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatTime } from "../../infrastructure/helper/helper";
const ParameterScreen = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [age, setAge] = useState<string>("");
    const [height, setHeight] = useState<string>("");
    const [weight, setWeight] = useState<string>("");
    const [sleep, setSleep] = useState(new Date());
    const [show, setShow] = useState<boolean>(false);
    const [profile, setProfile] = useState<any>({});
    const userProfile = useRecoilValue(ProfileState).data;

    const navigate = useNavigation()
    const fetchUser = async () => {
        setLoading(true);
        try {
            const querySnapshot = await db.collection("parameter").where("uid", "==", userProfile.uid).get();
            const foods: any[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setLoading(false);
            setProfile(foods[0]);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchUser();
    }, []);

    console.log("profile", profile?.id);


    const handleSubmit = async () => {
        if (profile?.id) {
            setLoading(true);
            if (
                isNaN(Number(age)) ||
                isNaN(Number(height)) ||
                isNaN(Number(weight))
            ) {
                Alert.alert("Invalid input", "Please fill all fields correctly.");
                return;
            }

            try {
                await db.collection("parameter").doc(profile.id).update({
                    age: age,
                    height: height,
                    weight: weight,
                    sleep: formatTime(sleep),
                }).then(() => {
                    Alert.alert("Success", "Update Data successfully!");
                    setLoading(false);
                }).catch(() => {
                    setLoading(false);
                });
            } catch (error) {
                console.error("Error adding food:", error);
                setLoading(false);
                Alert.alert("Error", "Failed to add food!");
            }
        }
        else {
            setLoading(true);
            if (
                isNaN(Number(age)) ||
                isNaN(Number(height)) ||
                isNaN(Number(weight))
            ) {
                Alert.alert("Invalid input", "Please fill all fields correctly.");
                return;
            }

            try {
                await db.collection("parameter").add({
                    age: age,
                    height: height,
                    weight: weight,
                    sleep: formatTime(sleep),
                    uid: userProfile.uid
                }).then(() => {
                    Alert.alert("Success", "Update Data successfully!");
                    setLoading(false);
                }).catch(() => {
                    setLoading(false);
                });
            } catch (error) {
                console.error("Error adding food:", error);
                setLoading(false);
                Alert.alert("Error", "Failed to add food!");
            }
        }
    };

    useEffect(() => {
        if (profile) {
            setAge(String(profile?.age));
            setHeight(String(profile?.height));
            setWeight(String(profile?.weight));
        }
        else {
            setAge("");
            setHeight("");
            setWeight("");
        }
    }, [profile])

    const handleChangeTime = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || sleep;
        setShow(false);
        setSleep(currentDate);
    };

    const showTimepicker = () => {
        setShow(true);
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.containerContent}>
                    {/* Header Section */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigate.goBack()}>
                            <Text style={styles.backArrow}>{`<`}</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Tell me more about yourself</Text>
                        <View style={styles.successIcon} />
                    </View>

                    {/* Input Fields */}
                    <View style={styles.inputContainer}>
                        {/* Age Input */}
                        <View style={styles.inputBox}>
                            <Text style={styles.labelStyle}>
                                Your Age
                            </Text>
                            <TextInput
                                placeholder="Your Age"
                                value={age}
                                onChangeText={setAge}
                                keyboardType="numeric"
                                style={styles.input}
                            />
                        </View>

                        {/* Height Input */}
                        <View style={styles.inputBox}>
                            <Text style={styles.labelStyle}>
                                Your Height
                            </Text>
                            <TextInput
                                placeholder="Your Height"
                                value={height}
                                onChangeText={setHeight}
                                keyboardType="numeric"
                                style={styles.input}
                            />
                        </View>

                        {/* Weight Input */}
                        <View style={styles.inputBox}>
                            <Text style={styles.labelStyle}>
                                Your Weight
                            </Text>
                            <TextInput
                                placeholder="Your Weight"
                                value={weight}
                                onChangeText={setWeight}
                                keyboardType="numeric"
                                style={styles.input}
                            />
                        </View>
                        <TouchableOpacity onPress={showTimepicker} style={styles.inputTime}>
                            <Text style={styles.labelStyle}>
                                Sleep
                            </Text>
                            <Text style={styles.inputText}>
                                {profile?.sleep ? profile?.sleep : sleep.toLocaleTimeString()}
                            </Text>
                        </TouchableOpacity>

                        {show && (
                            <DateTimePicker
                                value={sleep}
                                mode="time"
                                display="default"
                                onChange={handleChangeTime}
                            />
                        )}
                    </View>

                    {/* Next Button */}
                    <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
                        <Text style={styles.nextButtonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <LoadingFullScreen loading={loading} />
        </View>
    );
};

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

export default ParameterScreen;
