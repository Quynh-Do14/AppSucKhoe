import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import { calculateTimeDifference } from '../../infrastructure/helper/helper';

interface CircularProgressProps {
    size: number;
    strokeWidth: number;
    colors: string[];
    progresses: number[];
}


const MultiCircularProgress: React.FC<CircularProgressProps> = ({
    size,
    strokeWidth,
    colors,
    progresses,
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    return (
        <Svg width={size} height={size}>
            {progresses.map((progress, index) => {
                const strokeDashoffset = circumference - progress * circumference;
                return (
                    <Circle
                        key={index}
                        cx={size / 2}
                        cy={size / 2}
                        r={radius - index * (strokeWidth + 5)} // Khoảng cách giữa các vòng
                        stroke={colors[index]}
                        strokeWidth={strokeWidth}
                        strokeDasharray={`${circumference} ${circumference}`}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        fill="none"
                    />
                );
            })}
        </Svg>
    );
};

type Props = {
    profile: any
}

const Overall = (props: Props) => {
    const { profile } = props;
    const calculateTime = calculateTimeDifference(String(profile?.sleep), String(profile?.wake));
    return (
        <View style={styles.container}>
            <View style={styles.chartContainer}>
                <MultiCircularProgress
                    size={160}
                    strokeWidth={12}
                    colors={['#4caf50', '#ff9800', '#2196f3']}
                    progresses={[0.8, 0.6, 0.4]} // Tỷ lệ của Sleep, Exercise, Water
                />
            </View>
            <View style={styles.legendContainer}>
                <LegendItem color="#4caf50" label="Sleep" value={`${calculateTime.hours}h ${calculateTime.minutes}m`} />
                <LegendItem color="#ff9800" label="Exercise" value="2h 30m" />
                <LegendItem color="#2196f3" label="Water" value={`${profile?.water}L`} />
            </View>
        </View>
    );
};

const LegendItem: React.FC<{ color: string; label: string; value: string }> = ({
    color,
    label,
    value,
}) => (
    <View style={styles.legendItem}>
        <View style={[styles.legendColor, { backgroundColor: color }]} />
        <View>
            <Text style={styles.legendLabel}>{label}</Text>
            <Text style={styles.legendValue}>{value}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        paddingHorizontal: 8,
        paddingVertical: 12,
    },
    chartContainer: {
        alignItems: 'center',
    },
    legendContainer: {
        alignItems: 'flex-start',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    legendColor: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginRight: 10,
    },
    legendLabel: {
        fontSize: 16,
        color: '#333',
    },
    legendValue: {
        fontSize: 14,
        color: '#777',
    },
});

export default Overall;