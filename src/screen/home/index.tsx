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
    chartPath: string; // Path cho biểu đồ
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
            <View style={styles.body}>
                <Text style={styles.value}>{value}</Text>
                {
                    status
                    &&
                    <View style={styles.badge}>
                        <Text style={styles.status}>{status}</Text>
                    </View>
                }

            </View>
            <Svg height="40" width="100%" style={styles.chart}>
                <Path d={chartPath} fill="none" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="2" />
            </Svg>
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
                            chartPath="M10,30 Q40,10 70,20 Q100,40 130,30"
                        />
                        <InfoCard
                            icon={require("../../assets/images/fire.png")}
                            title="Calories"
                            value="510.43 kCal"
                            status=""
                            chartPath="M10,30 Q30,20 50,25 Q70,40 100,20"
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
    },
    card: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        borderRadius: 20,
        padding: 16,
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
    body: {
        marginTop: 20,
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
    chart: {
        marginTop: 10,
    },
    fontStyle: {
        fontSize: FontSize.fontMedium,
        color: Color.blackText
    },
    question: {
        fontSize: FontSize.fontSmall,
        color: Color.darkSubBackground
    },
    content: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: Color.lightBackground,
        marginTop: -20,
        paddingVertical: 28,
        paddingHorizontal: 12,
        height: "100%",
    }

})