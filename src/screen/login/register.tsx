import { Alert, Image, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Color, FontSize } from '../../core/constants/StyleCommon';
import { useNavigation } from '@react-navigation/native';
import InputTextCommon from '../../infrastructure/components/input/input-text-common';
import InputPasswordCommon from '../../infrastructure/components/input/input-password-common';
import ButtonCommon from '../../infrastructure/components/button/button-common';
import LoadingFullScreen from '../../infrastructure/components/controls/loading';

const RegisterScreen = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [_data, _setData] = useState<any>({});
    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>(null);
    const navigation = useNavigation<any>()

    const dataProfile = _data;
    const setDataProfile = (data: any) => {
        Object.assign(dataProfile, { ...data });
        _setData({ ...dataProfile });
    };

    const isValidData = () => {
        let allRequestOK = true;

        setValidate({ ...validate });

        Object.values(validate).forEach((it: any) => {
            if (it.isError === true) {
                allRequestOK = false;
            }
        });

        return allRequestOK;
    };

    const secondInputRef = useRef<TextInput>(null);
    const thirdInputRef = useRef<TextInput>(null);

    const handleSubmitFirstInput = () => {
        secondInputRef.current?.focus();
    };
    const handleSubmitSecondInput = () => {
        thirdInputRef.current?.focus();
    };

    const onRegisterAsync = async () => {
        await setSubmittedTime(Date.now());
        // if (isValidData()) {
        //     try {
        //         await authService.register(
        //             {
        //                 email: dataProfile.email,
        //                 password: dataProfile.password,
        //                 full_name: dataProfile.full_name,
        //                 phone_number: dataProfile.phone_number,
        //             },
        //             setLoading,
        //         ).then((response) => {
        //             if (response) {
        //                 navigation.navigate("LoginScreen")
        //             }
        //         });
        //     } catch (error) {
        //         console.error(error);
        //     }
        // }
    }

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                {/* <Image source={require("../../assets/images/icon.png")} /> */}
                <Text style={styles.fontLogo}>Healthcare App</Text>
            </View>
            <KeyboardAvoidingView behavior='padding'>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flexDirection: "column", gap: 12 }}>
                        <InputTextCommon
                            label={"Email"}
                            attribute={"email"}
                            dataAttribute={dataProfile.email}
                            isRequired={false}
                            setData={setDataProfile}
                            editable={true}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                            onSubmitEditing={handleSubmitFirstInput}
                        />
                        <InputTextCommon
                            label={"Họ và tên"}
                            attribute={"full_name"}
                            dataAttribute={dataProfile.full_name}
                            isRequired={false}
                            setData={setDataProfile}
                            editable={true}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                            onSubmitEditing={handleSubmitFirstInput}
                        />
                        <InputTextCommon
                            label={"Số điện thoại"}
                            attribute={"phone_number"}
                            dataAttribute={dataProfile.phone_number}
                            isRequired={false}
                            setData={setDataProfile}
                            editable={true}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                            onSubmitEditing={handleSubmitFirstInput}
                        />
                        <InputPasswordCommon
                            label={"Mật khẩu"}
                            attribute={"password"}
                            dataAttribute={dataProfile.password}
                            isRequired={false}
                            setData={setDataProfile}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                            inputRef={secondInputRef}
                            onSubmitEditing={handleSubmitSecondInput}
                        />

                        <View style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            paddingVertical: 2
                        }}></View>
                        <ButtonCommon
                            title={'Đăng kí'}
                            onPress={onRegisterAsync}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

            <TouchableOpacity
                onPress={() => navigation.navigate("LoginScreen")}
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 4
                }}>
                <Text
                    style={{
                        color: Color.blackText,
                        fontSize: FontSize.fontXSmall
                    }}>Bạn đã có tài khoản?
                </Text>
                <Text
                    style={{
                        color: Color.blueText,
                        fontSize: FontSize.fontXSmall
                    }}>Đăng nhập
                </Text>
            </TouchableOpacity>
            <LoadingFullScreen loading={loading} />
        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: 32,
        paddingVertical: 28,
        paddingHorizontal: 12,
        backgroundColor: Color.lightBackground,
        height: "100%"
    },
    logo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    fontLogo: {
        fontSize: FontSize.fontLarge,
        color: Color.blackText,
        fontWeight: "bold",
    },
    line: {
        height: 1,
        flex: 1,
        backgroundColor: "#A4ACB9",
    },
    btnStyle: {
        backgroundColor: Color.darkBackground,
        paddingVertical: 16,
        borderRadius: 16,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Color.borderInput
    },
    fontBtnStyle: {
        color: Color.lightText,
        fontFamily: "Roboto Regular",
        fontWeight: "900",
    },

})
