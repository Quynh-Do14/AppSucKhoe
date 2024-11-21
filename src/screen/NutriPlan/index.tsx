import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainLayout from '../../infrastructure/layouts/layout'
import { Color, FontSize } from '../../core/constants/StyleCommon';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchAndFilter from './search';

const food = [
    {
        id: '1',
        name: 'Rau ngót',
        calo: 100,
        image: 'https://nhanong.tutaylam.com/wp-content/uploads/2024/03/rau-ngot-700x440.jpg',
    },
    {
        id: '2',
        name: 'Thịt bò',
        calo: 100,
        image: 'https://nhanong.tutaylam.com/wp-content/uploads/2024/03/rau-ngot-700x440.jpg',
    },
    {
        id: '3',
        name: 'Thịt gà',
        calo: 100,
        image: 'https://nhanong.tutaylam.com/wp-content/uploads/2024/03/rau-ngot-700x440.jpg',
    },
    {
        id: '4',
        name: 'Cơm',
        calo: 100,
        image: 'https://nhanong.tutaylam.com/wp-content/uploads/2024/03/rau-ngot-700x440.jpg',
    },
    {
        id: '5',
        name: 'Hoa quả: Táo',
        calo: 100,
        image: 'https://nhanong.tutaylam.com/wp-content/uploads/2024/03/rau-ngot-700x440.jpg',
    },
];

const { width: viewportWidth } = Dimensions.get('window');
const { height: viewportHeight } = Dimensions.get('window');

const HealthTrackingScreen = () => {
    return (
        <MainLayout title={"Discover Food"}>
            <ScrollView>
                <SearchAndFilter />
                <View style={styles.container}>
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
                                        source={{
                                            uri: it.image
                                        }}
                                        style={styles.image}
                                    />
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
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
})