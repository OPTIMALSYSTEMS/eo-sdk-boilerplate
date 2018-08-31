export interface LocationByAddress {
  type: string;
  streethw: string;
  townhw: string;
  countryhw: string
}

export interface LocationByCoords {
  type: string;
  photogpsla: number;
  photogpslo: number;
}

export interface NoLocation {
  type: string;
}
