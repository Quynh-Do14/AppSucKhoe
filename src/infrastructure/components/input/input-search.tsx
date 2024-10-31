import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Color, FontSize } from '../../../core/constants/StyleCommon'
import { FONTS } from '../../../core/constants/Font'

type Props = {
    placeholder: string
    value: string
    onChangeText: any
    onSubmitEditing: () => void
}
const InpuSearchCommon = (props: Props) => {
    const { placeholder, value, onChangeText, onSubmitEditing } = props;
    return (
        <View>
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor={Color.colorPlaceholder}
                autoCorrect={false}
                returnKeyType='done'
                onSubmitEditing={onSubmitEditing}
                keyboardType='default'
                style={[
                    styles.fontStyle,
                    styles.inputStyle,
                ]} />
        </View>
    )
}

export default InpuSearchCommon

const styles = StyleSheet.create({
    fontStyle: {
        color: Color.blackText,
        fontFamily: FONTS.Light,
        fontWeight: "medium",
    },
    labelStyle: {
        color: "#3E52C1",
        fontFamily: FONTS.Light,
        fontWeight: "600",
        fontSize: 11,
        position: "absolute",
        top: -4
    },
    inputStyle: {
        borderWidth: 1,
        borderColor: Color.borderInput,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: Color.greyOpacityBackground,
        borderRadius: 16,
    },
})