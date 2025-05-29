import { categoriesRouter } from '@/module/categories/server/procedures';
import { productRouter } from '@/module/products/server/procedures';
import { createTRPCRouter } from '../init';
import { authRouter } from '@/module/auth/server/procedures';

export const appRouter = createTRPCRouter({
    auth: authRouter,
    products: productRouter,
    categories: categoriesRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;