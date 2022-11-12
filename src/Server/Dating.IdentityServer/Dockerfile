FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["Dating.IdentityServer/Dating.IdentityServer.csproj", "Dating.IdentityServer/"]
RUN dotnet restore "Dating.IdentityServer/Dating.IdentityServer.csproj"
COPY . .
WORKDIR "/src/Dating.IdentityServer"
RUN dotnet build "Dating.IdentityServer.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Dating.IdentityServer.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Dating.IdentityServer.dll"]
