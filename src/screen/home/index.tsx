import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Color, FontSize } from '../../core/constants/StyleCommon'
import HealthCard from './healthCard'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { Svg, Path } from 'react-native-svg';
import MainLayout from '../../infrastructure/layouts/layout';
import Overall from './overall';

interface InfoCardProps {
    icon: any; // Tên icon
    title: string; // Tiêu đề (Heart Rate, Calories)
    value: string; // Giá trị (e.g., "98 bpm", "510.43 kCal")
    status: string; // Trạng thái (e.g., "Normal")
    chartPath: any; // Path cho biểu đồ
}

const InfoCard: React.FC<InfoCardProps> = ({
    icon,
    title,
    value,
    status,
    chartPath,
}) => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.image}>
                    <Image source={icon} />
                </View>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View>
                <Text style={styles.value}>{value}</Text>
                {
                    status
                    &&
                    <View style={styles.badge}>
                        <Text style={styles.status}>{status}</Text>
                    </View>
                }

            </View>
            <Image source={chartPath} />
        </View>
    );
};
const HomeScreen = () => {
    return (
        <MainLayout title={"Username"}>
            <ScrollView>
                <View style={styles.container}>
                    <Overall />
                    <View style={styles.introduce}>
                        <InfoCard
                            icon={require("../../assets/images/heart.png")}
                            title="Heart Rate"
                            value="98 bpm"
                            status="Normal"
                            chartPath={require("../../assets/images/line1.png")}
                        />
                        <InfoCard
                            icon={require("../../assets/images/fire.png")}
                            title="Calories"
                            value="510.43 kCal"
                            status=""
                            chartPath={require("../../assets/images/line1.png")}
                        />
                    </View>
                    <HealthCard />
                </View>
            </ScrollView>
        </MainLayout>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        height: "100%",
        gap: 20,
        // backgroundColor: "#F7FAFE",
        paddingHorizontal: 12,
        paddingVertical: 20,
    },
    introduce: {
        display: "flex",
        flexDirection: "row", 
        justifyContent: "space-between",
        // gap: 20
    },
    card: {
        flexDirection: 'column',
        gap: 8,
        alignItems: 'flex-start',
        borderRadius: 20,
        padding: 12,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        marginLeft: 8,
        fontSize: 16,
        color: Color.blackText,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 24,
        color: Color.blackText,
        fontWeight: 'bold',
    },
    badge: {
        backgroundColor: "#fdd8e2",
        borderRadius: 8,
        display: "flex",
    },
    status: {
        padding: 8,
        fontSize: 14,
        color: Color.blackText,
        opacity: 0.8,
    },
    image: {
        padding: 8,
        backgroundColor: "#fdd8e2",
        borderRadius: 12,
    },
    fontStyle: {
        fontSize: FontSize.fontMedium,
        color: Color.blackText
    },

})