import { Card, Classes } from "@blueprintjs/core";
import ActionLine from "../shared-components/ActionLine";
import ForecastOfficeFetcher from "../data-components/ForecastOfficeFetcher";

interface iProps {
  officeUrl: string;
}

function ForecastOffice({ officeUrl }: iProps) {
  return (
    <ForecastOfficeFetcher officeUrl={officeUrl}>
      {(officeData, isLoading) => {
        const address = officeData?.address;
        const placeQuery = `${address?.streetAddress},${address?.addressLocality},${address?.addressRegion}`;
        const mapurl = `https://maps.apple.com/?address=${encodeURIComponent(placeQuery)}`;

        return (
          <Card className={isLoading ? Classes.SKELETON : ""}>
            <b>Local Weather Office</b>
            <br />
            <ActionLine
              iconName="globe"
              url={mapurl}
              text={
                <div>
                  {address?.streetAddress}
                  <br />
                  {address?.addressLocality}
                  <span>, </span>
                  {address?.addressRegion}
                  <span> </span>
                  {address?.postalCode}
                  <br />
                </div>
              }
            />
            <ActionLine
              iconName="envelope"
              url={`mailto:${officeData?.email}`}
              text={<span>{officeData?.email}</span>}
            />
            <ActionLine
              iconName="phone"
              url={`tel:${officeData?.email}`}
              text={<span>{officeData?.telephone}</span>}
            />
          </Card>
        );
      }}
    </ForecastOfficeFetcher>
  );
}

export default ForecastOffice;
