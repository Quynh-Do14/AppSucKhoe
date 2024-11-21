import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const HeaderAnalysis = () => {
    return (
        <View style={styles.card}>
            {/* Tiêu đề và hình ảnh */}
            <View style={styles.header}>
                <Text style={styles.title}>Your Body</Text>
                <Image
                    source={require("../../assets/images/body.png")}
                    style={styles.image}
                />
            </View>

            {/* Thông tin chi tiết */}
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                    <View style={styles.infoColumn}>
                        <Text style={styles.infoValue}>178 cm</Text>
                        <Text style={styles.infoLabel}>Height</Text>
                    </View>
                    <View style={styles.infoColumn}>
                        <Text style={styles.infoValue}>62 %</Text>
                        <Text style={styles.infoLabel}>Water</Text>
                    </View>

                </View>
                <View style={styles.bodyContent}>
                    <View style={styles.infoColumn}>
                        <Text style={styles.infoValue}>70 kg</Text>
                        <Text style={styles.infoLabel}>Weight</Text>
                    </View>
                    <View style={styles.infoColumn}>
                        <Text style={styles.infoValue}>6h 30m</Text>
                        <Text style={styles.infoLabel}>Sleep</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        gap: 24,
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    image: {
        width: 80,
        height: 120,
        resizeMode: 'contain',
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 2,
        marginBottom: 12
    },
    bodyContent: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    infoColumn: {
        alignItems: 'center',
    },
    infoValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    infoLabel: {
        fontSize: 14,
        color: '#777',
    },
});

export default HeaderAnalysis;
