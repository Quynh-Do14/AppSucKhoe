import { useRecoilState } from 'recoil';
import React from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import { Color, FontSize } from '../../core/constants/StyleCommon';
const { width: viewportWidth } = Dimensions.get('window');

const MainLayout = ({ onGoBack, isBackButton = false, title, bgImg, ...props }: any) => {
    // const [, setDataProfile] = useRecoilState(ProfileState);
    // const [token, setToken] = useState<string>("");

    // const getTokenStoraged = async () => {
    //     const token = await AsyncStorage.getItem("token").then(result => {
    //         if (result) {
    //             setToken(result)
    //         }
    //     });
    //     return token;
    // };
    // useEffect(() => {
    //     getTokenStoraged().then(() => { })
    // }, [])

    // const getProfileUser = async () => {
    //     if (token) {
    //         try {
    //             await authService.profile(
    //                 () => { }
    //             ).then((response: any) => {
    //                 if (response) {
    //                     setDataProfile({
    //                         data: response
    //                     })
    //                 }
    //             })
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    // }

    // useEffect(() => {
    //     if (token) {
    //         getProfileUser().then(() => { })
    //     }
    // }, [token])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.flex4} >
                    <TouchableOpacity
                        onPress={onGoBack}
                    >
                        {isBackButton ?
                            <View  >
                                <Feather name="arrow-left" size={FontSize.fontLarge} color={Color.lightText} />
                            </View>
                            :
                            <Text style={styles.textTitle} numberOfLines={1}>{title}</Text>

                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.flex1}>
                </View>
            </View>
            {props.children}
        </View >
    )
}

export default MainLayout

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.lightBackground,
        paddingVertical: 12,
        flex: 1,
    },
    content: {
        flex: 1
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 8,
    },
    flex1: {
        flex: 1
    },
    flex4: {
        flex: 4
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
    },
    flexCol: {
        display: "flex",
        flexDirection: "column",
    },
    textTitle: {
        color: Color.blackText,
        textAlign: "left",
        fontWeight: "700",
        fontSize: FontSize.fontMedium,
    },
})