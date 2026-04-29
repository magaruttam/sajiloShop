import User from './userModel';
import Vendor from './vendor.model';
import Product from './product.model';
import Category from './categories.model';
import Order from './order.model';
import OrderItem from './orderItem.model';
import ProductImage from './product_image.model';
import Cart from './cart.model';
import CartItem from './cartItem.model';

// 1. User <-> Vendor (One-to-One)
User.hasOne(Vendor, { foreignKey: 'userId', as: 'vendor' });
Vendor.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// 2. Vendor <-> Product (One-to-Many)
Vendor.hasMany(Product, { foreignKey: 'vendorId', as: 'products' });
Product.belongsTo(Vendor, { foreignKey: 'vendorId', as: 'vendor' });

// 3. Category <-> Product (One-to-Many)
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

// 4. User <-> Order (One-to-Many)
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// 5. Order <-> OrderItem (One-to-Many)
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

// 6. Product <-> OrderItem (One-to-Many)
Product.hasMany(OrderItem, { foreignKey: 'productId', as: 'orderItems' });
OrderItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// 7. Product <-> ProductImage (One-to-Many)
Product.hasMany(ProductImage, { foreignKey: 'productId', as: 'images' });
ProductImage.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// 8. User <-> Cart (One-to-One)
User.hasOne(Cart, { foreignKey: 'userId', as: 'cart' });
Cart.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// 9. Cart <-> CartItem (One-to-Many)
Cart.hasMany(CartItem, { foreignKey: 'cartId', as: 'items' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId', as: 'cart' });

// 10. Product <-> CartItem (One-to-Many)
Product.hasMany(CartItem, { foreignKey: 'productId', as: 'cartItems' });
CartItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

export { User, Vendor, Product, Category, Order, OrderItem, ProductImage, Cart, CartItem };
