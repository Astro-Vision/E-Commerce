import { useCartStore } from "../store/use-cart-store"

export const useCart = (tenantSlug: string) => {
    const { addProduct, removeProduct, clearCart, clearAllCarts, getCartByTenant } = useCartStore()

    const productIds = getCartByTenant(tenantSlug);

    const toggleProduct = (proudctId: string) => {
        if (productIds.includes(proudctId)) {
            removeProduct(tenantSlug, proudctId);
        } else {
            addProduct(tenantSlug, proudctId);
        }
    };

    const isProductInCart = (productId: string) => {
        return productIds.includes(productId);
    };

    const clearTenantCart = () => {
        clearCart(tenantSlug);
    };

    return {
        productIds,
        addProduct: (productId: string)  => addProduct(tenantSlug, productId),
        removeProduct: (productId: string)  => removeProduct(tenantSlug, productId),
        clearCart: clearTenantCart,
        clearAllCarts,
        toggleProduct,
        isProductInCart,
        totalItems: productIds.length,
    };
};