import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Color, FontSize } from '../../core/constants/StyleCommon'
import InpuSearchCommon from '../../infrastructure/components/input/input-search'

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.introduce}>
                    <View style={styles.left}>
                        <Image source={require("../../assets/images/avatar.png")} />
                        <View>
                            <Text style={styles.fontStyle}>Welcome !</Text>
                            <Text style={styles.fontStyle}>Rihana</Text>
                        </View>
                        <Text style={styles.question}>How are you today?</Text>
                    </View>
                    <View style={styles.right}>
                        <Image source={require("../../assets/images/homeImg.png")} />
                    </View>
                </View>
                <View style={styles.content}>
                    <InpuSearchCommon
                        placeholder={'Tìm kiếm bác sĩ'}
                        value={''}
                        onChangeText={() => { }}
                        onSubmitEditing={() => { }} />
                </View>
            </ScrollView>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        height: "100%"
    },
    introduce: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: Color.blueBackground,
        paddingTop: 28,
        paddingHorizontal: 12,
    },
    left: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 8
    },
    right: {
        flex: 1,
        display: "flex",
        justifyContent: "flex-end"
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