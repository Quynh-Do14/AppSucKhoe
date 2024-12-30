import { Alert, Dimensions, FlatList, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MainLayout from '../../infrastructure/layouts/layout'
import { Color, FontSize } from '../../core/constants/StyleCommon';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchAndFilter from './search';
import firestore from '@react-native-firebase/firestore';
import db from '../../core/config/firebase.config';
import LoadingFullScreen from '../../infrastructure/components/controls/loading';
import { useRecoilValue } from 'recoil';
import { ProfileState } from '../../core/atoms/profile/profileState';

const cate = [
    {
        label: 'Breakfast',
    },
    {
        label: 'Lunch',
    },
    {
        label: 'Dinner',
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
    type: string
}

const HealthTrackingScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [type, setType] = useState<string>("");
    const [typeSelect, setTypeSelect] = useState<string>("");
    const [selectdId, setSelectdId] = useState<string>("");

    const [formData, setFormData] = useState<FoodRation>({
        name: "",
        carb: "",
        fat: "",
        prot: "",
        volume: "",
        type: "",
    })

    const handleChange = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<any[]>([]);
    const [productsFilter, setProductsFilter] = useState<any[]>([]);
    const userProfile = useRecoilValue(ProfileState).data;
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const querySnapshot = await db.collection("foods").where("uid", "==", userProfile.uid).get();
            const foods = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setLoading(false);
            setProducts(foods);
            setProductsFilter(foods);
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
            setModalVisible(false);
            await db.collection("foods").add({
                name: formData.name,
                carb: formData.carb,
                fat: formData.fat,
                prot: formData.prot,
                volume: formData.volume,
                type: type,
                uid: userProfile.uid
            }).then(() => {
                Alert.alert("Success", "Food added successfully!");
                setFormData({ name: "", carb: "", fat: "", prot: "", volume: "", type: "" });
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
    const onOpenModal = (label: string) => {
        setModalVisible(true);
        setType(label)
    }
    useEffect(() => {
        if (typeSelect !== "") {
            const array = products.filter(item => item.type == typeSelect)
            setProductsFilter(array);
        }
        else {
            setProductsFilter(products)
        }
    }, [typeSelect]);

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


    return (
        <MainLayout title={"Discover Food"}>
            <ScrollView>
                <SearchAndFilter
                    setTypeSelect={setTypeSelect}
                />
                <View style={styles.container}>
                    <View style={styles.cardCreate}>
                        {
                            cate.map((item, index) => {
                                return (
                                    <View style={[styles.header]} key={index}>
                                        <Text style={styles.title}>{item.label} </Text>
                                        <TouchableOpacity onPress={() => onOpenModal(item.label)}>
                                            <Icon name="add-circle" size={24} color="#4caf50" />
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }

                    </View>
                    {
                        productsFilter.map((it, index) => {
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

                                        <Text style={styles.calories}>{it.volume}g</Text>

                                        <View style={styles.nutritionContainer}>
                                            <Text style={styles.nutritionText}>Carb: {it.carb}g</Text>
                                            <Text style={styles.nutritionText}>Fat: {it.fat}g</Text>
                                            <Text style={styles.nutritionText}>Prot: {it.prot}g</Text>
                                            <Text style={styles.nutritionText}>Type: {it.type}</Text>
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

                            <Text style={styles.modalText}>{type}</Text>

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
        paddingHorizontal: 12,
        paddingVertical: 20,
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: viewportHeight / 6
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