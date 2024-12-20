import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import GoogleFit, { Scopes, } from "react-native-google-fit";
import { HeightData, WeightData } from '../../infrastructure/interface/Activity';
type Props = {
    step: number
    calo: any
}
const HeaderAnalysis = (props: Props) => {
    const { step, calo } = props;
    const [weightData, setWeightData] = useState<WeightData[]>([]);
    const [heightData, setHeightData] = useState<HeightData[]>([]);

    useEffect(() => {
        const fetchBodyData = async () => {
            const options = {
                scopes: [Scopes.FITNESS_BODY_READ], // Quyền đọc dữ liệu cơ thể
            };

            try {
                const authResult = await GoogleFit.authorize(options);
                if (authResult.success) {
                    fetchWeightData();
                    fetchHeightData();
                } else {
                    console.error("Google Fit Authorization Failed:", authResult.message);
                }
            } catch (err) {
                console.error("Google Fit Authorization Error:", err);
            }
        };

        const fetchWeightData = async () => {
            const opt = {
                startDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
                endDate: new Date().toISOString(), // Ngày hiện tại
            };

            try {
                const weightSamples: any[] = await GoogleFit.getWeightSamples(opt);
                if (weightSamples && weightSamples.length > 0) {
                    const formattedWeightData = weightSamples.map((item) => ({
                        startDate: item.startDate,
                        value: item.value,
                    }));
                    setWeightData(formattedWeightData);
                } else {
                    console.log("No weight data found.");
                }
            } catch (err) {
                console.error("Error fetching weight data:", err);
            }
        };
        const optH = {
            startDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
            endDate: new Date().toISOString(), // Ngày hiện tại
        };
        const fetchHeightData = async () => {
            try {
                const heightSamples: any[] = await GoogleFit.getHeightSamples(optH);
                if (heightSamples && heightSamples.length > 0) {
                    const formattedHeightData = heightSamples.map((item) => ({
                        startDate: item.startDate,
                        value: item.value,
                    }));
                    setHeightData(formattedHeightData);
                } else {
                    console.log("No height data found.");
                }
            } catch (err) {
                console.error("Error fetching height data:", err);
            }
        };

        fetchBodyData();
    }, []);

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
                        <Text style={styles.infoValue}>{heightData[0]?.value.toFixed(2)} m</Text>
                        <Text style={styles.infoLabel}>Height</Text>
                    </View>
                    <View style={styles.infoColumn}>
                        <Text style={styles.infoValue}>{step}</Text>
                        <Text style={styles.infoLabel}>Step</Text>
                    </View>

                </View>
                <View style={styles.bodyContent}>
                    <View style={styles.infoColumn}>
                        <Text style={styles.infoValue}>{weightData[0]?.value} kg</Text>
                        <Text style={styles.infoLabel}>Weight</Text>
                    </View>
                    <View style={styles.infoColumn}>
                        <Text style={styles.infoValue}>{calo}</Text>
                        <Text style={styles.infoLabel}>Calories</Text>
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
