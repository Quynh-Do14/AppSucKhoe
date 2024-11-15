import HealthTrackingScreen from "../../screen/NutriPlan";
import HomeScreen from "../../screen/home";
import ProfileScreen from "../../screen/profile";

export const bottomNavigator = [
    {
        component: HomeScreen,
        name: "HomeScreen",
        unFocused: "home",
        focused: "home-sharp"
    },
    {
        component: HealthTrackingScreen,
        name: "HealthTrackingScreen",
        unFocused: "accessibility",
        focused: "accessibility-sharp"
    },
    {
        component: ProfileScreen,
        name: "ProfileScreen",
        unFocused: "person-outline",
        focused: "person-sharp"
    },
]
