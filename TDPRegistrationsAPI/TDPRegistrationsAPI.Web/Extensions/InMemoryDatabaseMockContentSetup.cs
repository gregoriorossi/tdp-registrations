using TDPRegistrations.Core.Models;
using TDPRegistrations.Infrastracture.Data;

namespace TDPRegistrationsAPI.Web.Extensions
{
    public static class InMemoryDatabaseMockContentSetup
    {
        public static void AddInMemoryDatabaseMockContent(this WebApplication app)
        {
            var mockDatabaseScope = app.Services.CreateScope();
            var context = mockDatabaseScope.ServiceProvider.GetRequiredService<AppDbContext>();

            var form1 = new Form
            {
                DateCreated = new DateTime(2023, 10, 12),
                DateUpdated = new DateTime(2023, 11, 2),
                Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut orci nec augue euismod suscipit. Suspendisse condimentum vel libero sed finibus. Sed lacinia eleifend auctor. Etiam bibendum ante nec urna placerat, eget ornare metus posuere. Sed id velit blandit, pellentesque dolor maximus, sagittis justo. Donec ut ipsum et elit venenatis congue. Donec ac sapien id nunc hendrerit tincidunt.",
                IsOpen = true,
                Slug = "iscrizioni-2023",
                Id = Guid.NewGuid(),
                Title = "Iscrizioni 2023"
            };

            var form2 = new Form
            {
                DateCreated = new DateTime(2024, 1, 3),
                DateUpdated = new DateTime(2024, 3, 21),
                Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut orci nec augue euismod suscipit. Suspendisse condimentum vel libero sed finibus. Sed lacinia eleifend auctor. Etiam bibendum ante nec urna placerat, eget ornare metus posuere. Sed id velit blandit, pellentesque dolor maximus, sagittis justo. Donec ut ipsum et elit venenatis congue. Donec ac sapien id nunc hendrerit tincidunt.",
                IsOpen = true,
                Slug = "iscrizioni-gennaio-2024",
                Id = Guid.NewGuid(),
                Title = "Iscrizioni Gennaio 2024"
            };

            var form3 = new Form
            {
                DateCreated = new DateTime(2024, 9, 14),
                DateUpdated = new DateTime(2024, 9, 20),
                Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut orci nec augue euismod suscipit. Suspendisse condimentum vel libero sed finibus. Sed lacinia eleifend auctor. Etiam bibendum ante nec urna placerat, eget ornare metus posuere. Sed id velit blandit, pellentesque dolor maximus, sagittis justo. Donec ut ipsum et elit venenatis congue. Donec ac sapien id nunc hendrerit tincidunt.",
                IsOpen = true,
                Slug = "iscrizioni-settembre-2024",
                Id = Guid.NewGuid(),
                Title = "Iscrizioni 2024"
            };

            var form4 = new Form
            {
                DateCreated = new DateTime(2023, 1, 12),
                DateUpdated = new DateTime(2023, 1, 2),
                Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut orci nec augue euismod suscipit. Suspendisse condimentum vel libero sed finibus. Sed lacinia eleifend auctor. Etiam bibendum ante nec urna placerat, eget ornare metus posuere. Sed id velit blandit, pellentesque dolor maximus, sagittis justo. Donec ut ipsum et elit venenatis congue. Donec ac sapien id nunc hendrerit tincidunt.",
                IsOpen = true,
                Slug = "iscrizioni-gennaio-2025",
                Id = Guid.NewGuid(),
                Title = "Iscrizioni Gennario 2025"
            };
            context.Add(form1);
            context.Add(form2);
            context.Add(form3);
            context.Add(form4);
            context.SaveChanges();
        }
    }
}
