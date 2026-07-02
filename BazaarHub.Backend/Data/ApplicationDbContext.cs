// ============================================================
// ApplicationDbContext — EF Core DbContext with all DbSets
// ============================================================
using Microsoft.EntityFrameworkCore;
using BazaarHub.Backend.Models;

namespace BazaarHub.Backend.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();
    public DbSet<Review> Reviews => Set<Review>();
    public DbSet<Cart> Carts => Set<Cart>();
    public DbSet<ChatMessage> ChatMessages => Set<ChatMessage>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // ─── User ───
        modelBuilder.Entity<User>(e =>
        {
            e.HasIndex(u => u.Email).IsUnique();
            e.Property(u => u.Role).HasDefaultValue("user");
        });

        // ─── Category (self-referencing) ───
        modelBuilder.Entity<Category>(e =>
        {
            e.HasIndex(c => c.Slug).IsUnique();
            e.HasOne(c => c.Parent)
             .WithMany(c => c.Children)
             .HasForeignKey(c => c.ParentId)
             .OnDelete(DeleteBehavior.Restrict);
        });

        // ─── Product ───
        modelBuilder.Entity<Product>(e =>
        {
            e.HasIndex(p => p.Slug).IsUnique();
            e.HasOne(p => p.Category)
             .WithMany(c => c.Products)
             .HasForeignKey(p => p.CategoryId)
             .OnDelete(DeleteBehavior.Restrict);
            e.Property(p => p.Price).HasColumnType("decimal(18,2)");
            e.Property(p => p.OriginalPrice).HasColumnType("decimal(18,2)");
        });

        // ─── Order ───
        modelBuilder.Entity<Order>(e =>
        {
            e.HasOne(o => o.User)
             .WithMany(u => u.Orders)
             .HasForeignKey(o => o.UserId)
             .OnDelete(DeleteBehavior.Restrict);
            e.Property(o => o.Subtotal).HasColumnType("decimal(18,2)");
            e.Property(o => o.Shipping).HasColumnType("decimal(18,2)");
            e.Property(o => o.Tax).HasColumnType("decimal(18,2)");
            e.Property(o => o.Total).HasColumnType("decimal(18,2)");
        });

        // ─── OrderItem ───
        modelBuilder.Entity<OrderItem>(e =>
        {
            e.HasOne(oi => oi.Order)
             .WithMany(o => o.Items)
             .HasForeignKey(oi => oi.OrderId)
             .OnDelete(DeleteBehavior.Cascade);
            e.HasOne(oi => oi.Product)
             .WithMany(p => p.OrderItems)
             .HasForeignKey(oi => oi.ProductId)
             .OnDelete(DeleteBehavior.Restrict);
            e.Property(oi => oi.Price).HasColumnType("decimal(18,2)");
        });

        // ─── Review ───
        modelBuilder.Entity<Review>(e =>
        {
            e.HasOne(r => r.Product)
             .WithMany(p => p.Reviews)
             .HasForeignKey(r => r.ProductId)
             .OnDelete(DeleteBehavior.Cascade);
            e.HasOne(r => r.User)
             .WithMany(u => u.Reviews)
             .HasForeignKey(r => r.UserId)
             .OnDelete(DeleteBehavior.Restrict);
        });

        // ─── Cart ───
        modelBuilder.Entity<Cart>(e =>
        {
            e.HasOne(c => c.User)
             .WithMany(u => u.CartItems)
             .HasForeignKey(c => c.UserId)
             .OnDelete(DeleteBehavior.Cascade);
            e.HasOne(c => c.Product)
             .WithMany(p => p.CartItems)
             .HasForeignKey(c => c.ProductId)
             .OnDelete(DeleteBehavior.Restrict);
        });

        // ─── ChatMessage ───
        modelBuilder.Entity<ChatMessage>(e =>
        {
            e.HasOne(cm => cm.Sender)
             .WithMany()
             .HasForeignKey(cm => cm.SenderId)
             .OnDelete(DeleteBehavior.Restrict);
            e.HasOne(cm => cm.Receiver)
             .WithMany()
             .HasForeignKey(cm => cm.ReceiverId)
             .OnDelete(DeleteBehavior.Restrict);
            e.HasOne(cm => cm.QuotedMessage)
             .WithMany()
             .HasForeignKey(cm => cm.QuotedMessageId)
             .OnDelete(DeleteBehavior.Restrict);
            e.Property(cm => cm.ProductPrice).HasColumnType("decimal(18,2)");
        });
    }
}
