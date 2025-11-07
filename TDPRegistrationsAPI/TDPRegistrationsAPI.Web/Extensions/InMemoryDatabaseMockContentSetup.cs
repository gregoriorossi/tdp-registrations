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
                Title = "Iscrizioni 2023",
                Fields = new List<Field>()
                {
                    new Field()
                    {
                        Id = Guid.NewGuid(),
                        DateCreated = new DateTime(2023,10,12),
                        DateUpdated=new DateTime(2023,10 ,12),
                        Type = TDPRegistrations.Core.Enums.FieldTypes.TEXT,
                        Label = "Nome",
                        Description = "Inserisci il tuo nome",
                        IsMandatory = true,
                        Order = 1
                    },
                    new Field()
                    {
                        Id = Guid.NewGuid(),
                        DateCreated = new DateTime(2023,10,12),
                        DateUpdated=new DateTime(2023,10 ,12),
                        Type = TDPRegistrations.Core.Enums.FieldTypes.TEXT,
                        Label = "Cognome",
                        Description = "Inserisci il tuo cognome",
                        IsMandatory = true,
                        Order = 2
                    },
                     new Field()
                    {
                        Id = Guid.NewGuid(),
                        DateCreated = new DateTime(2023,10,12),
                        DateUpdated=new DateTime(2023,10 ,12),
                        Type = TDPRegistrations.Core.Enums.FieldTypes.DATETIME,
                        Label = "Data di nascita",
                        Description = "Inserisci la tua data di nascita",
                        IsMandatory = true,
                        Order = 3
                    },
                     new Field()
                    {
                        Id = Guid.NewGuid(),
                        DateCreated = new DateTime(2023,10,12),
                        DateUpdated=new DateTime(2023,10 ,12),
                        Type = TDPRegistrations.Core.Enums.FieldTypes.EMAIL,
                        Label = "Email",
                        Description = "Inserisci la tua email",
                        IsMandatory = true,
                        Order = 4
                    },
                      new Field()
                    {
                        Id = Guid.NewGuid(),
                        DateCreated = new DateTime(2023,10,12),
                        DateUpdated=new DateTime(2023,10 ,12),
                        Type = TDPRegistrations.Core.Enums.FieldTypes.TELEPHONE_NUMBER,
                        Label = "Telefono",
                        Description = "Inserisci il tuo numero di telefono",
                        IsMandatory = false,
                        Order = 5
                    },
                    new Field()
                    {
                        Id = Guid.NewGuid(),
                        DateCreated = new DateTime(2023,10,12),
                        DateUpdated=new DateTime(2023,10 ,12),
                        Type = TDPRegistrations.Core.Enums.FieldTypes.SINGLE_CHOICE,
                        Label = "Fascia d'età",
                        Description = "Inserisci la fascia d'età",
                        Options = new List<FieldOption>
                        {
                            new FieldOption("0-20", 1),
                            new FieldOption("21-40", 2),
                            new FieldOption("41-60", 3),
                            new FieldOption("60+", 4)
                        },
                        IsMandatory = false,
                        Order = 6
                    },
                    new Field()
                    {
                        Id = Guid.NewGuid(),
                        DateCreated = new DateTime(2023,10,12),
                        DateUpdated=new DateTime(2023,10 ,12),
                        Type = TDPRegistrations.Core.Enums.FieldTypes.MULTIPLE_CHOICE,
                        Label = "Interessi",
                        Description = "Inserire gli interessi",
                        Options = new List<FieldOption>
                        {
                            new FieldOption("Pesca", 1),
                            new FieldOption("Cucina", 2),
                            new FieldOption("Equitazione", 3),
                            new FieldOption("Corsa", 4)
                        },
                        IsMandatory = false,
                        Order = 7
                    },
                }
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
