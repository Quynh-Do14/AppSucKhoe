import { Alert, Dimensions, FlatList, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MainLayout from '../../infrastructure/layouts/layout'
import { Color, FontSize } from '../../core/constants/StyleCommon';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchAndFilter from './search';
import firestore from '@react-native-firebase/firestore';
import db from '../../core/config/firebase.config';
import LoadingFullScreen from '../../infrastructure/components/controls/loading';

const food = [
    {
        id: '1',
        name: 'Rau ngót',
        calo: 100,
        image: require("../../assets/images/bo.png"),
    },
    {
        id: '2',
        name: 'Thịt bò',
        calo: 100,
        image: require("../../assets/images/bo.png"),
    },
    {
        id: '3',
        name: 'Thịt gà',
        calo: 100,
        image: require("../../assets/images/bo.png"),
    },
    {
        id: '4',
        name: 'Cơm',
        calo: 100,
        image: require("../../assets/images/bo.png"),
    },
    {
        id: '5',
        name: 'Hoa quả: Táo',
        calo: 100,
        image: require("../../assets/images/bo.png"),
    },
];

const { width: viewportWidth } = Dimensions.get('window');
const { height: viewportHeight } = Dimensions.get('window');

interface FoodRation {
    name: string;
    carb: string;
    fat: string;
    prot: string;
    volume: string
}

const HealthTrackingScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState<FoodRation>({
        name: "",
        carb: "",
        fat: "",
        prot: "",
        volume: "",
    })

    const handleChange = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<any[]>([]);
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const querySnapshot = await db.collection("foods").get();
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
        // Validate input
        setLoading(true);
        if (
            !formData.name ||
            isNaN(Number(formData.carb)) ||
            isNaN(Number(formData.fat)) ||
            isNaN(Number(formData.prot)) ||
            isNaN(Number(formData.volume))
        ) {
            Alert.alert("Invalid input", "Please fill all fields correctly.");
            return;
        }

        try {
            await db.collection("foods").add({
                name: formData.name,
                carb: formData.carb,
                fat: formData.fat,
                prot: formData.prot,
                volume: formData.volume,
            }).then(() => {
                Alert.alert("Success", "Food added successfully!");
                setFormData({ name: "", carb: "", fat: "", prot: "", volume: "" });
                setModalVisible(false);
                setLoading(false);
                fetchProducts();
            }).catch(() => {
                setModalVisible(false)
                setLoading(false);
            });
        } catch (error) {
            console.error("Error adding food:", error);
            setModalVisible(false)
            setLoading(false);
            Alert.alert("Error", "Failed to add food!");
        }
    };

    return (
        <MainLayout title={"Discover Food"}>
            <ScrollView>
                <SearchAndFilter />
                <View style={styles.container}>
                    <View style={styles.cardCreate}>
                        <View style={[styles.header, { width: "100%" }]}>
                            <Text style={styles.title}>Lunch </Text>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
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
                                            <Icon name="heart-outline" size={24} color="#4caf50" />
                                            <Text style={styles.title}>{it.name}</Text>
                                        </View>

                                        <Text style={styles.calories}>{it.volume}g</Text>

                                        <View style={styles.nutritionContainer}>
                                            <Text style={styles.nutritionText}>Carb: {it.carb}g</Text>
                                            <Text style={styles.nutritionText}>Fat: {it.fat}g</Text>
                                            <Text style={styles.nutritionText}>Prot: {it.prot}g</Text>
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
                </View>
                <Modal
                    animationType="slide" // hoặc 'fade', 'none'
                    transparent={true} // Nếu bạn muốn modal hiển thị với nền trong suốt
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)} // Dùng cho Android Back Button
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

                            <Text style={styles.modalText}>Add menu</Text>

                            {/* Các input form */}
                            <TextInput
                                style={styles.input}
                                placeholder="Name"
                                placeholderTextColor="#aaa"
                                value={formData.name}
                                onChangeText={(text) => handleChange("name", text)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Volume"
                                placeholderTextColor="#aaa"
                                value={formData.volume}
                                onChangeText={(text) => handleChange("volume", text)}
                                keyboardType="numeric"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Carb"
                                placeholderTextColor="#aaa"
                                value={formData.carb}
                                onChangeText={(text) => handleChange("carb", text)}
                                keyboardType="numeric"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Fat"
                                placeholderTextColor="#aaa"
                                value={formData.fat}
                                onChangeText={(text) => handleChange("fat", text)}
                                keyboardType="numeric"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Prot"
                                placeholderTextColor="#aaa"
                                value={formData.prot}
                                onChangeText={(text) => handleChange("prot", text)}
                                keyboardType="numeric"
                            />
                            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                                <Text style={styles.buttonText}>Create</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
            <LoadingFullScreen loading={loading} />
        </MainLayout >
    )
}

export default HealthTrackingScreen

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: 20,
        // backgroundColor: "#F7FAFE",
        paddingHorizontal: 12,
        paddingVertical: 20,
    },
    card: {
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardCreate: {
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: viewportHeight / 6
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        gap: 12,
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
        padding: 20,
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
})