import Sidebar from "../components/sidebar/Sidebar";

interface UsersLayoutProps {
    children: React.ReactNode;
}

export default function UsersLayout({children}: UsersLayoutProps) {
    return (
        // @ts-ignore
        <Sidebar>
            <div className="h-screen">
                {children}
            </div>
        </Sidebar>
    )
}