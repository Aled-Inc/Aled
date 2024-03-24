FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/Aled.Blazor/Aled.Blazor.csproj", "src/Aled.Blazor/"]
COPY ["src/Aled.HttpApi.Client/Aled.HttpApi.Client.csproj", "src/Aled.HttpApi.Client/"]
COPY ["src/Aled.Application.Contracts/Aled.Application.Contracts.csproj", "src/Aled.Application.Contracts/"]
COPY ["src/Aled.Domain.Shared/Aled.Domain.Shared.csproj", "src/Aled.Domain.Shared/"]
RUN dotnet restore "src/Aled.Blazor/Aled.Blazor.csproj"
COPY . .
WORKDIR "/src/src/Aled.Blazor"
RUN dotnet build "Aled.Blazor.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Aled.Blazor.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Aled.Blazor.dll"]
