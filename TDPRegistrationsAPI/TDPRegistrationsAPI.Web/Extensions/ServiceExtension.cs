using TDPRegistrations.Core.Interfaces.Repositories;
using TDPRegistrations.Core.Interfaces.Services;
using TDPRegistrations.Infrastracture.Repositories;
using TDPRegistrations.Infrastracture.Services;

namespace TDPRegistrationsAPI.Web.Extensions
{
    public static class ServiceExtension
    {
        public static IServiceCollection RegisterService(this IServiceCollection services)
        {
            #region Services
            services.AddScoped<IFormService, FormServices>();
            #endregion

            #region Repositories
            services.AddScoped<IFormRepository, FormRepository>();
            #endregion

            return services;
        }
    }
}
