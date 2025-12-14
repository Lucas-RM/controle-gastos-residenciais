using ControleGastosResidenciais.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ControleGastosResidenciais.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Pessoa> Pessoas { get; set; } = null!;
    public DbSet<Categoria> Categorias { get; set; } = null!;
    public DbSet<Transacao> Transacoes { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configuração Pessoa
        modelBuilder.Entity<Pessoa>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Nome)
                .IsRequired()
                .HasMaxLength(200);
            entity.Property(e => e.Idade)
                .IsRequired();

            entity.HasMany(e => e.Transacoes)
                .WithOne(e => e.Pessoa)
                .HasForeignKey(e => e.PessoaId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Configuração Categoria
        modelBuilder.Entity<Categoria>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Descricao)
                .IsRequired()
                .HasMaxLength(200);
            entity.Property(e => e.Finalidade)
                .IsRequired()
                .HasConversion<int>();

            entity.HasMany(e => e.Transacoes)
                .WithOne(e => e.Categoria)
                .HasForeignKey(e => e.CategoriaId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // Configuração Transacao
        modelBuilder.Entity<Transacao>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Descricao)
                .IsRequired();
            entity.Property(e => e.Valor)
                .IsRequired()
                .HasPrecision(18, 2);
            entity.Property(e => e.Tipo)
                .IsRequired()
                .HasConversion<int>();
            entity.Property(e => e.CategoriaId)
                .IsRequired();
            entity.Property(e => e.PessoaId)
                .IsRequired();
        });
    }
}

