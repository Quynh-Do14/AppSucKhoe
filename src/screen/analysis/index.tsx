import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MainLayout from '../../infrastructure/layouts/layout'
import HeaderAnalysis from './header'
import GoogleFit, { BucketUnit, Scopes } from 'react-native-google-fit';
import StepsCard from './chart';
import CaloriesCard from './calories';
import LoadingFullScreen from '../../infrastructure/components/controls/loading';
const AnalysisScreen = () => {
    const [listStep, setListStep] = useState<any[]>([]);
    const [calories, setCalories] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

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
        setLoading(true);
        GoogleFit.getDailyStepCountSamples(opt)
            .then((res) => {
                if (res?.length) {
                    setLoading(false);
                    setListStep(res[1]?.steps)
                } else {
                    setLoading(false);
                    console.log("No step data found for the selected period.");
                }
            })
            .catch((err) => {
                setLoading(false);
                console.error("Error fetching step data:", err);
            });
    };

    useEffect(() => {
        startGoogleFit().then(() => { });
    }, [])

    const fetchCalories = async () => {
        setLoading(true);
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
                    setLoading(false);
                } else {
                    setLoading(false);
                    console.error("Authorization Denied:", authResult.message);
                }
            })
            .catch((err) => {
                setLoading(false);
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
        setLoading(true);
        // Bước 2: Gọi API lấy dữ liệu calo
        GoogleFit.getDailyCalorieSamples(opt)
            .then((res) => {
                if (res && res.length > 0) {
                    setCalories(res)
                    setLoading(false);
                } else {
                    setLoading(false);
                    console.log("No calorie data found for the selected period.");
                }
            })
            .catch((err) => {
                setLoading(false);
                console.error("Error fetching calorie data:", err);
            });
    };

    useEffect(() => {
        fetchCalories().then(() => { });
    }, []);

    console.log("loading", loading);

    return (
        <MainLayout title={"Analysis"}>
            <ScrollView>
                <View style={styles.container}>
                    <HeaderAnalysis
                        step={listStep[listStep.length - 1]?.value}
                        calo={Number(calories[calories.length - 1]?.calorie || 0).toFixed(2)}
                        setLoading={setLoading}
                    />
                    <StepsCard
                        listStep={listStep}
                        title={'Step'}
                    />
                    <CaloriesCard
                        listStep={calories}
                        title={'Calories'}
                    />
                </View>
            </ScrollView>
            <LoadingFullScreen loading={loading} />
        </MainLayout>
    )
}

export default AnalysisScreen

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: 20,
        // backgroundColor: "#F7FAFE",
        paddingHorizontal: 12,
        paddingVertical: 20,
    },
})