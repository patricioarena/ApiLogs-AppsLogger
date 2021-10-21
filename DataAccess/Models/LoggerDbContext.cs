using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace DataAccess.Models
{
    public partial class LoggerDbContext : DbContext
    {
        public LoggerDbContext()
        {
        }

        public LoggerDbContext(DbContextOptions<LoggerDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AppLogger> AppLoggers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                //optionsBuilder.UseSqlServer("Server=devserver04;Database=Logger;Trusted_Connection=True;App=ApiLogs;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Modern_Spanish_CI_AS");

            modelBuilder.Entity<AppLogger>(entity =>
            {
                entity.ToTable("AppLogger");

                entity.Property(e => e.Aplicacion)
                    .HasMaxLength(128)
                    .IsUnicode(false)
                    .HasDefaultValueSql("(app_name())");

                entity.Property(e => e.QueryString)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.RequestMethod)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Timestamp)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.UrlRequestBackend)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UrlRequestFrontend)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Username)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
