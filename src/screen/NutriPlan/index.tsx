import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainLayout from '../../infrastructure/layouts/layout'
import { Color, FontSize } from '../../core/constants/StyleCommon';

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
        <MainLayout title={"Chế độ dinh dưỡng"}>
            <View style={styles.container}>
                {
                    food.map((it, index) => {
                        return (
                            <View style={styles.card} key={index}>
                                <Image source={{ uri: it.image }} style={styles.image} />
                                <View style={styles.infoContainer}>
                                    <Text style={styles.name}>{it.name}</Text>
                                    <View style={styles.details}>
                                        <Text style={styles.rating}>{it.calo} calo</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        </MainLayout>
    )
}

export default HealthTrackingScreen

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: 4,
        paddingHorizontal: 12,
    },
    card: {
        flexDirection: 'row',
        gap: 12,
        backgroundColor: Color.lightBackground,
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        alignItems: 'center',
        shadowColor: Color.lightBorder,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    image: {
        width: viewportWidth / 4,
        height: 80,
        borderRadius: 30,
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: FontSize.fontSmall,
        fontWeight: '700',
        marginBottom: 2,
    },
    specialty: {
        fontSize: FontSize.fontXSmall,
        color: Color.blackText,
        marginBottom: 5,
    },
    details: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: 14,
        color: Color.blueText,
        marginRight: 10,
    },
})