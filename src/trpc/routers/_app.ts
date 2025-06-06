import { categoriesRouter } from '@/module/categories/server/procedures';
import { productRouter } from '@/module/products/server/procedures';
import { createTRPCRouter } from '../init';
import { authRouter } from '@/module/auth/server/procedures';
import { tagsRouter } from '@/module/tags/server/procedures';
import { tenantsRouter } from '@/module/tenants/server/procedures';
import { checkoutRouter } from '@/module/checkout/server/procedures';

export const appRouter = createTRPCRouter({
    auth: authRouter,
    tags: tagsRouter,
    tenants: tenantsRouter,
    products: productRouter,
    checkout: checkoutRouter,
    categories: categoriesRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;