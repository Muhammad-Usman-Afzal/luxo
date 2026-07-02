// ============================================================
// SeedData — Auto-seeds DB on first run (idempotent)
// ============================================================
using Microsoft.EntityFrameworkCore;
using BazaarHub.Backend.Models;
using System.Text.Json;

namespace BazaarHub.Backend.Data;

public static class SeedData
{
    public static async Task InitializeAsync(ApplicationDbContext db)
    {
        // Skip if already seeded
        if (await db.Users.AnyAsync()) return;

        Console.WriteLine("🌱 Seeding database...");

        // ─────────────────────────────────
        // USERS
        // ─────────────────────────────────
        var users = new List<User>
        {
            new() { FullName = "Admin User", Email = "admin@luxo.pk", PasswordHash = HashPassword("admin123"), Role = "admin", Phone = "+92-300-1111111", Avatar = "👑", Address = "123 Admin Street, Islamabad", City = "Islamabad", CreatedAt = new DateTime(2025, 1, 1) },
            new() { FullName = "Ahmed Khan", Email = "ahmed@email.com", PasswordHash = HashPassword("user123"), Role = "user", Phone = "+92-300-2222222", Avatar = "👨", Address = "456 Main Road, Lahore", City = "Lahore", CreatedAt = new DateTime(2025, 2, 15) },
            new() { FullName = "Fatima Ali", Email = "fatima@email.com", PasswordHash = HashPassword("user123"), Role = "user", Phone = "+92-300-3333333", Avatar = "👩", Address = "789 Park Avenue, Karachi", City = "Karachi", CreatedAt = new DateTime(2025, 3, 10) },
            new() { FullName = "Ali Hassan", Email = "ali@email.com", PasswordHash = HashPassword("user123"), Role = "user", Phone = "+92-300-4444444", Avatar = "🧑", Address = "321 Canal Road, Faisalabad", City = "Faisalabad", CreatedAt = new DateTime(2025, 4, 20) },
            new() { FullName = "Sana Malik", Email = "sana@email.com", PasswordHash = HashPassword("user123"), Role = "user", Phone = "+92-301-5555555", Avatar = "👩‍🦰", Address = "12 Model Town", City = "Lahore", CreatedAt = new DateTime(2025, 5, 10) },
            new() { FullName = "Usman Ghani", Email = "usman@email.com", PasswordHash = HashPassword("user123"), Role = "user", Phone = "+92-302-6666666", Avatar = "👨‍🦱", Address = "55 Clifton Road", City = "Karachi", CreatedAt = new DateTime(2025, 5, 15) },
            new() { FullName = "Zainab Bibi", Email = "zainab@email.com", PasswordHash = HashPassword("user123"), Role = "user", Phone = "+92-303-7777777", Avatar = "👩‍🦳", Address = "78 GT Road", City = "Rawalpindi", CreatedAt = new DateTime(2025, 6, 1) },
            new() { FullName = "Bilal Ahmed", Email = "bilal@email.com", PasswordHash = HashPassword("user123"), Role = "user", Phone = "+92-304-8888888", Avatar = "👨‍💼", Address = "90 University Road", City = "Peshawar", CreatedAt = new DateTime(2025, 6, 12) },
            new() { FullName = "Ayesha Khan", Email = "ayesha@email.com", PasswordHash = HashPassword("user123"), Role = "user", Phone = "+92-305-9999999", Avatar = "👩‍🎓", Address = "23 B-Block", City = "Multan", CreatedAt = new DateTime(2025, 6, 20) },
            new() { FullName = "Kamran Abbas", Email = "kamran@email.com", PasswordHash = HashPassword("user123"), Role = "user", Phone = "+92-306-1010101", Avatar = "🧔", Address = "67 Peoples Colony", City = "Faisalabad", CreatedAt = new DateTime(2025, 7, 5) },
            new() { FullName = "Nadia Hussain", Email = "nadia@email.com", PasswordHash = HashPassword("user123"), Role = "user", Phone = "+92-307-1112111", Avatar = "👩‍🦱", Address = "34 Garden Town", City = "Lahore", CreatedAt = new DateTime(2025, 7, 18) },
            new() { FullName = "Tariq Mehmood", Email = "tariq@email.com", PasswordHash = HashPassword("user123"), Role = "user", Phone = "+92-308-1212121", Avatar = "👨‍🦳", Address = "12 Satellite Town", City = "Rawalpindi", CreatedAt = new DateTime(2025, 8, 2) },
            new() { FullName = "Rabia Anjum", Email = "rabia@email.com", PasswordHash = HashPassword("user123"), Role = "user", Phone = "+92-309-1313131", Avatar = "👧", Address = "88 Defence Phase 2", City = "Islamabad", CreatedAt = new DateTime(2025, 8, 15) },
            new() { FullName = "Imran Ali", Email = "imran@email.com", PasswordHash = HashPassword("user123"), Role = "user", Phone = "+92-310-1414141", Avatar = "👨‍🔧", Address = "45 Sadder Bazaar", City = "Quetta", CreatedAt = new DateTime(2025, 9, 1) },
            new() { FullName = "Hina Parveen", Email = "hina@email.com", PasswordHash = HashPassword("user123"), Role = "user", Phone = "+92-311-1515151", Avatar = "👩‍🍳", Address = "92 Wapda Town", City = "Lahore", CreatedAt = new DateTime(2025, 9, 10) },
            new() { FullName = "Shahid Iqbal", Email = "shahid@email.com", PasswordHash = HashPassword("user123"), Role = "user", Phone = "+92-312-1616161", Avatar = "👨‍🌾", Address = "33 Small Industries", City = "Gujranwala", CreatedAt = new DateTime(2025, 9, 25) },
            new() { FullName = "Mariam Javed", Email = "mariam@email.com", PasswordHash = HashPassword("user123"), Role = "user", Phone = "+92-313-1717171", Avatar = "👩‍💻", Address = "76 Lake Road", City = "Hyderabad", CreatedAt = new DateTime(2025, 10, 5) },
            new() { FullName = "Fahad Riaz", Email = "fahad@email.com", PasswordHash = HashPassword("user123"), Role = "user", Phone = "+92-314-1818181", Avatar = "👨‍🎤", Address = "21 Civil Lines", City = "Sialkot", CreatedAt = new DateTime(2025, 10, 18) },
            new() { FullName = "Sumbal Akhtar", Email = "sumbal@email.com", PasswordHash = HashPassword("user123"), Role = "user", Phone = "+92-315-1919191", Avatar = "👩‍🏫", Address = "58 Shahrah-e-Faisal", City = "Karachi", CreatedAt = new DateTime(2025, 11, 1) },
            new() { FullName = "Naveed Butt", Email = "naveed@email.com", PasswordHash = HashPassword("user123"), Role = "user", Phone = "+92-316-2020202", Avatar = "👨‍💼", Address = "14 Muslim Town", City = "Lahore", CreatedAt = new DateTime(2025, 11, 15) },
        };
        db.Users.AddRange(users);
        await db.SaveChangesAsync();
        Console.WriteLine($"   ✅ {users.Count} users created");

        // ─────────────────────────────────
        // CATEGORIES
        // ─────────────────────────────────
        var categories = new List<Category>
        {
            new() { Name = "Electronics", Slug = "electronics", Icon = "📱", Image = "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&h=300&fit=crop" },
            new() { Name = "Fashion", Slug = "fashion", Icon = "👗", Image = "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop" },
            new() { Name = "Home & Living", Slug = "home-living", Icon = "🏠", Image = "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=300&fit=crop" },
            new() { Name = "Sports & Outdoors", Slug = "sports", Icon = "⚽", Image = "https://images.unsplash.com/photo-1461896836934-bd45ba8cf1a5?w=400&h=300&fit=crop" },
            new() { Name = "Beauty & Health", Slug = "beauty", Icon = "💄", Image = "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop" },
            new() { Name = "Groceries", Slug = "groceries", Icon = "🛒", Image = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop" },
        };
        db.Categories.AddRange(categories);
        await db.SaveChangesAsync();
        Console.WriteLine($"   ✅ {categories.Count} categories created");

        // Sub-categories
        var subCategories = new List<Category>
        {
            new() { Name = "Mobile Phones", Slug = "mobile-phones", Icon = "📲", ParentId = categories[0].Id },
            new() { Name = "Men's Clothing", Slug = "mens-clothing", Icon = "👔", ParentId = categories[1].Id },
            new() { Name = "Women's Clothing", Slug = "womens-clothing", Icon = "👚", ParentId = categories[1].Id },
        };
        db.Categories.AddRange(subCategories);
        await db.SaveChangesAsync();
        Console.WriteLine($"   ✅ {subCategories.Count} sub-categories created");

        // ─────────────────────────────────
        // PRODUCTS
        // ─────────────────────────────────
        var products = new List<Product>
        {
            new() { Name = "Samsung Galaxy S25 Ultra", Slug = "samsung-galaxy-s25-ultra", Description = "The ultimate Galaxy experience with AI-powered camera, S Pen, and stunning titanium design.", Price = 349999m, OriginalPrice = 399999m, Discount = 13, Images = JsonSerializer.Serialize(new[] { "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop" }), CategoryId = subCategories[0].Id, Brand = "Samsung", Rating = 4.7, ReviewCount = 2340, Stock = 45, Colors = JsonSerializer.Serialize(new[] { "Titanium Black", "Titanium Gray", "Titanium Violet" }), DeliveryDays = 3, FreeShipping = true, Featured = true, Specifications = JsonSerializer.Serialize(new Dictionary<string, string> { { "Display", "6.8\" Dynamic AMOLED 2X" }, { "Processor", "Snapdragon 8 Gen 4" }, { "RAM", "12GB" }, { "Battery", "5000mAh" } }) },
            new() { Name = "iPhone 16 Pro Max", Slug = "iphone-16-pro-max", Description = "Apple's most powerful iPhone with A18 Pro chip, 48MP Fusion camera.", Price = 459999m, OriginalPrice = 479999m, Discount = 4, Images = JsonSerializer.Serialize(new[] { "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop" }), CategoryId = subCategories[0].Id, Brand = "Apple", Rating = 4.8, ReviewCount = 1890, Stock = 20, Colors = JsonSerializer.Serialize(new[] { "Natural Titanium", "Blue Titanium", "White Titanium" }), DeliveryDays = 5, FreeShipping = true, Featured = true, Specifications = JsonSerializer.Serialize(new Dictionary<string, string> { { "Display", "6.9\" Super Retina XDR" }, { "Chip", "A18 Pro" }, { "RAM", "8GB" }, { "Storage", "256GB" } }) },
            new() { Name = "Men's Premium Cotton Kurta Shalwar", Slug = "mens-cotton-kurta-shalwar", Description = "Elegant hand-stitched cotton kurta shalwar. Made from 100% pure cotton.", Price = 4999m, OriginalPrice = 7999m, Discount = 38, Images = JsonSerializer.Serialize(new[] { "https://images.unsplash.com/photo-1593030761757-71fae45fa0e6?w=600&h=600&fit=crop" }), CategoryId = subCategories[1].Id, Brand = "Khaadi", Rating = 4.3, ReviewCount = 567, Stock = 150, Sizes = JsonSerializer.Serialize(new[] { "S", "M", "L", "XL", "XXL" }), Colors = JsonSerializer.Serialize(new[] { "White", "Black", "Navy Blue" }), DeliveryDays = 4, Featured = true, Specifications = JsonSerializer.Serialize(new Dictionary<string, string> { { "Fabric", "100% Cotton" }, { "Style", "Traditional" } }) },
            new() { Name = "Women's Lawn Printed Suit 3-Piece", Slug = "womens-lawn-suit", Description = "Beautiful lawn printed 3-piece suit with embroidered neckline.", Price = 3499m, OriginalPrice = 5499m, Discount = 36, Images = JsonSerializer.Serialize(new[] { "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop" }), CategoryId = subCategories[2].Id, Brand = "Gul Ahmed", Rating = 4.5, ReviewCount = 890, Stock = 200, Sizes = JsonSerializer.Serialize(new[] { "XS", "S", "M", "L", "XL" }), Colors = JsonSerializer.Serialize(new[] { "Green", "Pink", "Blue", "Yellow" }), DeliveryDays = 3, FreeShipping = true, Featured = true, Specifications = JsonSerializer.Serialize(new Dictionary<string, string> { { "Fabric", "Premium Lawn" }, { "Pieces", "3 (Shirt+Trouser+Dupatta)" } }) },
            new() { Name = "Sony WH-1000XM6 Wireless Headphones", Slug = "sony-wh1000xm6", Description = "Industry-leading noise cancellation with premium sound quality.", Price = 54999m, OriginalPrice = 69999m, Discount = 21, Images = JsonSerializer.Serialize(new[] { "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop" }), CategoryId = categories[0].Id, Brand = "Sony", Rating = 4.6, ReviewCount = 1320, Stock = 75, Colors = JsonSerializer.Serialize(new[] { "Black", "Silver", "Midnight Blue" }), DeliveryDays = 2, FreeShipping = true, Specifications = JsonSerializer.Serialize(new Dictionary<string, string> { { "Connectivity", "Bluetooth 5.3" }, { "Battery", "40 Hours" } }) },
            new() { Name = "MacBook Air M3 15-inch", Slug = "macbook-air-m3", Description = "Supercharged by M3 chip. Up to 18 hours of battery life.", Price = 289999m, OriginalPrice = 299999m, Discount = 3, Images = JsonSerializer.Serialize(new[] { "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop" }), CategoryId = categories[0].Id, Brand = "Apple", Rating = 4.9, ReviewCount = 890, Stock = 15, Colors = JsonSerializer.Serialize(new[] { "Midnight", "Starlight", "Space Gray" }), DeliveryDays = 5, FreeShipping = true, Featured = true, Specifications = JsonSerializer.Serialize(new Dictionary<string, string> { { "Display", "15.3\" Liquid Retina" }, { "Chip", "M3" }, { "RAM", "16GB" } }) },
            new() { Name = "Nike Air Max 270 React", Slug = "nike-air-max-270", Description = "Comfortable lifestyle sneakers with Max Air unit and React foam.", Price = 24999m, OriginalPrice = 32999m, Discount = 24, Images = JsonSerializer.Serialize(new[] { "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop" }), CategoryId = categories[3].Id, Brand = "Nike", Rating = 4.4, ReviewCount = 2100, Stock = 90, Sizes = JsonSerializer.Serialize(new[] { "7", "8", "9", "10", "11", "12" }), Colors = JsonSerializer.Serialize(new[] { "White/Red", "Black/White", "Blue/Orange" }), DeliveryDays = 4 },
            new() { Name = "Dyson V15 Detect Cordless Vacuum", Slug = "dyson-v15-detect", Description = "Intelligent cordless vacuum with laser dust detection and LCD screen.", Price = 119999m, OriginalPrice = 139999m, Discount = 14, Images = JsonSerializer.Serialize(new[] { "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop" }), CategoryId = categories[2].Id, Brand = "Dyson", Rating = 4.7, ReviewCount = 456, Stock = 30, Colors = JsonSerializer.Serialize(new[] { "Iron/Blue", "Gold" }), DeliveryDays = 3, FreeShipping = true, Featured = true, Specifications = JsonSerializer.Serialize(new Dictionary<string, string> { { "Runtime", "60 min" }, { "Filtration", "HEPA" } }) },
            new() { Name = "L'Oreal Paris Revitalift Serum", Slug = "loreal-revitalift-serum", Description = "Anti-aging face serum with 1.5% pure hyaluronic acid.", Price = 2999m, OriginalPrice = 4499m, Discount = 33, Images = JsonSerializer.Serialize(new[] { "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop" }), CategoryId = categories[4].Id, Brand = "L'Oreal", Rating = 4.2, ReviewCount = 780, Stock = 300, DeliveryDays = 2, FreeShipping = true, Specifications = JsonSerializer.Serialize(new Dictionary<string, string> { { "Volume", "30ml" }, { "Key Ingredient", "Hyaluronic Acid" } }) },
            new() { Name = "Organic Basmati Rice 5kg", Slug = "organic-basmati-rice", Description = "Premium quality organic basmati rice. Aromatic long-grain.", Price = 1499m, OriginalPrice = 1999m, Discount = 25, Images = JsonSerializer.Serialize(new[] { "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=600&fit=crop" }), CategoryId = categories[5].Id, Brand = "Organic Farm", Rating = 4.1, ReviewCount = 234, Stock = 500, DeliveryDays = 1, Specifications = JsonSerializer.Serialize(new Dictionary<string, string> { { "Weight", "5kg" }, { "Origin", "Pakistan" } }) },
            new() { Name = "Samsung 55\" QLED 4K Smart TV", Slug = "samsung-qled-55-smart-tv", Description = "Stunning 4K resolution with Quantum Dot technology.", Price = 219999m, OriginalPrice = 259999m, Discount = 15, Images = JsonSerializer.Serialize(new[] { "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=600&fit=crop" }), CategoryId = categories[0].Id, Brand = "Samsung", Rating = 4.5, ReviewCount = 678, Stock = 12, DeliveryDays = 5, FreeShipping = true, Specifications = JsonSerializer.Serialize(new Dictionary<string, string> { { "Display", "55\" QLED 4K" }, { "HDR", "HDR10+" } }) },
            new() { Name = "Leather Office Chair Ergonomic", Slug = "leather-office-chair", Description = "High-back ergonomic office chair with genuine leather.", Price = 34999m, OriginalPrice = 44999m, Discount = 22, Images = JsonSerializer.Serialize(new[] { "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=600&fit=crop" }), CategoryId = categories[2].Id, Brand = "HomeStyle", Rating = 4.3, ReviewCount = 345, Stock = 25, Colors = JsonSerializer.Serialize(new[] { "Black", "Brown", "Tan" }), DeliveryDays = 6, Specifications = JsonSerializer.Serialize(new Dictionary<string, string> { { "Material", "Genuine Leather" }, { "Max Load", "150kg" } }) },
            new() { Name = "Yoga Mat Premium 6mm", Slug = "yoga-mat-premium", Description = "Non-slip TPE yoga mat with carrying strap.", Price = 2499m, OriginalPrice = 3999m, Discount = 38, Images = JsonSerializer.Serialize(new[] { "https://images.unsplash.com/photo-1616699002805-96b1e12e02cf?w=600&h=600&fit=crop" }), CategoryId = categories[3].Id, Brand = "FitPro", Rating = 4.0, ReviewCount = 567, Stock = 100, Colors = JsonSerializer.Serialize(new[] { "Purple", "Blue", "Green", "Pink" }), DeliveryDays = 2, FreeShipping = true, Specifications = JsonSerializer.Serialize(new Dictionary<string, string> { { "Thickness", "6mm" }, { "Material", "TPE" } }) },
            new() { Name = "Casio G-Shock Digital Watch", Slug = "casio-g-shock-watch", Description = "Rugged digital watch with shock resistance and 200M water resistance.", Price = 14999m, OriginalPrice = 18999m, Discount = 21, Images = JsonSerializer.Serialize(new[] { "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=600&h=600&fit=crop" }), CategoryId = categories[0].Id, Brand = "Casio", Rating = 4.6, ReviewCount = 1230, Stock = 65, Colors = JsonSerializer.Serialize(new[] { "Black", "Military Green", "Gray" }), DeliveryDays = 3, FreeShipping = true, Specifications = JsonSerializer.Serialize(new Dictionary<string, string> { { "Water Resistance", "200M" }, { "Battery", "2 Years" } }) },
            new() { Name = "Men's Denim Jeans Slim Fit", Slug = "mens-denim-jeans-slim", Description = "Classic slim-fit denim jeans with stretch.", Price = 2999m, OriginalPrice = 4999m, Discount = 40, Images = JsonSerializer.Serialize(new[] { "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop" }), CategoryId = subCategories[1].Id, Brand = "Levi's", Rating = 4.4, ReviewCount = 890, Stock = 180, Sizes = JsonSerializer.Serialize(new[] { "28", "30", "32", "34", "36", "38" }), Colors = JsonSerializer.Serialize(new[] { "Dark Blue", "Light Blue", "Black" }), DeliveryDays = 3, Specifications = JsonSerializer.Serialize(new Dictionary<string, string> { { "Fit", "Slim" }, { "Fabric", "98% Cotton 2% Elastane" } }) },
            new() { Name = "Instant Pot Duo Plus 6L", Slug = "instant-pot-duo-plus", Description = "9-in-1 electric pressure cooker.", Price = 24999m, OriginalPrice = 31999m, Discount = 22, Images = JsonSerializer.Serialize(new[] { "https://images.unsplash.com/photo-1585653621032-a5f5e4e1411d?w=600&h=600&fit=crop" }), CategoryId = categories[2].Id, Brand = "Instant Pot", Rating = 4.8, ReviewCount = 3200, Stock = 40, DeliveryDays = 4, FreeShipping = true, Featured = true, Specifications = JsonSerializer.Serialize(new Dictionary<string, string> { { "Capacity", "6 Liters" }, { "Functions", "9-in-1" } }) },
            new() { Name = "Himalayan Pink Salt Lamp", Slug = "himalayan-salt-lamp", Description = "Natural Himalayan pink salt lamp with dimmable wooden base.", Price = 1999m, OriginalPrice = 3499m, Discount = 43, Images = JsonSerializer.Serialize(new[] { "https://images.unsplash.com/photo-1604427336494-8c60ff4d5297?w=600&h=600&fit=crop" }), CategoryId = categories[2].Id, Brand = "Nature's Gift", Rating = 4.2, ReviewCount = 456, Stock = 120, DeliveryDays = 3, FreeShipping = true, Specifications = JsonSerializer.Serialize(new Dictionary<string, string> { { "Weight", "2-3kg" }, { "Material", "Himalayan Salt" } }) },
            new() { Name = "Maybelline Fit Me Foundation", Slug = "maybelline-fit-me-foundation", Description = "Matte + poreless foundation for normal to oily skin.", Price = 1999m, OriginalPrice = 2799m, Discount = 29, Images = JsonSerializer.Serialize(new[] { "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=600&h=600&fit=crop" }), CategoryId = categories[4].Id, Brand = "Maybelline", Rating = 4.3, ReviewCount = 1567, Stock = 250, Colors = JsonSerializer.Serialize(new[] { "Ivory", "Sand", "Natural Beige", "Honey" }), DeliveryDays = 2, FreeShipping = true, Specifications = JsonSerializer.Serialize(new Dictionary<string, string> { { "Volume", "30ml" }, { "Finish", "Matte" } }) },
            new() { Name = "Dell Inspiron 15 Laptop", Slug = "dell-inspiron-15", Description = "Versatile 15.6\" laptop with Intel Core i7, 16GB RAM, 512GB SSD.", Price = 129999m, OriginalPrice = 149999m, Discount = 13, Images = JsonSerializer.Serialize(new[] { "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=600&h=600&fit=crop" }), CategoryId = categories[0].Id, Brand = "Dell", Rating = 4.4, ReviewCount = 567, Stock = 20, Colors = JsonSerializer.Serialize(new[] { "Silver", "Black" }), DeliveryDays = 4, FreeShipping = true, Specifications = JsonSerializer.Serialize(new Dictionary<string, string> { { "Display", "15.6\" FHD" }, { "Processor", "Intel Core i7-1355U" } }) },
            new() { Name = "Wheat Flour Chakki Atta 10kg", Slug = "chakki-atta-10kg", Description = "Freshly ground whole wheat flour. 100% pure chakki atta.", Price = 1299m, OriginalPrice = 1599m, Discount = 19, Images = JsonSerializer.Serialize(new[] { "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=600&fit=crop" }), CategoryId = categories[5].Id, Brand = "Bake Parlor", Rating = 4.0, ReviewCount = 345, Stock = 800, DeliveryDays = 1, Specifications = JsonSerializer.Serialize(new Dictionary<string, string> { { "Weight", "10kg" }, { "Origin", "Pakistan" } }) },
        };
        db.Products.AddRange(products);
        await db.SaveChangesAsync();
        Console.WriteLine($"   ✅ {products.Count} products created");

        // ─────────────────────────────────
        // REVIEWS
        // ─────────────────────────────────
        var reviews = new List<Review>
        {
            new() { ProductId = products[0].Id, UserId = users[1].Id, UserName = "Ahmed Khan", UserAvatar = "👨", Rating = 5, Comment = "Amazing phone! The camera quality is outstanding and battery lasts forever." },
            new() { ProductId = products[0].Id, UserId = users[2].Id, UserName = "Fatima Ali", UserAvatar = "👩", Rating = 4, Comment = "Great phone overall. Fast performance and beautiful display." },
            new() { ProductId = products[1].Id, UserId = users[3].Id, UserName = "Ali Hassan", UserAvatar = "🧑", Rating = 5, Comment = "Best iPhone yet! The camera is incredible." },
            new() { ProductId = products[2].Id, UserId = users[1].Id, UserName = "Ahmed Khan", UserAvatar = "👨", Rating = 4, Comment = "Very comfortable fabric. Perfect for summer." },
            new() { ProductId = products[3].Id, UserId = users[2].Id, UserName = "Fatima Ali", UserAvatar = "👩", Rating = 5, Comment = "Beautiful print and excellent quality!" },
            new() { ProductId = products[15].Id, UserId = users[2].Id, UserName = "Fatima Ali", UserAvatar = "👩", Rating = 5, Comment = "Life-changing appliance! I use it daily." },
        };
        db.Reviews.AddRange(reviews);
        await db.SaveChangesAsync();
        Console.WriteLine($"   ✅ {reviews.Count} reviews created");

        // ─────────────────────────────────
        // ORDERS
        // ─────────────────────────────────
        var orders = new List<Order>
        {
            new() { UserId = users[1].Id, OrderNumber = "ORD-2025-001", Subtotal = 349999m, Shipping = 0, Tax = 0, Total = 349999m, Status = "delivered", PaymentMethod = "Credit Card", ShippingAddress = "456 Main Road, Lahore", CreatedAt = new DateTime(2025, 6, 1), DeliveredAt = new DateTime(2025, 6, 4) },
            new() { UserId = users[1].Id, OrderNumber = "ORD-2025-002", Subtotal = 29496m, Shipping = 200m, Tax = 0, Total = 29696m, Status = "shipped", PaymentMethod = "Cash on Delivery", ShippingAddress = "456 Main Road, Lahore", CreatedAt = new DateTime(2025, 6, 15) },
            new() { UserId = users[2].Id, OrderNumber = "ORD-2025-003", Subtotal = 6998m, Shipping = 0, Tax = 0, Total = 6998m, Status = "confirmed", PaymentMethod = "JazzCash", ShippingAddress = "789 Park Avenue, Karachi", CreatedAt = new DateTime(2025, 6, 20) },
            new() { UserId = users[3].Id, OrderNumber = "ORD-2025-004", Subtotal = 24999m, Shipping = 150m, Tax = 0, Total = 25149m, Status = "pending", PaymentMethod = "Easypaisa", ShippingAddress = "321 Canal Road, Faisalabad", CreatedAt = new DateTime(2025, 6, 23) },
        };
        db.Orders.AddRange(orders);
        await db.SaveChangesAsync();
        Console.WriteLine($"   ✅ {orders.Count} orders created");

        // Order Items
        var orderItems = new List<OrderItem>
        {
            new() { OrderId = orders[0].Id, ProductId = products[0].Id, ProductName = products[0].Name, ProductImage = "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop", Price = products[0].Price, Quantity = 1 },
            new() { OrderId = orders[1].Id, ProductId = products[15].Id, ProductName = products[15].Name, ProductImage = "https://images.unsplash.com/photo-1585653621032-a5f5e4e1411d?w=600&h=600&fit=crop", Price = products[15].Price, Quantity = 1 },
            new() { OrderId = orders[1].Id, ProductId = products[9].Id, ProductName = products[9].Name, ProductImage = "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=600&fit=crop", Price = products[9].Price, Quantity = 3 },
            new() { OrderId = orders[2].Id, ProductId = products[3].Id, ProductName = products[3].Name, ProductImage = "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop", Price = products[3].Price, Quantity = 2, Size = "M", Color = "Pink" },
            new() { OrderId = orders[3].Id, ProductId = products[6].Id, ProductName = products[6].Name, ProductImage = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop", Price = products[6].Price, Quantity = 1, Size = "10" },
        };
        db.OrderItems.AddRange(orderItems);
        await db.SaveChangesAsync();
        Console.WriteLine($"   ✅ {orderItems.Count} order items created");

        // ───── No seed chat messages ─────

        Console.WriteLine("🎉 Database seeding complete!");
    }

    // Simple password hashing (use BCrypt in production)
    private static string HashPassword(string password)
    {
        using var sha256 = System.Security.Cryptography.SHA256.Create();
        var bytes = sha256.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        return Convert.ToBase64String(bytes);
    }
}
