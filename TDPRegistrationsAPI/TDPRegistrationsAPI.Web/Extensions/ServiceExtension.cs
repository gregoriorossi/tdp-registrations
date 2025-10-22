using TDPRegistrations.Core.Interfaces;
using TDPRegistrations.Infrastracture.Repositories;

namespace TDPRegistrationsAPI.Web.Extensions
{
    public static class ServiceExtension
    {
        public static IServiceCollection RegisterService(this IServiceCollection services)
        {
            #region Services
            #endregion

            #region Repositories
            services.AddScoped<IFormRepository, FormRepository>();
            #endregion

            return services;
        }
    }
}
