import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainLayout from '../../infrastructure/layouts/layout'
import HeaderAnalysis from './header'

const AnalysisScreen = () => {
    return (
        <MainLayout title={"Analysis"}>
            <ScrollView>
                <View style={styles.container}>
                    <HeaderAnalysis />
                </View>
            </ScrollView>
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