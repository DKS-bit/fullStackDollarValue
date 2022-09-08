#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Lucas.Crud.Api/Lucas.Crud.Api.csproj", "Lucas.Crud.Api/"]
RUN dotnet restore "Lucas.Crud.Api/Lucas.Crud.Api.csproj"
COPY . .
WORKDIR "/src/Lucas.Crud.Api"
RUN dotnet build "Lucas.Crud.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Lucas.Crud.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Lucas.Crud.Api.dll"]