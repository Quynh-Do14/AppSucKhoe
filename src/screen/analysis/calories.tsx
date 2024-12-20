import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { convertDaysVNToEN } from '../../infrastructure/helper/helper';
type Props = {
    title: string
    listStep: Array<any>
}
const CaloriesCard = (props: Props) => {
    const { title, listStep } = props;
    const [value, setValue] = useState<any[]>([])
    const [label, setLabel] = useState<any[]>([])

    useEffect(() => {
        const value = listStep.map((item) => item.calorie);
        const label = listStep.map((item) => convertDaysVNToEN(item.day));
        setValue(value)
        setLabel(label)
    }, [listStep])
    const data = {
        labels: label,
        datasets: [
            {
                data: value,
            },
        ],
    };

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>Last 7 days</Text>
            </View>
            <BarChart
                data={data}
                width={300} // Chiều rộng biểu đồ
                height={200} // Chiều cao biểu đồ
                fromZero
                showBarTops={false}
                chartConfig={{
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    color: () => `#2cf755`,
                    barPercentage: 0.5,
                }}
                style={styles.chart}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        width: 350,
        alignSelf: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: 12,
        color: '#777',
    },
    km: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#B0E57C',
    },
    today: {
        fontSize: 14,
        color: '#B0E57C',
        marginBottom: 10,
    },
    chart: {
        marginTop: 10,
    },
});

export default CaloriesCard;
