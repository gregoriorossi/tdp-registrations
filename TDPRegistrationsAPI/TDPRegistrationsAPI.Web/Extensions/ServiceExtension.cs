using TDPRegistrations.Core.Interfaces.Managers;
using TDPRegistrations.Core.Interfaces.Repositories;
using TDPRegistrations.Infrastracture.Managers;
using TDPRegistrations.Infrastracture.Repositories;

namespace TDPRegistrationsAPI.Web.Extensions
{
    public static class ServiceExtension
    {
        public static IServiceCollection RegisterService(this IServiceCollection services)
        {
            #region Managers
            services.AddScoped<IFormManager, FormManager>();
            services.AddScoped<IFilesManager, FilesManager>();
            #endregion

            #region Services
            #endregion

            #region Repositories
            services.AddScoped<IFormRepository, FormRepository>();
            services.AddScoped<IFilesRepository, FilesRepository>();
            #endregion

            return services;
        }
    }
}
