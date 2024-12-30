import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRecoilValue } from 'recoil';
import { ProfileState } from '../../core/atoms/profile/profileState';
import db from '../../core/config/firebase.config';
type Props = {
    step: number
    calo: any
    setLoading: Function
}
const HeaderAnalysis = (props: Props) => {
    const { step, calo, setLoading } = props;
    const [profile, setProfile] = useState<any>({});
    const userProfile = useRecoilValue(ProfileState).data;

    const fetchUser = async () => {
        setLoading(true);
        try {
            const querySnapshot = await db.collection("parameter").where("uid", "==", userProfile.uid).get();
            const foods: any[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setLoading(false);
            setProfile(foods[0]);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>Your Body</Text>
                <Image
                    source={require("../../assets/images/body.png")}
                    style={styles.image}
                />
            </View>

            {/* Thông tin chi tiết */}
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                    <View style={styles.infoColumn}>
                        <Text style={styles.infoValue}>{profile?.height} m</Text>
                        <Text style={styles.infoLabel}>Height</Text>
                    </View>
                    <View style={styles.infoColumn}>
                        <Text style={styles.infoValue}>{step}</Text>
                        <Text style={styles.infoLabel}>Step</Text>
                    </View>

                </View>
                <View style={styles.bodyContent}>
                    <View style={styles.infoColumn}>
                        <Text style={styles.infoValue}>{profile?.weight} kg</Text>
                        <Text style={styles.infoLabel}>Weight</Text>
                    </View>
                    <View style={styles.infoColumn}>
                        <Text style={styles.infoValue}>{calo}</Text>
                        <Text style={styles.infoLabel}>Calories</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        gap: 24,
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    image: {
        width: 80,
        height: 120,
        resizeMode: 'contain',
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 2,
        marginBottom: 12
    },
    bodyContent: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    infoColumn: {
        alignItems: 'center',
    },
    infoValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    infoLabel: {
        fontSize: 14,
        color: '#777',
    },
});

export default HeaderAnalysis;
