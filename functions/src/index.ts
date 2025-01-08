const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendEventNotification = functions.firestore
    .document('schedules/{scheduleId}') // Lắng nghe thay đổi trong collection 'schedules'
    .onCreate(async (snap: any, context: any) => {
        const scheduleData = snap.data();
        console.log("scheduleData", scheduleData);

        const sleepTime = scheduleData.sleep.toDate();  // Lấy thời gian từ trường 'sleep'
        const campaign = scheduleData.campaign;
        const userId = scheduleData.userId;

        // Tính toán thời gian gửi thông báo (ví dụ: 1 phút trước thời gian sự kiện)
        const notificationTime = new Date(sleepTime.getTime() - 1 * 60 * 1000); // Gửi thông báo 1 phút trước

        const currentTime = new Date();

        if (currentTime >= notificationTime) {
            // Gửi thông báo ngay lập tức
            await sendNotification(userId, campaign);
        } else {
            console.log('Thông báo sẽ được gửi sau khi đến thời gian sự kiện.');
        }
    });


// Hàm gửi thông báo FCM
const sendNotification = async (userId: any, campaign: any) => {
    const userDoc = await admin.firestore().collection('users').doc(userId).get();
    const userToken = userDoc.data().fcmToken; // Lấy token FCM của người dùng từ Firestore

    const message = {
        notification: {
            title: 'Lịch sự kiện sắp đến',
            body: `Chương trình ${campaign} sẽ diễn ra ngay bây giờ.`,
        },
        token: userToken,
    };

    try {
        await admin.messaging().send(message);
        console.log('Thông báo đã được gửi.');
    } catch (error) {
        console.error('Lỗi khi gửi thông báo:', error);
    }
}
