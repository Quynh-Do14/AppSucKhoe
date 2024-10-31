import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import InputPasswordCommon from '../../infrastructure/components/input/input-password-common';
import { useRecoilState } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import InputTextCommon from '../../infrastructure/components/input/input-text-common';
import { Color, FontSize } from '../../core/constants/StyleCommon';
import LoadingFullScreen from '../../infrastructure/components/controls/loading';
import ButtonCommon from '../../infrastructure/components/button/button-common';
import { FONTS } from '../../core/constants/Font';

const LoginScreen = () => {
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

    const handleSubmitFirstInput = () => {
        secondInputRef.current?.focus();
    };

    const onLoginAsync = async () => {
        navigation.navigate("BottomMenu")
    }

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                {/* <Image source={require("../../assets/images/icon.png")} /> */}
                <Text style={styles.fontLogo}>Healthcare App</Text>
            </View>
            <KeyboardAvoidingView behavior='padding'>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <InputTextCommon
                            label={"Tên đăng nhập"}
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
                            onSubmitEditing={onLoginAsync}
                        />
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ForgotPasswordScreen")}
                            style={{
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                paddingVertical: 2
                            }}>
                            <Text
                                style={{
                                    color: Color.blackText,
                                    fontSize: FontSize.fontXSmall
                                }}>Bạn quên mật khẩu?
                            </Text>
                        </TouchableOpacity>
                        <ButtonCommon
                            title={'Đăng nhập'}
                            onPress={onLoginAsync}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

            <TouchableOpacity
                onPress={() => navigation.navigate("RegisterScreen")}
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 4
                }}>
                <Text
                    style={{
                        color: Color.blackText,
                        fontSize: FontSize.fontXSmall
                    }}>Bạn chưa có tài khoản?
                </Text>
                <Text
                    style={{
                        color: Color.blueText,
                        fontSize: FontSize.fontXSmall
                    }}>Đăng kí
                </Text>
            </TouchableOpacity>
            <LoadingFullScreen loading={loading} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: 28,
        paddingVertical: 28,
        paddingHorizontal: 12,
        backgroundColor: Color.lightBackground,
        height: "100%"
    },
    content: {
        flexDirection: "column",
        gap: 20
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
        fontFamily: FONTS.Light
    },
    line: {
        height: 1,
        flex: 1,
        backgroundColor: "#A4ACB9",
    },
    btnStyle: {
        backgroundColor: Color.lightBackground,
        paddingVertical: 16,
        borderRadius: 16,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Color.borderInput
    },
    fontBtnStyle: {
        color: Color.blackText,
        fontFamily: FONTS.Light,
        fontWeight: "900",
    },

})

export default LoginScreen;
