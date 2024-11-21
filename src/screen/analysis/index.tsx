import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainLayout from '../../infrastructure/layouts/layout'
import HeaderAnalysis from './header'

const AnalysisScreen = () => {
    return (
        <MainLayout title={"Analysis"}>
            <HeaderAnalysis />
        </MainLayout>
    )
}

export default AnalysisScreen

const styles = StyleSheet.create({})