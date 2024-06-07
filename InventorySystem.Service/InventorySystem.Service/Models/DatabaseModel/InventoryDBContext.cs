using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace InventorySystem.Service.Models.DatabaseModel;

public partial class InventoryDBContext : DbContext
{
    public InventoryDBContext()
    {
    }

    public InventoryDBContext(DbContextOptions<InventoryDBContext> options)
        : base(options)
    {
    }

    public virtual DbSet<BasBrand> BasBrands { get; set; }

    public virtual DbSet<BasCategory> BasCategories { get; set; }

    public virtual DbSet<BasPaymentType> BasPaymentTypes { get; set; }

    public virtual DbSet<BasRole> BasRoles { get; set; }

    public virtual DbSet<TrnInventory> TrnInventories { get; set; }

    public virtual DbSet<TrnProduct> TrnProducts { get; set; }

    public virtual DbSet<TrnSale> TrnSales { get; set; }

    public virtual DbSet<TrnTransaction> TrnTransactions { get; set; }

    public virtual DbSet<TrnUser> TrnUsers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BasBrand>(entity =>
        {
            entity.HasKey(e => e.BrndId);

            entity.ToTable("Bas_Brand", "Inv");

            entity.Property(e => e.BrndCd)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.CrtBy)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasDefaultValue("System");
            entity.Property(e => e.CrtDt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Label)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Rmrks)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasDefaultValue("");
            entity.Property(e => e.UpdtBy)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasDefaultValue("System");
            entity.Property(e => e.UpdtDt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
        });

        modelBuilder.Entity<BasCategory>(entity =>
        {
            entity.HasKey(e => e.CtgryId);

            entity.ToTable("Bas_Category", "Inv");

            entity.Property(e => e.CrtBy)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasDefaultValue("System");
            entity.Property(e => e.CrtDt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.CtgryCd)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Label)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Rmrks)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasDefaultValue("");
            entity.Property(e => e.UpdtBy)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasDefaultValue("System");
            entity.Property(e => e.UpdtDt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
        });

        modelBuilder.Entity<BasPaymentType>(entity =>
        {
            entity.HasKey(e => e.PymntTypId);

            entity.ToTable("Bas_PaymentTypes", "Inv");

            entity.Property(e => e.CrtBy)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasDefaultValue("System");
            entity.Property(e => e.CrtDt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Label)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.PymntCd)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Rmrks)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasDefaultValue("");
            entity.Property(e => e.UpdtBy)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasDefaultValue("System");
            entity.Property(e => e.UpdtDt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
        });

        modelBuilder.Entity<BasRole>(entity =>
        {
            entity.HasKey(e => e.RlId);

            entity.ToTable("Bas_Roles", "Inv");

            entity.Property(e => e.CrtBy)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasDefaultValue("System");
            entity.Property(e => e.CrtDt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.RlCd)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.RlNm)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Rmrks)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasDefaultValue("");
            entity.Property(e => e.UpdtBy)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasDefaultValue("System");
            entity.Property(e => e.UpdtDt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
        });

        modelBuilder.Entity<TrnInventory>(entity =>
        {
            entity.HasKey(e => e.InvId);

            entity.ToTable("Trn_Inventory", "Inv");

            entity.Property(e => e.CrtBy)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasDefaultValue("System");
            entity.Property(e => e.CrtDt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Supplier)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.UpdtBy)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasDefaultValue("System");
            entity.Property(e => e.UpdtDt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Prdct).WithMany(p => p.TrnInventories)
                .HasForeignKey(d => d.PrdctId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Trn_Inventory_PrdctId");
        });

        modelBuilder.Entity<TrnProduct>(entity =>
        {
            entity.HasKey(e => e.PrdctId);

            entity.ToTable("Trn_Products", "Inv");

            entity.Property(e => e.CrtBy)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasDefaultValue("System");
            entity.Property(e => e.CrtDt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.PrdctCd)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.PrdctDscrptn)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasDefaultValue("");
            entity.Property(e => e.PrdctNm)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.UpdtBy)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasDefaultValue("System");
            entity.Property(e => e.UpdtDt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Brnd).WithMany(p => p.TrnProducts)
                .HasForeignKey(d => d.BrndId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Trn_Products_BrndId");

            entity.HasOne(d => d.Ctgry).WithMany(p => p.TrnProducts)
                .HasForeignKey(d => d.CtgryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Trn_Products_CtgryId");
        });

        modelBuilder.Entity<TrnSale>(entity =>
        {
            entity.HasKey(e => e.SlsId);

            entity.ToTable("Trn_Sales", "Inv");

            entity.Property(e => e.CrtBy)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasDefaultValue("System");
            entity.Property(e => e.CrtDt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.UpdtBy)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasDefaultValue("System");
            entity.Property(e => e.UpdtDt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.PymntTyp).WithMany(p => p.TrnSales)
                .HasForeignKey(d => d.PymntTypId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Trn_Sales_PymntTypId");
        });

        modelBuilder.Entity<TrnTransaction>(entity =>
        {
            entity.HasKey(e => e.TrnId);

            entity.ToTable("Trn_Transactions", "Inv");

            entity.Property(e => e.CrtBy)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasDefaultValue("System");
            entity.Property(e => e.CrtDt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.UpdtBy)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasDefaultValue("System");
            entity.Property(e => e.UpdtDt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Prdct).WithMany(p => p.TrnTransactions)
                .HasForeignKey(d => d.PrdctId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Trn_Transactions_PrdctId");

            entity.HasOne(d => d.Sls).WithMany(p => p.TrnTransactions)
                .HasForeignKey(d => d.SlsId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Trn_Transactions_SlsId");
        });

        modelBuilder.Entity<TrnUser>(entity =>
        {
            entity.HasKey(e => e.UsrId);

            entity.ToTable("Trn_Users", "Inv");

            entity.Property(e => e.CrtBy)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasDefaultValue("System");
            entity.Property(e => e.CrtDt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasDefaultValue("");
            entity.Property(e => e.FrstNm)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.LstNm)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.PhnNum)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasDefaultValue("");
            entity.Property(e => e.Pswrd)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.UpdtBy)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasDefaultValue("System");
            entity.Property(e => e.UpdtDt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.UsrNm)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
