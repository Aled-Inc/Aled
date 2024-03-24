FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/Aled.AuthServer/Aled.AuthServer.csproj", "src/Aled.AuthServer/"]
COPY ["src/Aled.EntityFrameworkCore/Aled.EntityFrameworkCore.csproj", "src/Aled.EntityFrameworkCore/"]
COPY ["src/Aled.Domain/Aled.Domain.csproj", "src/Aled.Domain/"]
COPY ["src/Aled.Domain.Shared/Aled.Domain.Shared.csproj", "src/Aled.Domain.Shared/"]
RUN dotnet restore "src/Aled.AuthServer/Aled.AuthServer.csproj"
COPY . .
WORKDIR "/src/src/Aled.AuthServer"
RUN dotnet build "Aled.AuthServer.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Aled.AuthServer.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Aled.AuthServer.dll"]
