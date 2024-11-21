import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MainLayout from '../../infrastructure/layouts/layout';

const ProfileScreen = () => {
    const listItems = [
        {
            title: 'Health Goals',
            description: 'Set and track your health objectives, such as weight, steps, and daily water intake.',
            icon: 'heart-outline',
        },
        {
            title: 'Chronic Conditions',
            description: 'Keep track of any chronic conditions and medications.',
            icon: 'medkit-outline',
        },
        {
            title: 'Device & App Integration',
            description: 'Sync with wearable devices and health apps to keep all your health data in one place.',
            icon: 'sync-outline',
        },
        {
            title: 'Health Statistics',
            description: 'View your progress with detailed health metrics and history.',
            icon: 'stats-chart-outline',
        },
        {
            title: 'Log out',
            description: 'Further secure your account for safety.',
            icon: 'log-out-outline',
        },
    ];

    const moreItems = [
        { title: 'Help & Support', icon: 'help-circle-outline' },
        { title: 'About App', icon: 'information-circle-outline' },
    ];

    return (
        <MainLayout title={"Profile"}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <View style={styles.infoContainer}>
                            <View style={styles.avatar}>
                                <Icon name="person-outline" size={40} color="#fff" />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.username}>Username</Text>
                                <Text style={styles.email}>@emailuserexample</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.editIcon}>
                            <Icon name="create-outline" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.listContainer}>
                        {listItems.map((item, index) => (
                            <TouchableOpacity key={index} style={styles.listItem}>
                                <View style={styles.listIcon}>
                                    <Icon name={item.icon} size={24} color="#4A90E2" />
                                </View>
                                <View style={styles.listText}>
                                    <Text style={styles.listTitle}>{item.title}</Text>
                                    <Text style={styles.listDescription}>{item.description}</Text>
                                </View>
                                <Icon name="chevron-forward-outline" size={20} color="#ccc" />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Text style={styles.moreTitle}>More</Text>
                    <View style={styles.moreContainer}>
                        {moreItems.map((item, index) => (
                            <TouchableOpacity key={index} style={styles.listItem}>
                                <View style={styles.listIcon}>
                                    <Icon name={item.icon} size={24} color="#4A90E2" />
                                </View>
                                <View style={styles.listText}>
                                    <Text style={styles.listTitle}>{item.title}</Text>
                                </View>
                                <Icon name="chevron-forward-outline" size={20} color="#ccc" />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: "column",
        gap: 20,
        paddingHorizontal: 12,
        paddingVertical: 20,
    },
    headerContainer: {
        backgroundColor: '#4A90E2',
        borderRadius: 90,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#87CEEB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        justifyContent: 'center',
    },
    username: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
    },
    email: {
        fontSize: 10,
        color: '#f0f0f0',
    },
    editIcon: {
        backgroundColor: '#87CEEB',
        borderRadius: 20,
        padding: 6,
    },
    listContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
        borderRadius: 10,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        backgroundColor: '#fff',
        borderBottomColor: '#F0F0F0',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    listIcon: {
        marginRight: 15,
    },
    listText: {
        flex: 1,
    },
    listTitle: {
        fontSize: 14,
        fontWeight: 'light',
        color: '#333',
    },
    listDescription: {
        fontSize: 10,
        color: '#777',
    },
    moreContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
        borderRadius: 10,
    },
    moreTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
    },
});

export default ProfileScreen;
