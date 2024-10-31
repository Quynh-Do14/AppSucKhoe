/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { TextInput, View, StyleSheet, Pressable } from 'react-native';
import MessageError from '../controls/MessageError';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { validateFields } from '../../helper/helper';
import { Color, FontSize } from '../../../core/constants/StyleCommon';
import { FONTS } from '../../../core/constants/Font';

type Props = {
    label: string,
    attribute: string,
    isRequired: boolean,
    setData: Function,
    dataAttribute?: any,
    validate: any,
    setValidate: Function,
    submittedTime?: any,
    inputRef?: React.RefObject<TextInput>,
    onSubmitEditing: () => void,
}
const InputPasswordCommon = (props: Props) => {
    const {
        label,
        attribute,
        isRequired,
        setData,
        dataAttribute,
        validate,
        setValidate,
        submittedTime,
        inputRef,
        onSubmitEditing,
    } = props;
    const [value, setValue] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(true);
    const labelLower = label?.toLowerCase();

    const onBlur = (isImplicitChange: boolean = false) => {
        validateFields(isImplicitChange, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập ${labelLower}` : "")
    }

    const onChange = (value: string) => {
        setValue(value || "");
        setData({
            [attribute]: value || ''
        });
        validateFields(false, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập ${labelLower}` : "")
    };

    useEffect(() => {
        setValue(dataAttribute || '');
    }, [dataAttribute]);


    useEffect(() => {
        if (submittedTime != null) {
            onBlur(true);
        }
    }, [submittedTime]);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View>
            <View>
                <TextInput
                    ref={inputRef}
                    placeholder={`Nhập ${labelLower}`}
                    value={value}
                    onChangeText={onChange}
                    onBlur={() => onBlur(false)}
                    placeholderTextColor={Color.colorPlaceholder}
                    secureTextEntry={showPassword}
                    autoCorrect={false}
                    returnKeyType='go'
                    onSubmitEditing={onSubmitEditing}
                    style={[
                        { position: "relative" },
                        styles.fontStyle,
                        styles.inputStyle,
                        validate[attribute]?.isError && styles.errorStyle
                    ]} />
                <Pressable onPress={toggleShowPassword} style={styles.icon}>
                    <Ionicons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={FontSize.fontLarge}
                        color={Color.darkSubBackground}
                    />

                </Pressable>
            </View>
            <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
        </View>
    )
};
export default InputPasswordCommon;
const styles = StyleSheet.create({
    fontStyle: {
        color: Color.blackText,
        fontFamily: FONTS.Light,
        fontWeight: "medium",
    },

    inputStyle: {
        borderWidth: 1,
        borderColor: Color.borderInput,
        padding: 12,
        backgroundColor: Color.greyOpacityBackground,
        fontFamily: FONTS.Light,
        borderRadius: 6,
    },
    btnStyle: {
        backgroundColor: "#D0FD3E",
        paddingVertical: 16,
        borderRadius: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    errorStyle: {
        borderWidth: 1,
        borderColor: "#f61a1a",
    },
    editableStyle: {
        borderBottomColor: "#686b7d",
        color: "#686b7d",
    },
    icon: {
        padding: 8,
        position: "absolute",
        right: 4,
        top: 8
    },
})