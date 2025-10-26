using TDPRegistrations.Core.Enums;
using TDPRegistrations.Core.Models;
using TDPRegistrationsAPI.Web.Helpers;
using TDPRegistrationsAPI.Web.ViewModels.Requests;

namespace TDPRegistrationsAPI.Web.Mappers
{
    public static class ViewModelToEntity
    {
        public static Form AddFormVMToForm(AddFormVM model)
        {
            string slug = SlugHelper.Generate(model.Title);

            return new Form()
            {
                Title = model.Title,
                Slug = slug,
                DateCreated = DateTime.Now,
                DateUpdated = DateTime.Now
            };
        }

        public static Form UpdateFormVMToForm(UpdateFormVM model)
        {
            string slug = SlugHelper.Generate(model.Title);

            return new Form()
            {
                Id = model.Id,
                Title = model.Title,
                Description = model.Description,
                Slug = slug,
                DateUpdated = DateTime.Now
            };
        }

        public static Field AddFieldVMToField(AddFieldVM model)
        {
            return new Field()
            {
                DateCreated = DateTime.Now,
                DateUpdated = DateTime.Now,
                Label = model.Label,
                Description = model.Description,
                IsMandatory = model.IsMandatory,
                Type = ToFieldType(model.Type)
            };
        }

        private static FieldTypes ToFieldType(string type)
        {
            switch (type)
            {
                case "TEXT":
                    return FieldTypes.TEXT;
                case "NUMBER":
                    return FieldTypes.NUMBER;
                case "DATETIME":
                    return FieldTypes.DATETIME;
                case "SINGLE_CHOICE":
                    return FieldTypes.SINGLE_CHOICE;
                case "MULTIPLE_CHOICE":
                    return FieldTypes.MULTIPLE_CHOICE;
                case "EMAIL":
                    return FieldTypes.EMAIL;
                case "TELEPHONE_NUMBER":
                    return FieldTypes.TELEPHONE_NUMBER;
                default:
                    return FieldTypes.TEXT;
            }
        }
    }
}
