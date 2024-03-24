FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/Aled.HttpApi.Host/Aled.HttpApi.Host.csproj", "src/Aled.HttpApi.Host/"]
COPY ["src/Aled.Application/Aled.Application.csproj", "src/Aled.Application/"]
COPY ["src/Aled.Domain/Aled.Domain.csproj", "src/Aled.Domain/"]
COPY ["src/Aled.Domain.Shared/Aled.Domain.Shared.csproj", "src/Aled.Domain.Shared/"]
COPY ["src/Aled.Application.Contracts/Aled.Application.Contracts.csproj", "src/Aled.Application.Contracts/"]
COPY ["src/Aled.EntityFrameworkCore/Aled.EntityFrameworkCore.csproj", "src/Aled.EntityFrameworkCore/"]
COPY ["src/Aled.HttpApi/Aled.HttpApi.csproj", "src/Aled.HttpApi/"]
RUN dotnet restore "src/Aled.HttpApi.Host/Aled.HttpApi.Host.csproj"
COPY . .
WORKDIR "/src/src/Aled.HttpApi.Host"
RUN dotnet build "Aled.HttpApi.Host.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Aled.HttpApi.Host.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Aled.HttpApi.Host.dll"]
