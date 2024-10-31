export default class Constants {
    static Menu = class {
        static List = [
            {
                value: "EditProfile",
                label: "Thiết lập",
                icon: "settings-sharp"
            },
            {
                value: "ChangePasswordScreen",
                label: "Đổi mật khẩu",
                icon: "keypad",
            },
            {
                value: "ChangePasswordScreen",
                label: "Thông báo",
                icon: "notifications",
            },
            {
                value: "",
                label: "Thị trường",
                icon: "bar-chart-sharp"
            },
            {
                value: "",
                label: "Tin tức",
                icon: "newspaper-sharp"
            },
        ]
    }
    static TimeRangeTab = class {
        static List = [
            {
                id: 1,
                label: "1D",
                value: 1,
            },
            {
                id: 2,
                label: "1W",
                value: 7,
            },
            {
                id: 3,
                label: "1M",
                value: 30,
            },
            {
                id: 4,
                label: "1Y",
                value: 365,
            },
            {
                id: 5,
                label: "5Y",
                value: 365 * 5,
            },
        ]
    }
}
