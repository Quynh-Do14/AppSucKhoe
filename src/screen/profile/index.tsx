import { Alert, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Color, FontSize } from '../../core/constants/StyleCommon';
import Constants from '../../core/constants/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FONTS } from '../../core/constants/Font';
import { configImageURL } from '../../infrastructure/helper/helper';
import MainLayout from '../../infrastructure/layouts/layout';
import HealthInfo from './healthInfo';

const { width: viewportWidth } = Dimensions.get('window');
const { height: viewportHeight } = Dimensions.get('window');

const ProfileScreen = ({ navigation }: any) => {
    const [loading, setLoading] = useState<boolean>(false);

    const onLogOut = () => {
        Alert.alert('Đăng xuất', 'Bạn muốn đăng xuất?', [
            {
                text: 'Hủy',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Đăng xuất', onPress: () => {
                    navigation.navigate("LoginScreen")
                },
            }
        ]);
    }

    return (
        <MainLayout title={"Trang cá nhân"}>
            <View style={styles.container}>
                <View style={styles.avatar}>
                    <Image source={require("../../assets/images/avatar.png")} style={styles.imgAvatar} />
                    <View>
                        <Text style={styles.userName}>UserA</Text>
                    </View>
                </View>
                <HealthInfo />
                <View style={styles.content}>
                    <TouchableOpacity onPress={onLogOut} style={styles.touchContent}>
                        <Ionicons
                            name={"log-out-outline"}
                            size={FontSize.fontSmall}
                            color={Color.darkBlueBackground}
                        />
                        <Text style={styles.labelTouch}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </MainLayout>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: 20,
        paddingHorizontal: 12,
    },
    avatar: {
        flexDirection: "column",
        gap: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    imgAvatar: {
        width: 80,
        height: 80,
        borderRadius: 50,

    },
    userName: {
        fontSize: FontSize.fontSmall,
        color: Color.blackText,
        fontFamily: FONTS.Light
    },
    email: {
        fontSize: FontSize.fontXSmall,
        color: Color.lightText,
        fontFamily: FONTS.Light
    },
    content: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    touchContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        borderBottomWidth: 1,
        borderColor: Color.blueText,
        paddingVertical: 16,
        fontFamily: FONTS.Light
    },
    labelTouch: {
        fontSize: FontSize.fontSmall,
        color: Color.darkBlueBackground,
        fontWeight: "bold",
        fontFamily: FONTS.Light
    },
})