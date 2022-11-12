FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["Dating.API/Dating.API.csproj", "Dating.API/"]
RUN dotnet restore "Dating.API/Dating.API.csproj"
COPY . .
WORKDIR "/src/Dating.API"
RUN dotnet build "Dating.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Dating.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Dating.API.dll"]
