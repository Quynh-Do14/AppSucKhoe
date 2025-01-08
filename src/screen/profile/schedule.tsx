import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import db from '../../core/config/firebase.config';
import auth from '@react-native-firebase/auth';

const ScheduleForm = () => {
    const [campaign, setCampaign] = useState('');
    const [message, setMessage] = useState('');
    const [sleep, setSleep] = useState(new Date());
    const user = auth().currentUser;
    const [showPicker, setShowPicker] = useState(false);
    console.log("user", user);

    const saveSchedule = async () => {
        try {
            await firestore().collection('schedules').add({
                campaign,
                message,
                sleep: sleep.toISOString(),
                status: 'active',
                createdAt: new Date().toISOString(),
                userId: user?.uid
            }).then(() => {
                Alert.alert('Schedule saved!');
                fetchProducts();
            });
        } catch (error) {
            console.error('Error saving schedule:', error);
        }
    };

    const handleChangeTime = (event: any, selectedDate: any) => {
        setShowPicker(false);
        if (selectedDate) {
            setSleep(selectedDate);
        }
    };


    const fetchProducts = async () => {
        // setLoading(true);
        try {
            const querySnapshot = await db.collection("schedules").get();
            const foods = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // setLoading(false);
            // setProducts(foods);
            console.log("foods", foods);

        } catch (error) {
            // setLoading(false);
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <View>
            <TextInput
                placeholder="Campaign Name"
                value={campaign}
                onChangeText={setCampaign}
            />
            <TextInput
                placeholder="Message"
                value={message}
                onChangeText={setMessage}
            />
            <Button title="Set Time" onPress={() => setShowPicker(true)} />
            {showPicker && (
                <DateTimePicker
                    value={sleep}
                    mode="time"
                    display="default"
                    onChange={handleChangeTime}
                />
            )}
            <Button title="Save Schedule" onPress={saveSchedule} />
        </View>
    );
};

export default ScheduleForm;
