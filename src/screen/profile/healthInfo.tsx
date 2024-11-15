import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const HealthInfo = () => {
    return (
        <View style={styles.container}>
            <View style={styles.infoBox}>
                <FontAwesome5 name="heartbeat" size={24} color="#3a86ff" />
                <Text style={styles.label}>Heart rate</Text>
                <Text style={styles.value}>215bpm</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.infoBox}>
                <FontAwesome5 name="fire" size={24} color="#3a86ff" />
                <Text style={styles.label}>Calories</Text>
                <Text style={styles.value}>756cal</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.infoBox}>
                <FontAwesome5 name="weight" size={24} color="#3a86ff" />
                <Text style={styles.label}>Weight</Text>
                <Text style={styles.value}>103lbs</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#f1f5ff',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    infoBox: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    value: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3a86ff',
        marginTop: 2,
    },
    separator: {
        width: 1,
        height: '70%',
        backgroundColor: '#ddd',
    },
});

export default HealthInfo;
