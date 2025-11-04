using System.ComponentModel.DataAnnotations.Schema;
using TDPRegistrations.Core.Enums;
using TDPRegistrations.Core.Errors;

namespace TDPRegistrations.Core.Models
{
    [Table("Fields")]
    public class Field : BaseModel<Guid>
    {
        public string Label { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public FieldTypes Type {  get; set; }
        public bool IsMandatory  { get; set; }
        public int Order { get; set; } = 0;
        public List<FieldOption> Options { get; set; } = [];


        public string IsValid(out bool valid)
        {
            if (string.IsNullOrEmpty(Label))
            {
                valid = false;
                return FieldErrors.FieldErrorCodes.MissingLabel;
            }

            if (Type == FieldTypes.SINGLE_CHOICE && Options.Count != 1)
            {
                valid= false;
                return FieldErrors.FieldErrorCodes.SingleChoiceWrongOptions;
            }

            if (Type == FieldTypes.MULTIPLE_CHOICE && Options.Count < 2)
            {
                valid = false;
                return FieldErrors.FieldErrorCodes.MultipleChoiceWrongOptions;
            }

            valid = true;
            return "";
        }
    }
}
