### dotnetcore Build
FROM mcr.microsoft.com/dotnet/sdk:5.0 as dotnet-builder

WORKDIR /app

COPY ./*.csproj ./nuget.config ./
RUN dotnet restore
COPY ././. ./

RUN dotnet publish -c Release -o out /property:PublishWithAspNetCoreTargetManifest=false

#### FINAL IMAGE
FROM mcr.microsoft.com/dotnet/aspnet:5.0

WORKDIR /app

COPY --from=dotnet-builder /app/out .

EXPOSE 80/tcp
ENV ASPNETCORE_URLS http://*:80

ENV TZ=Australia/Melbourne

ENTRYPOINT ["dotnet", "SSRBase.LandingPage.dll"]