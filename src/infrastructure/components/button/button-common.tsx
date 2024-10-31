import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Color } from '../../../core/constants/StyleCommon';
type Props = {
    title: string,
    onPress: () => void,
}
const ButtonCommon = (props: Props) => {
    const { title, onPress } = props;
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

export default ButtonCommon

const styles = StyleSheet.create({
    btnStyle: {
        backgroundColor: Color.backgroundBtn,
        paddingVertical: 16,
        borderRadius: 6,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    fontStyle: {
        color: Color.lightText,
        fontFamily: "Roboto Regular",
        fontWeight: "bold",
    },
})