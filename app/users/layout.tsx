
interface UsersLayoutProps {
    children: React.ReactNode;
}

export default function UsersLayout({children}: UsersLayoutProps) {
    return (
        <div>{children}</div>
    )
}