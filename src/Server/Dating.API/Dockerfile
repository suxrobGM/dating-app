FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["Dating.WebApi/Dating.WebApi.csproj", "Dating.WebApi/"]
RUN dotnet restore "Dating.WebApi/Dating.WebApi.csproj"
COPY . .
WORKDIR "/src/Dating.WebApi"
RUN dotnet build "Dating.WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Dating.WebApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Dating.WebApi.dll"]
