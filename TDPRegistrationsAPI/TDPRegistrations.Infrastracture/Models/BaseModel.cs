using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TDPRegistrations.Infrastracture.Models
{
    internal class BaseModel<T>
    {
        [Key]
        public T Id { get; set; }

        public DateTime? DateCreated { get; set; }

        public DateTime? DateUpdated { get; set; }
    }
}
