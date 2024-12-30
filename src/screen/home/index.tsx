import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, FontSize } from '../../core/constants/StyleCommon'
import HealthCard from './healthCard'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { Svg, Path } from 'react-native-svg';
import MainLayout from '../../infrastructure/layouts/layout';
import Overall from './overall';
import GoogleFit, { BucketUnit, Scopes } from 'react-native-google-fit';
import { ActivityData, DistanceData } from '../../infrastructure/interface/Activity';
import { useRecoilValue } from 'recoil';
import { ProfileState } from '../../core/atoms/profile/profileState';
import db from '../../core/config/firebase.config';
import LoadingFullScreen from '../../infrastructure/components/controls/loading';
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
    const [loading, setLoading] = useState<boolean>(false);
    const [listStep, setListStep] = useState<any[]>([]);
    const [calories, setCalories] = useState<any[]>([]);
    const [activities, setActivities] = useState<ActivityData[]>([]);
    const [distanceData, setDistanceData] = useState<DistanceData[]>([]);
    const [heartRate, setHeartRate] = useState<number>();
    const [profile, setProfile] = useState<any>({});
    const userProfile = useRecoilValue(ProfileState).data;

    const fetchUser = async () => {
        setLoading(true);
        try {
            const querySnapshot = await db.collection("parameter").where("uid", "==", userProfile.uid).get();
            const foods: any[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setLoading(false);
            setProfile(foods[0]);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchUser();
    }, []);

    const startGoogleFit = async () => {
        const options = {
            scopes: [
                Scopes.FITNESS_ACTIVITY_READ, // Quyền đọc dữ liệu hoạt động
                Scopes.FITNESS_ACTIVITY_WRITE, // Quyền ghi dữ liệu hoạt động
            ],
        };

        // Khởi tạo Google Fit và yêu cầu quyền
        GoogleFit.authorize(options)
            .then((authResult) => {

                if (authResult.success) {
                    getStepsData(); // Gọi hàm lấy dữ liệu sau khi ủy quyền thành công
                } else {
                    console.error("Google Fit Authorization Denied:", authResult.message);
                }
            })
            .catch((error) => {
                console.error("Google Fit Authorization Error:", error);
            });
    };

    // Hàm lấy dữ liệu bước chân
    const getStepsData = () => {
        const opt = {
            startDate: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(), // 7 ngày trước
            endDate: new Date().toISOString(), // Ngày hiện tại
            bucketUnit: BucketUnit.DAY, // Bucket theo ngày
            bucketInterval: 1, // Khoảng cách 1 ngày
        };

        GoogleFit.getDailyStepCountSamples(opt)
            .then((res) => {
                if (res?.length) {
                    setListStep(res[1]?.steps)
                } else {
                    console.log("No step data found for the selected period.");
                }
            })
            .catch((err) => {
                console.error("Error fetching step data:", err);
            });
    };


    useEffect(() => {
        startGoogleFit().then(() => { });
    }, [])

    const fetchCalories = async () => {
        const options = {
            scopes: [
                Scopes.FITNESS_ACTIVITY_READ, // Quyền đọc dữ liệu hoạt động
                Scopes.FITNESS_NUTRITION_READ, // Quyền đọc dữ liệu calo tiêu thụ
            ],
        };

        // Bước 1: Authorize Google Fit
        GoogleFit.authorize(options)
            .then((authResult) => {
                if (authResult.success) {
                    getCaloriesData();
                } else {
                    console.error("Authorization Denied:", authResult.message);
                }
            })
            .catch((err) => {
                console.error("Authorization Error:", err);
            });
    };

    const getCaloriesData = () => {
        const opt = {
            startDate: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(), // 7 ngày trước
            endDate: new Date().toISOString(), // Ngày hiện tại
            bucketUnit: BucketUnit.DAY,
            bucketInterval: 1,
        };

        // Bước 2: Gọi API lấy dữ liệu calo
        GoogleFit.getDailyCalorieSamples(opt)
            .then((res) => {
                if (res && res.length > 0) {
                    setCalories(res)

                } else {
                    console.log("No calorie data found for the selected period.");
                }
            })
            .catch((err) => {
                console.error("Error fetching calorie data:", err);
            });
    };

    useEffect(() => {
        fetchCalories().then(() => { });
    }, []);

    useEffect(() => {
        const fetchGoogleFitData = async () => {
            const options = {
                scopes: [
                    Scopes.FITNESS_ACTIVITY_READ, // Quyền đọc hoạt động
                ],
            };

            // Bước 1: Authorize Google Fit
            const authResult = await GoogleFit.authorize(options);
            if (authResult.success) {
                console.log("Google Fit Authorized Successfully!");
                // fetchActivitySamples();
                fetchDistanceSamples();
            } else {
                console.error("Authorization Failed:", authResult.message);
            }
        };

        // Bước 2: Lấy dữ liệu số phút vận động
        // const fetchActivitySamples = async () => {
        //     const opt = {
        //         startDate: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(), // 7 ngày trước
        //         endDate: new Date().toISOString(), // Hiện tại
        //     };

        //     const res: ActivitySample[] = await GoogleFit.getActivitySamples(opt);
        //     if (res && res.length > 0) {
        //         const formattedActivities = res.map((item) => ({
        //             activityName: item.name,
        //             duration: (new Date(item.endDate).getTime() - new Date(item.startDate).getTime()) / 1000 / 60, // Đổi thành phút
        //         }));
        //         setActivities(formattedActivities);
        //     } else {
        //         console.log("No activity data found.");
        //     }
        // };

        // Bước 3: Lấy dữ liệu khoảng cách
        const fetchDistanceSamples = async () => {
            const opt = {
                startDate: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(), // 7 ngày trước
                endDate: new Date().toISOString(), // Hiện tại
            };

            const res = await GoogleFit.getDailyDistanceSamples(opt);
            if (res && res.length > 0) {
                const formattedDistanceData = res.map((item) => ({
                    date: item.startDate,
                    distance: item.distance / 1000, // Đổi thành km
                }));
                setDistanceData(formattedDistanceData);
            } else {
                console.log("No distance data found.");
            }
        };

        fetchGoogleFitData();
    }, []);

    useEffect(() => {
        const number = Math.floor(Math.random() * (85 - 80 + 1)) + 80; // Công thức để random số trong khoảng [min, max]
        setHeartRate(number);
    })
    return (
        <MainLayout title={"Username"}>
            <ScrollView>
                <View style={styles.container}>
                    <Overall />
                    <View style={styles.introduce}>
                        <InfoCard
                            icon={require("../../assets/images/heart.png")}
                            title="Heart Rate"
                            value={`${heartRate} bpm`}
                            status="Normal"
                            chartPath={require("../../assets/images/line1.png")}
                        />
                        <InfoCard
                            icon={require("../../assets/images/fire.png")}
                            title="Calories"
                            value={`${Number(calories[calories.length - 1]?.calorie || 0).toFixed(2)} Cal`}
                            status=""
                            chartPath={require("../../assets/images/line1.png")}
                        />
                    </View>
                    <HealthCard
                        listStep={listStep}
                        profile={profile}
                    />
                </View>
            </ScrollView>
            <LoadingFullScreen loading={loading} />
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