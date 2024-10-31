export class Endpoint {
    static Auth = class {
        static Login = "/login"
        static Register = "/register"
        static Logout = "/logout"
        static Profile = "/user"
        static UpdateProfile = "/user/update"
        static ChangePassword = "/user/change-password"
        static ForgotPassword = "/user/forgot-password"
        static ResetPassword = "/user/reset-password"
    }
    static News = class {
        static Get = "/news"
        static GetById = "/news-detail"
    }
    static ThirdAPI = class {
        static dchartApiVndirect = "https://dchart-api.vndirect.com.vn/dchart/history"
        static finfoApiVndirect = "https://finfo-api.vndirect.com.vn/v4/stock_prices/"
    }
};