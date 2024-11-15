import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Color, FontSize } from '../../core/constants/StyleCommon';

const HealthCard = () => {
    return (
        <View style={styles.container}>
            <View style={[styles.card, styles.bigCard]}>
                <View>
                    <Text style={styles.label}>Nhịp tim</Text>
                    <Text style={styles.value}>97</Text>
                    <Text style={styles.unit}>bpm</Text>
                </View>
                <FontAwesome
                    name={'heartbeat'}
                    size={52}
                    color={Color.redText}
                />

            </View>

            <View style={styles.row}>
                <View style={[styles.card, styles.smallCard]}>
                    <Ionicons
                        name={'footsteps'}
                        size={FontSize.fontLarge}
                        color={Color.greenText}
                    />
                    <Text style={styles.label}>Bước chạy</Text>
                    <Text style={styles.value}>A+</Text>
                </View>
                <View style={[styles.card, styles.smallCard]}>
                    <FontAwesome5
                        name="fire"
                        size={FontSize.fontLarge}
                        color={Color.darkBlueBackground}
                    />
                    <Text style={styles.label}>Calo</Text>
                    <Text style={styles.value}>103lbs</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    card: {
        backgroundColor: '#dbe7fa',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        alignItems: 'center',
    },
    bigCard: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 20
    },
    smallCard: {
        backgroundColor: '#f8d8da',
        flex: 1,
        marginHorizontal: 5,
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 8
    },
    label: {
        fontSize: FontSize.fontMedium,
        fontWeight: '600',
    },
    value: {
        fontSize: FontSize.fontXXLarge,
        fontWeight: 'bold',
    },
    unit: {
        fontSize: 14,
        color: '#666',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    chartPlaceholder: {
        width: '80%',
        height: 50,
        backgroundColor: '#ffffff',
        marginTop: 10,
    },
});

export default HealthCard;
