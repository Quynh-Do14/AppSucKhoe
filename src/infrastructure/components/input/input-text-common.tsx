/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { TextInput, View, StyleSheet, } from 'react-native';
import MessageError from '../controls/MessageError';
import { validateFields } from '../../helper/helper';
import { validateCMND, validateEmail, validatePhoneNumber } from '../../helper/validate';
import { Color } from '../../../core/constants/StyleCommon';
import { FONTS } from '../../../core/constants/Font';

type Props = {
    label: string,
    attribute: string,
    isRequired: boolean,
    setData: Function,
    dataAttribute?: any,
    validate: any,
    setValidate: Function,
    submittedTime: any,
    editable: boolean,
    onSubmitEditing?: () => void,
}
const InputTextCommon = (props: Props) => {
    const {
        label,
        attribute,
        isRequired,
        setData,
        dataAttribute,
        validate,
        setValidate,
        submittedTime,
        editable,
        onSubmitEditing,
    } = props;
    const [value, setValue] = useState<string>("");
    const labelLower = label?.toLowerCase();

    const onBlur = (isImplicitChange = false) => {
        let checkValidate
        validateFields(isImplicitChange, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập ${labelLower}` : "")
        if (attribute.includes("email")) {
            checkValidate = validateEmail(value);
            validateFields(isImplicitChange, attribute, !checkValidate, setValidate, validate, !checkValidate ? value ? `Vui lòng nhập đúng định dạng ${labelLower}` : `Vui lòng nhập ${labelLower}` : "");
        }
        if (attribute.includes("phone")) {
            checkValidate = validatePhoneNumber(value);
            validateFields(isImplicitChange, attribute, !checkValidate, setValidate, validate, !checkValidate ? value ? `Vui lòng nhập đúng định dạng ${labelLower}` : `Vui lòng nhập ${labelLower}` : "");
        }
        if (attribute.includes("cccd") || attribute.includes("long")) {
            checkValidate = validateCMND(value);
            validateFields(isImplicitChange, attribute, !checkValidate, setValidate, validate, !checkValidate ? value ? `${label} bao gồm 12 số` : `Vui lòng nhập ${labelLower}` : "");
        }
    }

    const onChange = (value: string) => {
        setValue(value || "");
        setData({
            [attribute]: value || ''
        });
        let checkValidate
        validateFields(false, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập ${labelLower}` : "")
        if (attribute.includes("email")) {
            checkValidate = validateEmail(value);
            validateFields(false, attribute, !checkValidate, setValidate, validate, !checkValidate ? value ? `Vui lòng nhập đúng định dạng ${labelLower}` : `Vui lòng nhập ${labelLower}` : "");
        }
        if (attribute.includes("phone")) {
            checkValidate = validatePhoneNumber(value);
            validateFields(false, attribute, !checkValidate, setValidate, validate, !checkValidate ? value ? `Vui lòng nhập đúng định dạng ${labelLower}` : `Vui lòng nhập ${labelLower}` : "");
        }
        if (attribute.includes("cccd") || attribute.includes("long")) {
            checkValidate = validateCMND(value);
            validateFields(false, attribute, !checkValidate, setValidate, validate, !checkValidate ? value ? `${label} bao gồm 12 số` : `Vui lòng nhập ${labelLower}` : "");
        }
    };

    useEffect(() => {
        setValue(dataAttribute || '');
    }, [dataAttribute]);

    useEffect(() => {
        if (submittedTime != null) {
            onBlur(true);
        }
    }, [submittedTime]);
    return (
        <View>
            <TextInput
                placeholder={`Nhập ${labelLower}`}
                value={value}
                onChangeText={onChange}
                onBlur={() => onBlur(false)}
                placeholderTextColor={Color.colorPlaceholder}
                editable={editable}
                autoCorrect={false}
                returnKeyType='next'
                onSubmitEditing={onSubmitEditing}
                keyboardType='email-address'
                style={[
                    styles.fontStyle,
                    styles.inputStyle,
                    validate[attribute]?.isError && styles.errorStyle,
                    !editable && styles.editableStyle,
                ]} />
            <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
        </View>
    )
};
export default InputTextCommon;
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
        padding: 12, 
        backgroundColor: Color.greyOpacityBackground,
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