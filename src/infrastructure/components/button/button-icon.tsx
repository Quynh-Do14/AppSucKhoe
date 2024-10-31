import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
type Props = {
    title: string,
    onPress: () => void,
    backgroundColor: string
    fontColor: string
}
const ButtonIconCommon = (props: Props) => {
    const { title, onPress, backgroundColor, fontColor } = props;

    const styles = StyleSheet.create({
        btnStyle: {
            backgroundColor: backgroundColor,
            paddingVertical: 16,
            borderRadius: 16,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        fontStyle: {
            color: fontColor,
            fontFamily: "Roboto Regular",
            fontWeight: "900",
        },
    })

    return (
        <TouchableOpacity
            style={[
                styles.btnStyle
            ]}
            onPress={onPress}
        >
            <Text style={styles.fontStyle}>{title}</Text>
        </TouchableOpacity>
    )
}

export default ButtonIconCommon

