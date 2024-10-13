// I did not Locaiton name because it gives error
export interface LocationType {
  id: number; // Unique identifier for the location
  name: string; // Name of the location
  type: string; // Type or category of the location
  dimension: string; // Dimension in which the location exists
  residents: string[]; // List of resident identifiers
  url: string; // URL to the location's resource
  created: string; // Timestamp of when the location was created
}
