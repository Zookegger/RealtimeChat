import { GuestLayout } from "../../components/Guest/GuestLayout";
import { UserLayout } from "../../components/User/UserLayout";
import { useAuth } from "../../hooks/useAuth";
import { GuestHomeView as GuestHomePage } from "../Guest/HomeView";
import { UserHomeView as UserHomePage } from "../User/HomeView";

export const HomePage = () => {
    const { is_logged_in, user } = useAuth();

    if (is_logged_in) {
        return (
            <UserLayout user={user}>
                <UserHomePage />
            </UserLayout>
        );
    }
    return (
        <GuestLayout>
            <GuestHomePage />
        </GuestLayout>
    );
}