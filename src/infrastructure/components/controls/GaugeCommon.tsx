import { View, Text, StyleSheet, Image, ImageBackground, Dimensions, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { Color, FontSize } from '../../../core/constants/StyleCommon';
type GaugeProps = {
    value: number;
    label: string;
    date: string;
    isFirstGauge: boolean;
};
const { width: viewportWidth } = Dimensions.get('window');

const GaugeCommon = (props: GaugeProps) => {
    const {
        value,
        label,
        date,
        isFirstGauge = false
    } = props;

    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {

        const angle = value * 180 / 100
        Animated.timing(rotateAnim, {
            toValue: angle,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [value]);

    const rotation = rotateAnim.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg']  // Mapping 0 to 360 degrees
    });

    return (
        <View style={styles.gaugeContainer}>
            <Text style={styles.label}>{label}</Text>
            <ImageBackground
                source={isFirstGauge ? require("../../../../assets/images/bgGauge1.png") : require("../../../../assets/images/bgGauge2.png")}
                style={styles.relative}
                resizeMode="contain"
            >

                <Animated.View style={[
                    styles.absolute,
                    {
                        transform: [{ rotate: rotation }]
                    }
                ]}>
                    <Image source={require("../../../../assets/images/gaugePointer.png")} />
                </Animated.View>
                <Text style={styles.gaugeText}>
                    {value}%
                </Text>
            </ImageBackground>
            <Text style={styles.dateText}>{date}</Text>
        </View>
    );

};
const styles = StyleSheet.create({
    gaugeContainer: {
        flexDirection: "column",
        gap: 4,
        alignItems: 'center',
        justifyContent: 'center',
        width: viewportWidth - 12 * 2,
    },
    label: {
        color: Color.lightText,
        fontSize: FontSize.fontSmall,
        fontWeight: "bold",
    },
    dateText: {
        color: Color.lightText,
        fontSize: FontSize.fontXSmall,
    },
    gaugeText: {
        position: 'absolute',
        textAlign: 'center',
        bottom: 0,
        left: 0,
        right: 0,
        color: Color.lightText,
        fontSize: FontSize.fontSmall,
        fontWeight: "bold",
    },
    relative: {
        position: "relative",
        width: viewportWidth / 1.5,
        height: 200,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    absolute: {
        position: "absolute",
        bottom: 40,
        left: 0,
        right: 0,

    }
})
export default GaugeCommon