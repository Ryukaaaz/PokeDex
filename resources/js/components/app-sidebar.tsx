import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, LayoutDashboard, Warehouse, ShoppingCart, ReceiptText, Layers3, Sparkles, Award, Boxes } from 'lucide-react';
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
import { index as AdminExpansionIndex } from '@/routes/admin_expansion'
import { index as ExpansionIndex } from '@/routes/expansion'
import { index as GradeIndex } from '@/routes/grade'
import { index as InventoryIndex } from '@/routes/inventory';
import { index as PurchaseIndex } from '@/routes/purchase';
import { index as RarityIndex } from '@/routes/rarity'
import { index as SaleIndex } from '@/routes/sale';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),  
        icon: LayoutDashboard,
    },
    {
        title: 'Inventory',
        href: InventoryIndex(),
        icon: Warehouse,
    },
    {
        title: 'Purchase',
        href: PurchaseIndex(),
        icon: ShoppingCart,
    },
    {
        title: 'Sale',
        href: SaleIndex(),
        icon: ReceiptText,
    },

];

const adminNavItems: NavItem[] = [
    {
        title: 'Cards',
        href: ExpansionIndex(),
        icon: Layers3,
    },
    {
        title: 'Rarity',
        href: RarityIndex(),
        icon: Sparkles,
    },
    {
        title: 'Grade',
        href: GradeIndex(),
        icon: Award,
    },
    {
        title: 'Expansion Set',
        href: AdminExpansionIndex(),
        icon: Boxes,
    },
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
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
