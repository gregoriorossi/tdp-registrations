using Newtonsoft.Json;
using TDPRegistrations.Core.Entities;
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

        public static async Task<Form> UpdateFormVMToForm(UpdateFormVM model)
        {
            string slug = SlugHelper.Generate(model.Title);
            List<UpdateFormFieldVM> updateFormFieldVMs = JsonConvert.DeserializeObject<List<UpdateFormFieldVM>>(model.Fields) ?? new List<UpdateFormFieldVM>();

            List<Field> fields = updateFormFieldVMs.Select(model => {
                return new Field
                {
                    Label = model.Label,
                    Id = model.Id ?? Guid.Empty,
                    IsMandatory = model.IsMandatory,
                    Order = model.Order,
                    Description = model.Description,
                    Type = ToFieldType(model.Type),
                    Options = new List<FieldOption> { }
                };
            }).ToList();

            Image? bannerImage = null;
            if (model.BannerImage != null )
            {
                bannerImage = new Image();
                bannerImage.Length = model.BannerImage.Length;
                bannerImage.ContentType = model.BannerImage.ContentType;
                bannerImage.FileName = model.BannerImage.FileName;  

                await using var ms = new MemoryStream();
                await model.BannerImage.CopyToAsync(ms);
                bannerImage.Data  = ms.ToArray();
            }

            return new Form()
            {
                Id = model.Id,
                Title = model.Title,
                Description = model.Description,
                Slug = slug,
                DateUpdated = DateTime.Now,
                Fields = fields,
                BannerImage = bannerImage
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

        private static FieldTypes ToFieldType(int type)
        {
            switch (type)
            {
                case 0:
                    return FieldTypes.TEXT;
                case 1:
                    return FieldTypes.NUMBER;
                case 2:
                    return FieldTypes.DATETIME;
                case 3:
                    return FieldTypes.SINGLE_CHOICE;
                case 4:
                    return FieldTypes.MULTIPLE_CHOICE;
                case 5:
                    return FieldTypes.EMAIL;
                case 6:
                    return FieldTypes.TELEPHONE_NUMBER;
                default:
                    return FieldTypes.TEXT;
            }
        }
    }
}
