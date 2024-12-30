import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Image,
    Dimensions,
    Modal,
    ScrollView,
} from "react-native";
import LoadingFullScreen from "../../infrastructure/components/controls/loading";
import db from "../../core/config/firebase.config";
import { useRecoilValue } from "recoil";
import { ProfileState } from "../../core/atoms/profile/profileState";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatTime } from "../../infrastructure/helper/helper";
import Icon from 'react-native-vector-icons/Ionicons';

const { width: viewportWidth } = Dimensions.get('window');
const { height: viewportHeight } = Dimensions.get('window');

interface FoodRation {
    name: string;
    amount: string;
    symptom: string;
    time: string;
}

const HealthScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [sleep, setSleep] = useState(new Date());
    const [show, setShow] = useState<boolean>(false);
    const userProfile = useRecoilValue(ProfileState).data;
    const [products, setProducts] = useState<any[]>([]);
    const [selectdId, setSelectdId] = useState<string>("");

    const [formData, setFormData] = useState<FoodRation>({
        name: "",
        symptom: "",
        time: "",
        amount: "",
    })

    const navigate = useNavigation()

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const querySnapshot = await db.collection("health").where("uid", "==", userProfile.uid).get();
            const foods = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setLoading(false);
            setProducts(foods);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);


    const handleSubmit = async () => {
        setLoading(true);
        try {
            await db.collection("health").add({
                name: formData.name,
                symptom: formData.symptom,
                amount: formData.amount,
                time: formatTime(sleep),
                uid: userProfile.uid
            }).then(() => {
                Alert.alert("Success", "Update Data successfully!");
                setLoading(false);
            }).catch(() => {
                setLoading(false);
            });
        } catch (error) {
            console.error("Error adding medition:", error);
            setLoading(false);
            Alert.alert("Error", "Failed to add medition!");
        };
    }

    const handleChangeTime = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || sleep;
        setShow(false);
        setSleep(currentDate);
    };

    const showTimepicker = () => {
        setShow(true);
    };

    const deleteDocument = async () => {
        setLoading(true);
        try {
            await db.collection("foods").doc(selectdId).delete()
                .then(() => {
                    setLoading(false);
                    fetchProducts();
                });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const onDelete = (documentId: string) => {
        setSelectdId(documentId)
        Alert.alert('Delete Item', 'Do you want to delete item?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Delete', onPress: () => {
                    deleteDocument();
                },
            }
        ]);
    }

    const handleChange = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onOpenModal = () => {
        setModalVisible(true);
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.containerContent}>
                    <View style={styles.headerPage}>
                        <TouchableOpacity onPress={() => navigate.goBack()}>
                            <Text style={styles.backArrow}>{`<`}</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Tell me more about yourself</Text>
                    </View>
                    <View style={styles.cardCreate}>
                        <View style={[styles.header]}>
                            <Text style={styles.title}>Add New </Text>
                            <TouchableOpacity onPress={onOpenModal}>
                                <Icon name="add-circle" size={24} color="#4caf50" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {
                        products.map((it, index) => {
                            return (
                                <View style={styles.card} key={index}>
                                    <View style={styles.left}>
                                        <View style={styles.header}>
                                            <View>
                                                <Icon name="heart-outline" size={24} color="#4caf50" />
                                                <Text style={styles.title}>{it.name}</Text>
                                            </View>
                                            <TouchableOpacity
                                                style={styles.closeButtonItem}
                                                onPress={() => onDelete(it.id)} // Đóng modal khi nhấn vào nút Close
                                            >
                                                <Text style={styles.closeButtonText}>X</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <Text style={styles.calories}>{it.symptom}</Text>

                                        <View style={styles.nutritionContainer}>
                                            <Text style={styles.nutritionText}>Time: {it.time}</Text>
                                            <Text style={styles.nutritionText}>Amount: {it.amount}</Text>
                                        </View>
                                    </View>
                                    <Image
                                        source={it.image}
                                        style={styles.image}
                                    />
                                </View>
                            )
                        })
                    }
                    <Modal
                        animationType="slide" // hoặc 'fade', 'none'
                        transparent={true} // Nếu bạn muốn modal hiển thị với nền trong suốt
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)} // Dùng cho Android Back Button
                        style={{ zIndex: 99 }}
                    >
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContainer}>
                                {/* Nút đóng Modal */}
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setModalVisible(false)} // Đóng modal khi nhấn vào nút Close
                                >
                                    <Text style={styles.closeButtonText}>X</Text>
                                </TouchableOpacity>

                                <TextInput
                                    style={styles.input}
                                    placeholder="Name"
                                    placeholderTextColor="#aaa"
                                    value={formData.name}
                                    onChangeText={(text) => handleChange("name", text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Symptom"
                                    placeholderTextColor="#aaa"
                                    value={formData.symptom}
                                    onChangeText={(text) => handleChange("symptom", text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Amount"
                                    placeholderTextColor="#aaa"
                                    value={formData.amount}
                                    onChangeText={(text) => handleChange("amount", text)}
                                    keyboardType="numeric"
                                />
                                <View>
                                    <TouchableOpacity onPress={showTimepicker} style={styles.inputTime}>
                                        <Text style={styles.inputText}>
                                            {sleep.toLocaleTimeString()}
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
                                <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                                    <Text style={styles.buttonText}>Create</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View >
            </ScrollView>
            <LoadingFullScreen loading={loading} />
        </View >

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
        // backgroundColor: "#F7FAFE",
        paddingHorizontal: 12,
        paddingVertical: 20,
    },
    headerPage: {
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
    card: {
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#e1e1e1",
        backgroundColor: "#FFF",
        shadowRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardCreate: {
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        gap: 12,
        width: "100%"
    },
    left: {
        flexDirection: "column",
        alignItems: "flex-start",
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    calories: {
        fontSize: 20,
        fontWeight: '600',
        color: '#4caf50',
    },
    nutritionContainer: {
    },
    nutritionText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    image: {
        width: viewportWidth / 3,
        height: viewportHeight / 7,
        borderRadius: 8,
    },

    openButton: {
        padding: 15,
        backgroundColor: '#2196F3',
        borderRadius: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'red',
        borderRadius: 20,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonItem: {
        backgroundColor: 'red',
        borderRadius: 20,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Tạo nền mờ
    },
    modalContainer: {
        width: '80%',
        paddingHorizontal: 20,
        paddingVertical: 44,
        backgroundColor: 'white',
        borderRadius: 10,
    },

    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
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
})
export default HealthScreen