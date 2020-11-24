import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import{Observable, pipe, throwError} from "rxjs";
import {map,catchError, flatMap} from "rxjs/operators";
import {Entry} from "./entry.model";

import {element} from 'protractor';



@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath: string = "api/entries";
  constructor(private http: HttpClient) { }

  getAll(): Observable<Entry[]>{
    return this.http.get(this.apiPath).pipe(catchError(this.handlerError), map(this.jsonDataToEntries));
  }

  getById(id: number): Observable<Entry>{
    const url = `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(catchError(this.handlerError), map(this.jsonDataToEntry));

  }

  create(entry: Entry):Observable<Entry>{
    return this.http.post(this.apiPath, entry).pipe(catchError(this.handlerError), map(this.jsonDataToEntry));
  }

  update(entry:Entry):Observable<Entry>{
    const url = `${this.apiPath}/${entry.id}`;

    return this.http.put(url, entry).pipe(catchError(this.handlerError), map(() => entry));

  }

  delete(id: number):Observable<any>{
    
    const url = `${this.apiPath}/${id}`; 
    return this.http.delete(url);

  }

  //Private Methodos

  private jsonDataToEntries(jsonData: any[]):Entry[]{

    const entries:Entry[] =[];

    jsonData.forEach(element =>{
      const entry = Object.assign(new Entry(), element);
      entries.push(entry);
    });
    console.log(entries);
    return entries;
  }

  private jsonDataToEntry(jsonData: any): Entry{
    return jsonData as Entry;
  }

  private handlerError(error: any): Observable<any>{
    console.log("Erro Na Requisição => ", error);
    return throwError(error);
  }



}
