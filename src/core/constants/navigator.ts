import HealthTrackingScreen from "../../screen/NutriPlan";
import AnalysisScreen from "../../screen/analysis";
import HomeScreen from "../../screen/home";
import ProfileScreen from "../../screen/profile";

export const bottomNavigator = [
    {
        component: HomeScreen,
        name: "Home",
        unFocused: "home",
        focused: "home-outline"
    },
    {
        component: AnalysisScreen,
        name: "Analysis",
        unFocused: "stats-chart",
        focused: "stats-chart-outline"
    },
    {
        component: HealthTrackingScreen,
        name: "Discover",
        unFocused: "pie-chart",
        focused: "pie-chart-outline"
    },
    {
        component: ProfileScreen,
        name: "Profile",
        unFocused: "person",
        focused: "person-outline"
    },
]
