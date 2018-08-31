import {Injectable} from '@angular/core';
import {LocationType} from '../enums/location-type.enum';
import {Observable, of, throwError} from 'rxjs';
import {LocationByAddress, LocationByCoords, NoLocation} from '../interfaces/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private readonly apiKey = `AIzaSyDX8znfh-d4u3spGhC1GvCjq6EA1pjPovQ`;
  private readonly mapUrl = `https://www.google.com/maps/embed/v1/place`;

  /**
   * normalize Address data - map your data based on scheme properties
   * @param data
   * @returns
   */
  private normalize(data: any = {}): any {
    return {
      streethw: data.strassehw,
      townhw: data.orthw,
      countryhw: data.landhw,
      photogpsla: data.photogpsla,
      photogpslo: data.photogpslo,
      ...data
    };
  }

  /**
   * retrieve Address from data object
   * @param data
   * @returns
   */
  private locationbDataWithAddress(data): LocationByAddress | NoLocation {
    const {streethw, townhw, countryhw} = data;
    return (townhw && countryhw) ? {type: LocationType.ADDRESS, streethw, townhw, countryhw} : {type: LocationType.EMPTY};
  }


  /**
   * retrieve Geo Coordinates from data object
   * @param data
   * @returns
   */
  private locationbDataWithCoords(data): LocationByCoords | NoLocation {
    const {photogpsla, photogpslo} = data;
    return (photogpsla && photogpslo) ? {type: LocationType.COORDS, photogpsla, photogpslo} : {type: LocationType.EMPTY};
  }

  /**
   * Geo Coordinates are assumed to be only present in photo Objects.
   * We check the objects type to either retrieve Geo Coordinates or Address Data.
   * If neither is available we return empty type.
   *
   * @param typeName
   * @param data
   * @returns
   */
  locationbData(typeName: string, data: Object): LocationByAddress | LocationByCoords | NoLocation {
    let normalizedData = this.normalize(data);
    return typeName === 'albumphoto' ? this.locationbDataWithCoords(normalizedData) : this.locationbDataWithAddress(normalizedData);
  }

  /**
   * Depending on the Location type we build a different URL.
   * If we have no Location type we return an error.
   *
   * @param location
   * @returns
   */
  mapsUrl(location): Observable<string> {
    let params: string;

    if (location.type === LocationType.ADDRESS) {
      const {streethw, townhw, countryhw} = location;
      params = `${streethw || ''}+${townhw}+${countryhw}`;
    } else if (location.type === LocationType.COORDS) {
      const {photogpsla, photogpslo} = location;
      params = `${photogpsla},${photogpslo}`;
    } else {
      return throwError(true)
    }

    return of(`${this.mapUrl}?key=${this.apiKey}&q=${params}`);
  }
}
