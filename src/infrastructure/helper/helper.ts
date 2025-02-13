import moment from "moment";

// const baseURL = process.env.NEXT_PUBLIC_API_URL
const baseURL = "https://mtinvest.com.vn"
export const validateFields = (isImplicitChange: boolean, key: any, isCheck: boolean, setError: Function, error: any, message: string) => {
    if (isImplicitChange) {
        error[key] = {
            isError: isCheck,
            message: message,
        };
    }
    else {
        setError({
            ...error,
            [key]: {
                isError: isCheck,
                message: message,
            }
        });
    }
};

export const numberToAlphabet = (number: number) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alphabetSplit = alphabet.split("");
    if (number < alphabetSplit.length) {
        const result = alphabetSplit[number]
        return result
    }
    return number
}

export const convertDate = (date: any) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("DD-MM-YYYY hh:mm:ss");
    } return null;

};
export const convertDateOnly = (date: any) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("DD/MM/YYYY");
    } return null;
};

export const convertTimeOnly = (date: string) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("hh:mm");
    } return null;
};

export const convertDateQuery = (date: Date) => {
    if (date) {
        return moment(date).format("YYYY-MM-DD");
    } return null;
};

export const convertTimeParams = (date: string) => {
    if (date) {
        const inputDate = new Date(date);
        const year = inputDate.getFullYear();
        const month = inputDate.getMonth() + 1; // Tháng trong JavaScript đếm từ 0 đến 11
        const day = inputDate.getDate();
        const hours = inputDate.getHours();
        const minutes = inputDate.getMinutes();
        const seconds = inputDate.getSeconds();

        // Chuyển đổi các giá trị thành chuỗi và thêm số 0 đằng trước nếu cần thiết
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        return formattedDate
    } return null;
};

export const reverseConvertDate = (inputDateString: string) => {
    const inputDate = new Date(inputDateString);

    // Format the date as "Thu, 26 Oct 2023 13:05:32 GMT"
    const formattedDate = inputDate.toUTCString();
    return formattedDate
}

// export const showImage = (img) => {
//     if (img) {
//         return img
//     }
//     else {
//         return noImgShow
//     }
// }

export const convertMinutes = (minutes: any) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(remainingMinutes).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
}

export const convertMiliSecond = (miliSecond: any) => {
    const minutes = Math.floor(miliSecond / 1000 / 60);
    const remainingSeconds = (miliSecond / 1000 % 60).toFixed(0);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(remainingMinutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export const getCurrentDateTimeISO = (originalDate: any) => {
    const year = originalDate.getUTCFullYear();
    const month = String(originalDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(originalDate.getUTCDate()).padStart(2, '0');
    const hours = String(originalDate.getUTCHours()).padStart(2, '0');
    const minutes = String(originalDate.getUTCMinutes()).padStart(2, '0');
    const seconds = String(originalDate.getUTCSeconds()).padStart(2, '0');

    const formattedDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000+00:00`;
    return formattedDateString
}


export const timeToMilliseconds = (timeString: string) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const milliseconds = ((hours * 3600) + (minutes * 60) + seconds) * 1000;
    return milliseconds;
}
export const minuteToMiliSecond = (minutes: number) => {
    const result = minutes * 60 * 1000;
    return result;
}

export const keepLastObjectsWithUniqueIds = (array: Array<any>) => {
    const idSet = [];
    const result = [];

    for (let i = array.length - 1; i >= 0; i--) {
        const obj = array[i];
        if (!idSet[obj.questionId]) {
            result.unshift(obj);
            idSet[obj.questionId] = true;
        }
    }
    return result;
}

export const formatCurrencyVND = (amount: string, isMoney: boolean) => {
    let formattedAmount = amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${formattedAmount} ${isMoney ? "₫" : ""} `;
}

export const configImageURL = (image: string) => {
    if (image) {
        return `${baseURL}/uploads/${image}`
    }
    return ""
}

export const getDayOfWeek = (dateString: any) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(dateString);
    return days[date.getDay()];
};

export const convertDaysVNToEN = (daysVN: string): string => {
    const mapping: Record<string, string> = {
        'Th 2': 'Mon',
        'Th 3': 'Tue',
        'Th 4': 'Wed',
        'Th 5': 'Thu',
        'Th 6': 'Fri',
        'Th 7': 'Sat',
        'CN': 'Sun',
    };

    // Tách chuỗi tiếng Việt và chuyển từng phần tử
    const daysArrayVN = daysVN.split(" - ");
    const daysArrayEN = daysArrayVN.map((day) => mapping[day] || "Invalid Day");

    // Gộp lại thành chuỗi tiếng Anh
    return daysArrayEN.join(" - ");
}
export const formatTime = (date: any) => {
    const hours = date.getHours().toString().padStart(2, '0'); // Thêm số 0 nếu giờ < 10
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Thêm số 0 nếu phút < 10
    return `${hours}:${minutes}`;
};

export const calculateTimeDifference = (
    startTime: string,
    endTime: string
): { hours: number; minutes: number } => {
    // Parse thời gian từ chuỗi định dạng "HH:mm"
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    // Chuyển đổi thời gian sang tổng số phút từ đầu ngày
    const startInMinutes = startHour * 60 + startMinute;
    const endInMinutes = endHour * 60 + endMinute;

    // Nếu kết thúc < bắt đầu, thêm 24 giờ (qua nửa đêm)
    const totalMinutes =
        endInMinutes >= startInMinutes
            ? endInMinutes - startInMinutes
            : endInMinutes + 1440 - startInMinutes; // 1440 = 24 giờ * 60 phút

    // Chuyển đổi tổng số phút thành giờ và phút
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    // Trả về kết quả dưới dạng object
    return { hours, minutes };
};