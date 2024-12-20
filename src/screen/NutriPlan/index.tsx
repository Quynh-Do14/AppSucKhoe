import { Dimensions, FlatList, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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
    id: string;
    name: string;
    carbs: number;
    fat: number;
    prot: number;
}

const HealthTrackingScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<any[]>([]);
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const querySnapshot = await db.collection("foods").get();
            const foods = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setLoading(false);
            console.log("foods", foods);

        } catch (error) {
            setLoading(false);
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);

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
                        food.map((it, index) => {
                            return (
                                <View style={styles.card} key={index}>
                                    <View style={styles.left}>
                                        <View style={styles.header}>
                                            <Icon name="heart-outline" size={24} color="#4caf50" />
                                            <Text style={styles.title}>{it.name}</Text>
                                        </View>

                                        <Text style={styles.calories}>{it.calo} kCal</Text>

                                        <View style={styles.nutritionContainer}>
                                            <Text style={styles.nutritionText}>Carbs: 43g</Text>
                                            <Text style={styles.nutritionText}>Fat: 27g</Text>
                                            <Text style={styles.nutritionText}>Prot: 27g</Text>
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
                            <Text style={styles.modalText}>Add menu</Text>

                            {/* Nút để đóng modal */}

                            <TextInput
                                style={styles.input}
                                placeholder="Name"
                                placeholderTextColor="#aaa"
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Carbs"
                                placeholderTextColor="#aaa"
                                value={password}
                                onChangeText={setPassword}
                                keyboardType="numeric"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Fat"
                                placeholderTextColor="#aaa"
                                value={password}
                                onChangeText={setPassword}
                                keyboardType="numeric"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Prot"
                                placeholderTextColor="#aaa"
                                value={password}
                                onChangeText={setPassword}
                                keyboardType="numeric"
                            />
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                                <Text style={styles.buttonText}>Create</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
            <LoadingFullScreen loading={loading} />
        </MainLayout>
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
        padding: 10,
        backgroundColor: '#FF6347',
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền trong suốt
    },
    modalContainer: {
        width: viewportWidth / 1.2,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: "column",
        gap: 12
    },
    modalText: {
        fontSize: 18,
        textAlign: "center"
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
})