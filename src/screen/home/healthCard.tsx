import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons';
import { Color } from '../../core/constants/StyleCommon';

interface ActivityCardProps {
    icon: any;
    title: string;
    value: string;
    unit: string;
    progress?: number; // Giá trị progress (dành cho biểu đồ)
    showCircle?: boolean;
    color?: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
    title,
    value,
    unit,
    progress = 0,
    color = '#FFD700',
}) => {
    return (
        <View style={[styles.cardLarge]}>
            <View style={styles.headerLarge}>
                <Image source={require("../../assets/images/run.png")} />
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.circleContainer}>
                <Svg height="100" width="100">
                    <Circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#e6e6e6"
                        strokeWidth="10"
                        fill="none"
                    />
                    <Circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke={color}
                        strokeWidth="10"
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray={`${progress * 251}, 251`}
                        strokeDashoffset="0"
                    />
                </Svg>
                <Text style={styles.circleText}>{value}</Text>
                <Text style={styles.circleSubText}>{unit}</Text>
            </View>
        </View>
    );
};

const ActivityCard2: React.FC<ActivityCardProps> = ({
    icon,
    title,
    value,
    unit,
}) => {
    return (
        <View style={[styles.card]}>
            <View style={styles.header}>
                <Image source={icon} />
                <View style={styles.infoContainer}>
                    <Text style={styles.value}>{value}</Text>
                    <Text style={styles.unit}>{unit}</Text>
                </View>
            </View>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};
type Props = {
    listStep: any[]
}

const HealthCard = (props: Props) => {
    const { listStep } = props

    return (
        <View style={styles.container}>
            <ActivityCard
                title="Walk"
                value={listStep[listStep.length - 1]?.value}
                unit="steps"
                progress={Number(listStep[listStep.length - 1]?.value) / 1000}
                showCircle={true}
                color="#FFD700" icon={''} />
            <View style={styles.right}>
                <ActivityCard2
                    icon={require("../../assets/images/sleeping.png")}
                    title="Sleep"
                    value="6:30"
                    unit="hours"
                />
                <ActivityCard2
                    icon={require("../../assets/images/water.png")}
                    title="Water"
                    value="1.2"
                    unit="liters"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12
    },
    right: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        flex: 1,
    },
    card: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 8,
        width: "100%",
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
    cardLarge: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "50%",
        backgroundColor: '#fff',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        paddingHorizontal: 8,
        alignItems: 'center',
    },
    header: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 4,
    },
    headerLarge: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        width: "100%",
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    circleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleText: {
        position: 'absolute',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    circleSubText: {
        position: 'absolute',
        top: 60,
        fontSize: 14,
        color: '#777',
    },
    infoContainer: {
        flexDirection: "row",
        gap: 4,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    value: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#45A8DD'

    },
    unit: {
        fontSize: 14,
        color: '#777',
    },
});

export default HealthCard;
