interface OfficeResponse {
  id: string;
  name: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
  };
  telephone: string;
  faxNumber: string;
  email: string;
  nwsRegion: string;
  parentOrganization: string;
  responsibleCounties: string[];
  responsibleForecastZones: string[];
  responsibleFireZones: string[];
  approvedObservationStations: string[];
}

export type { OfficeResponse };
