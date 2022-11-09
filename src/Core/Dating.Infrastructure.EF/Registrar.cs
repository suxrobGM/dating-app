using Microsoft.Extensions.DependencyInjection;

namespace Dating.Infrastructure.EF;

public static class Registrar
{
    public static IServiceCollection AddInfrastructureLayer(this IServiceCollection services)
    {
        return services;
    }
}