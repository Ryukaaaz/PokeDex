import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { index as ExpansionIndex } from '@/routes/expansion'
import { index as AdminExpansionIndex } from '@/routes/admin_expansion'
import { index as RarityIndex } from '@/routes/rarity'
import { index as GradeIndex } from '@/routes/grade'
import { index as InventoryIndex } from '@/routes/inventory';
import { index as PurchaseIndex } from '@/routes/purchase';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Inventory',
        href: InventoryIndex(),
        icon: LayoutGrid,
    },
    {
        title: 'Purchase',
        href: PurchaseIndex(),
        icon: LayoutGrid,
    },

];

const adminNavItems: NavItem[] = [
    {
        title: 'Cards',
        href: ExpansionIndex(),
        icon: LayoutGrid,
    },
    {
        title: 'Rarity',
        href: RarityIndex(),
        icon: LayoutGrid,
    },
    {
        title: 'Grade',
        href: GradeIndex(),
        icon: LayoutGrid,
    },
    {
        title: 'Expansion Set',
        href: AdminExpansionIndex(),
        icon: LayoutGrid,
    },
];



const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     href: 'https://github.com/laravel/react-starter-kit',
    //     icon: FolderGit2,
    // },
    // {
    //     title: 'Documentation',
    //     href: 'https://laravel.com/docs/starter-kits#react',
    //     icon: BookOpen,
    // },
];

export function AppSidebar() {
    const { auth } = usePage().props as any;
    const isAdmin = auth?.user?.role === 'admin';

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain 
                items={mainNavItems}
                label='Staff' />

                {isAdmin && (
                    <NavMain
                    items={adminNavItems} 
                    label='Admin exclusive'/>
                )}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
