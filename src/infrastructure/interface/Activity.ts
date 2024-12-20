export interface ActivityData {
    activityName: string;
    duration: number; // Thời gian vận động (phút)
}
export interface DistanceData {
    date: string;
    distance: number; // Khoảng cách (km)
}

export interface WeightData {
    startDate: string;
    value: number;
}

export interface HeightData {
    startDate: string;
    value: number;
}