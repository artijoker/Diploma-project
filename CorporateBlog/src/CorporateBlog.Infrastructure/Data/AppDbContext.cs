using System;
using System.Collections.Generic;
using CorporateBlog.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Options;

namespace CorporateBlog.Infrastructure.Data
{
    public partial class AppDbContext : DbContext
    {
        public AppDbContext()
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Comment> Comments => Set<Comment>();
        public DbSet<ComplaintOnComment> ComplaintsOnComments => Set<ComplaintOnComment>();

        public DbSet<Post> Posts => Set<Post>();
        public DbSet<Like> Likes => Set<Like>();
        public DbSet<Dislike> Dislikes => Set<Dislike>();
        public DbSet<ComplaintOnPost> ComplaintsOnPosts => Set<ComplaintOnPost>();

        public DbSet<Role> Roles => Set<Role>();
        public DbSet<Account> Accounts => Set<Account>();
        public DbSet<Category> Categories => Set<Category>();
        public DbSet<BlockedJwtToken> Tokens => Set<BlockedJwtToken>();

        public DbSet<Subscription> SubscriberSubscriptions => Set<Subscription>();

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //MySQL
            const string connectionString = "server=localhost;port=3306;user=root;password=56537;database=InternalCorporateBlog";
            optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));

            //Sqlite
            //const string dbPath = "myapp.db";
            //optionsBuilder.UseSqlite($"Data Source={dbPath};");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            FillDataBaseWithInitialData(modelBuilder);
            OnModelCreatingPartial(modelBuilder);

            modelBuilder.Entity<Subscription>(entity =>
            {
                entity.HasOne(s => s.SubscriberAccount)
                    .WithMany(s => s.Subscribers)
                    .HasForeignKey(s => s.SubscriberAccountId);


                entity.HasOne(s => s.AuthorAccount)
                    .WithMany(s => s.Subscriptions)
                    .HasForeignKey(s => s.AuthorAccountId);

                entity.ToTable("Subscriptions");
            });
            modelBuilder.Entity<BlockedJwtToken>(entity =>
            {
                entity.ToTable("BlockedTokens");
            });
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

        private static void FillDataBaseWithInitialData(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Role>().HasData(
                new[]
                {
                    new Role()
                    {
                        Id = 1,
                        Name = "admin"
                    },
                    new Role()
                    {
                        Id = 2,
                        Name = "user"
                    },
                });


            var admin = new Account()
            {
                Id = 1,
                Login = "admin",
                PasswordHash = "AQAAAAEAACcQAAAAEIqRXJ8XNN+KJLs3v4pGc7VaNpXP8qZfpu/n+cIMPQaYsibvD9P1cTFW4G4Rt6JU0A==", //admin
                Email = "eupftxzounoehg@arxxwalls.com",
                RoleId = 1,
                Registered = DateTime.Now
            };

            var user = new Account()
            {
                Id = 2,
                Login = "joker",
                PasswordHash = "AQAAAAEAACcQAAAAEKBISSdh+JOTY8R6C0E+uFboR6w6Fnl0NqIWRTxSOt1lr8upO5jGxAspSaPu8YDa1w==", //joker
                Email = "joker@mail.ru",
                RoleId = 2,
                Registered = DateTime.Now
            };


            modelBuilder.Entity<Account>().HasData(admin, user);

            modelBuilder.Entity<Category>().HasData(
                new[]
                {
                    new Category()
                    {
                        Id=1,
                        Name="Другое"

                    },
                    new Category()
                    {
                        Id=2,
                        Name="Технологии"

                    },
                    new Category()
                    {
                        Id=3,
                        Name="Разработка"

                    },
                    new Category()
                    {
                        Id=4,
                        Name="Дизайн"

                    },
                    new Category()
                    {
                        Id=5,
                        Name="Администрирование"

                    },
                    new Category()
                    {
                        Id=6,
                        Name="Маркетинг"

                    },
                    new Category()
                    {
                        Id=7,
                        Name="Научпоп"
                    },
                }
            );           
        }
    }
}
